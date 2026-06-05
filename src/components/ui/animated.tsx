"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/* ───────────────────────────────────────────────────────────────
   Multi-line scroll-triggered typewriter
─────────────────────────────────────────────────────────────── */

const CHAR_DELAY   = 36;   // ms per character typed
const LINE_GAP     = 420;  // ms pause before next line starts

export type TypeLine = {
  text: string;
  /** visual style of this line */
  variant?: "title" | "sub" | "hint";
};

/**
 * Renders a sequence of lines that type themselves in order
 * once the element scrolls into view. Each line appears below
 * the previous; the blinking cursor moves with the active line
 * and disappears when the last line finishes.
 */
export function TypewriterBlock({
  lines,
  className,
  align = "center",
}: {
  lines: TypeLine[];
  className?: string;
  align?: "left" | "center";
}) {
  const ref   = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Which line is actively being typed (null = not started yet)
  const [activeIdx, setActiveIdx] = React.useState<number | null>(null);
  // How many chars of the active line are shown
  const [charCount, setCharCount]  = React.useState(0);
  // Lines that are fully done
  const [doneLines, setDoneLines]  = React.useState<number[]>([]);

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

  React.useEffect(() => {
    if (!inView) return;
    // Kick off first line after a short settle
    timerRef.current = setTimeout(() => setActiveIdx(0), 200);
    return clear;
  }, [inView]);

  React.useEffect(() => {
    if (activeIdx === null) return;
    const line = lines[activeIdx];
    if (!line) return;

    if (charCount < line.text.length) {
      // Still typing this line
      timerRef.current = setTimeout(() => setCharCount(c => c + 1), CHAR_DELAY);
    } else {
      // Line finished — mark done
      setDoneLines(d => [...d, activeIdx]);
      const next = activeIdx + 1;
      if (next < lines.length) {
        // Start next line after gap
        timerRef.current = setTimeout(() => {
          setCharCount(0);
          setActiveIdx(next);
        }, LINE_GAP);
      }
      // else: all done, cursor disappears naturally
    }
    return clear;
  }, [activeIdx, charCount, lines]);

  const isAllDone = doneLines.length === lines.length;

  return (
    <div
      ref={ref}
      className={cn(
        "space-y-1",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {lines.map((line, i) => {
        const isActive = activeIdx === i;
        const isDone   = doneLines.includes(i);
        const visible  = isActive || isDone;
        const text     = isDone ? line.text : isActive ? line.text.slice(0, charCount) : "";

        return (
          <div
            key={i}
            className={cn(
              "transition-opacity duration-300",
              visible ? "opacity-100" : "opacity-0",
              // reserve space for lines not yet started so layout doesn't jump
              !visible && "h-0 overflow-hidden"
            )}
          >
            <LineText
              variant={line.variant ?? "sub"}
              text={text}
              showCursor={isActive && !isAllDone}
            />
          </div>
        );
      })}
    </div>
  );
}

function LineText({
  variant,
  text,
  showCursor,
}: {
  variant: TypeLine["variant"];
  text: string;
  showCursor: boolean;
}) {
  const base = "font-sans leading-snug";

  const styles: Record<NonNullable<TypeLine["variant"]>, string> = {
    title: cn(base, "font-serif font-light text-foreground"),
    sub:   cn(base, "text-sm text-muted-foreground"),
    hint:  cn(base, "text-xs tracking-[0.1em] text-primary/70 italic"),
  };

  return (
    <span className={styles[variant ?? "sub"]}>
      {text}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.48, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] bg-primary ml-[2px] align-middle"
          style={{ height: "0.8em", transform: "translateY(-1px)" }}
        />
      )}
    </span>
  );
}

/* ───────────────────────────────────────────────────────────────
   Core layout exports (API unchanged)
─────────────────────────────────────────────────────────────── */

export function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, delay: delay / 1000, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function Section({
  children,
  className,
  id,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32 px-6 sm:px-10 lg:px-16 relative overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="container mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

/**
 * Drop-in replacement — same props as before.
 * `lines` is optional; if omitted the heading renders as before
 * (title is still typed, description fades in).
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  lines,
  className,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Extra conversational lines typed beneath the title */
  lines?: TypeLine[];
  className?: string;
  align?: "left" | "center";
}) {
  // Build the full typed sequence:
  // 1. The main title (always)
  // 2. Any extra lines passed in
  const allLines: TypeLine[] = [
    { text: title, variant: "title" },
    ...(lines ?? []),
  ];

  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        align === "center" ? "text-center mx-auto" : "text-left",
        "max-w-3xl",
        className
      )}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-xs tracking-[0.22em] uppercase text-primary mb-5 label-line"
        >
          {eyebrow}
        </motion.p>
      )}

      {/* Typewriter block — title + conversational lines */}
      <TypewriterBlock
        lines={allLines}
        align={align}
        className={cn(
          "mb-4",
          // give the title the right size
          "[&>div:first-child]:text-[clamp(2.25rem,1.8rem+1.85vw,2.7rem)] [&>div:first-child]:leading-[1.05] [&>div:first-child]:mb-3"
        )}
      />

      {/* Static description — fades in last */}
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
