import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Code, Server, Database, Cloud, Wrench, Globe } from "lucide-react";
import { type Skill } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categoryIcons = {
  Frontend: Code,
  Backend: Server,
  Database: Database,
  DevOps: Cloud,
  Tools: Wrench,
  Languages: Globe,
};

// Icon mapping for skills
const skillIcons: Record<string, any> = {
  // Languages
  "JavaScript": "⚡",
  "TypeScript": "🔷",
  "Python": "🐍",
  "Java": "☕",
  "C++": "⚙️",
  "C#": "🔷",
  "Go": "🐹",
  "Rust": "🦀",
  "PHP": "🐘",
  "Ruby": "💎",
  "Swift": "🦉",
  "Kotlin": "🎯",

  // Frontend
  "React": "⚛️",
  "Vue.js": "💚",
  "Angular": "🅰️",
  "Next.js": "▲",
  "Nuxt.js": "💚",
  "Svelte": "🧡",
  "HTML": "🏗️",
  "CSS": "🎨",
  "Sass": "💅",
  "Tailwind CSS": "🎨",
  "Bootstrap": "🅱️",
  "Material-UI": "🎨",

  // Backend
  "Node.js": "🟢",
  "Express": "🚂",
  "Django": "🎸",
  "Flask": "🧪",
  "Spring": "🌱",
  "Laravel": "🐆",
  "Ruby on Rails": "🚂",
  "ASP.NET": "🔵",
  "FastAPI": "⚡",

  // Database
  "PostgreSQL": "🐘",
  "MySQL": "🗄️",
  "MongoDB": "🍃",
  "Redis": "🔴",
  "SQLite": "📱",
  "Firebase": "🔥",
  "Supabase": "⚡",

  // DevOps/Cloud
  "Docker": "🐳",
  "Kubernetes": "☸️",
  "AWS": "☁️",
  "Azure": "☁️",
  "GCP": "☁️",
  "Vercel": "▲",
  "Netlify": "🌐",
  "Heroku": "◼️",
  "Git": "📚",
  "GitHub": "🐙",
  "GitLab": "🦊",

  // Tools
  "VS Code": "💻",
  "Figma": "🎨",
  "Postman": "📮",
  "Jest": "🃏",
  "Webpack": "📦",
  "Vite": "⚡",
  "ESLint": "🔍",
  "Prettier": "💅",
};

export function Skills() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: skills = [], isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedSkills = categories.reduce((acc, category) => {
    acc[category] = filteredSkills.filter(skill => skill.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (isLoading) {
    return (
      <section className="py-20 dark:bg-black bg-white relative" data-testid="skills-loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading skills...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 dark:bg-black bg-white relative" data-testid="skills-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4" data-testid="skills-title">
            <span className="text-gradient">Skills & Technologies</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto" data-testid="skills-subtitle">
            The tools and technologies I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 dark:bg-gray-800 bg-white border-gray-300 dark:border-gray-700"
              data-testid="input-search-skills"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full dark:bg-gray-800 bg-gray-100" data-testid="skills-tabs">
              <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
              {categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  data-testid={`tab-${category.toLowerCase()}`}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory === "all" ? (
            categories.map((category, categoryIndex) => {
              const categorySkills = groupedSkills[category];
              if (categorySkills.length === 0) return null;
              
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
              
              return (
                <motion.div
                  key={category}
                  className="dark:bg-gray-900 bg-gray-50 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    rotateY: 5, 
                    rotateX: 5, 
                    translateZ: 20,
                    transition: { duration: 0.3 }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  data-testid={`skills-category-${category.toLowerCase()}`}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-cyan to-accent-teal rounded-full flex items-center justify-center text-2xl text-black">
                      <IconComponent />
                    </div>
                    <h3 className="text-xl font-semibold dark:text-white text-gray-800">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    {categorySkills.slice(0, 3).map((skill: Skill, index: number) => {
                      const skillIcon = skillIcons[skill.name] || "💡";
                      return (
                        <motion.div
                          key={skill.id}
                          className="flex items-center space-x-3 p-3 dark:bg-gray-700 bg-gray-100 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <span className="text-2xl">{skillIcon}</span>
                          <span className="dark:text-white text-gray-800 font-medium">{skill.name}</span>
                        </motion.div>
                      );
                    })}
                    {categorySkills.length > 3 && (
                      <div className="text-sm dark:text-gray-400 text-gray-600 text-center pt-2">
                        +{categorySkills.length - 3} more skills
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              className="col-span-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredSkills.map((skill, index) => {
                  const skillIcon = skillIcons[skill.name] || "💡";
                  
                  return (
                    <motion.div
                      key={skill.id}
                      className="dark:bg-gray-800 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group"
                      initial={{ opacity: 0, y: 50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        rotateY: 10,
                        rotateX: 10,
                        z: 50,
                        transition: { duration: 0.3 }
                      }}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`skill-card-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      <div className="text-center">
                        <motion.div 
                          className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                        >
                          {skillIcon}
                        </motion.div>
                        <motion.h4 
                          className="font-semibold dark:text-white text-gray-800 mb-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {skill.name}
                        </motion.h4>
                        {skill.description && (
                          <motion.p 
                            className="text-sm dark:text-gray-400 text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            {skill.description}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {filteredSkills.length === 0 && (
                <div className="text-center py-12" data-testid="no-skills-found">
                  <p className="dark:text-gray-400 text-gray-600">
                    No skills found matching your search criteria.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
