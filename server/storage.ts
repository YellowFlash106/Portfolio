import { 
  type User, 
  type InsertUser,
  type Skill,
  type InsertSkill,
  type Project,
  type InsertProject,
  type BlogPost,
  type InsertBlogPost,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Skills
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: string, skill: Partial<InsertSkill>): Promise<Skill | undefined>;
  deleteSkill(id: string): Promise<boolean>;
  
  // Projects
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;
  
  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
  
  // Contact Messages
  getAllContactMessages(): Promise<ContactMessage[]>;
  getContactMessage(id: string): Promise<ContactMessage | undefined>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<boolean>;
  deleteContactMessage(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private skills: Map<string, Skill>;
  private projects: Map<string, Project>;
  private blogPosts: Map<string, BlogPost>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.skills = new Map();
    this.projects = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Skills from Shubham Bairwa's resume
    const sampleSkills: Skill[] = [
      // Languages
      {
        id: randomUUID(),
        name: "C",
        category: "Languages",
        level: 85,
        yearsOfExperience: 3,
        description: "System programming and low-level development",
        icon: "c",
        order: 1
      },
      {
        id: randomUUID(),
        name: "Java",
        category: "Languages",
        level: 80,
        yearsOfExperience: 2,
        description: "Object-oriented programming and enterprise applications",
        icon: "java",
        order: 2
      },
      {
        id: randomUUID(),
        name: "JavaScript",
        category: "Languages",
        level: 90,
        yearsOfExperience: 3,
        description: "Full-stack JavaScript development and modern ES6+ features",
        icon: "javascript",
        order: 3
      },
      {
        id: randomUUID(),
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
        id: randomUUID(),
        name: "ReactJS",
        category: "Frontend",
        level: 88,
        yearsOfExperience: 2,
        description: "Modern React development with hooks and state management",
        icon: "react",
        order: 1
      },
      {
        id: randomUUID(),
        name: "Next.js",
        category: "Frontend",
        level: 82,
        yearsOfExperience: 1,
        description: "Full-stack React framework for production applications",
        icon: "nextjs",
        order: 2
      },
      {
        id: randomUUID(),
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
        id: randomUUID(),
        name: "ExpressJS",
        category: "Backend",
        level: 85,
        yearsOfExperience: 2,
        description: "Fast, unopinionated web framework for Node.js",
        icon: "express",
        order: 1
      },
      {
        id: randomUUID(),
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
        id: randomUUID(),
        name: "MongoDB",
        category: "Database",
        level: 80,
        yearsOfExperience: 2,
        description: "NoSQL database for modern applications",
        icon: "mongodb",
        order: 1
      },
      {
        id: randomUUID(),
        name: "MySQL",
        category: "Database",
        level: 75,
        yearsOfExperience: 1,
        description: "Relational database management system",
        icon: "mysql",
        order: 2
      },
      {
        id: randomUUID(),
        name: "SQLite3",
        category: "Database",
        level: 70,
        yearsOfExperience: 1,
        description: "Lightweight embedded database",
        icon: "sqlite",
        order: 3
      },
      {
        id: randomUUID(),
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
        id: randomUUID(),
        name: "VS Code",
        category: "Tools",
        level: 90,
        yearsOfExperience: 3,
        description: "Primary code editor with extensive extensions",
        icon: "vscode",
        order: 1
      },
      {
        id: randomUUID(),
        name: "Git",
        category: "Tools",
        level: 85,
        yearsOfExperience: 3,
        description: "Version control and collaboration",
        icon: "git",
        order: 2
      },
      {
        id: randomUUID(),
        name: "GitHub",
        category: "Tools",
        level: 85,
        yearsOfExperience: 3,
        description: "Code hosting and project management platform",
        icon: "github",
        order: 3
      }
    ];

    sampleSkills.forEach(skill => this.skills.set(skill.id, skill));

    // Projects from Shubham Bairwa's resume
    const sampleProjects: Project[] = [
      {
        id: randomUUID(),
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
        id: randomUUID(),
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
        id: randomUUID(),
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

    sampleProjects.forEach(project => this.projects.set(project.id, project));

    // Sample blog posts
    const sampleBlogPosts: BlogPost[] = [
      {
        id: randomUUID(),
        title: "Advanced React Hooks Patterns",
        excerpt: "Exploring custom hooks, compound components, and advanced patterns that make your React code more maintainable and reusable.",
        content: "Full blog post content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
        category: "React",
        readTime: 5,
        published: true,
        createdAt: new Date('2023-12-15'),
        updatedAt: new Date('2023-12-15')
      },
      {
        id: randomUUID(),
        title: "Scaling Node.js Applications",
        excerpt: "Best practices for scaling Node.js applications from prototype to production, including caching, load balancing, and microservices.",
        content: "Full blog post content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=400&fit=crop",
        category: "DevOps",
        readTime: 8,
        published: true,
        createdAt: new Date('2023-12-10'),
        updatedAt: new Date('2023-12-10')
      },
      {
        id: randomUUID(),
        title: "Design Systems That Scale",
        excerpt: "Creating maintainable design systems that grow with your product, from component libraries to design tokens and documentation.",
        content: "Full blog post content would go here...",
        imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop",
        category: "UI/UX",
        readTime: 6,
        published: true,
        createdAt: new Date('2023-12-05'),
        updatedAt: new Date('2023-12-05')
      }
    ];

    sampleBlogPosts.forEach(post => this.blogPosts.set(post.id, post));
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Skill methods
  async getAllSkills(): Promise<Skill[]> {
    return Array.from(this.skills.values()).sort((a, b) => 
      a.category.localeCompare(b.category) || (a.order ?? 0) - (b.order ?? 0)
    );
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return Array.from(this.skills.values())
      .filter(skill => skill.category === category)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const id = randomUUID();
    const newSkill: Skill = {
      id,
      name: skill.name,
      category: skill.category,
      level: skill.level,
      yearsOfExperience: skill.yearsOfExperience,
      description: skill.description ?? null,
      icon: skill.icon ?? null,
      order: skill.order ?? null
    };
    this.skills.set(id, newSkill);
    return newSkill;
  }

  async updateSkill(id: string, skillUpdate: Partial<InsertSkill>): Promise<Skill | undefined> {
    const skill = this.skills.get(id);
    if (!skill) return undefined;
    
    const updatedSkill = { ...skill, ...skillUpdate };
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = randomUUID();
    const newProject: Project = {
      id,
      title: project.title,
      description: project.description,
      longDescription: project.longDescription ?? null,
      imageUrl: project.imageUrl,
      demoUrl: project.demoUrl ?? null,
      codeUrl: project.codeUrl ?? null,
      technologies: project.technologies ?? null,
      featured: project.featured ?? null,
      order: project.order ?? null,
      createdAt: new Date()
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async updateProject(id: string, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject = { ...project, ...projectUpdate };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: string): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt ?? new Date()).getTime() - new Date(a.createdAt ?? new Date()).getTime()
    );
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => new Date(b.createdAt ?? new Date()).getTime() - new Date(a.createdAt ?? new Date()).getTime());
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const newBlogPost: BlogPost = {
      id,
      title: blogPost.title,
      excerpt: blogPost.excerpt,
      content: blogPost.content,
      imageUrl: blogPost.imageUrl ?? null,
      category: blogPost.category,
      readTime: blogPost.readTime,
      published: blogPost.published ?? null,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, newBlogPost);
    return newBlogPost;
  }

  async updateBlogPost(id: string, blogPostUpdate: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const blogPost = this.blogPosts.get(id);
    if (!blogPost) return undefined;
    
    const updatedBlogPost = { 
      ...blogPost, 
      ...blogPostUpdate, 
      updatedAt: new Date() 
    };
    this.blogPosts.set(id, updatedBlogPost);
    return updatedBlogPost;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  // Contact message methods
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort((a, b) => 
      new Date(b.createdAt ?? new Date()).getTime() - new Date(a.createdAt ?? new Date()).getTime()
    );
  }

  async getContactMessage(id: string): Promise<ContactMessage | undefined> {
    return this.contactMessages.get(id);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const newMessage: ContactMessage = { 
      ...message, 
      id, 
      read: false,
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.contactMessages.get(id);
    if (!message) return false;
    
    const updatedMessage = { ...message, read: true };
    this.contactMessages.set(id, updatedMessage);
    return true;
  }

  async deleteContactMessage(id: string): Promise<boolean> {
    return this.contactMessages.delete(id);
  }
}

export const storage = new MemStorage();
