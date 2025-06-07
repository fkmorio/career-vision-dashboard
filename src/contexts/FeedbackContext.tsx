
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  category: 'bug' | 'feature' | 'improvement' | 'general';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

interface FeedbackContextType {
  feedbacks: Feedback[];
  userFeedbacks: Feedback[];
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateFeedbackStatus: (id: string, status: Feedback['status']) => void;
  getFeedbackById: (id: string) => Feedback | undefined;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 'fb1',
      userId: 'user123',
      userName: 'John Doe',
      category: 'feature',
      priority: 'medium',
      title: 'Add dark mode support',
      description: 'It would be great to have a dark mode option for better user experience during night time.',
      status: 'open',
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-06-01'),
      tags: ['ui', 'accessibility']
    },
    {
      id: 'fb2',
      userId: 'user456',
      userName: 'Jane Smith',
      category: 'bug',
      priority: 'high',
      title: 'AI assessment not loading',
      description: 'The AI competency assessment page fails to load sometimes and shows a blank screen.',
      status: 'in-progress',
      createdAt: new Date('2024-06-05'),
      updatedAt: new Date('2024-06-06'),
      tags: ['ai', 'assessment', 'loading']
    }
  ]);

  const submitFeedback = (feedbackData: Omit<Feedback, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newFeedback: Feedback = {
      ...feedbackData,
      id: `fb${Date.now()}`,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  const updateFeedbackStatus = (id: string, status: Feedback['status']) => {
    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === id 
        ? { ...feedback, status, updatedAt: new Date() }
        : feedback
    ));
  };

  const getFeedbackById = (id: string) => {
    return feedbacks.find(feedback => feedback.id === id);
  };

  // Get current user's feedback (this would be filtered by actual user ID in real implementation)
  const userFeedbacks = feedbacks.filter(feedback => feedback.userId === 'user123');

  return (
    <FeedbackContext.Provider value={{
      feedbacks,
      userFeedbacks,
      submitFeedback,
      updateFeedbackStatus,
      getFeedbackById
    }}>
      {children}
    </FeedbackContext.Provider>
  );
};
