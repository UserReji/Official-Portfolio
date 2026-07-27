"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useEffect, useState, useRef } from "react";

// Floating badge component with mouse repulsion
function FloatingBadge({
  number,
  label,
  parentRef,
}: {
  number: string;
  label: string;
  // Accept a nullable ref (the caller typically uses useRef<HTMLDivElement | null>())
  parentRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const badgeRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parentRef.current || !badgeRef.current) return;

      const parentRect = parentRef.current.getBoundingClientRect();
      const badgeRect = badgeRef.current.getBoundingClientRect();
      const parentCenterX = parentRect.left + parentRect.width / 2;
      const parentCenterY = parentRect.top + parentRect.height / 2;

      const mouseDist = Math.sqrt(
        Math.pow(e.clientX - parentCenterX, 2) +
          Math.pow(e.clientY - parentCenterY, 2)
      );
      const repelRadius = 150;

      if (mouseDist < repelRadius) {
        const angle = Math.atan2(
          badgeRect.top + badgeRect.height / 2 - e.clientY,
          badgeRect.left + badgeRect.width / 2 - e.clientX
        );
        const distance = repelRadius - mouseDist;
        const strength = Math.max(20, distance * 0.3);

        targetPos.current = {
          x: Math.cos(angle) * strength,
          y: Math.sin(angle) * strength,
        };
      } else {
        targetPos.current = { x: 0, y: 0 };
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [parentRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.15,
        y: prev.y + (targetPos.current.y - prev.y) * 0.15,
      }));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      ref={badgeRef}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      style={{
        x: position.x,
        y: position.y,
      }}
      className="absolute glass border border-border/60 px-4 py-2.5 shadow-lg rounded-lg whitespace-nowrap pointer-events-none"
    >
      <p className="font-serif text-xl font-light text-foreground leading-none">
        {number}
      </p>
      <p className="font-sans text-[clamp(0.6875rem,0.55rem+0.55vw,0.8rem)] tracking-[0.15em] uppercase text-muted-foreground mt-0.5">
        {label}
      </p>
    </motion.div>
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const marqueeItems = [
  "React & Next.js", "UI/UX Design", "IoT Systems", "RESTful APIs",
  "AI Integration", "Full Stack Dev", "Laravel & PHP", "TypeScript",
];

// Sequence of lines to type out, one after another
const LINES = [
  { text: "Hi, I'm Robert John.", pause: 1200 },
  { text: "Welcome to my portfolio.", pause: 1000 },
  { text: "Feel free to roam around.", pause: 900 },
  { text: "Let's build something great.", pause: 99999 }, // stays
];

const CHAR_DELAY = 45;  // ms per character typed
const DELETE_DELAY = 22; // ms per character deleted

function TypedHeading() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const line = LINES[lineIndex];
    const isLast = lineIndex === LINES.length - 1;

    if (phase === "typing") {
      if (displayed.length < line.text.length) {
        timeout.current = setTimeout(() => {
          setDisplayed(line.text.slice(0, displayed.length + 1));
        }, CHAR_DELAY);
      } else {
        // Finished typing — pause, then delete (unless last line)
        timeout.current = setTimeout(() => {
          setPhase(isLast ? "pausing" : "pausing");
        }, line.pause);
      }
    } else if (phase === "pausing") {
      if (isLast) return; // stay on last line forever
      setPhase("deleting");
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => {
          setDisplayed((d) => d.slice(0, -1));
        }, DELETE_DELAY);
      } else {
        // Move to next line
        setLineIndex((i) => i + 1);
        setPhase("typing");
      }
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, phase, lineIndex]);

  return (
    <h1
      className="font-serif font-light text-foreground leading-tight mb-2"
      style={{ fontSize: "clamp(2.25rem, 1.8rem + 1.85vw, 2.7rem)", minHeight: "1.35em" }}
    >
      <em className="text-primary not-italic">{displayed}</em>
      {/* blinking cursor */}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-primary align-middle ml-1 -translate-y-[1px]"
      />
    </h1>
  );
}

