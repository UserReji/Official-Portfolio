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

    if (isSupabaseConfigured()) {
      const update = {
        name: name?.trim(),
        role: role?.trim(),
        company: company?.trim() || "",
        content: content?.trim(),
      };
      const res = await supabaseFetch(
        `/rest/v1/testimonials?id=eq.${encodeURIComponent(id)}`,
        { method: "PATCH", body: JSON.stringify(update) }
      );
      if (res && res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows.length > 0) {
          return NextResponse.json(rows[0]);
        }
        // Row not found
        if (res.status === 404) {
          return NextResponse.json({ error: "Not found" }, { status: 404 });
        }
        // Fall through to file fallback if empty
      } else if (res && (res.status === 404 || res.status === 406)) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }

    const testimonials = readTestimonials();
    const idx = testimonials.findIndex((t: { id: string }) => t.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    testimonials[idx] = {
      ...testimonials[idx],
      name: name?.trim() ?? testimonials[idx].name,
      role: role?.trim() ?? testimonials[idx].role,
      company: company?.trim() || "",
      content: content?.trim() ?? testimonials[idx].content,
    };
    writeTestimonials(testimonials);
    return NextResponse.json(testimonials[idx]);
  } catch (err) {
    console.error("[testimonials] PUT error:", err);
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

    if (isSupabaseConfigured()) {
      const res = await supabaseFetch(
        `/rest/v1/testimonials?id=eq.${encodeURIComponent(id)}`,
        { method: "DELETE" }
      );
      if (res && (res.ok || res.status === 204)) {
        return NextResponse.json({ success: true });
      }
      if (res && res.status === 404) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }

    const testimonials = readTestimonials();
    const filtered = testimonials.filter((t: { id: string }) => t.id !== id);
    if (filtered.length === testimonials.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    writeTestimonials(filtered);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[testimonials] DELETE error:", err);
    return NextResponse.json({ error: "Failed to delete." }, { status: 500 });
  }
}
