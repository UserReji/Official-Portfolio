"use client";

import * as React from "react";
import { Download, FileText, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

/**
 * Renders an embedded resume (PDF) with download/open actions.
 * Uses an iframe for native PDF rendering — no extra dependencies.
 * If the file is missing, shows a placeholder.
 */
export function ResumeViewer({ src }: { src: string }) {
  const [status, setStatus] = React.useState<"loading" | "ok" | "missing">(
    "loading"
  );

  React.useEffect(() => {
    // HEAD check to gracefully handle a missing PDF
    fetch(src, { method: "HEAD" })
      .then((r) => setStatus(r.ok ? "ok" : "missing"))
      .catch(() => setStatus("missing"));
  }, [src]);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileText className="h-4 w-4 text-primary" />
          <span>Resume preview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <a href={src} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
          </Button>
          <Button asChild variant="gradient" size="sm">
            <a href={src} download>
              <Download className="h-3.5 w-3.5" />
              Download
            </a>
          </Button>
        </div>
      </div>

      {/* Viewer / placeholder */}
      <div className="relative aspect-[1/1.3] md:aspect-[16/10] bg-muted/30">
        {status === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        {status === "ok" && (
          <iframe
            src={`${src}#zoom=page-width&toolbar=0`}
            title={`${siteConfig.name} — Resume`}
            className="w-full h-full"
            loading="lazy"
          />
        )}
        {status === "missing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="font-semibold">Resume PDF not found</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-md">
              Place your resume file at{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted text-foreground">
                public{src}
              </code>{" "}
              and refresh.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <a href={src} target="_blank" rel="noopener noreferrer">
                Try opening anyway
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
