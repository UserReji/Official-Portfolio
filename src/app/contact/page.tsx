import type { Metadata } from "next";
import { Mail, Github, Linkedin, Twitter, MapPin, Clock } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/animated";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for internships, freelance work, or collaboration opportunities.",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export default function ContactPage() {
  const mainLinks = siteConfig.social;

  return (
    <Section className="pt-32">
      <SectionHeading
        eyebrow="Contact"
        title="Let&apos;s build something great"
        description="Have an opportunity, project idea, or just want to say hello? Drop me a message."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {/* Form */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6 md:p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Direct channels</h3>
              <ul className="space-y-3">
                {mainLinks.map((s) => {
                  const Icon = iconMap[s.icon] ?? Mail;
                  return (
                    <li key={s.name}>
                      <a
                        href={s.url}
                        target={s.url.startsWith("http") ? "_blank" : undefined}
                        rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-3 rounded-md p-2.5 -mx-2.5 hover:bg-muted transition-colors group"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground truncate">
                            {s.handle}
                          </div>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {siteConfig.location}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Response within 24–48 hours
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </Section>
  );
}
