"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Send, CheckCircle2, XCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/types";
import { useState, useEffect, useRef, useCallback } from "react";

const EMPTY = { name: "", role: "", company: "", content: "" };
const AUTO_ADVANCE_MS = 6000;
const SWIPE_THRESHOLD = 60;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialsSection({ items: initial }: { items: Testimonial[] }) {
  const [items, setItems] = useState<Testimonial[]>(initial);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "duplicate">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Carousel state — index of the centered card
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const dragX = useMotionValue(0);

  useEffect(() => { setItems(initial); }, [initial]);

  const total = items.length;
  const go = useCallback((next: number) => {
    setIndex(((next % total) + total) % total);
  }, [total]);
  const prev = useCallback(() => go(index - 1), [index, go]);
  const next = useCallback(() => go(index + 1), [index, go]);

  // Auto-advance
  useEffect(() => {
    if (paused || showForm || total < 2) return;
    const t = setTimeout(next, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [index, paused, showForm, total, next]);

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
      // Move carousel to the newly-added testimonial
      setIndex(total);
    } catch {
      setErrorMsg("Could not connect. Please try again.");
      setStatus("error");
    }
  }

  // Build absolute-positioned cards: [-1, 0, +1] around current index
  const offsets = [-1, 0, 1];

  function onDragEnd(_: unknown, info: PanInfo) {
    dragX.set(0);
    if (info.offset.x < -SWIPE_THRESHOLD) next();
    else if (info.offset.x > SWIPE_THRESHOLD) prev();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12">

      {/* ── 3D Carousel ────────────────────────────────────────────── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Edge fades — mask cards into the void */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Stage */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          style={{ x: dragX }}
          onDragEnd={onDragEnd}
          className="relative h-[360px] md:h-[380px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        >
          {offsets.map((offset) => {
            const i = ((index + offset) % total + total) % total;
            const item = items[i];
            if (!item) return null;

            const isCenter = offset === 0;
            const distance = Math.abs(offset);

            // 3D depth transforms
            const xPercent = offset === 0 ? 0 : offset < 0 ? -68 : 68;
            const rotateY = offset * -22;
            const scale = isCenter ? 1 : 0.78 - distance * 0.04;
            const opacity = isCenter ? 1 : 0.35 - distance * 0.05;
            const z = isCenter ? 10 : -distance * 10;

            return (
              <motion.div
                key={`${item.id}-${offset}`}
                initial={false}
                animate={{
                  x: `${xPercent}%`,
                  rotateY,
                  scale,
                  opacity: Math.max(opacity, 0),
                  z,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.6,
                }}
                style={{ transformPerspective: 1200 }}
                onClick={() => { if (!isCenter) go(index + offset); }}
                className={`absolute w-full max-w-xl ${isCenter ? "z-20" : "z-10"}`}
              >
                <div
                  className={`relative border bg-card/80 backdrop-blur-xl p-8 md:p-10 transition-colors duration-500 ${
                    isCenter
                      ? "border-primary/30 shadow-2xl shadow-primary/5"
                      : "border-border/40 cursor-pointer hover:border-border"
                  }`}
                >
                  {/* Massive open-quote watermark */}
                  <div className="font-serif text-7xl text-primary/15 leading-none mb-2 select-none">
                    &ldquo;
                  </div>

                  {/* Quote */}
                  <blockquote
                    className={`font-serif font-light italic leading-relaxed text-foreground/90 mb-8 transition-all duration-500 ${
                      isCenter ? "text-lg md:text-xl line-clamp-5" : "text-sm line-clamp-3 text-muted-foreground"
                    }`}
                  >
                    {item.content}
                  </blockquote>

                  {/* Attribution row */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/40">
                    {/* Avatar — initials in a glass circle */}
                    <div
                      className={`relative flex items-center justify-center rounded-full border border-primary/30 bg-background/70 backdrop-blur font-serif font-light text-primary transition-all duration-500 ${
                        isCenter ? "h-12 w-12 text-base" : "h-9 w-9 text-xs"
                      }`}
                    >
                      {initials(item.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div
                        className={`font-sans font-medium text-foreground truncate transition-all ${
                          isCenter ? "text-sm" : "text-xs"
                        }`}
                      >
                        {item.name}
                      </div>
                      <div
                        className={`font-sans text-muted-foreground truncate transition-all ${
                          isCenter ? "text-xs" : "text-[10px]"
                        }`}
                      >
                        {item.role}
                        {item.company ? ` · ${item.company}` : ""}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Controls */}
        {total > 1 && (
          <div className="flex items-center justify-between mt-10 px-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="group inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-px transition-all duration-500 ${
                    i === index ? "w-10 bg-primary" : "w-6 bg-border hover:bg-muted-foreground"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="group inline-flex h-10 w-10 items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── Toggle (form trigger) ───────────────────────────────────── */}
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

      {/* ── Form (unchanged behavior) ───────────────────────────────── */}
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
                    <label className="block font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.15em] uppercase text-muted-foreground mb-2">
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
                    <label className="block font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.15em] uppercase text-muted-foreground mb-2">
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
                  <label className="block font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.15em] uppercase text-muted-foreground mb-2">
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
                  <label className="block font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.15em] uppercase text-muted-foreground mb-2">
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