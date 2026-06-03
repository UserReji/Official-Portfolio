import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Robert John L. Aguio",
  title: "Robert John L. Aguio — IT Student & Software Developer",
  description:
    "Personal portfolio of an Information Technology student passionate about building modern web applications, AI-driven systems, and IoT solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com",
  ogImage: "/og-image.svg",
  author: "Robert John L. Aguio",
  email: "robertjohnaguio@gmail.com",
  phone: "+63 992 485 4526",
  location: "Davao City, Philippines",
  pronouns: "he/him",
  bio: "IT student & aspiring software developer crafting modern digital experiences.",
  longBio:
    "I am an Information Technology student with a strong passion for building modern, accessible, and performant web applications. I enjoy working across the stack — from crafting clean, responsive interfaces in React and Next.js, to designing RESTful APIs, exploring AI integrations, and experimenting with IoT systems. My goal is to grow as a software engineer who builds products that genuinely help people.",

  social: [
    {
      name: "GitHub",
      url: "https://github.com/UserReji",
      icon: "github",
      handle: "@UserReji",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/robert-john-aguio-4822972b4/",
      icon: "linkedin",
      handle: "Robert John L. Aguio",
    },
    {
      name: "Email",
      url: "mailto:robertjohnaguio@gmail.com",
      icon: "mail",
      handle: "robertjohnaguio@gmail.com",
    },
    {
      name: "Twitter",
      url: "https://x.com/aguio_rj",
      icon: "twitter",
      handle: "@aguio_rj",
    },
  ],

  keywords: [
    "IT portfolio",
    "software developer",
    "Next.js developer",
    "React developer",
    "AI projects",
    "IoT projects",
    "Philippines",
    "student developer",
    "Robert John Aguio",
  ],

  resumeUrl: "/resume/robert-john-aguio-cv.pdf",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];
