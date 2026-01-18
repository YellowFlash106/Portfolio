import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Full Stack Developer",
    "React Specialist", 
    "MERN Stack Expert",
    "IIIT Sricity Student",
    "Problem Solver"
  ];

  useEffect(() => {
    const type = () => {
      const current = phrases[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(type, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, phrases]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden dark:gradient-bg light-gradient-bg"
      data-testid="hero-section"
    >
      <div className="text-center z-10 px-4 sm:px-6 lg:px-8">
        {/* Animated Avatar */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="w-32 h-32 mx-auto rounded-full relative overflow-hidden border-4 border-accent-cyan/50"
            animate={{ 
              boxShadow: [
                "0 0 5px var(--accent-cyan), 0 0 10px var(--accent-cyan), 0 0 15px var(--accent-cyan)",
                "0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan), 0 0 30px var(--accent-cyan)",
                "0 0 5px var(--accent-cyan), 0 0 10px var(--accent-cyan), 0 0 15px var(--accent-cyan)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            data-testid="hero-avatar"
          >
            <img 
              src="https://imgs.search.brave.com/4DIrwtgvseHDhZTxZGuxeMBylOfxiXrI1CBLisp4kDY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zYWJp/bWFnZXMuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzA4/L0FuaW1lLWJveS1k/cDExLmpwZw" 
              alt="Shubham Bairwa - Full Stack Developer" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
          
          {/* Floating elements around avatar */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 bg-accent-coral rounded-full"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent-teal rounded-full"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </motion.div>
        
        {/* Animated Text */}
        <motion.h1 
          className="text-5xl md:text-7xl font-space font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-testid="hero-name"
        >
          <span className="text-gradient">Shubham Bairwa</span>
        </motion.h1>
        
        <motion.div 
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          data-testid="hero-subtitle"
        >
          <span className="font-jetbrains dark:text-accent-cyan text-accent-teal">&lt;</span>
          <span className="dark:text-gray-300 text-gray-700 min-w-[300px] inline-block text-left">
            {currentText}
          </span>
          <span className="font-jetbrains dark:text-accent-cyan text-accent-teal">/&gt;</span>
          <motion.span 
            className="animate-pulse"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            |
          </motion.span>
        </motion.div>
        
        <motion.p 
          className="text-lg md:text-xl dark:text-gray-400 text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          data-testid="hero-description"
        >
          Crafting exceptional digital experiences with modern technologies. 
          Computer Science student at Indian Institute of Information Technology Sricity, passionate about full-stack development and innovative solutions.
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          data-testid="hero-cta"
        >
          <motion.button
            onClick={() => handleNavClick("#projects")}
            className="px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-teal text-black font-semibold rounded-full hover:from-accent-teal hover:to-accent-cyan transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 5px var(--accent-cyan)",
                "0 0 15px var(--accent-cyan)",
                "0 0 5px var(--accent-cyan)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            data-testid="button-view-work"
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() => handleNavClick("#contact")}
            className="px-8 py-4 border-2 dark:border-accent-cyan border-accent-teal dark:text-accent-cyan text-accent-teal font-semibold rounded-full hover:bg-accent-cyan/10 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-testid="button-contact"
          >
            Get In Touch
          </motion.button>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          data-testid="scroll-indicator"
        >
          <button
            onClick={() => handleNavClick("#about")}
            className="text-2xl dark:text-accent-cyan text-accent-teal"
            data-testid="button-scroll-down"
          >
            <ChevronDown />
          </button>
        </motion.div>
      </div>
      
      {/* Floating Code Elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20 font-jetbrains text-sm hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        data-testid="floating-code-left"
      >
        const developer = {"{"}
        <br />&nbsp;&nbsp;name: 'Shubham',
        <br />&nbsp;&nbsp;passion: 'coding'
        <br />{"}"};
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 opacity-20 font-jetbrains text-sm hidden lg:block"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        data-testid="floating-code-right"
      >
        while(true) {"{"}
        <br />&nbsp;&nbsp;code();
        <br />&nbsp;&nbsp;coffee();
        <br />{"}"};
      </motion.div>
    </section>
  );
}
