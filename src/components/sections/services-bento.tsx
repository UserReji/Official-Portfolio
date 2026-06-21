"use client";

import { motion } from "framer-motion";
import { Code2, Server, Cpu, Brain, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import type { LucideIcon } from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  /** tailwind class controlling bento cell size on lg+ */
  span: string;
  /** ambient background tint per card */
  accent: string;
}

const services: Service[] = [
  {
    icon: Code2,
    title: "Frontend Engineering",
    description:
      "Editorial interfaces with React, Next.js, and motion. Pixel-precise, performant, and built to feel as good as they look.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    span: "lg:col-span-7 lg:row-span-2",
    accent: "from-primary/[0.08] via-transparent to-transparent",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    description:
      "Laravel, Node, and FastAPI services with proper auth, caching, and clean data models.",
    tags: ["Laravel", "Node.js", "REST", "PostgreSQL"],
    span: "lg:col-span-5 lg:row-span-1",
    accent: "from-primary/[0.06] via-transparent to-transparent",
  },
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Practical ML — TensorFlow, OpenCV, YOLO — wired into real products, not toy demos.",
    tags: ["Python", "TensorFlow", "YOLO", "OpenCV"],
    span: "lg:col-span-5 lg:row-span-1",
    accent: "from-primary/[0.06] via-transparent to-transparent",
  },
  {
    icon: Cpu,
    title: "IoT & Embedded",
    description:
      "ESP32 firmware with LVGL touchscreens and BLE companion apps — built for users, not just engineers.",
    tags: ["ESP32", "C++", "LVGL", "BLE"],
    span: "lg:col-span-7 lg:row-span-1",
    accent: "from-primary/[0.08] via-transparent to-transparent",
  },
];

function BentoCard({ service, i }: { service: Service; i: number }) {
  const Icon = service.icon;
  const isLarge = service.span.includes("row-span-2");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className={`group relative col-span-1 overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-colors duration-500 ${service.span}`}
    >
      {/* Ambient tint */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} pointer-events-none`} />

      {/* Animated grid texture on hover */}
      <div className="absolute inset-0 bg-grid opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />

      <div className={`relative h-full flex flex-col p-8 ${isLarge ? "lg:p-10" : ""}`}>
        {/* Icon + arrow */}
        <div className="flex items-start justify-between mb-8">
          <div className="inline-flex h-11 w-11 items-center justify-center border border-primary/30 text-primary bg-background/50 backdrop-blur transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
            <Icon className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all duration-500 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Title */}
        <h3
          className={`font-serif font-light text-foreground mb-3 leading-tight ${
            isLarge ? "text-3xl lg:text-4xl" : "text-xl lg:text-2xl"
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className={`font-sans text-muted-foreground leading-relaxed mb-6 ${isLarge ? "text-base max-w-md" : "text-sm"}`}>
          {service.description}
        </p>

        {/* Spacer pushes tags to bottom */}
        <div className="flex-1" />

        {/* Tags — appear as glass chips */}
        <div className="flex flex-wrap gap-1.5">
          {service.tags.map((t) => (
            <span
              key={t}
              className="font-sans text-[clamp(0.6875rem,0.55rem+0.55vw,0.8rem)] tracking-[0.08em] uppercase text-muted-foreground border border-border/60 px-2 py-0.5 bg-background/40 backdrop-blur-sm transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesBento() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What I Do"
        title="A few things I'm good at"
        lines={[
          { text: "Mostly web — but I keep wandering into AI and IoT territory.", variant: "sub" },
          { text: "Here's the short version of where I can help.", variant: "sub" },
        ]}
      />

      {/* 12-col gapless bento, row 1 = 7+5, row 2 = 5+7. Sums to 12 → zero gaps. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-4 auto-rows-[minmax(240px,auto)] grid-flow-dense">
        {services.map((s, i) => (
          <BentoCard key={s.title} service={s} i={i} />
        ))}
      </div>
    </Section>
  );
}