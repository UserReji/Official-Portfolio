import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "src/data/testimonials.json");

function readTestimonials() {
  const raw = fs.readFileSync(DATA_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeTestimonials(data: unknown) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf-8");
}

// GET — public
export async function GET() {
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

    const testimonials = readTestimonials();

    // 1-per-person check
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
  } catch {
    return NextResponse.json({ error: "Failed to save testimonial." }, { status: 500 });
  }
}
