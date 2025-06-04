
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, Book, LayoutDashboard } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const studentData = {
    name: "Alex Kumar",
    studentId: "ST2024001",
    course: "Computer Science Engineering",
    year: "Final Year",
    gpa: "8.7/10",
    placementStatus: "Active Applications",
    applications: 12,
    interviews: 5,
    offers: 2
  };

  const quickActions = [
    { title: "Apply to Companies", description: "Browse and apply to new opportunities", icon: FileText, action: () => navigate('/institutions') },
    { title: "Update Profile", description: "Keep your information current", icon: Users, action: () => {} },
    { title: "Practice Tests", description: "Prepare for technical interviews", icon: Book, action: () => {} },
    { title: "Schedule Interview", description: "Book your upcoming interviews", icon: LayoutDashboard, action: () => {} }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
          <p className="text-gray-600 mt-1">Track your placement journey and explore new opportunities</p>
        </div>
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          {studentData.placementStatus}
        </Badge>
      </div>

      {/* Profile Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Student ID:</span>
              <span className="font-medium">{studentData.studentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Course:</span>
              <span className="font-medium text-sm">{studentData.course}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Year:</span>
              <span className="font-medium">{studentData.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">GPA:</span>
              <span className="font-medium text-green-600">{studentData.gpa}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Application Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{studentData.applications}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
            </div>
            <Progress value={65} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="font-semibold text-orange-600">{studentData.interviews}</div>
                <div className="text-gray-600">Interviews</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-green-600">{studentData.offers}</div>
                <div className="text-gray-600">Offers</div>
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
                <span className="text-sm">Interview with TechCorp</span>
                <span className="text-xs text-blue-600">Tomorrow 2 PM</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                <span className="text-sm">Application Review</span>
                <span className="text-xs text-green-600">Friday</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                <span className="text-sm">Skills Assessment</span>
                <span className="text-xs text-orange-600">Next Week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Shortcuts to help you manage your placement journey</CardDescription>
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
                <action.icon className="w-6 h-6 text-blue-600" />
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
