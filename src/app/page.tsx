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
          lines={[
            { text: "I've picked these up through projects, late nights, and a lot of curiosity.", variant: "sub" },
            { text: "Some I know deeply, some I'm still exploring — always adding more.", variant: "sub" },
            { text: "hover a skill to see how far I've come with it.", variant: "hint" },
          ]}
        />
        <SkillsSection groups={skillGroups} />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Journey"
          title="Education, experience & milestones"
          lines={[
            { text: "Every semester, every project, every late night — it all counts.", variant: "sub" },
            { text: "Click any card to see the grades behind the GPA.", variant: "sub" },
            { text: "yes, I'm proud of them. 😄", variant: "hint" },
          ]}
        />
        <TimelineSection entries={timeline} />
      </Section>
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Kind Words"
          title="What people say about working with me"
          lines={[
            { text: "These are from people who've actually seen me work — no fluff.", variant: "sub" },
            { text: "Mentors, professors, teammates. I'm grateful for every one of them.", variant: "sub" },
            { text: "have something to say? feel free to leave one below.", variant: "hint" },
          ]}
        />
        <TestimonialsSection items={testimonials} />
      </Section>
    </>
  );
}
