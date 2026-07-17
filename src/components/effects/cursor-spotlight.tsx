"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — site-wide radial gradient that follows the cursor.
 *
 * Mounted once at the root layout, it sits as a fixed full-viewport layer
 * behind all content (z-0) with `pointer-events-none` so it never blocks
 * clicks. Uses framer-motion springs to smooth the gradient's travel
 * (same pattern as the Featured Projects spotlight panel).
 *
 * Listener is attached to `window` (not the element) because the element
 * is pointer-events-none and would never fire mouse events otherwise.
 *
 * Respects `prefers-reduced-motion` by writing the cursor position to the
 * springs' targets directly each frame (no smoothed glide) so the gradient
 * still tracks the cursor without animating its position.
 */
export function CursorSpotlight() {
  // Default to viewport center so the gradient looks intentional before
  // the user moves the mouse (and on touch devices where there is no hover).
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  // Smoother spring so the wash visibly glides toward the cursor.
  // Lower stiffness + higher damping = longer, more visible trail.
  const sx = useSpring(mx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 50, damping: 20, mass: 0.6 });

  // Build the radial-gradient string reactively from the spring values.
  // 380px circle for a more intimate, localized glow.
  // Slightly darker than --primary (28% lightness 32% vs 48%) for a moodier feel.
  const background = useMotionTemplate`radial-gradient(circle 380px at ${sx}% ${sy}%, hsl(28 32% 32% / 0.18), transparent 70%)`;

  // Cached once at mount — avoids re-querying on every mousemove.
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    reduceMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function onMove(e: MouseEvent) {
      // Percent-based so the gradient stays anchored to the cursor when
      // the viewport resizes (mobile rotation, browser resize, etc.).
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (reduceMotionRef.current) {
        // Bypass the spring so the gradient tracks 1:1 with the cursor.
        sx.jump(x);
        sy.jump(y);
      } else {
        mx.set(x);
        my.set(y);
      }
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, sx, sy]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
