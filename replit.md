# Portfolio Website

## Overview

This is a modern full-stack portfolio website built with React, TypeScript, and Express.js. The application features a clean, animated frontend showcasing skills, projects, and blog posts, along with an admin panel for content management. It uses a PostgreSQL database with Drizzle ORM for data persistence and includes a contact form system for visitor inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client-side application is built with React and TypeScript, using a modern component-based architecture:

- **Styling**: Tailwind CSS with shadcn/ui components for consistent, customizable UI elements
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Theme System**: Next-themes for dark/light mode support
- **Build Tool**: Vite for fast development and optimized production builds

The frontend uses a section-based layout (Hero, About, Skills, Projects, Blog, Contact) with smooth scrolling navigation. All UI components follow the shadcn/ui design system with custom color schemes and animations.

### Backend Architecture

The server is built with Express.js following a clean separation of concerns:

- **API Structure**: RESTful endpoints organized by resource type (skills, projects, blog posts, contact messages)
- **Data Layer**: Abstract storage interface (`IStorage`) allowing for different storage implementations
- **Schema Validation**: Zod schemas for type-safe request/response validation
- **Development Setup**: Vite middleware integration for seamless full-stack development

The backend provides CRUD operations for all content types and handles contact form submissions with proper validation and error handling.

### Database Design

PostgreSQL database with Drizzle ORM providing type-safe database operations:

- **Skills**: Categorized technical skills with proficiency levels and experience years
- **Projects**: Portfolio projects with descriptions, technologies, and featured status
- **Blog Posts**: Content management with draft/published states and categorization
- **Contact Messages**: Visitor inquiries with read status tracking
- **Users**: Authentication system for admin access (basic structure in place)

Each table uses UUID primary keys and includes appropriate indexing for performance.

### Content Management System

Admin interface providing comprehensive content management:

- **Skills Management**: Add, edit, and organize technical skills by category
- **Project Portfolio**: Manage project showcases with images, descriptions, and links
- **Blog System**: Create and publish blog posts with rich content support
- **Contact Center**: View and manage visitor inquiries and messages

The admin panel uses the same component system as the frontend for consistency, with specialized forms and data tables for content management.

## External Dependencies

### Core Framework Dependencies
- **React 18** with TypeScript for the frontend application
- **Express.js** for the backend API server
- **Vite** as the build tool and development server

### Database and ORM
- **PostgreSQL** as the primary database (configured via DATABASE_URL)
- **Drizzle ORM** for type-safe database operations and migrations
- **@neondatabase/serverless** for serverless PostgreSQL connections

### UI and Styling
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** component library based on Radix UI primitives
- **Framer Motion** for animations and transitions
- **Lucide React** for consistent iconography

### State Management and Data Fetching
- **TanStack Query** for server state management and caching
- **React Hook Form** with Zod resolvers for form handling and validation

### Development and Build Tools
- **TypeScript** for type safety across the full stack
- **ESBuild** for production server bundling
- **PostCSS** with Autoprefixer for CSS processing

The application is designed to be deployed on platforms like Replit, Vercel, or similar hosting services with PostgreSQL database support.