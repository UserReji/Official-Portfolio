import type { Metadata } from "next";
import { Download, FileText, GraduationCap, Briefcase, Award, Sparkles } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { siteConfig } from "@/lib/site";
import { formatDate, calculateDuration } from "@/lib/utils";
import { ResumeViewer } from "@/components/resume-viewer";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "My professional resume — education, experience, skills, achievements, and a downloadable PDF.",
};

const skillLevelLabel: Record<number, string> = {
  1: "Beginner",
  2: "Basic",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

export default function ResumePage() {
  return (
    <>
      <Section className="pt-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Resume
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              My <span className="text-gradient">resume</span>
            </h1>
            <p className="mt-3 text-muted-foreground max-w-2xl">
              Education, experience, and skills — plus a downloadable PDF you
              can use for applications.
            </p>
          </div>
          <Button asChild variant="gradient" size="lg">
            <a href={siteConfig.resumeUrl} download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>

        <ResumeViewer src={siteConfig.resumeUrl} />
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Summary"
          title="Skills at a glance"
          description="A categorized overview of my technical skill set with self-rated levels."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillGroups.map((group) => (
            <Card key={group.category}>
              <CardHeader>
                <CardTitle>{group.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {group.skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium">{s.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {skillLevelLabel[s.level]}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full ${
                            i < s.level
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Experience & Education"
          title="Where I have been"
          description="A condensed view of my academic and professional journey."
        />
        <div className="max-w-3xl mx-auto space-y-4">
          {timeline
            .filter((t) => t.type === "education" || t.type === "experience")
            .map((entry) => {
              const Icon =
                entry.type === "education" ? GraduationCap : Briefcase;
              return (
                <Card key={entry.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="font-semibold">{entry.title}</h3>
                          <Badge variant="outline">
                            {formatDate(entry.startDate, { year: "numeric", month: "short" })}
                            {entry.endDate
                              ? ` — ${formatDate(entry.endDate, { year: "numeric", month: "short" })}`
                              : " — Present"}
                          </Badge>
                        </div>
                        <p className="text-sm text-primary font-medium">
                          {entry.organization}
                          {entry.location && ` · ${entry.location}`}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1.5">
                          {entry.description}
                        </p>
                        {entry.gpa && (
                          <Badge variant="glass" className="mt-2">
                            GPA: {entry.gpa}
                          </Badge>
                        )}
                        <p className="text-xs text-muted-foreground mt-2">
                          Duration: {calculateDuration(entry.startDate, entry.endDate)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </Section>

      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Achievements"
          title="Recognition & milestones"
          description="A few highlights from competitions, certifications, and beyond."
        />
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeline
            .filter((t) => t.type === "achievement" || t.type === "certification")
            .map((entry) => {
              const Icon = entry.type === "achievement" ? Sparkles : Award;
              return (
                <Card key={entry.id}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{entry.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {entry.organization}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(entry.startDate, { year: "numeric", month: "long" })}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </Section>
    </>
  );
}
