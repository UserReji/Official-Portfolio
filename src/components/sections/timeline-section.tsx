"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, GraduationCap, Trophy } from "lucide-react";
import type { TimelineEntry } from "@/types";
import { calculateDuration, formatDate } from "@/lib/utils";

const iconMap = {
  education: GraduationCap,
  experience: Briefcase,
  achievement: Trophy,
  certification: Award,
};

const colorMap = {
  education: "from-blue-600 to-cyan-500",
  experience: "from-purple-600 to-pink-500",
  achievement: "from-amber-500 to-orange-500",
  certification: "from-emerald-500 to-teal-500",
};

export function TimelineSection({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-1/2" />

      <div className="space-y-12">
        {entries.map((entry, i) => {
          const Icon = iconMap[entry.type];
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                isLeft ? "" : "md:[direction:rtl]"
              }`}
            >
              {/* Icon dot */}
              <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${colorMap[entry.type]} text-white shadow-lg ring-4 ring-background`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              {/* Card */}
              <div
                className={`pl-12 md:pl-0 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                }`}
              >
                <div
                  className={`inline-block rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow ${
                    isLeft ? "md:text-left" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>
                      {formatDate(entry.startDate, { month: "short", year: "numeric" })}
                      {" — "}
                      {entry.endDate
                        ? formatDate(entry.endDate, { month: "short", year: "numeric" })
                        : "Present"}
                    </span>
                    <span>•</span>
                    <span>{calculateDuration(entry.startDate, entry.endDate)}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{entry.title}</h3>
                  <p className="text-sm text-primary font-medium">
                    {entry.organization}
                    {entry.location && ` · ${entry.location}`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {entry.description}
                  </p>
                  {entry.gpa && (
                    <p className="text-xs mt-2 inline-block px-2 py-1 rounded bg-primary/10 text-primary">
                      GPA: {entry.gpa}
                    </p>
                  )}
                  {entry.highlights && entry.highlights.length > 0 && (
                    <ul
                      className={`mt-3 space-y-1 text-sm text-muted-foreground ${
                        isLeft ? "md:text-left" : ""
                      }`}
                    >
                      {entry.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2">
                          <span className="text-primary mt-1">▹</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Spacer for the other side */}
              <div className="hidden md:block" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
