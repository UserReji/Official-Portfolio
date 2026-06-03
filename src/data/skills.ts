import type { SkillGroup } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Core programming languages I use day-to-day.",
    skills: [
      { name: "TypeScript", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "Python", level: 4 },
      { name: "Java", level: 3 },
      { name: "C++", level: 3 },
      { name: "PHP", level: 3 },
    ],
  },
  {
    category: "Frontend",
    description: "Frameworks, libraries, and styling tools.",
    skills: [
      { name: "React", level: 5 },
      { name: "Next.js", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Framer Motion", level: 4 },
      { name: "Vue.js", level: 3 },
      { name: "HTML5 & CSS3", level: 5 },
    ],
  },
  {
    category: "Backend",
    description: "Server-side, APIs, and databases.",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Express", level: 4 },
      { name: "Laravel", level: 3 },
      { name: "FastAPI", level: 3 },
      { name: "PostgreSQL", level: 4 },
      { name: "MySQL", level: 4 },
      { name: "MongoDB", level: 3 },
    ],
  },
  {
    category: "Tools & DevOps",
    description: "Tooling, deployment, and collaboration.",
    skills: [
      { name: "Git & GitHub", level: 5 },
      { name: "Docker", level: 3 },
      { name: "Vercel", level: 5 },
      { name: "Linux", level: 3 },
      { name: "VS Code", level: 5 },
      { name: "Figma", level: 3 },
    ],
  },
  {
    category: "AI / IoT",
    description: "Domains I actively explore outside web dev.",
    skills: [
      { name: "TensorFlow", level: 3 },
      { name: "PyTorch", level: 3 },
      { name: "OpenCV", level: 3 },
      { name: "YOLO", level: 3 },
      { name: "ESP32 / Arduino", level: 3 },
      { name: "Firebase", level: 4 },
    ],
  },
];
