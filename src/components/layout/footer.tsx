import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-4" aria-label="Home">
              <span className="font-serif text-2xl font-light text-foreground tracking-wide">
                Robert <em className="text-primary">John.</em>
              </span>
            </Link>
            <p className="font-sans text-xs leading-relaxed text-muted-foreground max-w-xs">
              {siteConfig.bio}
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-muted-foreground mb-5">Sitemap</h3>
            <ul className="space-y-3">
              {["/about", "/projects", "/resume", "/certifications", "/contact"].map((href) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-foreground/60 hover:text-primary animated-underline transition-colors"
                  >
                    {href.replace("/", "").replace(/(^\w)/, (c) => c.toUpperCase())}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase text-muted-foreground mb-5">Connect</h3>
            <ul className="space-y-3 mb-6">
              {siteConfig.social.map((item) => {
                const Icon = iconMap[item.icon] ?? Mail;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2.5 font-sans text-sm text-foreground/60 hover:text-primary transition-colors"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.handle || item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-muted-foreground">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-serif italic text-muted-foreground/50 text-sm">
            crafted with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
