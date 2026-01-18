import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="skill-item">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" data-testid={`skill-name-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
          {name}
        </span>
        <span className="text-sm dark:text-gray-400 text-gray-600" data-testid={`skill-level-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
          {level}%
        </span>
      </div>
      <div className="w-full dark:bg-gray-700 bg-gray-300 rounded-full h-2 skill-bar">
        <motion.div
          className="bg-gradient-to-r from-accent-cyan to-accent-teal h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: isVisible ? `${level}%` : 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: delay / 1000 }}
          data-testid={`skill-bar-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
        />
      </div>
    </div>
  );
}
