import { NextResponse } from "next/server";
import { z } from "zod";
import { isValidEmail } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().refine(isValidEmail),
  subject: z.string().min(3),
  message: z.string().min(10),
});

/**
 * POST /api/contact
 * Validates the contact form. If RESEND_API_KEY is configured, sends an email
 * via Resend; otherwise logs to the server and returns success.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL || process.env.NEXT_PUBLIC_EMAIL;

  // No email service configured — accept and log
  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] new message:", { name, email, subject });
    return NextResponse.json({
      success: true,
      message:
        "Thanks! Your message has been received. I'll get back to you soon.",
    });
  }

  // Optional: Resend integration
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[contact] resend failed:", err);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thanks! Your message has been sent.",
    });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
