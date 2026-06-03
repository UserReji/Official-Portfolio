"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { ProjectCard } from "@/components/projects/project-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectsExplorer() {
  const [query, setQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState<string>("all");
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = React.useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory =
        activeCategory === "all" || p.category === activeCategory;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.technologies.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  return (
    <div>
      {/* Search & filters bar */}
      <div className="sticky top-20 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto max-w-6xl flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects, technologies, descriptions…"
                className="pl-9 pr-9"
                aria-label="Search projects"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters((v) => !v)}
              aria-label="Toggle filters"
              className="md:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div
            className={cn(
              "flex flex-wrap items-center gap-2",
              !showFilters && "hidden md:flex"
            )}
          >
            {projectCategories.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium transition-colors border",
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-background/50 border-border hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Count + grid */}
      <div className="mt-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "project" : "projects"}
            {activeCategory !== "all" && (
              <>
                {" "}in{" "}
                <Badge variant="secondary" className="capitalize">
                  {activeCategory.replace("-", " ")}
                </Badge>
              </>
            )}
          </p>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl border border-dashed border-border p-12 text-center"
          >
            <p className="text-lg font-semibold mb-1">No projects found</p>
            <p className="text-sm text-muted-foreground">
              Try a different search term or category.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
              }}
            >
              Reset filters
            </Button>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  index={i}
                />
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
