"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";

/**
 * Big "let's work together" CTA — a floating glass card over a soft
 * radial gradient with an animated ambient glow. Sits just before the footer.
 */
export function ContactCTA() {
  return (
    <section className="relative py-24 md:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden">
      {/* Radial gradient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, hsl(var(--primary) / 0.08), transparent 70%)",
          }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Floating glass card */}
          <div className="relative overflow-hidden border border-border/50 bg-card/70 backdrop-blur-2xl shadow-2xl shadow-primary/5">
            {/* Inner highlight ring */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent" />
            </div>

            {/* Decorative corner glyph */}
            <div className="absolute top-6 right-6 hidden md:flex items-center gap-2 font-sans text-[clamp(0.6875rem,0.55rem+0.55vw,0.8rem)] tracking-[0.2em] uppercase text-primary/70">
              <Sparkles className="h-3 w-3" /> Open to work
            </div>

            <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-sans text-xs tracking-[0.22em] uppercase text-primary mb-6 inline-flex items-center gap-3"
              >
                <span className="block w-8 h-px bg-primary/60" />
                Let&apos;s build something
                <span className="block w-8 h-px bg-primary/60" />
              </motion.p>

              {/* Headline */}
              <h2 className="font-serif font-light text-foreground leading-[1.1] mb-6 max-w-3xl mx-auto" style={{ fontSize: "clamp(2.25rem, 1.8rem + 1.85vw, 2.7rem)" }}>
                Have an idea worth{" "}
                <em className="text-primary not-italic">building</em>?
              </h2>

              {/* Body */}
              <p className="font-sans text-base text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
                I&apos;m currently open to internships, freelance work, and
                interesting collaborations — especially in web, AI, and IoT. Drop
                me a message and let&apos;s talk.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase bg-foreground text-background px-7 py-3.5 hover:bg-primary transition-colors duration-300"
                >
                  Start a conversation
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase border border-border text-muted-foreground px-7 py-3.5 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {siteConfig.email}
                </a>
              </div>

              {/* Tiny meta line */}
              <p className="mt-10 font-serif italic text-sm text-muted-foreground/70">
                — usually replies within a day —
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}