"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Quote, Send, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import type { Testimonial } from "@/types";
import { useState, useEffect } from "react";

const EMPTY = { name: "", role: "", company: "", content: "" };

export function TestimonialsSection({ items: initial }: { items: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Keep in sync if the server re-renders with new data
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

      if (res.status === 409) {
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }

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
    <div className="max-w-5xl mx-auto space-y-10">

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence initial={false}>
          {items.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <figcaption className="mt-4 pt-4 border-t border-border/50">
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">
                  {t.role}{t.company ? ` · ${t.company}` : ""}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <div className="flex justify-center">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-emerald-500 font-medium"
          >
            <CheckCircle2 className="h-4 w-4" />
            Thanks! Your testimonial has been added.
          </motion.div>
        ) : (
          <button
            onClick={() => {
              setShowForm((v) => !v);
              setStatus("idle");
              setErrorMsg("");
            }}
            className="flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-primary/50 hover:bg-muted transition"
          >
            {showForm ? (
              <>
                <ChevronUp className="h-4 w-4" /> Cancel
              </>
            ) : (
              <>
                <Send className="h-4 w-4" /> Leave a testimonial
              </>
            )}
          </button>
        )}
      </div>

      {/* Submission form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-border bg-card p-6 max-w-2xl mx-auto">
              <h3 className="font-semibold text-lg mb-1">Leave a testimonial</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Worked with me? I&apos;d love to hear what you thought.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Your name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      placeholder="e.g. Juan Dela Cruz"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Role / Relation <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value })}
                      required
                      placeholder="e.g. Classmate, Professor"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Organization <span className="text-xs text-muted-foreground/60">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Holy Cross of Davao College"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                    Your message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    rows={4}
                    placeholder="What was it like working with me?"
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-none"
                  />
                </div>

                {/* Error / duplicate messages */}
                {status === "duplicate" && (
                  <div className="flex items-center gap-2 text-sm text-amber-500">
                    <XCircle className="h-4 w-4 shrink-0" />
                    A testimonial from this name already exists.
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-500">
                    <XCircle className="h-4 w-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <Send className="h-4 w-4" />
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
