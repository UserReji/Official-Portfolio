/**
 * Project metadata used throughout the site.
 */
export type ProjectCategory =
  | "web-development"
  | "ai"
  | "iot"
  | "academic";

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  image: string;
  gallery?: string[];
  githubUrl?: string;
  liveUrl?: string;
  features: string[];
  challenges?: string[];
  learnings?: string[];
  role?: string;
  duration?: string;
  teamSize?: number;
  status: "completed" | "in-progress" | "archived";
  featured: boolean;
  startDate: string;
  endDate?: string;
  highlights?: string[];
}

/**
 * Certification record.
 */
export interface Certification {
  slug: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  image: string;
  skills: string[];
  description?: string;
  neverExpires?: boolean;
}

/**
 * Skill group (e.g., Languages, Frameworks).
 */
export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4 | 5; // 1 = beginner, 5 = expert
  icon?: string;
}

export interface SkillGroup {
  category: string;
  description?: string;
  skills: Skill[];
}

/**
 * Experience / Education entry.
 */
export interface TimelineEntry {
  id: string;
  type: "education" | "experience" | "achievement" | "certification";
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description: string;
  highlights?: string[];
  gpa?: string;
}

/**
 * Social link.
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle?: string;
}

/**
 * Site configuration.
 */
export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  longBio: string;
  pronouns?: string;
  social: SocialLink[];
  keywords: string[];
  resumeUrl: string;
}

/**
 * Testimonial.
 */
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  content: string;
  linkedinUrl?: string;
}
