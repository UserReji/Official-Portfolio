import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "mediwear",
    title: "MediWear",
    shortDescription:
      "ESP32-powered wearable medication reminder with touchscreen UI, BLE sync, and adherence tracking.",
    description:
      "MediWear is a standalone IoT medication reminder device built on the ESP32 microcontroller. It features a touchscreen LVGL UI for scheduling up to 10 medications with dosage, frequency, and duration. The device alarms with buzzer and vibration feedback, tracks pill storage via a slot sensor, logs adherence events to NVS, and syncs schedules and logs with a companion mobile app over Bluetooth Low Energy. Built as a capstone thesis project emphasizing reliability, low power, and accessibility for non-technical users.",
    category: "iot",
    technologies: [
      "ESP32",
      "C++",
      "Arduino IDE",
      "LVGL",
      "TFT_eSPI",
      "BLE (GATT)",
      "ArduinoJson",
      "NVS Preferences",
    ],
    image: "/projects/mediwear.svg",
    gallery: ["/projects/mediwear.svg"],
    githubUrl: "https://github.com/UserReji/MediWear-Device-Software",
    features: [
      "Schedule up to 10 medications with name, dosage, time, frequency, and duration",
      "Multi-alarm queue handling up to 5 concurrent alarms with buzzer and vibration feedback",
      "Pill storage tracking via slot sensor with low-pill alert threshold",
      "Adherence, alarm, and storage event logs persisted to NVS",
      "BLE GATT service for companion app to push/pull schedules and read logs",
      "Touch-driven LVGL UI with swipe-back navigation and idle cover screen",
      "Hardware watchdog (5-second esp_task_wdt) for crash recovery",
    ],
    challenges: [
      "Fitting LVGL + TFT_eSPI + BLE + ArduinoJson into a 4MB flash partition",
      "Designing an intuitive touchscreen UI usable by elderly, non-technical users",
      "Ensuring accurate time tracking and detecting discrepancies after power loss",
    ],
    learnings: [
      "Full embedded firmware development on ESP32 with Arduino IDE",
      "BLE GATT service design for mobile companion app integration",
      "LVGL UI framework for resource-constrained microcontrollers",
      "NVS-based persistent storage for logs and preferences",
    ],
    role: "Firmware developer & hardware lead",
    duration: "6 months",
    teamSize: 4,
    status: "completed",
    featured: true,
    startDate: "2024-08-01",
    endDate: "2025-05-01",
    highlights: ["Capstone thesis project", "Best IoT Project nominee"],
  },
  {
    slug: "intervention-monitoring-system",
    title: "Intervention Monitoring System for Teacher Performance",
    shortDescription:
      "Laravel-based web system for tracking and monitoring teacher performance interventions in schools.",
    description:
      "A web-based intervention monitoring system built with Laravel for schools and academic institutions. The system allows administrators and department heads to create intervention plans for underperforming teachers, track progress through milestones, log diagnostic assessments, and generate performance reports. It includes a diagnostic matrix tool and supports Docker-based deployment on Railway and Render cloud platforms.",
    category: "academic",
    technologies: [
      "Laravel",
      "PHP",
      "Blade",
      "MySQL",
      "Tailwind CSS",
      "Vite",
      "Python",
      "Docker",
    ],
    image: "/projects/intervention-monitoring.svg",
    gallery: ["/projects/intervention-monitoring.svg"],
    githubUrl:
      "https://github.com/UserReji/Intervention_System_For_TeacherPerfomance",
    features: [
      "Teacher profile and intervention plan management",
      "Diagnostic matrix tool for performance assessment",
      "Progress logs and milestone tracking per intervention",
      "Role-based access for administrators, department heads, and faculty",
      "Reports exportable for review and documentation",
      "Docker support with Railway and Render deployment configs",
    ],
    challenges: [
      "Modeling flexible intervention plans adaptable to different school policies",
      "Designing a diagnostic matrix that translates performance data into actionable plans",
      "Containerizing a Laravel app for seamless cloud deployment",
    ],
    learnings: [
      "Laravel full-stack development with Blade and Eloquent ORM",
      "Docker and cloud deployment on Railway and Render",
      "Translating academic intervention workflows into software requirements",
    ],
    role: "Full-stack developer",
    duration: "4 months",
    teamSize: 3,
    status: "completed",
    featured: true,
    startDate: "2024-06-01",
    endDate: "2024-10-01",
  },
  {
    slug: "boarding-house-management-system",
    title: "Boarding House Management System",
    shortDescription:
      "Laravel web system for managing tenants, rooms, billing, and operations of a boarding house.",
    description:
      "A full-featured web-based management system tailored for boarding house operators. Built with Laravel and styled with Tailwind CSS, it handles tenant registration, room assignment, monthly billing, payment tracking, and maintenance requests. The system includes a GitHub Actions CI workflow for automated testing and Docker support for deployment. With over 7,000 commits, it represents a heavily iterated, production-ready project.",
    category: "web-development",
    technologies: [
      "Laravel",
      "PHP",
      "Blade",
      "MySQL",
      "Tailwind CSS",
      "JavaScript",
      "Docker",
      "GitHub Actions",
    ],
    image: "/projects/boarding-house.svg",
    gallery: ["/projects/boarding-house.svg"],
    githubUrl: "https://github.com/UserReji/BoardingHouseManagementSystem",
    features: [
      "Tenant registration and room assignment management",
      "Monthly billing generation and payment tracking",
      "Maintenance request workflow with status updates",
      "Occupancy dashboard with room availability overview",
      "Monthly income reports and financial summaries",
      "CI/CD pipeline via GitHub Actions for automated testing",
    ],
    challenges: [
      "Modeling overlapping tenant contracts and room transitions",
      "Designing a billing engine that handles partial payments and arrears",
      "Building a UI approachable for non-technical boarding house owners",
    ],
    learnings: [
      "Production-level Laravel development with CI/CD integration",
      "Iterative development practice — project has 7,000+ commits",
      "Designing for real small-business workflows through user feedback",
    ],
    role: "Full-stack developer",
    duration: "5 months",
    teamSize: 3,
    status: "completed",
    featured: true,
    startDate: "2024-01-01",
    endDate: "2024-06-01",
  },
  {
    slug: "barangay-spot",
    title: "Barangay Spot",
    shortDescription:
      "Community engagement platform for local barangay services and announcements.",
    description:
      "Barangay Spot is a web platform that helps barangays communicate with residents. It centralizes announcements, document requests, blotter reporting, and event scheduling, replacing paper-based processes with a modern, mobile-friendly experience.",
    category: "web-development",
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Bootstrap",
      "JavaScript",
      "Chart.js",
    ],
    image: "/projects/barangay-spot.svg",
    gallery: ["/projects/barangay-spot.svg"],
    githubUrl: "https://github.com/UserReji",
    features: [
      "Resident request tracking with status updates",
      "Announcements and event calendar",
      "Admin panel with role-based permissions",
      "Reports and analytics for barangay officials",
    ],
    challenges: [
      "Designing for low-bandwidth and older devices",
      "Migrating legacy paper-based workflows to digital",
    ],
    learnings: [
      "Laravel ecosystem and Blade templating",
      "Stakeholder interviews and requirements gathering",
    ],
    role: "Full-stack developer",
    duration: "5 months",
    teamSize: 3,
    status: "completed",
    featured: false,
    startDate: "2023-06-01",
    endDate: "2023-11-01",
  },
];

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category === category);

export const projectCategories = [
  { id: "all", label: "All Projects" },
  { id: "web-development", label: "Web Development" },
  { id: "ai", label: "AI Projects" },
  { id: "iot", label: "IoT Projects" },
  { id: "academic", label: "Academic Projects" },
] as const;
