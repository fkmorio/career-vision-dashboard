
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, Users, Phone } from "lucide-react";

const PlacementTracking = () => {
  const applications = [
    {
      id: 1,
      company: 'Google India',
      position: 'Software Engineer',
      appliedDate: '2024-05-15',
      status: 'interview',
      stage: 3,
      totalStages: 4,
      nextStep: 'Technical Interview Round 2',
      nextDate: '2024-06-06',
      package: '₹28L',
      timeline: [
        { stage: 'Applied', date: '2024-05-15', completed: true },
        { stage: 'Resume Screen', date: '2024-05-20', completed: true },
        { stage: 'Technical Round 1', date: '2024-05-25', completed: true },
        { stage: 'Technical Round 2', date: '2024-06-06', completed: false },
        { stage: 'Final Interview', date: 'TBD', completed: false }
      ]
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Software Development Engineer',
      appliedDate: '2024-05-10',
      status: 'offer',
      stage: 4,
      totalStages: 4,
      nextStep: 'Offer Acceptance',
      nextDate: '2024-06-10',
      package: '₹22L',
      timeline: [
        { stage: 'Applied', date: '2024-05-10', completed: true },
        { stage: 'Online Assessment', date: '2024-05-15', completed: true },
        { stage: 'Technical Interview', date: '2024-05-22', completed: true },
        { stage: 'HR Round', date: '2024-05-28', completed: true },
        { stage: 'Offer Extended', date: '2024-06-01', completed: true }
      ]
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'SDE I',
      appliedDate: '2024-05-20',
      status: 'pending',
      stage: 1,
      totalStages: 4,
      nextStep: 'Resume Review',
      nextDate: 'In Progress',
      package: '₹25L',
      timeline: [
        { stage: 'Applied', date: '2024-05-20', completed: true },
        { stage: 'Resume Review', date: 'In Progress', completed: false },
        { stage: 'Online Assessment', date: 'TBD', completed: false },
        { stage: 'Interview Rounds', date: 'TBD', completed: false }
      ]
    },
    {
      id: 4,
      company: 'Flipkart',
      position: 'Software Engineer',
      appliedDate: '2024-05-08',
      status: 'rejected',
      stage: 2,
      totalStages: 4,
      nextStep: 'Application Closed',
      nextDate: '-',
      package: '₹18L',
      timeline: [
        { stage: 'Applied', date: '2024-05-08', completed: true },
        { stage: 'Technical Assessment', date: '2024-05-12', completed: true },
        { stage: 'Application Reviewed', date: '2024-05-18', completed: true, note: 'Not selected for next round' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'offer': return 'bg-green-100 text-green-800 border-green-300';
      case 'interview': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'offer': return <CheckCircle className="w-4 h-4" />;
      case 'interview': return <Users className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getProgressPercentage = (stage, totalStages) => {
    return (stage / totalStages) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Placement Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor your application progress and upcoming interviews</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Total Applications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">1</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Offers Received</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">₹25L</div>
            <div className="text-sm text-gray-600">Best Offer</div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <Calendar className="w-5 h-5 mr-2" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <div>
                  <div className="font-medium">Technical Interview - Google</div>
                  <div className="text-sm text-gray-600">Tomorrow, 2:00 PM</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-1" />
                Join Call
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <div className="font-medium">Offer Decision - Microsoft</div>
                  <div className="text-sm text-gray-600">Due: June 10, 2024</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Review Offer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Application Status</h2>
        {applications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{application.position}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status}</span>
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">
                    {application.company} • Applied on {new Date(application.appliedDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Package</div>
                  <div className="font-bold text-green-600">{application.package}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(getProgressPercentage(application.stage, application.totalStages))}% Complete</span>
                </div>
                <Progress 
                  value={getProgressPercentage(application.stage, application.totalStages)} 
                  className="h-2"
                />
              </div>

              {/* Next Step */}
              {application.status !== 'rejected' && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Next Step:</div>
                      <div className="text-sm text-gray-600">{application.nextStep}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{application.nextDate}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              <div>
                <div className="text-sm font-medium mb-3">Application Timeline</div>
                <div className="space-y-2">
                  {application.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        event.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1 flex items-center justify-between">
                        <div className={`text-sm ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.stage}
                          {event.note && (
                            <span className="text-red-600 ml-2">({event.note})</span>
                          )}
                        </div>
                        <div className={`text-xs ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                {application.status === 'offer' && (
                  <>
                    <Button variant="outline" size="sm">
                      Negotiate
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Accept Offer
                    </Button>
                  </>
                )}
                {application.status === 'interview' && (
                  <>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Prepare
                    </Button>
                  </>
                )}
                {application.status === 'pending' && (
                  <Button variant="outline" size="sm">
                    Follow Up
                  </Button>
                )}
                {application.status === 'rejected' && (
                  <Button variant="outline" size="sm">
                    Request Feedback
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlacementTracking;
