import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles, tutorials, and notes — coming soon.",
};

export default function BlogPage() {
  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="Blog"
        title="Notes & writing"
        description="Tutorials, project write-ups, and lessons learned. Coming soon."
      />

      <div className="max-w-3xl mx-auto">
        <Card className="border-dashed">
          <CardContent className="p-10 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Coming soon</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              This is a placeholder for a future blog. The data model, layout,
              and routing are all wired up — just add posts when you&apos;re
              ready.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">MDX-ready</Badge>
              <Badge variant="secondary">SEO friendly</Badge>
              <Badge variant="secondary">Dark mode</Badge>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-1 mt-6 text-sm text-primary hover:underline"
            >
              Back home
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
