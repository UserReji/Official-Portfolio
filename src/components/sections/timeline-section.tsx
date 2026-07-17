"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, GraduationCap, Star, Trophy, TrendingUp } from "lucide-react";
import type { TimelineEntry } from "@/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

const iconMap = {
  education: GraduationCap,
  experience: Briefcase,
  achievement: Trophy,
  certification: Award,
};

/** True for entries that should be rendered as a grand, centered milestone card. */
function isGraduationMilestone(entry: TimelineEntry): boolean {
  return entry.id.startsWith("milestone-graduation");
}

function gradeColor(raw: string): string {
  const n = parseFloat(raw);
  if (isNaN(n)) return "text-muted-foreground";
  if (n <= 1.5) return "text-emerald-500";
  if (n <= 2.0) return "text-primary";
  if (n <= 2.5) return "text-amber-500";
  return "text-orange-500";
}

function parseGrades(highlights: string[] = []) {
  return highlights.map((h) => {
    const match = h.match(/^(.+?)\s*—\s*Final Grade:\s*([\d.]+)$/);
    if (!match) return { subject: h, grade: null };
    return { subject: match[1].trim(), grade: match[2] };
  });
}

export function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Vertical line — stronger middle so the thread doesn't disappear between cards */}
      <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px z-[1]" />

      <div className="space-y-4">
        {entries.map((entry, i) => {
          // Grand, centered milestone card — full width, celebratory treatment.
          if (isGraduationMilestone(entry)) {
            return <GraduationCard key={entry.id} entry={entry} index={i} />;
          }

          const Icon = iconMap[entry.type];
          const isLeft = i % 2 === 0;
          const isOpen = openId === entry.id;
          const hasGrades = entry.highlights?.some((h) => h.includes("Final Grade"));
          const grades = parseGrades(entry.highlights);

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-4 ${
                isLeft ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* Icon dot */}
              <div className="absolute left-[18px] md:left-1/2 top-3 -translate-x-1/2 z-10">
                <div className={`flex h-7 w-7 items-center justify-center border bg-background shadow-sm ring-2 ring-background transition-colors duration-300 ${
                  isOpen ? "border-primary text-primary" : "border-primary/40 text-primary/60"
                }`}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Card */}
              <div className={`pl-10 md:pl-0 ${
                isLeft ? "md:pr-8 md:[direction:ltr]" : "md:pl-8 md:[direction:ltr]"
              }`}>
                <button
                  onClick={() => hasGrades && setOpenId(isOpen ? null : entry.id)}
                  className={`w-full text-left border bg-card transition-all duration-300 ${
                    hasGrades ? "cursor-pointer" : "cursor-default"
                  } ${
                    isOpen
                      ? "border-primary/50"
                      : hasGrades
                      ? "border-border/50 hover:border-primary/30"
                      : "border-border/30"
                  }`}
                >
                  {/* Always-visible header */}
                  <div className="flex items-center justify-between gap-2 px-4 pt-4 pb-3">
                    <div className="flex-1 min-w-0">
                      <span className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.14em] uppercase text-muted-foreground block mb-1">
                        {formatDate(entry.startDate, { month: "short", year: "numeric" })}
                        {" — "}
                        {entry.endDate
                          ? formatDate(entry.endDate, { month: "short", year: "numeric" })
                          : "Present"}
                      </span>
                      <h3 className="font-serif text-base font-light text-foreground leading-snug">
                        {entry.title}
                      </h3>
                      {entry.gpa && (
                        <p className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] text-muted-foreground mt-0.5 flex items-center gap-1">
                          <TrendingUp className="h-2.5 w-2.5" />
                          {entry.gpa}
                        </p>
                      )}
                    </div>

                    {hasGrades && (
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-primary/60 text-lg leading-none shrink-0 ml-2 select-none"
                      >
                        +
                      </motion.span>
                    )}
                  </div>

                  {/* Expandable grades */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="grades"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/40 mx-4" />
                        <div className="px-4 pb-4 pt-3 space-y-0">
                          {grades.map(({ subject, grade }, j) => (
                            <motion.div
                              key={j}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.05, duration: 0.3 }}
                              className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-primary/60 text-xs">▹</span>
                                <span className="font-sans text-sm text-foreground/80">{subject}</span>
                              </div>
                              {grade && (
                                <span className={`font-serif text-lg font-light leading-none ${gradeColor(grade)}`}>
                                  {grade}
                                </span>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* Spacer */}
              <div className="hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * GraduationCard — grand, centered milestone layout used for the graduation
 * entry. Breaks the alternating left/right pattern to feel like a culmination,
 * with a larger star icon, accent ring, and serif headline.
 */
function GraduationCard({
  entry,
  index,
}: {
  entry: TimelineEntry;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center text-center pt-10 pb-4"
    >
      {/* Star icon — sits on the timeline line so the vertical thread isn't broken */}
      <div className="absolute left-[18px] md:left-1/2 top-3 -translate-x-1/2 z-20">
        <div className="relative flex h-10 w-10 items-center justify-center border-2 border-primary bg-background shadow-md ring-4 ring-background">
          <Star className="h-4 w-4 text-primary" fill="currentColor" />
          {/* Subtle outer glow that echoes the cursor spotlight treatment */}
          <span
            aria-hidden
            className="absolute inset-0 -z-10 blur-md"
            style={{
              background:
                "radial-gradient(circle, hsl(28 32% 32% / 0.35), transparent 70%)",
            }}
          />
        </div>
      </div>

      {/* Date eyebrow — pl-14 (56px) clears the 40px icon + 16px breathing room on mobile */}
      <span className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-primary mb-3 pl-14 md:pl-0 mt-5">
        {formatDate(entry.startDate, { day: "numeric", month: "long", year: "numeric" })}
      </span>

      {/* Headline */}
      <h3 className="font-serif text-3xl md:text-4xl font-light text-foreground leading-tight max-w-xl pl-14 md:pl-0">
        {entry.title}
      </h3>

      {/* Organization */}
      {entry.organization && (
        <p className="font-sans text-sm tracking-wide text-muted-foreground mt-2 pl-14 md:pl-0">
          {entry.organization}
          {entry.location ? ` · ${entry.location}` : ""}
        </p>
      )}

      {/* Description — slightly larger than regular cards */}
      {entry.description && (
        <p className="font-serif text-base md:text-lg font-light italic text-foreground/80 mt-5 max-w-lg leading-relaxed pl-14 md:pl-0">
          {entry.description}
        </p>
      )}

      {/* Decorative accent line under the card */}
      <div className="mt-8 flex items-center gap-3 text-primary/40 pl-14 md:pl-0">
        <span className="h-px w-10 bg-primary/30" />
        <span className="text-xs tracking-[0.3em] uppercase">End of Chapter</span>
        <span className="h-px w-10 bg-primary/30" />
      </div>
    </motion.div>
  );
}
