import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react";
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
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link
              href="/"
              className="text-xl font-bold tracking-tight"
              aria-label="Home"
            >
              {siteConfig.name}
              <span className="text-primary">.</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              {siteConfig.bio}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Sitemap</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground animated-underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-foreground animated-underline">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-foreground animated-underline">
                  Resume
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground animated-underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <ul className="flex flex-wrap gap-2">
              {siteConfig.social.map((item) => {
                const Icon = iconMap[item.icon] ?? Mail;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={item.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            using Next.js, TypeScript, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
