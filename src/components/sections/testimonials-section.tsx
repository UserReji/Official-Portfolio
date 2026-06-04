"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { Testimonial } from "@/types";
import { useState, useEffect } from "react";

const EMPTY = { name: "", role: "", company: "", content: "" };

export function TestimonialsSection({ items: initial }: { items: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { setItems(initial); }, [initial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.status === 409) { setStatus("duplicate"); return; }
      if (!res.ok) { setErrorMsg(data.error || "Something went wrong."); setStatus("error"); return; }

      setItems((prev) => [...prev, data]);
      setForm(EMPTY);
      setStatus("success");
      setShowForm(false);
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-12">

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence initial={false}>
          {items.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border border-border/50 bg-card p-8 hover:border-primary/30 transition-colors duration-300"
            >
              <div className="font-serif text-5xl text-primary/20 leading-none mb-4">&ldquo;</div>
              <blockquote className="font-serif text-base font-light leading-relaxed text-foreground/80 italic mb-6">
                {t.content}
              </blockquote>
              <figcaption className="pt-4 border-t border-border/40">
                <div className="font-sans text-sm font-medium text-foreground">{t.name}</div>
                <div className="font-sans text-xs text-muted-foreground mt-0.5">
                  {t.role}{t.company ? ` · ${t.company}` : ""}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 font-sans text-sm text-primary"
          >
            <CheckCircle2 className="h-4 w-4" />
            Thank you — your testimonial has been added.
          </motion.div>
        ) : (
          <button
            onClick={() => { setShowForm((v) => !v); setStatus("idle"); setErrorMsg(""); }}
            className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase text-muted-foreground border border-border px-6 py-3 hover:border-primary hover:text-primary transition-all duration-300"
          >
            {showForm ? <><ChevronUp className="h-3.5 w-3.5" /> Cancel</> : <><Send className="h-3.5 w-3.5" /> Leave a testimonial</>}
          </button>
        )}
      </div>

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="border border-border/50 bg-card p-8 max-w-2xl mx-auto">
              <h3 className="font-serif text-2xl font-light text-foreground mb-1">Leave a testimonial</h3>
              <p className="font-sans text-sm text-muted-foreground mb-8">
                Worked with me? I&apos;d love to hear what you thought.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Your name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="e.g. Juan Dela Cruz"
                      className="w-full border border-border bg-background px-4 py-3 font-sans text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Role / Relation <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      required
                      placeholder="e.g. Classmate, Professor"
                      className="w-full border border-border bg-background px-4 py-3 font-sans text-sm outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Organization <span className="text-muted-foreground/50">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Holy Cross of Davao College"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">
                    Your message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    rows={4}
                    placeholder="What was it like working with me?"
                    className="w-full border border-border bg-background px-4 py-3 font-sans text-sm outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                {status === "duplicate" && (
                  <div className="flex items-center gap-2 font-sans text-xs text-amber-600">
                    <XCircle className="h-4 w-4" /> A testimonial from this name already exists.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 font-sans text-xs text-destructive">
                    <XCircle className="h-4 w-4" /> {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase bg-foreground text-background px-6 py-3 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                >
                  <Send className="h-3.5 w-3.5" />
                  {status === "sending" ? "Submitting…" : "Submit"}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
