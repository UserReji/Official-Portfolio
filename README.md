# IT Portfolio Website

A modern, fully responsive **Personal IT Portfolio** built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and the **App Router**.

Designed as a professional landing page + portfolio hub for an Information Technology student and aspiring software developer — ready for internships, employment applications, freelance work, and personal branding.

---

## ✨ Features

- ⚡ **Next.js 15** App Router + Server Components
- 🎨 **Tailwind CSS** with a fully tokenized design system
- 🌗 **Dark / Light mode** with `next-themes` (system-aware)
- 🎬 **Framer Motion** animations (page transitions, scroll reveals, hover)
- 🪟 **Glassmorphism** effects, gradient backgrounds, and dot/grid patterns
- 📱 **Mobile-first**, fully responsive design
- ♿ **Accessibility**-compliant (skip link, ARIA labels, semantic HTML)
- 🔍 **SEO-optimized** with metadata, Open Graph, sitemap, robots
- 🧩 **Reusable component architecture** (UI primitives, sections, cards)
- 📬 **Contact form API** (Zod-validated, optional Resend email)
- 📄 **Embedded resume viewer** with PDF download
- 🏆 **Certifications** with verification links
- 📊 **GitHub stats** integration
- 🛣️ **Project detail pages** for each project
- 📝 **Blog stub** ready for future MDX posts
- 🚀 **One-click Vercel deploy**

---

## 📁 Folder Structure

```
portfolio/
├── public/                      # Static assets
│   ├── projects/                # Project cover SVGs
│   ├── certifications/          # Certification badge SVGs
│   ├── resume/                  # Resume PDF (drop yours here)
│   ├── images/                  # Profile and other images
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── app/                     # App Router pages
│   │   ├── about/
│   │   ├── api/contact/         # Contact form API route
│   │   ├── blog/                # Blog stub (future)
│   │   ├── certifications/
│   │   ├── contact/
│   │   ├── projects/
│   │   │   └── [slug]/          # Dynamic project detail page
│   │   ├── resume/
│   │   ├── globals.css          # Tailwind + design tokens
│   │   ├── layout.tsx           # Root layout
│   │   ├── not-found.tsx        # Custom 404
│   │   ├── page.tsx             # Home
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── contact-form.tsx
│   │   ├── resume-viewer.tsx
│   │   ├── layout/              # Navbar, Footer, ThemeToggle
│   │   ├── projects/            # ProjectCard, ProjectsExplorer
│   │   ├── sections/            # Hero, FeaturedProjects, Skills, Timeline, etc.
│   │   └── ui/                  # Button, Card, Badge, Input, Motion, etc.
│   ├── data/                    # Static content (projects, skills, etc.)
│   │   ├── projects.ts
│   │   ├── certifications.ts
│   │   ├── skills.ts
│   │   ├── timeline.ts
│   │   └── testimonials.ts
│   ├── lib/
│   │   ├── site.ts              # Site config & nav links
│   │   └── utils.ts             # cn(), formatDate(), etc.
│   └── types/
│       └── index.ts             # Shared TypeScript types
├── .env.example
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_EMAIL=your@email.com

# Optional: Resend email integration
RESEND_API_KEY=
CONTACT_TO_EMAIL=
```

### 3. Add your content

- **Profile**: update `src/lib/site.ts` (name, bio, social links)
- **Projects**: edit `src/data/projects.ts`
- **Certifications**: edit `src/data/certifications.ts`
- **Skills**: edit `src/data/skills.ts`
- **Timeline**: edit `src/data/timeline.ts`
- **Resume PDF**: drop your CV at `public/resume/your-name-cv.pdf`
- **Project images**: replace SVGs in `public/projects/` (or use real PNGs)
- **Profile photo**: add `public/images/profile.png` and update the Hero

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 5. Build for production

```bash
npm run build
npm run start
```

---

## 🌐 Deployment to Vercel

### Option A: One-click deploy

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) → Import your repository
3. Vercel auto-detects Next.js — no config needed
4. Add your environment variables in **Project Settings → Environment Variables**
5. Click **Deploy**

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel              # preview
vercel --prod       # production
```

### Custom domain

In Vercel dashboard → **Settings → Domains → Add**. Then update `NEXT_PUBLIC_SITE_URL` in your env vars.

---

## 🎨 Customization

### Color palette

Edit CSS variables in `src/app/globals.css` (`:root` and `.dark` blocks). The Tailwind theme references these via `hsl(var(--...))`.

### Fonts

`next/font` is used in `src/app/layout.tsx` (Inter + JetBrains Mono). Swap to any Google font or self-hosted font.

### Sections

All home page sections live in `src/components/sections/` and are composed in `src/app/page.tsx`. Add, remove, or reorder freely.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router, RSC, Turbopack)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com) + CSS variables
- **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
- **Icons**: [Lucide](https://lucide.dev)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Forms**: [react-hook-form](https://react-hook-form.com) + [Zod](https://zod.dev)
- **Email (optional)**: [Resend](https://resend.com)
- **Deployment**: [Vercel](https://vercel.com)

---

## 📜 License

MIT — fork, modify, and use freely. Attribution appreciated.
"# Official-Portfolio" 
