import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <footer className="dark:bg-black bg-white py-12 border-t dark:border-gray-800 border-gray-200" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-space font-bold text-gradient mb-2" data-testid="footer-name">
              Shubham Bairwa
            </h3>
            <p className="dark:text-gray-400 text-gray-600" data-testid="footer-title">
              Full Stack Developer & Computer Science Student
            </p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            data-testid="social-links"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="dark:text-gray-400 text-gray-600 hover:text-accent-cyan transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`link-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-sm dark:text-gray-500 text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            data-testid="footer-copyright"
          >
            <p>&copy; {currentYear} Shubham Bairwa. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ using React, Express, and Tailwind CSS</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
