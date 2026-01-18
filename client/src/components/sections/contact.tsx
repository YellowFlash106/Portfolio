import { motion } from "framer-motion";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    try {
      const validatedData = insertContactMessageSchema.parse(formData);
      contactMutation.mutate(validatedData);
    } catch (error) {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure all fields are completed correctly.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "jalwaniyash702@gmail.com",
      color: "from-accent-cyan to-accent-teal"
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 8003534025",
      color: "from-accent-teal to-accent-coral"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jaipur, Rajasthan",
      color: "from-accent-coral to-accent-cyan"
    }
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  ];

  return (
    <section id="contact" className="py-20 dark:bg-gray-900 bg-gray-50 relative overflow-hidden" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold mb-4" data-testid="contact-title">
            <span className="text-gradient">Let's Work Together</span>
          </h2>
          <p className="text-lg dark:text-gray-400 text-gray-600 max-w-2xl mx-auto" data-testid="contact-subtitle">
            Ready to bring your ideas to life? Let's discuss your next project.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-6 dark:text-white text-gray-800" data-testid="contact-info-title">
                Get In Touch
              </h3>
              <p className="text-lg dark:text-gray-300 text-gray-700 leading-relaxed mb-8" data-testid="contact-description">
                I'm always excited to take on new challenges and collaborate on interesting projects. 
                Whether you need a full-stack solution or just want to chat about technology, feel free to reach out!
              </p>
            </motion.div>
            
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  className="flex items-center space-x-4 p-4 dark:bg-gray-800 bg-white rounded-lg shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  data-testid={`contact-method-${method.title.toLowerCase()}`}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center text-black`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold dark:text-white text-gray-800">{method.title}</h4>
                    <p className="dark:text-gray-400 text-gray-600">{method.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <motion.div 
              className="pt-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-4 dark:text-white text-gray-800">Follow Me</h4>
              <div className="flex space-x-4" data-testid="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gradient-to-br ${
                      index === 0 ? 'from-accent-cyan to-accent-teal' :
                      index === 1 ? 'from-accent-teal to-accent-coral' :
                      'from-accent-coral to-accent-cyan'
                    } rounded-full flex items-center justify-center text-black transition-transform duration-200`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`link-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Contact Form */}
          <motion.div 
            className="dark:bg-gray-800 bg-white p-8 rounded-2xl shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            data-testid="contact-form"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    First Name *
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-800 border-transparent focus:border-accent-cyan"
                    placeholder="John"
                    required
                    data-testid="input-first-name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-800 border-transparent focus:border-accent-cyan"
                    placeholder="Doe"
                    required
                    data-testid="input-last-name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-800 border-transparent focus:border-accent-cyan"
                  placeholder="john@example.com"
                  required
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Subject *
                </label>
                <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                  <SelectTrigger className="dark:bg-gray-700 bg-gray-100 border-transparent focus:border-accent-cyan" data-testid="select-subject">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project Inquiry">Project Inquiry</SelectItem>
                    <SelectItem value="Collaboration">Collaboration</SelectItem>
                    <SelectItem value="General Question">General Question</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  rows={5}
                  className="dark:bg-gray-700 bg-gray-100 dark:text-white text-gray-800 border-transparent focus:border-accent-cyan resize-none"
                  placeholder="Tell me about your project..."
                  required
                  data-testid="textarea-message"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-teal text-black font-semibold rounded-lg hover:from-accent-teal hover:to-accent-cyan transition-all duration-300"
                disabled={contactMutation.isPending}
                data-testid="button-send-message"
              >
                {contactMutation.isPending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
