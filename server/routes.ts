import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertSkillSchema, 
  insertProjectSchema, 
  insertBlogPostSchema, 
  insertContactMessageSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const isDevelopment = app.get("env") === "development";
  
  // Skills routes
  app.get("/api/skills", async (req, res) => {
    try {
      const category = req.query.category as string;
      const skills = category 
        ? await storage.getSkillsByCategory(category)
        : await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  // Admin routes - only available in development
  if (isDevelopment) {
    app.post("/api/skills", async (req, res) => {
      try {
        const skillData = insertSkillSchema.parse(req.body);
        const skill = await storage.createSkill(skillData);
        res.status(201).json(skill);
      } catch (error) {
        res.status(400).json({ message: "Invalid skill data" });
      }
    });

    app.put("/api/skills/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const skillData = insertSkillSchema.partial().parse(req.body);
        const skill = await storage.updateSkill(id, skillData);
        if (!skill) {
          return res.status(404).json({ message: "Skill not found" });
        }
        res.json(skill);
      } catch (error) {
        res.status(400).json({ message: "Invalid skill data" });
      }
    });

    app.delete("/api/skills/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteSkill(id);
      if (!deleted) {
        return res.status(404).json({ message: "Skill not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete skill" });
    }
  });
  }

  // Projects routes
  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const projects = featured 
        ? await storage.getFeaturedProjects()
        : await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Admin routes - only available in development
  if (isDevelopment) {
    app.post("/api/projects", async (req, res) => {
      try {
        const projectData = insertProjectSchema.parse(req.body);
        const project = await storage.createProject(projectData);
        res.status(201).json(project);
      } catch (error) {
        res.status(400).json({ message: "Invalid project data" });
      }
    });

    app.put("/api/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const projectData = insertProjectSchema.partial().parse(req.body);
        const project = await storage.updateProject(id, projectData);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
      } catch (error) {
        res.status(400).json({ message: "Invalid project data" });
      }
    });

    app.delete("/api/projects/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await storage.deleteProject(id);
        if (!deleted) {
          return res.status(404).json({ message: "Project not found" });
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete project" });
      }
    });
  }

  // Blog posts routes
  app.get("/api/blog", async (req, res) => {
    try {
      const published = req.query.published !== 'false';
      const blogPosts = published 
        ? await storage.getPublishedBlogPosts()
        : await storage.getAllBlogPosts();
      res.json(blogPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const blogPost = await storage.getBlogPost(id);
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blogPost);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  // Admin routes - only available in development
  if (isDevelopment) {
    app.post("/api/blog", async (req, res) => {
      try {
        const blogPostData = insertBlogPostSchema.parse(req.body);
        const blogPost = await storage.createBlogPost(blogPostData);
        res.status(201).json(blogPost);
      } catch (error) {
        res.status(400).json({ message: "Invalid blog post data" });
      }
    });

    app.put("/api/blog/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const blogPostData = insertBlogPostSchema.partial().parse(req.body);
        const blogPost = await storage.updateBlogPost(id, blogPostData);
        if (!blogPost) {
          return res.status(404).json({ message: "Blog post not found" });
        }
        res.json(blogPost);
      } catch (error) {
        res.status(400).json({ message: "Invalid blog post data" });
      }
    });

    app.delete("/api/blog/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await storage.deleteBlogPost(id);
        if (!deleted) {
          return res.status(404).json({ message: "Blog post not found" });
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete blog post" });
      }
    });
  }

  // Contact routes
  app.post("/api/contact", async (req, res) => {
    try {
      console.log("Contact form received:", req.body);
      
      // Sanitize input
      const sanitizedBody = {
        firstName: (req.body.firstName || '').trim().substring(0, 100),
        lastName: (req.body.lastName || '').trim().substring(0, 100),
        email: (req.body.email || '').trim().toLowerCase().substring(0, 254),
        subject: (req.body.subject || '').trim().substring(0, 200),
        message: (req.body.message || '').trim().substring(0, 1000),
      };

      console.log("Sanitized data:", sanitizedBody);

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(sanitizedBody.email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Check for minimum lengths
      if (sanitizedBody.firstName.length < 2 || sanitizedBody.message.length < 10) {
        return res.status(400).json({ message: "First name must be at least 2 characters and message at least 10 characters" });
      }

      const messageData = insertContactMessageSchema.parse(sanitizedBody);
      console.log("Parsed message data:", messageData);
      
      const message = await storage.createContactMessage(messageData);
      console.log("Message created:", message);
      
      res.status(201).json({ message: "Message sent successfully", id: message.id });
    } catch (error: any) {
      console.error("Contact message error:", error);
      res.status(400).json({ message: error?.message || "Invalid contact message data" });
    }
  });

  // Admin routes - only available in development
  if (isDevelopment) {
    app.get("/api/contact", async (req, res) => {
      try {
        const messages = await storage.getAllContactMessages();
        res.json(messages);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch contact messages" });
      }
    });

    app.put("/api/contact/:id/read", async (req, res) => {
      try {
        const { id } = req.params;
        const updated = await storage.markMessageAsRead(id);
        if (!updated) {
          return res.status(404).json({ message: "Message not found" });
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Failed to mark message as read" });
      }
    });

    app.delete("/api/contact/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const deleted = await storage.deleteContactMessage(id);
        if (!deleted) {
          return res.status(404).json({ message: "Message not found" });
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Failed to delete message" });
      }
    });
  }

  const httpServer = createServer(app);
  return httpServer;
}
