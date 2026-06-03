import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/animated";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A searchable gallery of my projects — web apps, AI experiments, IoT systems, and academic work.",
};

export default function ProjectsPage() {
  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="Projects"
        title="Things I have built"
        description="Filter by category or search by name, technology, or description."
      />
      <ProjectsExplorer />
    </Section>
  );
}
