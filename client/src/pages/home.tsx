import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen font-inter antialiased bg-background text-foreground transition-colors duration-300" data-testid="home-page">
      {/* Particle Background */}
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-accent-cyan to-accent-teal text-black rounded-full shadow-lg hover:shadow-xl z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              boxShadow: [
                "0 0 5px var(--accent-cyan)",
                "0 0 15px var(--accent-cyan)", 
                "0 0 5px var(--accent-cyan)"
              ]
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { duration: 0.2 }
            }}
            data-testid="button-back-to-top"
          >
            <ArrowUp className="w-6 h-6 mx-auto" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