export function HeroSection() {
  const profileRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* ── Hero ────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-visible"
      >
        {/* Left column */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-32 pb-16 lg:py-0">

          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-sans text-xs tracking-[0.22em] uppercase text-primary mb-8 label-line"
          >
            Available for internships &amp; freelance
          </motion.p>

          <TypedHeading />

          {/* Role */}
          <motion.p
            {...fadeUp(0.42)}
            className="font-sans text-xs tracking-[0.18em] uppercase text-muted-foreground mb-8"
          >
            IT Graduate &amp; Software Developer &nbsp;·&nbsp; Davao City, PH
          </motion.p>

          {/* Bio — conversational, matching about page tone */}
          <motion.div
            {...fadeUp(0.54)}
            className="space-y-4 mb-10 max-w-lg"
          >
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              I&apos;m a freshly graduated IT Graduate from{" "}
              <span className="text-foreground">Holy Cross of Davao College</span> with a
              genuine love for building things on the web — from clean, thoughtful interfaces
              to the backend logic that holds everything together.
            </p>
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              I also find myself pulled toward AI and IoT whenever curiosity gets the better
              of me. Right now I&apos;m looking for a place where I can contribute something
              real, grow alongside people who care about what they build, and keep getting
              better at this craft.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.66)} className="flex flex-wrap items-center gap-4 mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase bg-foreground text-background px-6 py-3 hover:bg-primary transition-colors duration-300"
            >
              View Work <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <a
              href={siteConfig.resumeUrl}
              download
              className="inline-flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase border border-border text-muted-foreground px-6 py-3 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              <Download className="h-3.5 w-3.5" /> Download CV
            </a>
            <Link
              href="/about"
              className="font-sans text-xs tracking-[0.14em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300 underline-offset-4 hover:underline"
            >
              More about me
            </Link>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.76)} className="flex items-center gap-3">
            {siteConfig.social.filter((s) => ["github", "linkedin"].includes(s.icon)).map((s) => {
              const Icon = s.icon === "github" ? Github : Linkedin;
              return (
                <Link
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex h-9 w-9 items-center justify-center border border-border/60 text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* Right column — portrait */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:flex items-center justify-center overflow-visible"
        >
          <div
            ref={profileRef}
            className="relative flex flex-col items-center gap-6"
          >
            {/* Portrait — contained card */}
            <div className="relative w-64 xl:w-72">
              {/* Decorative border offset */}
              <div className="absolute -inset-2 border border-primary/20" />
              <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <Image
                  src="/images/profile.jpg"
                  alt={`${siteConfig.name} portrait`}
                  fill
                  className="object-cover object-top"
                  style={{ filter: "sepia(6%) contrast(1.05)" }}
                  priority
                  sizes="320px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
              </div>
            </div>

            {/* Name label below photo */}
            <div className="text-center">
              <p className="font-serif text-sm font-light text-foreground/70 tracking-wide">
                {siteConfig.name}
              </p>
              <p className="font-sans text-[clamp(0.6875rem,0.55rem+0.55vw,0.8rem)] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">
                {siteConfig.location}
              </p>
            </div>

            {/* GPA Badge - Top Left */}
            <div className="absolute" style={{ top: '60px', left: '-100px' }}>
              <FloatingBadge
                number="3.94"
                label="GPA Average"
                parentRef={profileRef}
              />
            </div>

            {/* Certifications Badge - Top Right */}
            <div className="absolute" style={{ top: '60px', right: '-30px' }}>
              <FloatingBadge
                number="6"
                label="Certifications"
                parentRef={profileRef}
              />
            </div>

            {/* Projects Badge - Bottom Left */}
            <div className="absolute" style={{ bottom: '120px', left: '-120px' }}>
              <FloatingBadge
                number="4"
                label="Projects Built"
                parentRef={profileRef}
              />
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-6 sm:left-10 lg:left-16 flex items-center gap-3 text-muted-foreground"
        >
          <div className="w-10 h-px bg-border" />
          <span className="font-sans text-[clamp(0.75rem,0.6rem+0.65vw,0.9rem)] tracking-[0.2em] uppercase">Scroll to explore</span>
        </motion.div>
      </section>

      {/* ── Marquee ─────────────────────────────────── */}
      <div className="border-y border-border/50 overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-serif italic text-muted-foreground text-base">
              {item}
              <span className="text-primary ml-10 not-italic">&middot;</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
