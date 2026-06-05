import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        // Fluid type scale: scales from current minimums up to ~1.2x at 1920px+.
        // Floor values match Tailwind defaults so mobile layout is unchanged.
        xs:   ["clamp(0.75rem, 0.6rem + 0.65vw, 0.9rem)",     { lineHeight: "1rem" }],
        sm:   ["clamp(0.875rem, 0.7rem + 0.75vw, 1.05rem)",   { lineHeight: "1.25rem" }],
        base: ["clamp(1rem, 0.8rem + 0.85vw, 1.2rem)",        { lineHeight: "1.5rem" }],
        lg:   ["clamp(1.125rem, 0.9rem + 0.95vw, 1.35rem)",   { lineHeight: "1.75rem" }],
        xl:   ["clamp(1.25rem, 1rem + 1.05vw, 1.5rem)",       { lineHeight: "1.75rem" }],
        "2xl":["clamp(1.5rem, 1.2rem + 1.25vw, 1.8rem)",      { lineHeight: "2rem" }],
        "3xl":["clamp(1.875rem, 1.5rem + 1.55vw, 2.25rem)",   { lineHeight: "2.25rem" }],
        "4xl":["clamp(2.25rem, 1.8rem + 1.85vw, 2.7rem)",     { lineHeight: "2.5rem" }],
        "5xl":["clamp(3rem, 2.4rem + 2.45vw, 3.6rem)",        { lineHeight: "1" }],
        "6xl":["clamp(3.75rem, 3rem + 3.05vw, 4.5rem)",       { lineHeight: "1" }],
        "7xl":["clamp(4.5rem, 3.6rem + 3.65vw, 5.4rem)",      { lineHeight: "1" }],
        "8xl":["clamp(6rem, 4.8rem + 4.85vw, 7.2rem)",        { lineHeight: "1" }],
        "9xl":["clamp(8rem, 6.4rem + 6.5vw, 9.6rem)",         { lineHeight: "1" }],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-up": "fadeUp 0.6s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "gradient-y": {
          "0%, 100%": { "background-position": "center top" },
          "50%": { "background-position": "center bottom" },
        },
        "gradient-x": {
          "0%, 100%": { "background-position": "left center" },
          "50%": { "background-position": "right center" },
        },
        "gradient-xy": {
          "0%, 100%": { "background-position": "left top" },
          "50%": { "background-position": "right bottom" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { "box-shadow": "0 0 5px rgba(99,102,241,0.5)" },
          "100%": { "box-shadow": "0 0 20px rgba(99,102,241,0.8)" },
        },
        shimmer: {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "grid-pattern":
          "linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
