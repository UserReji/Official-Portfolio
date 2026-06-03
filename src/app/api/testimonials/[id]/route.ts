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

function isAuthorized(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// PUT — admin only (edit)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const { name, role, company, content } = body;
    const testimonials = readTestimonials();
    const idx = testimonials.findIndex((t: { id: string }) => t.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    testimonials[idx] = {
      ...testimonials[idx],
      name: name?.trim(),
      role: role?.trim(),
      company: company?.trim() || "",
      content: content?.trim(),
    };
    writeTestimonials(testimonials);
    return NextResponse.json(testimonials[idx]);
  } catch {
    return NextResponse.json({ error: "Failed to update." }, { status: 500 });
  }
}

// DELETE — admin only
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const testimonials = readTestimonials();
    const filtered = testimonials.filter((t: { id: string }) => t.id !== id);
    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    writeTestimonials(filtered);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
