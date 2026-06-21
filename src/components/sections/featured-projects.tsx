"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, Github } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/animated";

/**
 * Spotlight panel — a project "stage" that follows the cursor.
 * Uses a soft radial light + decorative grid texture behind the project number
 * to give the hero card cinematic depth without rebuilding layout.
 */
function SpotlightPanel({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });

  // Soft conic that drifts subtly with the cursor (motion value, not state)
  const spotlightX = useTransform(sx, (v) => `${v}%`);
  const spotlightY = useTransform(sy, (v) => `${v}%`);
  const spotlightBg = useTransform(
    [spotlightX, spotlightY] as [typeof spotlightX, typeof spotlightY],
    ([x, y]) =>
      `radial-gradient(circle 220px at ${x} ${y}, hsl(var(--primary) / 0.18), transparent 70%)`
  );

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="relative h-56 lg:h-80 overflow-hidden bg-muted"
    >
      {/* Animated grid texture — uses theme-aware token from globals.css */}
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Soft radial wash that follows the cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotlightBg }}
      />

      {/* Static brand wash for low-end devices / no-hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

      {/* Corner index label */}
      <div className="absolute top-4 left-4 font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-muted-foreground">
        0{index} · Featured
      </div>

      {children}
    </div>
  );
}

/**
 * Compact card for supporting projects — adds a glass overlay
 * that slides up on hover revealing the tech stack.
 */
function ProjectMiniCard({
  project,
  index,
}: {
  project: ReturnType<typeof getFeaturedProjects>[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-colors duration-500 min-h-[260px]"
    >
      {/* Number watermark */}
      <div className="absolute top-4 right-5 font-serif text-[5rem] font-light text-muted/30 leading-none select-none pointer-events-none">
        0{index + 2}
      </div>

      <div className="p-8 flex flex-col h-full">
        <p className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-primary mb-3">
          {project.category}
        </p>
        <h3 className="font-serif text-2xl font-light text-foreground mb-3 max-w-[85%]">
          {project.title}
        </h3>
        <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
          {project.shortDescription}
        </p>

        {/* Glass overlay that slides up on hover — reveals full tech stack */}
        <div className="relative">
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.08em] uppercase text-muted-foreground bg-muted px-2 py-0.5"
              >
                {t}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.08em] uppercase text-primary">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          {/* Hidden tech chips — slide up on hover */}
          <div className="absolute inset-x-0 bottom-full pb-3 flex flex-wrap gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 pointer-events-none">
            {project.technologies.slice(3, 8).map((t) => (
              <span
                key={t}
                className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.08em] uppercase text-primary-foreground bg-primary/90 backdrop-blur px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] uppercase text-foreground hover:text-primary transition-colors"
          >
            View <ArrowRight className="h-3 w-3" />
          </Link>
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-3 w-3" /> Source
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const featured = getFeaturedProjects();
  const lead = featured[0];
  const rest = featured.slice(1);

  return (
    <Section id="featured-projects" className="bg-muted/20">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects I'm proud of"
        lines={[
          { text: "Each one started as a problem worth solving — and I saw it through.", variant: "sub" },
          { text: "Click a project to read the full story, or jump to GitHub for the code.", variant: "sub" },
          { text: "MediWear is my personal favorite — give it a look.", variant: "hint" },
        ]}
      />

      <div className="space-y-2">
        {/* Lead project — full-width cinematic card */}
        {lead && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-colors duration-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Visual side — spotlight panel */}
              <SpotlightPanel index={1}>
                <span className="absolute inset-0 flex items-center justify-center font-serif text-[10rem] lg:text-[14rem] font-light text-primary/10 select-none group-hover:scale-110 transition-transform duration-700">
                  01
                </span>
              </SpotlightPanel>

              {/* Content side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center relative">
                <p className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-primary mb-3">
                  {lead.duration} · Team of {lead.teamSize}
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
                  {lead.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  {lead.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {lead.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.1em] uppercase text-muted-foreground border border-border/50 px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/projects/${lead.slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase text-foreground border border-foreground/30 px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    View Project <ArrowRight className="h-3 w-3" />
                  </Link>
                  {lead.githubUrl && (
                    <Link
                      href={lead.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" /> Source
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Remaining projects — 2 column grid with glass hover overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {rest.map((project, i) => (
            <ProjectMiniCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-muted-foreground border border-border px-8 py-3 hover:border-primary hover:text-primary transition-all duration-300"
        >
          View all projects <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </Section>
  );
}