
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Tag } from "lucide-react";
import { useFeedback, Feedback } from '../contexts/FeedbackContext';
import { useUser } from '../contexts/UserContext';
import { toast } from '@/hooks/use-toast';

const FeedbackForm = () => {
  const { submitFeedback } = useFeedback();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    title: '',
    description: '',
    tags: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.priority || !formData.title || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const feedbackData = {
      userId: user?.studentId || 'anonymous',
      userName: user?.name || 'Anonymous User',
      category: formData.category as Feedback['category'],
      priority: formData.priority as Feedback['priority'],
      title: formData.title,
      description: formData.description,
      tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : []
    };

    submitFeedback(feedbackData);
    
    // Reset form
    setFormData({
      category: '',
      priority: '',
      title: '',
      description: '',
      tags: ''
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it soon.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
          Submit Feedback
        </CardTitle>
        <CardDescription>
          Help us improve the Career Vision Platform by sharing your thoughts and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug">🐛 Bug Report</SelectItem>
                  <SelectItem value="feature">✨ Feature Request</SelectItem>
                  <SelectItem value="improvement">🚀 Improvement</SelectItem>
                  <SelectItem value="general">💬 General Feedback</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Priority *</label>
              <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🔴 High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Title *</label>
            <Input
              placeholder="Brief description of your feedback"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              placeholder="Provide detailed information about your feedback, including steps to reproduce if it's a bug..."
              className="min-h-[100px]"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block flex items-center">
              <Tag className="w-4 h-4 mr-1" />
              Tags (optional)
            </label>
            <Input
              placeholder="Add tags separated by commas (e.g., ai, assessment, mobile)"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="w-4 h-4 mr-2" />
            Submit Feedback
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
