import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export function About() {
  const [counts, setCounts] = useState({ projects: 0, batch: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const targets = { projects: 15, batch: 3 };
    const duration = 2000;
    const stepTime = 50;
    const steps = duration / stepTime;

    Object.entries(targets).forEach(([key, target]) => {
      let current = 0;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounts(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, stepTime);
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-20 dark:bg-gray-900 bg-gray-50 relative overflow-hidden"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4" data-testid="about-title">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto" data-testid="about-subtitle">
            Computer Science student at Indian Institute of Information Technology Sricity, passionate about full-stack development.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              data-testid="about-journey"
            >
              <h3 className="text-2xl font-semibold mb-4 dark:text-accent-cyan text-accent-teal">
                My Journey
              </h3>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed">
                I'm a Computer Science student at IIIT Sricity pursuing my B.Tech degree. 
                I specialize in full-stack web development with expertise in React, Node.js, and modern JavaScript technologies.
                Currently leading the web development team in the Epoch club at my college.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              data-testid="about-focus"
            >
              <h3 className="text-2xl font-semibold mb-4 dark:text-accent-cyan text-accent-teal">
                What I Do
              </h3>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed">
                From concept to deployment, I handle the entire development lifecycle. I love building full-stack applications,
                implementing secure authentication systems, and creating intuitive user interfaces that solve real-world problems.
              </p>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 gap-4 pt-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              data-testid="about-stats"
            >
              <div className="text-center p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-gradient mb-2" data-testid="stat-projects">
                  {counts.projects}+
                </div>
                <div className="text-sm dark:text-gray-400 text-gray-600">Projects</div>
              </div>
              <div className="text-center p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg">
                <div className="text-3xl font-bold text-gradient mb-2" data-testid="stat-batch">
                  {counts.batch}rd
                </div>
                <div className="text-sm dark:text-gray-400 text-gray-600">Year of B.Tech</div>
              </div>
            </motion.div>
          </div>
          
          {/* Visual Content */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Main image container with 3D effect */}
            <motion.div 
              className="relative z-10"
              whileHover={{ 
                rotateY: 5, 
                rotateX: 5, 
                translateZ: 20,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: "preserve-3d" }}
              data-testid="about-image"
            >
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop" 
                alt="Modern developer workspace with dual monitors and code" 
                className="rounded-2xl shadow-2xl w-full h-auto" 
              />
              {/* Overlay with tech stack */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl flex items-end">
                <div className="p-6 text-white">
                  <div className="font-semibold mb-2">Current Tech Stack</div>
                  <div className="flex flex-wrap gap-2" data-testid="tech-stack">
                    <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-xs rounded-full">React</span>
                    <span className="px-3 py-1 bg-accent-teal/20 text-accent-teal text-xs rounded-full">Node.js</span>
                    <span className="px-3 py-1 bg-accent-coral/20 text-accent-coral text-xs rounded-full">MongoDB</span>
                    <span className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan text-xs rounded-full">Express</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background decoration */}
            <motion.div
              className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-cyan to-accent-teal opacity-20 rounded-full blur-xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-accent-coral to-accent-teal opacity-20 rounded-full blur-xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
