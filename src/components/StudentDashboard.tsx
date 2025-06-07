import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Book, LayoutDashboard, Brain, Award, TrendingUp, MapPin, MessageSquare, LogOut, Flag, Settings, HeartHandshake, GraduationCap, BookCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import FeatureFlag from './FeatureFlag';
import { useFeatureFlag } from '../hooks/useFeatureFlag';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { isEnabled: gamificationEnabled } = useFeatureFlag('gamification-system');
  const { isEnabled: enhancedAIEnabled, variant: aiVariant } = useFeatureFlag('enhanced-ai-recommendations');

  if (!user) {
    return null; // This will be handled by the main App component
  }

  const quickActions = [
    { 
      title: "CBC Pathway Explorer", 
      description: "Discover your ideal Senior Secondary pathway using AI", 
      icon: GraduationCap, 
      action: () => navigate('/cbc-pathways'),
      badge: "CBC Aligned"
    },
    { 
      title: "CBC Assessment Portal", 
      description: "Track competency-based assessments and portfolio", 
      icon: BookCheck, 
      action: () => navigate('/cbc-assessment'),
      badge: "New"
    },
    { 
      title: "KUCCPS Placement", 
      description: "Apply for university programs", 
      icon: FileText, 
      action: () => navigate('/institutions'),
      badge: "Active"
    },
    { 
      title: "AI Competency Assessment", 
      description: enhancedAIEnabled 
        ? `Get ${aiVariant === 'A' ? 'advanced' : 'enhanced'} CBC-based recommendations` 
        : "Get personalized CBC-based recommendations", 
      icon: Brain, 
      action: () => navigate('/ai-assessment'),
      badge: enhancedAIEnabled ? (aiVariant === 'A' ? 'Advanced' : 'Enhanced') : "Featured"
    },
    { 
      title: "Interactive AI Assistant", 
      description: "Chat with AI for personalized guidance", 
      icon: MessageSquare, 
      action: () => navigate('/interactive-ai'),
      badge: "Featured"
    },
    { 
      title: "KUCCPS Selection", 
      description: "Track your placement choices", 
      icon: TrendingUp, 
      action: () => navigate('/bidding'),
      badge: `${user.bids} Active`
    },
    { 
      title: "Share Feedback", 
      description: "Help us improve your experience", 
      icon: HeartHandshake, 
      action: () => navigate('/feedback'),
      badge: "Community"
    }
  ];

  const skillBadges = [
    { name: "STEM Pathway", level: "Advanced", color: "bg-blue-100 text-blue-800" },
    { name: "Research Skills", level: "Intermediate", color: "bg-green-100 text-green-800" },
    { name: "Critical Thinking", level: "Advanced", color: "bg-purple-100 text-purple-800" },
    { name: "Digital Literacy", level: "Expert", color: "bg-orange-100 text-orange-800" }
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Habari za asubuhi";
    if (hour < 17) return "Habari za mchana";
    return "Habari za jioni";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {user.name}! 🌟
          </h1>
          <p className="text-gray-600 mt-1">Track your CBC journey and tertiary education placement through KUCCPS</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            {user.kuccpsStatus}
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            CBC Grade 9
          </Badge>
          <Button variant="outline" size="sm" onClick={() => navigate('/feature-flags')} className="text-blue-600 hover:text-blue-700">
            <Flag className="w-4 h-4 mr-2" />
            Feature Flags
          </Button>
          <Button variant="outline" size="sm" onClick={logout} className="text-red-600 hover:text-red-700">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* CBC Transition Alert */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <GraduationCap className="w-5 h-5 mr-2" />
            CBC Pathway Selection (Grade 9 → Grade 10)
          </CardTitle>
          <CardDescription>Choose your Senior Secondary School pathway before Grade 10 transition</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-xl font-bold text-blue-600">STEM</div>
              <div className="text-xs text-gray-600">Science & Technology</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-xl font-bold text-green-600">Arts</div>
              <div className="text-xs text-gray-600">Social Sciences & Arts</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-xl font-bold text-orange-600">Sports</div>
              <div className="text-xs text-gray-600">Sports & Performing Arts</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-xl font-bold text-purple-600">TVET</div>
              <div className="text-xs text-gray-600">Technical & Vocational</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={() => navigate('/cbc-pathways')} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <GraduationCap className="w-4 h-4 mr-2" />
              Explore CBC Pathways
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Gamification Feature Flag Demo */}
      <FeatureFlag flag="gamification-system">
        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Award className="w-5 h-5 mr-2" />
              Achievement System (Beta)
            </CardTitle>
            <CardDescription>You're part of our gamification pilot program!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">1,250</div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-gold-600">🏆</div>
                <div className="text-sm text-gray-600">3 Achievements</div>
              </div>
              <div className="text-center p-3 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">Level 5</div>
                <div className="text-sm text-gray-600">Current Level</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FeatureFlag>

      {/* Enhanced AI Recommendations Feature Flag Demo */}
      <FeatureFlag flag="enhanced-ai-recommendations" variant="B">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Brain className="w-5 h-5 mr-2" />
              Enhanced AI Recommendations (Variant B)
            </CardTitle>
            <CardDescription>You're experiencing our improved AI recommendation system!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                <div className="font-medium">Smart Career Match</div>
                <div className="text-sm text-gray-600">Based on your STEM cluster and 92% competency score, consider Computer Science programs at top universities.</div>
              </div>
              <div className="p-3 bg-white rounded border-l-4 border-green-500">
                <div className="font-medium">Scholarship Opportunity</div>
                <div className="text-sm text-gray-600">You're eligible for 3 STEM scholarships. Apply now to increase your chances!</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FeatureFlag>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              CBC Academic Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Grade:</span>
              <span className="font-medium text-purple-600">Grade 9 (JSS)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">KCSE Projection:</span>
              <span className="font-medium text-green-600">Grade {user.kcseGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">School:</span>
              <span className="font-medium text-sm">{user.school}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Current Cluster:</span>
              <span className="font-medium text-sm">{user.cluster}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">CBC Competency:</span>
              <span className="font-medium text-blue-600">{user.competencyScore}/100</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-blue-600" />
              Placement Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.applications}</div>
              <div className="text-sm text-gray-600">KUCCPS Applications</div>
            </div>
            <Progress value={75} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-orange-600">{user.bids}</div>
                <div className="text-gray-600">Active Bids</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{user.interviews}</div>
                <div className="text-gray-600">Interviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                <span className="text-sm">KUCCPS Revision</span>
                <span className="text-xs text-blue-600">June 15</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">HELB Decision</span>
                <span className="text-xs text-green-600">{user.helbStatus}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-sm">AI Assessment</span>
                <span className="text-xs text-orange-600">Recommended</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Competency Badges
          </CardTitle>
          <CardDescription>Your skills and competencies based on AI assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skillBadges.map((badge, index) => (
              <div key={index} className={`p-3 rounded-lg ${badge.color} text-center`}>
                <div className="font-medium text-sm">{badge.name}</div>
                <div className="text-xs mt-1">{badge.level}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your placement journey through Kenya's education system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={action.action}
              >
                <div className="flex items-center space-x-2">
                  <action.icon className="w-6 h-6 text-blue-600" />
                  {action.badge && (
                    <Badge variant="secondary" className="text-xs">{action.badge}</Badge>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-gray-600">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
