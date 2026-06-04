"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Award, Briefcase, GraduationCap, Trophy, TrendingUp } from "lucide-react";
import type { TimelineEntry } from "@/types";
import { formatDate } from "@/lib/utils";
import { useState } from "react";

const iconMap = {
  education: GraduationCap,
  experience: Briefcase,
  achievement: Trophy,
  certification: Award,
};

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
      {/* Vertical line */}
      <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/60 to-transparent md:-translate-x-px" />

      <div className="space-y-4">
        {entries.map((entry, i) => {
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
                      <span className="font-sans text-[10px] tracking-[0.14em] uppercase text-muted-foreground block mb-1">
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
                        <p className="font-sans text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
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
