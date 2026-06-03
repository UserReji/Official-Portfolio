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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Tabs */}
      <div className="lg:col-span-1 flex flex-col gap-2">
        {groups.map((group, i) => (
          <button
            key={group.category}
            onClick={() => setActive(i)}
            className={`text-left rounded-lg p-4 transition-all border ${
              active === i
                ? "border-primary bg-primary/5 shadow-sm"
                : "border-border hover:border-primary/30 hover:bg-muted/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{group.category}</h3>
              <span className="text-xs text-muted-foreground">
                {group.skills.length}
              </span>
            </div>
            {group.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {group.description}
              </p>
            )}
          </button>
        ))}
      </div>

      {/* Animated skill bars */}
      <div className="lg:col-span-2">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {current.skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className="rounded-lg border border-border bg-card p-4 hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-xs text-muted-foreground">
                  {skill.level}/5
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(skill.level / 5) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
