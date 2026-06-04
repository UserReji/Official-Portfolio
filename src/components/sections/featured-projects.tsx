"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { getFeaturedProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/animated";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

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
        {/* Featured first project — full width */}
        {featured[0] && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden border border-border/50 bg-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Visual side */}
              <div className="relative h-56 lg:h-80 bg-muted flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
                <span className="font-serif text-[8rem] font-light text-primary/10 select-none group-hover:scale-110 transition-transform duration-700">
                  01
                </span>
                <div className="absolute bottom-4 left-4 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {featured[0].category} · Featured
                </div>
              </div>
              {/* Content side */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
                  {featured[0].duration} · Team of {featured[0].teamSize}
                </p>
                <h3 className="font-serif text-3xl lg:text-4xl font-light text-foreground mb-4">
                  {featured[0].title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6">
                  {featured[0].shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {featured[0].technologies.slice(0, 5).map((t) => (
                    <span key={t} className="font-sans text-[10px] tracking-[0.1em] uppercase text-muted-foreground border border-border/50 px-2.5 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/projects/${featured[0].slug}`}
                    className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.12em] uppercase text-foreground border border-foreground/30 px-5 py-2.5 hover:bg-foreground hover:text-background transition-all duration-300"
                  >
                    View Project <ArrowRight className="h-3 w-3" />
                  </Link>
                  {featured[0].githubUrl && (
                    <Link href={featured[0].githubUrl} target="_blank" rel="noopener noreferrer"
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

        {/* Remaining projects — 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-colors duration-500"
            >
              {/* Number watermark */}
              <div className="absolute top-4 right-5 font-serif text-[5rem] font-light text-muted/30 leading-none select-none">
                0{i + 2}
              </div>
              <div className="p-8 flex flex-col h-full min-h-[260px]">
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-primary mb-3">
                  {project.category}
                </p>
                <h3 className="font-serif text-2xl font-light text-foreground mb-3 max-w-[85%]">
                  {project.title}
                </h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {project.shortDescription}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.slice(0, 4).map((t) => (
                    <span key={t} className="font-sans text-[10px] tracking-[0.08em] uppercase text-muted-foreground bg-muted px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 font-sans text-xs tracking-[0.1em] uppercase text-foreground hover:text-primary transition-colors"
                  >
                    View <ArrowRight className="h-3 w-3" />
                  </Link>
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-sans text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-3 w-3" /> Source
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
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
