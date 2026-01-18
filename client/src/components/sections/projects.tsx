import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Github } from "lucide-react";
import { ProjectModal } from "@/components/ui/project-modal";
import { type Project } from "@shared/schema";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    select: (data) => data.filter(project => project.featured),
  });

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (isLoading) {
    return (
      <section className="py-20 dark:bg-gray-900 bg-gray-50" data-testid="projects-loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 dark:bg-gray-900 bg-gray-50 relative overflow-hidden" data-testid="projects-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4" data-testid="projects-title">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto" data-testid="projects-subtitle">
            A showcase of my latest work and creative solutions.
          </p>
        </motion.div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group dark:bg-gray-800 bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                rotateY: 5, 
                rotateX: 5, 
                translateZ: 20,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
              data-testid={`project-card-${project.id}`}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(project)}
                        className="px-4 py-2 bg-accent-cyan text-black rounded-lg text-sm font-medium hover:bg-accent-teal transition-colors duration-200"
                        data-testid={`button-view-details-${project.id}`}
                      >
                        View Details
                      </button>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 border border-white text-white rounded-lg text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 flex items-center gap-1"
                          data-testid={`link-demo-${project.id}`}
                        >
                          <ExternalLink size={14} />
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold dark:text-white text-gray-800" data-testid={`project-title-${project.id}`}>
                    {project.title}
                  </h3>
                  <div className="flex space-x-1">
                    <span className="w-3 h-3 bg-accent-cyan rounded-full"></span>
                    <span className="w-3 h-3 bg-accent-teal rounded-full"></span>
                    <span className="w-3 h-3 bg-accent-coral rounded-full"></span>
                  </div>
                </div>
                <p className="dark:text-gray-400 text-gray-600 text-sm mb-4" data-testid={`project-description-${project.id}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2" data-testid={`project-technologies-${project.id}`}>
                  {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={tech}
                      className={`px-2 py-1 text-xs rounded-full ${
                        techIndex % 3 === 0 ? 'bg-accent-cyan/20 text-accent-cyan' :
                        techIndex % 3 === 1 ? 'bg-accent-teal/20 text-accent-teal' :
                        'bg-accent-coral/20 text-accent-coral'
                      }`}
                      data-testid={`tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies && project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {projects.length === 0 && (
          <div className="text-center py-12" data-testid="no-projects">
            <p className="dark:text-gray-400 text-gray-600">
              No featured projects available.
            </p>
          </div>
        )}
        
        {/* View More Button */}
        {projects.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <a 
              href="https://github.com/YellowFlash106" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 border-2 dark:border-accent-cyan border-accent-teal dark:text-accent-cyan text-accent-teal font-semibold rounded-full hover:bg-accent-cyan/10 transform hover:scale-105 transition-all duration-300"
            >
              View All Projects
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        )}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
