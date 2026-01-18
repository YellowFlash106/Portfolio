import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { type BlogPost } from "@shared/schema";

export function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
    select: (data) => data.filter(post => post.published).slice(0, 3),
  });

  if (isLoading) {
    return (
      <section className="py-20 dark:bg-black bg-white" data-testid="blog-loading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">Loading blog posts...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 dark:bg-black bg-white relative" data-testid="blog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4" data-testid="blog-title">
            <span className="text-gradient">Latest Blog Posts</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto" data-testid="blog-subtitle">
            Thoughts on technology, development, and everything in between.
          </p>
        </motion.div>
        
        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group dark:bg-gray-900 bg-gray-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3 }
              }}
              data-testid={`blog-post-${post.id}`}
            >
              <div className="relative overflow-hidden">
                {post.imageUrl && (
                  <img 
                    src={post.imageUrl} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent-cyan text-black text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm dark:text-gray-400 text-gray-600 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span data-testid={`blog-date-${post.id}`}>
                    {new Date(post.createdAt ?? new Date()).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                  <span className="mx-2">•</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime} min read</span>
                </div>
                <h3 className="text-xl font-semibold dark:text-white text-gray-800 mb-3 group-hover:text-accent-cyan transition-colors duration-200" data-testid={`blog-title-${post.id}`}>
                  {post.title}
                </h3>
                <p className="dark:text-gray-400 text-gray-600 text-sm mb-4" data-testid={`blog-excerpt-${post.id}`}>
                  {post.excerpt}
                </p>
                <button className="inline-flex items-center text-accent-cyan hover:text-accent-teal transition-colors duration-200 text-sm font-medium" data-testid={`button-read-more-${post.id}`}>
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <div className="text-center py-12" data-testid="no-blog-posts">
            <p className="dark:text-gray-400 text-gray-600">
              No blog posts available.
            </p>
          </div>
        )}
        
        {/* View All Posts Button */}
        {blogPosts.length > 0 && (
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-teal text-black font-semibold rounded-full hover:from-accent-teal hover:to-accent-cyan transition-all duration-300"
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
              data-testid="button-view-all-posts"
            >
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
