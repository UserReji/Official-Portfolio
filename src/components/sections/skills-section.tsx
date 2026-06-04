"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  groups: { category: string; description?: string; skills: Skill[] }[];
}

export function SkillsSection({ groups }: SkillsSectionProps) {
  const [active, setActive] = useState(0);
  const current = groups[active];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Category tabs */}
      <div className="lg:col-span-1 flex flex-col gap-0">
        {groups.map((group, i) => (
          <button
            key={group.category}
            onClick={() => setActive(i)}
            className={`text-left px-0 py-4 border-b border-border/40 transition-all duration-300 ${
              active === i ? "border-l-2 border-l-primary pl-4" : "pl-0 hover:pl-2"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className={`font-sans text-xs tracking-[0.12em] uppercase transition-colors ${
                active === i ? "text-primary" : "text-muted-foreground"
              }`}>{group.category}</h3>
              <span className="font-serif text-sm text-muted-foreground/60">
                {group.skills.length}
              </span>
            </div>
            {active === i && group.description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed"
              >
                {group.description}
              </motion.p>
            )}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div className="lg:col-span-3">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {current.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              className="group border border-border/50 bg-card hover:border-primary/30 transition-colors duration-300 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-sm text-foreground">{skill.name}</span>
                <span className="font-serif italic text-muted-foreground/60 text-sm">
                  {["—", "Basic", "Familiar", "Proficient", "Advanced", "Expert"][skill.level]}
                </span>
              </div>
              <div className="h-px bg-border overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.level / 5) * 100}%` }}
                  transition={{ duration: 0.9, ease: "easeOut", delay: i * 0.04 }}
                  className="h-full bg-primary"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
