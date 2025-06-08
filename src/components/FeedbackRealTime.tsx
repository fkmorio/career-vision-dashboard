
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, MessageSquare, TrendingUp, Users } from 'lucide-react';
import { useFeedback } from '../contexts/FeedbackContext';
import { useNotifications } from '../contexts/NotificationContext';
import { toast } from '@/hooks/use-toast';

const FeedbackRealTime = () => {
  const { feedbacks } = useFeedback();
  const { addNotification } = useNotifications();

  // Simulate real-time feedback status updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate feedback status changes
      if (Math.random() > 0.8) {
        const statusUpdates = [
          'Your accessibility feedback has been reviewed and prioritized',
          'Gender equity feedback implemented - check the latest updates',
          'Your bias detection report helped improve our AI algorithms',
          'Rural access feedback resulted in new support programs'
        ];

        const randomUpdate = statusUpdates[Math.floor(Math.random() * statusUpdates.length)];
        
        addNotification({
          type: 'feedback',
          title: 'Feedback Update',
          message: randomUpdate,
          priority: 'medium',
          category: 'feedback',
          actionRequired: false
        });
      }
    }, 20000); // Every 20 seconds

    return () => clearInterval(interval);
  }, [addNotification]);

  const equityFeedbacks = feedbacks.filter(f => 
    f.tags?.some(tag => 
      ['equity', 'fairness', 'bias', 'accessibility', 'inclusion'].includes(tag.toLowerCase())
    )
  );

  const recentFeedbacks = feedbacks.slice(0, 3);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Real-Time Feedback Impact
          </CardTitle>
          <CardDescription>
            See how your feedback is driving fairness and equity improvements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{equityFeedbacks.length}</div>
              <div className="text-sm text-green-700">Equity-Related Feedback</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {feedbacks.filter(f => f.status === 'resolved').length}
              </div>
              <div className="text-sm text-blue-700">Issues Resolved</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {feedbacks.filter(f => f.status === 'in-progress').length}
              </div>
              <div className="text-sm text-purple-700">Active Improvements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Recent Impact Stories
          </CardTitle>
          <CardDescription>
            Real changes made based on community feedback
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <Users className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <h4 className="font-medium text-green-900">Gender Balance Improved</h4>
                <p className="text-sm text-green-700 mt-1">
                  Based on your feedback, we implemented targeted STEM outreach for female students. 
                  Participation increased by 23% this quarter.
                </p>
                <Badge className="mt-2 bg-green-100 text-green-800">Live Impact</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-medium text-blue-900">Accessibility Enhanced</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Your accessibility feedback led to new screen reader support and high contrast mode. 
                  Platform usability improved for 15% more users.
                </p>
                <Badge className="mt-2 bg-blue-100 text-blue-800">Recently Deployed</Badge>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600 mt-1" />
              <div>
                <h4 className="font-medium text-purple-900">Bias Detection Upgraded</h4>
                <p className="text-sm text-purple-700 mt-1">
                  Community feedback on AI recommendations led to improved bias detection algorithms. 
                  Fairness score increased to 94%.
                </p>
                <Badge className="mt-2 bg-purple-100 text-purple-800">Algorithm Update</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {recentFeedbacks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Feedback Status</CardTitle>
            <CardDescription>
              Real-time updates on your submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentFeedbacks.map((feedback) => (
                <div key={feedback.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{feedback.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Submitted {feedback.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={feedback.status === 'resolved' ? 'default' : 'secondary'}
                      className={
                        feedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        feedback.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }
                    >
                      {feedback.status.replace('-', ' ')}
                    </Badge>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FeedbackRealTime;
