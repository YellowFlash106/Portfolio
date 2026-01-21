import { type Project } from "@shared/schema";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "S-Commerce",
    description: "Full-stack e-commerce platform with React/Vite frontend and Node.js/Express backend powered by MongoDB.",
    longDescription: "Built a comprehensive full-stack e-commerce platform featuring a React/Vite frontend with Shadcn UI and Tailwind CSS, paired with a robust Node.js/Express backend using MongoDB. Implemented complete shopping experience including product browsing with advanced filtering and sorting, cart management, secure checkout flow, order tracking, and PayPal payment integration. Developed a secure user authentication system with JWT tokens and role-based access control for both customers and administrators. Created a comprehensive admin dashboard for inventory management, order processing with real-time status updates, sales analytics, and featured product configuration. Integrated Cloudinary for efficient product image management and storage.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop",
    demoUrl: "https://github.com/YellowFlash106/SCommerce",
    codeUrl: "https://github.com/YellowFlash106/SCommerce",
    technologies: ["ExpressJS", "MongoDB", "NodeJS", "React", "Redux", "PayPal API", "Cloudinary", "JWT", "Tailwind CSS", "Shadcn UI"],
    featured: true,
    order: 1,
    createdAt: new Date()
  },
  {
    id: "2",
    title: "StreamOn",
    description: "Social communication platform with real-time messaging, video calls, and language exchange features.",
    longDescription: "Developed a comprehensive social communication platform leveraging Stream's Chat & Video APIs to enable scalable real-time messaging, group and one-on-one video calls, screen sharing, and recording capabilities. Implemented advanced features including typing indicators, message reactions, activity feeds, and comprehensive moderation tools to ensure safe and engaging user interactions. Built robust JWT-based authentication system with protected routes for secure user access and personalization, featuring 32 unique UI themes. Designed the platform as a language exchange and social interaction hub to enhance global collaboration and user retention, utilizing modern MERN stack technologies with TanStack Query for efficient data fetching and state management.",
    imageUrl: "/Son.png",
    demoUrl: "https://streamon-1.onrender.com/",
    codeUrl: "https://github.com/YellowFlash106/streamOn",
    technologies: ["MERN", "Tailwind CSS", "JWT Authentication", "TanStack Query", "Stream API", "Socket.io", "React", "Node.js", "MongoDB", "Express"],
    featured: true,
    order: 2,
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Tasky",
    description: "Full-stack task management web application with JWT authentication and complete CRUD functionality.",
    longDescription: "Built a comprehensive full-stack task management web application featuring secure JWT authentication and complete user profile management system. Engineered a robust backend using Node.js, Express, and MongoDB with bcrypt password hashing, token validation, and comprehensive error handling. Designed a responsive and interactive dashboard using React, Vite, and Tailwind CSS, incorporating modal-based task editors, advanced filtering capabilities, and toast notifications for enhanced user feedback. Implemented real-time UI updates and structured API communication to ensure optimal user experience and application reliability, with thorough client and server-side validation.",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
    demoUrl: "https://tasky-two-pi.vercel.app/",
    codeUrl: "https://github.com/YellowFlash106/Tasky",
    technologies: ["ExpressJS", "MongoDB", "NodeJS", "React", "JWT", "bcrypt", "Date-fns", "Tailwind CSS", "Vite"],
    featured: true,
    order: 3,
    createdAt: new Date()
  }
];
