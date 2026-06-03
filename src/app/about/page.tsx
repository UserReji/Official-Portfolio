import type { Metadata } from "next";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Code2,
  ArrowRight,
  Download,
  Cpu,
  Lightbulb,
  MapPin,
  Briefcase,
  Languages,
  Zap,
  TrendingUp,
  Heart,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/data/skills";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Robert John L. Aguio, a BSIT graduate from Holy Cross of Davao College with a passion for web development, AI, and IoT.",
};

const interests = [
  { icon: Code2,     label: "Full-Stack Web Dev" },
  { icon: Cpu,       label: "IoT & Embedded Systems" },
  { icon: Lightbulb, label: "AI & Computer Vision" },
  { icon: Target,    label: "Clean, Purposeful Code" },
];

const quickFacts = [
  { icon: MapPin,        label: "Based in",    value: "Davao City, Philippines" },
  { icon: GraduationCap, label: "Degree",      value: "BS Information Technology at HCDC" },
  { icon: Briefcase,     label: "OJT",         value: "486 hrs at the Office of the VPAA, HCDC (2026)" },
  { icon: TrendingUp,    label: "Avg. Grade",  value: "91 to 94% across all semesters" },
  { icon: Languages,     label: "Languages",   value: "English and Filipino" },
  { icon: Zap,           label: "Fun fact",    value: "Turns late-night ideas into working prototypes" },
];

const values = [
  {
    icon: Heart,
    title: "People before pixels",
    body: "I build for the person on the other end of the screen. Every decision I make, from layout to logic, starts with asking how this helps someone.",
  },
  {
    icon: TrendingUp,
    title: "Always finding a way to grow",
    body: "I started not knowing much and kept going anyway. Each semester, each project, each late night taught me something new. That drive has not slowed down.",
  },
  {
    icon: Target,
    title: "Finishing what I start",
    body: "I genuinely care about shipping. A working product in someone's hands means more to me than a perfect one still sitting in a branch.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-32">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">
            About Me
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Building <span className="text-gradient">useful things</span> with
            care and curiosity.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Hi, I&apos;m <span className="text-foreground font-medium">Robert John</span>, a
            freshly graduated BSIT student from{" "}
            <span className="text-foreground font-medium">Holy Cross of Davao College</span> in
            Davao City. I love building things on the web, from clean and thoughtful interfaces
            to the backend logic that holds everything together. I also find myself drawn to AI
            and IoT projects whenever curiosity gets the better of me. I recently wrapped up my
            486-hour practicum at the Office of the VPAA, working fully remotely and giving
            every task the same care I would give anything I am proud to put my name on.
          </p>
        </div>
      </Section>

      {/* Biography cards */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="Biography"
          title="A bit more about me"
          description="Personal, professional, and everything in between."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Educational Background
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                I studied BS in Information Technology at{" "}
                <span className="text-foreground font-medium">Holy Cross of Davao College</span>,
                where I kept my weighted averages between 90 and 94 percent across every semester,
                including a summer term. Not because I was chasing numbers, but because I genuinely
                wanted to understand what I was being taught.
              </p>
              <p>
                Along the way I worked through databases, networking, systems integration, HCI,
                information assurance, and two capstone projects. Each one added a layer to how
                I think about building software today.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                On-the-Job Training
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                I completed{" "}
                <span className="text-foreground font-medium">486 hours</span> of practicum
                under the Office of the Vice President for Academic Affairs at HCDC, from
                February to May 2026, fully remote.
              </p>
              <p>
                I was recognized for showing initiative, meeting every deadline, and delivering
                quality work with minimal supervision. That recognition meant a lot to me because
                it reflected how I naturally try to work, not how I performed under pressure.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Where I Am Headed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-2">
              <p>
                I want to be the kind of developer who makes teams better, not just the one who
                closes tickets. I am looking for a place where I can grow, contribute something
                real from the start, and work alongside people who care about what they build.
              </p>
              <p>
                Right now I am open to{" "}
                <span className="text-foreground font-medium">
                  junior developer roles and freelance work
                </span>{" "}
                where I can do exactly that.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Technical Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {interests.map((it) => {
                  const Icon = it.icon;
                  return (
                    <div
                      key={it.label}
                      className="flex items-center gap-2 rounded-md border border-border bg-background/50 p-3"
                    >
                      <Icon className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{it.label}</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                I am especially drawn to projects where web meets hardware or intelligence.
                IoT dashboards, AI-assisted tools, anything that solves a real problem and
                makes someone&apos;s life a little easier.
              </p>
            </CardContent>
          </Card>

        </div>
      </Section>

      {/* Quick Facts */}
      <Section>
        <SectionHeading
          eyebrow="At a Glance"
          title="Quick facts"
          description="The short version, for people in a hurry."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {quickFacts.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/40 transition-colors"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">{f.label}</p>
                  <p className="text-sm font-medium">{f.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-muted/30">
        <SectionHeading
          eyebrow="What I Believe"
          title="How I approach my work"
          description="The principles that guide how I build and how I show up for people."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Tech stack */}
      <Section>
        <SectionHeading
          eyebrow="Stack"
          title="Technologies I work with"
          description="Tools, languages, and frameworks that power the things I build."
        />
        <div className="space-y-8 max-w-5xl mx-auto">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg font-semibold">{group.category}</h3>
                {group.description && (
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {group.description}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((s) => (
                  <Badge key={s.name} variant="secondary" className="text-sm">
                    {s.name}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-muted/30">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to know more?
          </h2>
          <p className="text-muted-foreground mb-6">
            My resume has the full picture, or you can just reach out. I am always happy to talk.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="gradient" size="lg">
              <Link href="/resume">
                View Resume
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="lg">
              <a href={siteConfig.resumeUrl} download>
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
