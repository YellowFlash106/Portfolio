import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { type Project } from "@shared/schema";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="project-modal"
        >
          <motion.div
            className="absolute inset-0 bg-black/80"
            onClick={onClose}
            data-testid="modal-backdrop"
          />
          <motion.div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto dark:bg-gray-800 bg-white rounded-2xl shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ duration: 0.3 }}
            data-testid="modal-content"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold dark:text-white text-gray-800" data-testid="modal-title">
                  {project.title}
                </h3>
                <button
                  onClick={onClose}
                  className="text-2xl dark:text-gray-400 text-gray-600 hover:text-accent-cyan transition-colors duration-200"
                  data-testid="button-close-modal"
                >
                  <X />
                </button>
              </div>
              
              <div className="mb-6">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-lg"
                  data-testid="modal-image"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
                    Project Overview
                  </h4>
                  <p className="dark:text-gray-300 text-gray-700 mb-6" data-testid="modal-description">
                    {project.longDescription || project.description}
                  </p>
                  
                  <h4 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
                    Key Features
                  </h4>
                  <ul className="space-y-2 dark:text-gray-300 text-gray-700 mb-6">
                    <li className="flex items-center">
                      <i className="fas fa-check text-accent-cyan mr-2"></i>
                      Modern React architecture
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-accent-cyan mr-2"></i>
                      Responsive design
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-accent-cyan mr-2"></i>
                      Real-time functionality
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-accent-cyan mr-2"></i>
                      Optimized performance
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold mb-4 dark:text-white text-gray-800">
                    Technologies Used
                  </h4>
                  <div className="grid grid-cols-2 gap-2 mb-6" data-testid="modal-technologies">
                    {project.technologies?.map((tech, index) => (
                      <span
                        key={tech}
                        className={`px-3 py-2 text-sm rounded-lg text-center ${
                          index % 3 === 0 ? 'bg-accent-cyan/20 text-accent-cyan' :
                          index % 3 === 1 ? 'bg-accent-teal/20 text-accent-teal' :
                          'bg-accent-coral/20 text-accent-coral'
                        }`}
                        data-testid={`tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-cyan to-accent-teal text-black text-center rounded-lg font-medium hover:from-accent-teal hover:to-accent-cyan transition-all duration-300 flex items-center justify-center gap-2"
                        data-testid="link-demo"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 border dark:border-accent-cyan border-accent-teal dark:text-accent-cyan text-accent-teal text-center rounded-lg font-medium hover:bg-accent-cyan/10 transition-all duration-300 flex items-center justify-center gap-2"
                        data-testid="link-code"
                      >
                        <Github size={16} />
                        View Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
