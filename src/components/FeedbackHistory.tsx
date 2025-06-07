
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageSquare, Tag } from "lucide-react";
import { useFeedback, Feedback } from '../contexts/FeedbackContext';

const FeedbackHistory = () => {
  const { userFeedbacks } = useFeedback();

  const getStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Feedback['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: Feedback['category']) => {
    switch (category) {
      case 'bug': return '🐛';
      case 'feature': return '✨';
      case 'improvement': return '🚀';
      case 'general': return '💬';
      default: return '📝';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-blue-600" />
          Your Feedback History
        </CardTitle>
        <CardDescription>
          Track the status of your submitted feedback and suggestions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {userFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No feedback submitted yet.</p>
            <p className="text-sm">Submit your first feedback to help us improve!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {userFeedbacks.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(feedback.category)}</span>
                    <h3 className="font-medium text-gray-900">{feedback.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(feedback.priority)}>
                      {feedback.priority}
                    </Badge>
                    <Badge className={getStatusColor(feedback.status)}>
                      {feedback.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {feedback.description}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>Submitted: {feedback.createdAt.toLocaleDateString()}</span>
                    <span>Updated: {feedback.updatedAt.toLocaleDateString()}</span>
                  </div>
                  {feedback.tags && feedback.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{feedback.tags.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeedbackHistory;
