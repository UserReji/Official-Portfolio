import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { supabaseFetch, isSupabaseConfigured } from "@/lib/supabase-server";

const DATA_PATH = path.join(process.cwd(), "src/data/testimonials.json");

function readTestimonials() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeTestimonials(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

type TestimonialRow = {
  id: string;
  name: string;
  role: string;
  company?: string | null;
  content: string;
};

async function listFromSupabase(): Promise<TestimonialRow[] | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const res = await supabaseFetch("/rest/v1/testimonials?select=id,name,role,company,content&order=created_at.asc");
    if (!res || !res.ok) return null;
    return (await res.json()) as TestimonialRow[];
  } catch {
    return null;
  }
}

// GET — public
export async function GET() {
  const sb = await listFromSupabase();
  if (sb) return NextResponse.json(sb);

  try {
    return NextResponse.json(readTestimonials());
  } catch {
    return NextResponse.json({ error: "Failed to read testimonials" }, { status: 500 });
  }
}

// POST — public, but 1 submission per name (case-insensitive)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, role, company, content } = body;

    if (!name?.trim() || !role?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Name, role, and message are required." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const existing = await listFromSupabase();
      if (existing) {
        const duplicate = existing.find(
          (t) => t.name.trim().toLowerCase() === (name as string).trim().toLowerCase()
        );
        if (duplicate) {
          return NextResponse.json(
            { error: "A testimonial from this name already exists." },
            { status: 409 }
          );
        }
      }

      const newEntry = {
        id: `t-${Date.now()}`,
        name: (name as string).trim(),
        role: (role as string).trim(),
        company: (company as string)?.trim() || "",
        content: (content as string).trim(),
      };

      const res = await supabaseFetch("/rest/v1/testimonials", {
        method: "POST",
        body: JSON.stringify(newEntry),
      });

      if (!res || !res.ok) {
        const err = res ? await res.text() : "no response";
        console.error("[testimonials] supabase insert failed:", err);
        // fall through to local file fallback
      } else {
        const rows = (await res.json()) as TestimonialRow[];
        return NextResponse.json(rows[0] ?? newEntry, { status: 201 });
      }
    }

    const testimonials = readTestimonials();

    const duplicate = testimonials.find(
      (t: { name: string }) =>
        t.name.trim().toLowerCase() === name.trim().toLowerCase()
    );
    if (duplicate) {
      return NextResponse.json(
        { error: "A testimonial from this name already exists." },
        { status: 409 }
      );
    }

    const newEntry = {
      id: `t-${Date.now()}`,
      name: name.trim(),
      role: role.trim(),
      company: company?.trim() || "",
      content: content.trim(),
    };

    testimonials.push(newEntry);
    writeTestimonials(testimonials);
    return NextResponse.json(newEntry, { status: 201 });
  } catch (err) {
    console.error("[testimonials] POST error:", err);
    return NextResponse.json({ error: "Failed to save testimonial." }, { status: 500 });
  }
}
