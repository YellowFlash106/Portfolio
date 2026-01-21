import { type Skill } from "@shared/schema";

export const skillsData: Skill[] = [
  // Languages
  {
    id: "1",
    name: "C",
    category: "Languages",
    level: 85,
    yearsOfExperience: 3,
    description: "System programming and low-level development",
    icon: "c",
    order: 1
  },
  {
    id: "2",
    name: "Java",
    category: "Languages",
    level: 80,
    yearsOfExperience: 2,
    description: "Object-oriented programming and enterprise applications",
    icon: "java",
    order: 2
  },
  {
    id: "3",
    name: "JavaScript",
    category: "Languages",
    level: 90,
    yearsOfExperience: 3,
    description: "Full-stack JavaScript development and modern ES6+ features",
    icon: "javascript",
    order: 3
  },
  {
    id: "4",
    name: "SQL",
    category: "Languages",
    level: 85,
    yearsOfExperience: 2,
    description: "Database querying and management",
    icon: "sql",
    order: 4
  },

  // Frontend Technologies
  {
    id: "5",
    name: "ReactJS",
    category: "Frontend",
    level: 88,
    yearsOfExperience: 2,
    description: "Modern React development with hooks and state management",
    icon: "react",
    order: 1
  },
  {
    id: "6",
    name: "Next.js",
    category: "Frontend",
    level: 82,
    yearsOfExperience: 1,
    description: "Full-stack React framework for production applications",
    icon: "nextjs",
    order: 2
  },
  {
    id: "7",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 85,
    yearsOfExperience: 2,
    description: "Utility-first CSS framework for rapid UI development",
    icon: "tailwind",
    order: 3
  },

  // Backend Technologies
  {
    id: "8",
    name: "ExpressJS",
    category: "Backend",
    level: 85,
    yearsOfExperience: 2,
    description: "Fast, unopinionated web framework for Node.js",
    icon: "express",
    order: 1
  },
  {
    id: "9",
    name: "Node.js",
    category: "Backend",
    level: 83,
    yearsOfExperience: 2,
    description: "Server-side JavaScript runtime for scalable applications",
    icon: "nodejs",
    order: 2
  },

  // Databases
  {
    id: "10",
    name: "MongoDB",
    category: "Database",
    level: 80,
    yearsOfExperience: 2,
    description: "NoSQL database for modern applications",
    icon: "mongodb",
    order: 1
  },
  {
    id: "11",
    name: "MySQL",
    category: "Database",
    level: 75,
    yearsOfExperience: 1,
    description: "Relational database management system",
    icon: "mysql",
    order: 2
  },
  {
    id: "12",
    name: "SQLite3",
    category: "Database",
    level: 70,
    yearsOfExperience: 1,
    description: "Lightweight embedded database",
    icon: "sqlite",
    order: 3
  },
  {
    id: "13",
    name: "Cloudinary",
    category: "Database",
    level: 75,
    yearsOfExperience: 1,
    description: "Cloud-based image and video management",
    icon: "cloudinary",
    order: 4
  },

  // Developer Tools
  {
    id: "14",
    name: "VS Code",
    category: "Tools",
    level: 90,
    yearsOfExperience: 3,
    description: "Primary code editor with extensive extensions",
    icon: "vscode",
    order: 1
  },
  {
    id: "15",
    name: "Git",
    category: "Tools",
    level: 85,
    yearsOfExperience: 3,
    description: "Version control and collaboration",
    icon: "git",
    order: 2
  },
  {
    id: "16",
    name: "GitHub",
    category: "Tools",
    level: 85,
    yearsOfExperience: 3,
    description: "Code hosting and project management platform",
    icon: "github",
    order: 3
  }
];
