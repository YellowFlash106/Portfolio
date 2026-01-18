import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Eye, Mail, MessageSquare, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  type Skill, 
  type Project, 
  type BlogPost, 
  type ContactMessage,
  type InsertSkill,
  type InsertProject,
  type InsertBlogPost,
  insertSkillSchema,
  insertProjectSchema,
  insertBlogPostSchema
} from "@shared/schema";

export default function Admin() {
  const [selectedTab, setSelectedTab] = useState("skills");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: skills = [] } = useQuery<Skill[]>({ queryKey: ["/api/skills"] });
  const { data: projects = [] } = useQuery<Project[]>({ queryKey: ["/api/projects"] });
  const { data: blogPosts = [] } = useQuery<BlogPost[]>({ queryKey: ["/api/blog"] });
  const { data: messages = [] } = useQuery<ContactMessage[]>({ queryKey: ["/api/contact"] });

  // Skills Management
  const SkillsPanel = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
    const [skillForm, setSkillForm] = useState<InsertSkill>({
      name: "",
      category: "Frontend",
      level: 50,
      yearsOfExperience: 1,
      description: "",
      icon: "",
      order: 0
    });

    const createSkillMutation = useMutation({
      mutationFn: async (data: InsertSkill) => {
        const response = await apiRequest("POST", "/api/skills", data);
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
        setIsDialogOpen(false);
        setSkillForm({
          name: "",
          category: "Frontend",
          level: 50,
          yearsOfExperience: 1,
          description: "",
          icon: "",
          order: 0
        });
        toast({ title: "Skill created successfully!" });
      }
    });

    const updateSkillMutation = useMutation({
      mutationFn: async ({ id, data }: { id: string; data: Partial<InsertSkill> }) => {
        const response = await apiRequest("PUT", `/api/skills/${id}`, data);
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
        setIsDialogOpen(false);
        setEditingSkill(null);
        toast({ title: "Skill updated successfully!" });
      }
    });

    const deleteSkillMutation = useMutation({
      mutationFn: async (id: string) => {
        await apiRequest("DELETE", `/api/skills/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/skills"] });
        toast({ title: "Skill deleted successfully!" });
      }
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const validatedData = insertSkillSchema.parse(skillForm);
        if (editingSkill) {
          updateSkillMutation.mutate({ id: editingSkill.id, data: validatedData });
        } else {
          createSkillMutation.mutate(validatedData);
        }
      } catch (error) {
        toast({ title: "Please check all fields", variant: "destructive" });
      }
    };

    const openEditDialog = (skill: Skill) => {
      setEditingSkill(skill);
      setSkillForm({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        yearsOfExperience: skill.yearsOfExperience,
        description: skill.description || "",
        icon: skill.icon || "",
        order: skill.order || 0
      });
      setIsDialogOpen(true);
    };

    return (
      <div className="space-y-6" data-testid="skills-panel">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold">Skills Management</h3>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-accent-cyan text-black hover:bg-accent-teal" data-testid="button-add-skill">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Skill name"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, name: e.target.value }))}
                  data-testid="input-skill-name"
                />
                <Select value={skillForm.category} onValueChange={(value) => setSkillForm(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger data-testid="select-skill-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Database">Database</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Tools">Tools</SelectItem>
                    <SelectItem value="Languages">Languages</SelectItem>
                  </SelectContent>
                </Select>
                <div>
                  <Label>Level: {skillForm.level}%</Label>
                  <Input
                    type="range"
                    min="0"
                    max="100"
                    value={skillForm.level}
                    onChange={(e) => setSkillForm(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                    data-testid="input-skill-level"
                  />
                </div>
                <Input
                  type="number"
                  placeholder="Years of experience"
                  value={skillForm.yearsOfExperience}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) }))}
                  data-testid="input-skill-years"
                />
                <Textarea
                  placeholder="Description"
                  value={skillForm.description || ""}
                  onChange={(e) => setSkillForm(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="textarea-skill-description"
                />
                <Button type="submit" className="w-full" data-testid="button-save-skill">
                  {editingSkill ? "Update" : "Create"} Skill
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <Card key={skill.id} className="dark:bg-gray-800" data-testid={`skill-card-${skill.id}`}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{skill.name}</CardTitle>
                    <Badge variant="secondary">{skill.category}</Badge>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditDialog(skill)}
                      data-testid={`button-edit-skill-${skill.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteSkillMutation.mutate(skill.id)}
                      data-testid={`button-delete-skill-${skill.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Level</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-accent-cyan h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {skill.yearsOfExperience} years experience
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Contact Messages Panel
  const MessagesPanel = () => {
    const markAsReadMutation = useMutation({
      mutationFn: async (id: string) => {
        await apiRequest("PUT", `/api/contact/${id}/read`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
        toast({ title: "Message marked as read" });
      }
    });

    const deleteMessageMutation = useMutation({
      mutationFn: async (id: string) => {
        await apiRequest("DELETE", `/api/contact/${id}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
        toast({ title: "Message deleted" });
      }
    });

    return (
      <div className="space-y-6" data-testid="messages-panel">
        <h3 className="text-2xl font-semibold">Contact Messages</h3>
        
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={`dark:bg-gray-800 ${!message.read ? 'border-accent-cyan' : ''}`} data-testid={`message-card-${message.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <div>
                      <CardTitle className="text-lg">
                        {message.firstName} {message.lastName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{message.email}</p>
                    </div>
                    {!message.read && (
                      <Badge className="bg-accent-cyan text-black">New</Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(message.createdAt ?? new Date()).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <strong>Subject:</strong> {message.subject}
                  </div>
                  <div>
                    <strong>Message:</strong>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{message.message}</p>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    {!message.read && (
                      <Button
                        size="sm"
                        onClick={() => markAsReadMutation.mutate(message.id)}
                        data-testid={`button-mark-read-${message.id}`}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMessageMutation.mutate(message.id)}
                      data-testid={`button-delete-message-${message.id}`}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {messages.length === 0 && (
            <Card className="dark:bg-gray-800">
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">No messages yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 py-8" data-testid="admin-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-space font-bold mb-2" data-testid="admin-title">
            <span className="text-gradient">Admin Dashboard</span>
          </h1>
          <p className="text-lg dark:text-gray-400 text-gray-600" data-testid="admin-subtitle">
            Manage your portfolio content and messages
          </p>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800 bg-white" data-testid="admin-tabs">
            <TabsTrigger value="skills" data-testid="tab-skills">
              Skills ({skills.length})
            </TabsTrigger>
            <TabsTrigger value="projects" data-testid="tab-projects">
              Projects ({projects.length})
            </TabsTrigger>
            <TabsTrigger value="blog" data-testid="tab-blog">
              Blog ({blogPosts.filter(post => !post.published).length})
            </TabsTrigger>
            <TabsTrigger value="messages" className="relative" data-testid="tab-messages">
              Messages ({messages.filter(m => !m.read).length})
              {messages.filter(m => !m.read).length > 0 && (
                <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-accent-coral text-white text-xs">
                  {messages.filter(m => !m.read).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <SkillsPanel />
          </TabsContent>

          <TabsContent value="projects">
            <div className="text-center py-12" data-testid="projects-placeholder">
              <p className="text-gray-600 dark:text-gray-400">Projects management coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="text-center py-12" data-testid="blog-placeholder">
              <p className="text-gray-600 dark:text-gray-400">Blog management coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <MessagesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
