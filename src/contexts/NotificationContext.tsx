
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  type: 'feedback' | 'opportunity' | 'equity' | 'bias-alert' | 'accessibility' | 'system';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'fairness' | 'opportunity' | 'feedback' | 'accessibility' | 'bias-detection';
  timestamp: Date;
  isRead: boolean;
  actionRequired?: boolean;
  actionUrl?: string;
  userId: string;
  metadata?: {
    feedbackId?: string;
    opportunityId?: string;
    biasScore?: number;
    accessibilityIssue?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'userId'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  getNotificationsByCategory: (category: Notification['category']) => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Simulate real-time notifications
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      // Simulate equity-focused notifications
      const equityNotifications = [
        {
          type: 'opportunity' as const,
          title: 'New Opportunity Match',
          message: 'A scholarship opportunity matching your profile is now available',
          priority: 'high' as const,
          category: 'opportunity' as const,
          actionRequired: true,
          actionUrl: '/institutions'
        },
        {
          type: 'equity' as const,
          title: 'Gender Balance Initiative',
          message: 'STEM programs are actively seeking female applicants - special support available',
          priority: 'medium' as const,
          category: 'fairness' as const,
          actionRequired: true,
          actionUrl: '/pathways'
        },
        {
          type: 'bias-alert' as const,
          title: 'Bias Detection Alert',
          message: 'Our AI detected potential bias in recommendations. Review adjusted suggestions.',
          priority: 'urgent' as const,
          category: 'bias-detection' as const,
          actionRequired: true,
          metadata: { biasScore: 0.75 }
        },
        {
          type: 'accessibility' as const,
          title: 'Accessibility Feature Available',
          message: 'New screen reader support and high contrast mode now available',
          priority: 'medium' as const,
          category: 'accessibility' as const,
          actionUrl: '/settings'
        }
      ];

      // Randomly send notifications
      if (Math.random() > 0.7) {
        const randomNotification = equityNotifications[Math.floor(Math.random() * equityNotifications.length)];
        addNotification(randomNotification);
      }
    }, 15000); // Every 15 seconds

    return () => clearInterval(interval);
  }, [user]);

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead' | 'userId'>) => {
    if (!user) return;

    const newNotification: Notification = {
      ...notificationData,
      id: `notif_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      isRead: false,
      userId: user.id
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Show toast for high priority notifications
    if (newNotification.priority === 'high' || newNotification.priority === 'urgent') {
      toast({
        title: newNotification.title,
        description: newNotification.message,
        variant: newNotification.type === 'bias-alert' ? 'destructive' : 'default'
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, isRead: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationsByCategory = (category: Notification['category']) => {
    return notifications.filter(notif => notif.category === category);
  };

  const unreadCount = notifications.filter(notif => !notif.isRead).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      getNotificationsByCategory
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
