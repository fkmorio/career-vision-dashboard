
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertCircle, Calendar, FileText, Users, Phone, GraduationCap, MapPin } from "lucide-react";

const PlacementTracking = () => {
  const kuccpsApplications = [
    {
      id: 1,
      institution: 'University of Nairobi',
      program: 'Bachelor of Medicine and Bachelor of Surgery',
      code: 'J01/01/01',
      appliedDate: '2024-05-15',
      status: 'placed',
      stage: 4,
      totalStages: 4,
      nextStep: 'Report for Admission',
      nextDate: '2024-08-15',
      cutoffPoints: 75,
      yourPoints: 78,
      priority: 1,
      timeline: [
        { stage: 'Application Submitted', date: '2024-05-15', completed: true },
        { stage: 'KUCCPS Processing', date: '2024-06-01', completed: true },
        { stage: 'First Selection', date: '2024-06-15', completed: true },
        { stage: 'Placed', date: '2024-06-20', completed: true },
        { stage: 'Admission', date: '2024-08-15', completed: false }
      ]
    },
    {
      id: 2,
      institution: 'JKUAT',
      program: 'Bachelor of Science in Computer Science',
      code: 'J07/04/02',
      appliedDate: '2024-05-15',
      status: 'revision',
      stage: 3,
      totalStages: 4,
      nextStep: 'KUCCPS Revision Round',
      nextDate: '2024-07-01',
      cutoffPoints: 65,
      yourPoints: 62,
      priority: 2,
      timeline: [
        { stage: 'Application Submitted', date: '2024-05-15', completed: true },
        { stage: 'KUCCPS Processing', date: '2024-06-01', completed: true },
        { stage: 'First Selection', date: '2024-06-15', completed: true, note: 'Below cut-off, moved to revision' },
        { stage: 'Revision Round', date: '2024-07-01', completed: false }
      ]
    },
    {
      id: 3,
      institution: 'Kenyatta University',
      program: 'Bachelor of Education (Science)',
      code: 'J03/02/01',
      appliedDate: '2024-05-15',
      status: 'waitlist',
      stage: 3,
      totalStages: 4,
      nextStep: 'Waiting for Vacancies',
      nextDate: 'TBD',
      cutoffPoints: 58,
      yourPoints: 65,
      priority: 3,
      timeline: [
        { stage: 'Application Submitted', date: '2024-05-15', completed: true },
        { stage: 'KUCCPS Processing', date: '2024-06-01', completed: true },
        { stage: 'Waitlisted', date: '2024-06-15', completed: true },
        { stage: 'Final Placement', date: 'TBD', completed: false }
      ]
    },
    {
      id: 4,
      institution: 'Moi University',
      program: 'Bachelor of Science in Agriculture',
      code: 'J02/05/01',
      appliedDate: '2024-05-15',
      status: 'not-selected',
      stage: 2,
      totalStages: 4,
      nextStep: 'Application Closed',
      nextDate: '-',
      cutoffPoints: 55,
      yourPoints: 52,
      priority: 4,
      timeline: [
        { stage: 'Application Submitted', date: '2024-05-15', completed: true },
        { stage: 'KUCCPS Processing', date: '2024-06-01', completed: true },
        { stage: 'Not Selected', date: '2024-06-15', completed: true, note: 'Below cut-off points' }
      ]
    }
  ];

  const helbStatus = {
    applicationId: 'HELB2024001',
    status: 'approved',
    loanAmount: 'KSh 185,000',
    upkeepAmount: 'KSh 60,000',
    disbursementDate: '2024-08-01'
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'placed': return 'bg-green-100 text-green-800 border-green-300';
      case 'revision': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'waitlist': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'not-selected': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'placed': return <CheckCircle className="w-4 h-4" />;
      case 'revision': return <Clock className="w-4 h-4" />;
      case 'waitlist': return <Users className="w-4 h-4" />;
      case 'not-selected': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getProgressPercentage = (stage, totalStages) => {
    return (stage / totalStages) * 100;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">KUCCPS Placement Tracking</h1>
        <p className="text-gray-600 mt-1">Monitor your university placement progress and HELB loan status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-gray-600">Programs Applied</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-gray-600">Placed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <div className="text-sm text-gray-600">In Revision</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">78</div>
            <div className="text-sm text-gray-600">Your KCSE Points</div>
          </CardContent>
        </Card>
      </div>

      {/* HELB Status */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <GraduationCap className="w-5 h-5 mr-2" />
            HELB Loan Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="font-medium text-green-800">Application Status</div>
              <Badge className="bg-green-100 text-green-800 mt-1">Approved</Badge>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-800">Loan Amount</div>
              <div className="text-lg font-bold text-green-600">{helbStatus.loanAmount}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-800">Upkeep Allowance</div>
              <div className="text-lg font-bold text-green-600">{helbStatus.upkeepAmount}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-green-800">Disbursement Date</div>
              <div className="text-sm text-green-700">{helbStatus.disbursementDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-900">
            <Calendar className="w-5 h-5 mr-2" />
            Important Dates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <div>
                  <div className="font-medium">Report for Admission - University of Nairobi</div>
                  <div className="text-sm text-gray-600">August 15, 2024</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <MapPin className="w-4 h-4 mr-1" />
                View Details
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div>
                  <div className="font-medium">KUCCPS Revision Round</div>
                  <div className="text-sm text-gray-600">July 1, 2024</div>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Track Status
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Application Details */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">KUCCPS Application Status</h2>
        {kuccpsApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{application.program}</CardTitle>
                    <Badge className={getStatusColor(application.status)}>
                      {getStatusIcon(application.status)}
                      <span className="ml-1 capitalize">{application.status.replace('-', ' ')}</span>
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">
                    {application.institution} • Code: {application.code} • Priority #{application.priority}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Your Points</div>
                  <div className={`font-bold ${application.yourPoints >= application.cutoffPoints ? 'text-green-600' : 'text-red-600'}`}>
                    {application.yourPoints} / {application.cutoffPoints}
                  </div>
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
              {application.status !== 'not-selected' && (
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
                <div className="text-sm font-medium mb-3">KUCCPS Timeline</div>
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
                            <span className="text-orange-600 ml-2">({event.note})</span>
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
                {application.status === 'placed' && (
                  <>
                    <Button variant="outline" size="sm">
                      Download Letter
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      View Admission Details
                    </Button>
                  </>
                )}
                {application.status === 'revision' && (
                  <>
                    <Button variant="outline" size="sm">
                      Check Revision
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Preferences
                    </Button>
                  </>
                )}
                {application.status === 'waitlist' && (
                  <Button variant="outline" size="sm">
                    Check Position
                  </Button>
                )}
                {application.status === 'not-selected' && (
                  <Button variant="outline" size="sm">
                    Appeal Process
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
