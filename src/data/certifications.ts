import type { Certification } from "@/types";

export const certifications: Certification[] = [
  {
    slug: "hcdc-ojt-completion",
    title: "OJT Certificate of Completion — Practicum (486 hours)",
    issuer: "Holy Cross of Davao College — Office of the VPAA",
    issueDate: "2026-05-22",
    image: "/certifications/ojtcert.jpg",
    skills: ["On-the-Job Training", "Practicum", "Professional Development", "Remote Work"],
    description:
      "Certificate of Completion for the 486-hour On-the-Job Training Program as part of the BS Information Technology curriculum, covering the period of February 18, 2026 to May 22, 2026.",
    neverExpires: true,
  },
  {
    slug: "codechum-python-it-elective",
    title: "ADV103-3D IT Elective 3 — Completion Certificate",
    issuer: "CodeChum (HCDC)",
    issueDate: "2024-10-24",
    credentialId: "nibble-15530",
    credentialUrl: "https://hcdc.codechum.com/certificates/2471",
    image: "/certifications/codechum-python.png",
    skills: ["Python", "Programming", "Algorithms", "Problem Solving"],
    description:
      "Completion certificate for IT Elective 3 (ADV103-3D) on the CodeChum platform, achieved with a total score of 1244/1250.",
    neverExpires: true,
  },
  {
    slug: "365-datascience-sql",
    title: "SQL",
    issuer: "365 Data Science",
    issueDate: "2024-05-11",
    credentialId: "CC-A5494DD326",
    credentialUrl: "https://learn.365datascience.com/certificates/CC-A5494DD326/",
    image: "/certifications/sql.jpg",
    skills: ["SQL", "Database Queries", "Data Analysis", "Data Science"],
    description:
      "Certificate of Achievement for completing the SQL course of study on 365 Data Science.",
    neverExpires: true,
  },
  {
    slug: "udemy-cms-blog-php-mysql",
    title: "Build Complete CMS Blog in PHP MySQL Bootstrap & PDO",
    issuer: "Udemy",
    issueDate: "2024-12-12",
    credentialId: "UC-c799daf6-cde6-4531-8c06-84baead057b9",
    credentialUrl: "https://www.udemy.com/certificate/UC-c799daf6-cde6-4531-8c06-84baead057b9/",
    image: "/certifications/udemy.jpg",
    skills: ["PHP", "MySQL", "Bootstrap", "PDO", "Web Development", "CMS"],
    description:
      "Certificate of completion for a 10-hour Udemy course covering full CMS blog development using PHP, MySQL, Bootstrap, and PDO.",
    neverExpires: true,
  },
  {
    slug: "simplilearn-fullstack-java",
    title: "Getting Started with Full Stack Java Development",
    issuer: "Simplilearn",
    issueDate: "2026-04-29",
    credentialId: "10166804",
    image: "/certifications/simplilearn.png",
    skills: ["Java", "Full Stack", "Web Development", "Backend", "Spring Boot"],
    description:
      "Simplilearn certificate for completing the Getting Started with Full Stack Java Development course.",
    neverExpires: true,
  },
];
