"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Download,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site";

export function HeroSection() {
  const initials = siteConfig.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Badge variant="glass" className="mb-6">
                <Sparkles className="h-3 w-3 mr-1.5 text-yellow-400" />
                Available for internships &amp; freelance work
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient">{siteConfig.name}</span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl text-muted-foreground font-medium">
                IT Student &amp; Software Developer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {siteConfig.longBio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <Button asChild variant="gradient" size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={siteConfig.resumeUrl} download>
                  <Download className="h-4 w-4" />
                  Download CV
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-3"
            >
              <span className="text-sm text-muted-foreground hidden sm:inline">
                Follow me:
              </span>
              {siteConfig.social
                .filter((s) =>
                  ["github", "linkedin", "twitter"].includes(s.icon)
                )
                .map((s) => {
                  const Icon =
                    s.icon === "github"
                      ? Github
                      : s.icon === "linkedin"
                      ? Linkedin
                      : Mail;
                  return (
                    <Link
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all hover:-translate-y-0.5"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  );
                })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 flex items-center justify-center lg:justify-start gap-1.5 text-sm text-muted-foreground"
            >
              <MapPin className="h-4 w-4" />
              {siteConfig.location}
            </motion.div>
          </motion.div>

          {/* Right — profile card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 blur-2xl opacity-40 animate-pulse" />
              <div className="relative h-full w-full rounded-3xl glass-strong p-2 shadow-2xl">
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
                  <Image
                    src="/images/profile.jpg"
                    alt={`${siteConfig.name} profile photo`}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 256px, 320px"
                  />
                </div>
              </div>

              {/* Floating tech badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 glass-strong rounded-xl px-3 py-2 shadow-lg"
              >
                <span className="text-sm font-semibold">⚛️ React</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-1/2 -left-6 glass-strong rounded-xl px-3 py-2 shadow-lg"
              >
                <span className="text-sm font-semibold">🚀 Next.js</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute -bottom-4 right-8 glass-strong rounded-xl px-3 py-2 shadow-lg"
              >
                <span className="text-sm font-semibold">🤖 AI</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground text-xs"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-8 w-5 rounded-full border-2 border-current flex items-start justify-center p-1"
          >
            <div className="h-1.5 w-1 rounded-full bg-current" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
