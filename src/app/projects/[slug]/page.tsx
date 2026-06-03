import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Github,
  ExternalLink,
  Users,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Wrench,
} from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, calculateDuration } from "@/lib/utils";
import { ProjectCard } from "@/components/projects/project-card";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [project.image],
    },
  };
}

const categoryLabels: Record<string, string> = {
  "web-development": "Web Development",
  ai: "AI",
  iot: "IoT",
  academic: "Academic",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 3);

  return (
    <article className="pt-28 pb-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Button asChild variant="ghost" size="sm" className="mb-6">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4" />
            Back to all projects
          </Link>
        </Button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="gradient" className="capitalize">
              {categoryLabels[project.category]}
            </Badge>
            {project.featured && (
              <Badge variant="glass">
                <Sparkles className="h-3 w-3 mr-1 text-yellow-400" />
                Featured
              </Badge>
            )}
            <Badge variant="outline" className="capitalize">
              {project.status.replace("-", " ")}
            </Badge>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(project.startDate, { month: "short", year: "numeric" })}
              {project.endDate &&
                ` — ${formatDate(project.endDate, { month: "short", year: "numeric" })}`}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {calculateDuration(project.startDate, project.endDate)}
            </span>
            {project.teamSize && (
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {project.teamSize === 1
                  ? "Solo project"
                  : `Team of ${project.teamSize}`}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button asChild variant="gradient" size="lg">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" size="lg">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View source
                </a>
              </Button>
            )}
          </div>
        </div>

        {/* Cover image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-muted mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                Key Features
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-primary mt-1">▹</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.challenges && project.challenges.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  Challenges
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  {project.challenges.map((c) => (
                    <li key={c} className="flex items-start gap-2">
                      <span className="text-amber-500 mt-1">▹</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {project.learnings && project.learnings.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  What I learned
                </h2>
                <ul className="space-y-2 text-muted-foreground">
                  {project.learnings.map((l) => (
                    <li key={l} className="flex items-start gap-2">
                      <span className="text-purple-500 mt-1">▹</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Wrench className="h-4 w-4" />
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {project.role && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">My Role</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {project.role}
                </CardContent>
              </Card>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Highlights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <span className="text-primary mt-1">★</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-6">Related projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
