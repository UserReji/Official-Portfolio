"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  "web-development": "Web Development",
  ai: "AI",
  iot: "IoT",
  academic: "Academic",
};

const categoryGradients: Record<string, string> = {
  "web-development": "from-blue-600 to-cyan-500",
  ai: "from-purple-600 to-pink-500",
  iot: "from-emerald-500 to-teal-500",
  academic: "from-amber-500 to-orange-500",
};

export function ProjectCard({
  project,
  index = 0,
  className,
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className={cn("h-full", className)}
    >
      <Card className="group h-full overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
        {/* Image / Cover */}
        <div className="relative aspect-video overflow-hidden bg-muted">
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-30 transition-opacity",
              categoryGradients[project.category]
            )}
          />
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {project.featured && (
            <div className="absolute top-3 right-3">
              <Badge variant="gradient" className="shadow-md">
                <Star className="h-3 w-3 mr-1 fill-current" />
                Featured
              </Badge>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="glass" className="capitalize">
              {categoryLabels[project.category]}
            </Badge>
          </div>
        </div>

        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {project.shortDescription}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2">
          <Button asChild variant="ghost" size="sm" className="px-2">
            <Link href={`/projects/${project.slug}`}>
              Details
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </Button>
          <div className="flex items-center gap-1">
            {project.githubUrl && (
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Live demo"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
