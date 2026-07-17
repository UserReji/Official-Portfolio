import type { TimelineEntry } from "@/types";

export const timeline: TimelineEntry[] = [
  {
    id: "edu-bsit-1st-2022",
    type: "education",
    title: "1st Semester — BSIT Year 1",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2022-08-01",
    endDate: "2022-12-31",
    description:
      "First semester of BSIT covering foundational courses in computing, programming, and general education subjects.",
    highlights: [
      "Introduction to Computing — Final Grade: 1.7",
      "Computer Programming 1 — Final Grade: 2.3",
      "Science, Technology and Society — Final Grade: 1.6",
      "Gender and Society — Final Grade: 1.4",
    ],
    gpa: "Weighted Ave. 91.19% · Earned Units: 26",
  },
  {
    id: "edu-bsit-2nd-2023",
    type: "education",
    title: "2nd Semester — BSIT Year 1",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2023-01-01",
    endDate: "2023-05-31",
    description:
      "Second semester of first year covering programming, communication, mathematics, HCI, and social science subjects.",
    highlights: [
      "Computer Programming 2 — Final Grade: 1.4",
      "Discrete Mathematics — Final Grade: 1.2",
      "Introduction to Human Computer Interaction — Final Grade: 1.4",
      "Purposive Communication — Final Grade: 2.0",
    ],
    gpa: "Weighted Ave. 94.42% · Earned Units: 26",
  },
  {
    id: "edu-bsit-1st-2023",
    type: "education",
    title: "1st Semester — BSIT Year 2",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2023-08-01",
    endDate: "2023-12-31",
    description:
      "Second year first semester focused on data structures, integrative programming, and contemporary world studies.",
    highlights: [
      "Data Structures and Algorithms — Final Grade: 1.2",
      "Integrative Programming and Technologies 1 — Final Grade: 1.8",
      "Mathematics in the Modern World — Final Grade: 1.4",
      "The Contemporary World — Final Grade: 1.4",
    ],
    gpa: "Weighted Ave. 94.3% · Earned Units: 23",
  },
  {
    id: "edu-bsit-2nd-2024",
    type: "education",
    title: "2nd Semester — BSIT Year 2",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2024-01-01",
    endDate: "2024-05-31",
    description:
      "Continued second year with networking, information management, quantitative methods, and computer programming 3.",
    highlights: [
      "Networking 1 — Final Grade: 2.1",
      "Computer Programming 3 — Final Grade: 1.8",
      "Quantitative Methods — Final Grade: 1.4",
      "Reading Visual Arts — Final Grade: 1.1",
    ],
    gpa: "Weighted Ave. 93.58% · Earned Units: 26",
  },
  {
    id: "edu-bsit-1st-2024",
    type: "education",
    title: "1st Semester — BSIT Year 3",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    description:
      "Third year first semester covering advanced networking, platform technologies, systems integration, and database systems.",
    highlights: [
      "Networking 2 — Final Grade: 2.3",
      "Platform Technologies — Final Grade: 1.5",
      "Systems Integration and Architecture 1 — Final Grade: 1.9",
      "Database Systems 1 — Final Grade: 2.8",
    ],
    gpa: "Weighted Ave. 90.14% · Earned Units: 21",
  },
  {
    id: "edu-bsit-2nd-2025",
    type: "education",
    title: "2nd Semester — BSIT Year 3",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2025-01-01",
    endDate: "2025-05-31",
    description:
      "Focused on application development, HCI, information assurance, advanced databases, and web systems technologies.",
    highlights: [
      "Web Systems and Technologies — Final Grade: 1.2",
      "Advance Database Systems — Final Grade: 1.3",
      "Application Development and Emerging Technologies — Final Grade: 1.6",
      "Information Assurance and Security 1 — Final Grade: 1.8",
    ],
    gpa: "Weighted Ave. 94.71% · Earned Units: 21",
  },
  {
    id: "edu-bsit-summer-2025",
    type: "education",
    title: "Summer — BSIT Year 3",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2025-06-01",
    endDate: "2025-07-31",
    description:
      "Summer term covering Capstone Project 1 and Information Assurance and Security 2.",
    highlights: [
      "Capstone Project 1 — Final Grade: 2.4",
      "Information Assurance and Security 2 — Final Grade: 1.6",
    ],
    gpa: "Weighted Ave. 90% · Earned Units: 6",
  },
  {
    id: "edu-bsit-1st-2025",
    type: "education",
    title: "1st Semester — BSIT Year 4",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2025-08-01",
    endDate: "2025-12-31",
    description:
      "Fourth year first semester featuring systems administration, Capstone Project 2, and IT Elective 4.",
    highlights: [
      "Systems Administration and Maintenance — Final Grade: 1.9",
      "Capstone Project 2 — Final Grade: 2.6",
      "IT Elective 4 — Final Grade: 1.4",
    ],
    gpa: "Weighted Ave. 90.33% · Earned Units: 9",
  },
  {
    id: "edu-bsit-2nd-2026",
    type: "education",
    title: "2nd Semester — BSIT Year 4",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2026-01-01",
    endDate: "2026-05-31",
    current: true,
    description:
      "Final semester of BSIT consisting of Practicum (486 hours) — applying industry-level skills in a real-world work environment.",
    highlights: [
      "Practicum (486 hours) — Final Grade: 2.0",
    ],
    gpa: "Weighted Ave. 90% · Earned Units: 6",
  },
  {
    // Grand finale — detected by id prefix in TimelineSection for a centered,
    // celebratory layout. Keep this entry LAST in the array.
    id: "milestone-graduation-2026",
    type: "achievement",
    title: "Graduate of Batch 2026",
    organization: "Holy Cross of Davao College",
    location: "Davao City, Philippines",
    startDate: "2026-06-26",
    endDate: "2026-06-26",
    description:
      "Crossed the stage. Four years, one degree, countless late nights — and a whole lot of lessons that no syllabus could teach.",
  },
];
