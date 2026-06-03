"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/data/projects";
import { Section, SectionHeading } from "@/components/ui/animated";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <Section id="featured-projects" className="bg-muted/30">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects I'm proud of"
        description="A selection of projects that showcase my skills across web development, AI, and IoT."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <div className="flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/projects">
            View all projects
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
