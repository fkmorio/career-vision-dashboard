
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Book, LayoutDashboard, Brain, Award, TrendingUp, MapPin, MessageSquare } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const studentData = {
    name: "Wanjiku Mwangi",
    studentId: "KCSE2024001",
    school: "Nairobi Girls High School",
    kcseGrade: "B (Mean Grade 8.2)",
    cluster: "Mathematics & Physical Sciences",
    kuccpsStatus: "Active - Bidding Open",
    helbStatus: "Application Submitted",
    competencyScore: 85,
    applications: 6,
    bids: 4,
    interviews: 2
  };

  const quickActions = [
    { 
      title: "KUCCPS Placement", 
      description: "Apply for university programs", 
      icon: FileText, 
      action: () => navigate('/institutions'),
      badge: "Active"
    },
    { 
      title: "AI Competency Assessment", 
      description: "Get personalized CBC-based recommendations", 
      icon: Brain, 
      action: () => navigate('/ai-assessment'),
      badge: "New"
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
      badge: "4 Active"
    }
  ];

  const skillBadges = [
    { name: "STEM Pathway", level: "Advanced", color: "bg-blue-100 text-blue-800" },
    { name: "Research Skills", level: "Intermediate", color: "bg-green-100 text-green-800" },
    { name: "Critical Thinking", level: "Advanced", color: "bg-purple-100 text-purple-800" },
    { name: "Digital Literacy", level: "Expert", color: "bg-orange-100 text-orange-800" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Karibu, {studentData.name}!</h1>
          <p className="text-gray-600 mt-1">Track your tertiary education placement journey through KUCCPS</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          {studentData.kuccpsStatus}
        </Badge>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Academic Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">KCSE Grade:</span>
              <span className="font-medium text-green-600">{studentData.kcseGrade}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">School:</span>
              <span className="font-medium text-sm">{studentData.school}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Cluster:</span>
              <span className="font-medium text-sm">{studentData.cluster}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Competency Score:</span>
              <span className="font-medium text-blue-600">{studentData.competencyScore}/100</span>
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
              <div className="text-2xl font-bold text-blue-600">{studentData.applications}</div>
              <div className="text-sm text-gray-600">KUCCPS Applications</div>
            </div>
            <Progress value={75} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-orange-600">{studentData.bids}</div>
                <div className="text-gray-600">Active Bids</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{studentData.interviews}</div>
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
                <span className="text-xs text-green-600">Approved</span>
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
