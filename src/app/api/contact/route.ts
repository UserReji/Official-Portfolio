import { NextResponse } from "next/server";
import { z } from "zod";
import { isValidEmail } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import { Resend } from "resend";
import { supabaseFetch, isSupabaseConfigured } from "@/lib/supabase-server";

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
  const to =
    process.env.CONTACT_TO_EMAIL ||
    process.env.NEXT_PUBLIC_EMAIL ||
    siteConfig.email;

  // Persist submission to Supabase when configured (server-only service key)
  if (isSupabaseConfigured()) {
    try {
      const res = await supabaseFetch("/rest/v1/contacts", {
        method: "POST",
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res || !res.ok) {
        const err = res ? await res.text() : "no response";
        console.error("[contact] supabase insert failed:", err);
      }
    } catch (err) {
      console.error("[contact] supabase error:", err);
    }
  }

  // No email service configured — accept and log
  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] new message:", { name, email, subject });
    return NextResponse.json({
      success: true,
      message:
        "Thanks! Your message has been received. I'll get back to you soon.",
    });
  }

  // Resend integration via SDK
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] resend failed:", error);
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
