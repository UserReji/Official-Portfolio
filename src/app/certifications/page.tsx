"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, BadgeCheck } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { certifications } from "@/data/certifications";
import { formatDate } from "@/lib/utils";

export default function CertificationsPage() {
  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="Certifications"
        title="Continuous learning"
        description="Industry-recognized credentials that complement my degree and project work."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Card
            key={cert.slug}
            className="group overflow-hidden hover:border-primary/40 hover:shadow-lg transition-all"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
              <Image
                src={cert.image}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="glass" className="backdrop-blur">
                  <BadgeCheck className="h-3 w-3 mr-1 text-emerald-500" />
                  Verified
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg leading-snug">
                {cert.title}
              </CardTitle>
              <CardDescription className="font-medium text-foreground/80">
                {cert.issuer}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cert.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {cert.description}
                </p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                Issued {formatDate(cert.issueDate, { year: "numeric", month: "long" })}
                {cert.expiryDate
                  ? ` · Expires ${formatDate(cert.expiryDate, { year: "numeric", month: "long" })}`
                  : cert.neverExpires
                  ? " · No expiration"
                  : ""}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cert.skills.slice(0, 4).map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">
                    {s}
                  </Badge>
                ))}
                {cert.skills.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{cert.skills.length - 4}
                  </Badge>
                )}
              </div>

              {cert.credentialUrl && (
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Verify credential
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
