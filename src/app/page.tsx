import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { SkillsSection } from "@/components/sections/skills-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { Section, SectionHeading } from "@/components/ui/animated";
import { skillGroups } from "@/data/skills";
import { timeline } from "@/data/timeline";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Home",
  description:
    "IT student and software developer crafting modern web, AI, and IoT products. Browse projects, skills, and ways to get in touch.",
};

export default function HomePage() {
  const raw = fs.readFileSync(path.join(process.cwd(), "src/data/testimonials.json"), "utf-8");
  const testimonials = JSON.parse(raw);

  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <Section>
        <SectionHeading
          eyebrow="Tech Stack"
          title="Skills & technologies I work with"
          description="A blend of frontend, backend, and emerging tech — constantly expanding as I learn."
        />
        <SkillsSection groups={skillGroups} />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Journey"
          title="Education, experience & milestones"
          description="A timeline of the work, study, and achievements that have shaped my career so far."
        />
        <TimelineSection entries={timeline} />
      </Section>
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Kind Words"
          title="What people say about working with me"
          description="Testimonials from mentors, professors, and teammates I have had the privilege of working with."
        />
        <TestimonialsSection items={testimonials} />
      </Section>
    </>
  );
}
