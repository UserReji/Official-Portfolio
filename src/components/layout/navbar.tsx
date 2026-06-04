"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => { setOpen(false); }, [pathname]);

  // Initials for the logo mark
  const initials = siteConfig.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label={`${siteConfig.name} — Home`}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center border border-primary/40 text-primary font-serif text-sm font-normal group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              {initials}
            </span>
            <span className="font-serif text-base font-light tracking-wide hidden sm:inline-block text-foreground/80 group-hover:text-foreground transition-colors">
              {siteConfig.name.split(" ").slice(0, 2).join(" ")}
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xs tracking-[0.15em] uppercase transition-colors font-sans",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="block h-px bg-primary mt-0.5"
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex text-xs tracking-[0.12em] uppercase font-sans font-normal border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
            >
              <Link href="/contact">Get in touch</Link>
            </Button>
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl"
          >
            <ul className="container mx-auto max-w-7xl px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block text-xs tracking-[0.15em] uppercase font-sans transition-colors",
                        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-2 border-t border-border/40">
                <Link
                  href="/contact"
                  className="inline-flex text-xs tracking-[0.12em] uppercase font-sans text-primary border border-primary/40 px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Get in touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
