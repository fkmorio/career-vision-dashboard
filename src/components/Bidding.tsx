
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Clock, GraduationCap, Users, TrendingUp, AlertCircle, MapPin, Star } from "lucide-react";

const Bidding = () => {
  const [activeBids, setActiveBids] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState({});

  const kuccpsOpportunities = [
    {
      id: 1,
      institution: 'University of Nairobi',
      program: 'Bachelor of Medicine and Bachelor of Surgery',
      code: 'J01/01/01',
      type: 'Degree',
      location: 'Nairobi',
      cutoffPoints: { current: 75, minimum: 70, maximum: 84 },
      currentCutoff: 75,
      minCutoff: 70,
      maxCutoff: 84,
      deadline: '2024-06-15',
      timeLeft: '3 days',
      totalBidders: 2840,
      capacity: 150,
      clusters: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
      description: 'Premier medical program with clinical training at Kenyatta National Hospital.',
      status: 'active',
      userBid: null,
      helbEligible: true,
      scholarships: ['Merit-based', 'Need-based']
    },
    {
      id: 2,
      institution: 'JKUAT',
      program: 'Bachelor of Science in Computer Science',
      code: 'J07/04/02',
      type: 'Degree',
      location: 'Kiambu',
      cutoffPoints: { current: 65, minimum: 58, maximum: 72 },
      currentCutoff: 65,
      minCutoff: 58,
      maxCutoff: 72,
      deadline: '2024-06-12',
      timeLeft: '8 hours',
      totalBidders: 1560,
      capacity: 120,
      clusters: ['Mathematics', 'Physics', 'Computer Studies'],
      description: 'Technology-focused program with industry partnerships and internships.',
      status: 'urgent',
      userBid: 62,
      helbEligible: true,
      scholarships: ['Tech Innovation Fund']
    },
    {
      id: 3,
      institution: 'Strathmore University',
      program: 'Bachelor of Business Science',
      code: 'P15/03/01',
      type: 'Degree',
      location: 'Nairobi',
      cutoffPoints: { current: 68, minimum: 60, maximum: 75 },
      currentCutoff: 68,
      minCutoff: 60,
      maxCutoff: 75,
      deadline: '2024-06-20',
      timeLeft: '1 week',
      totalBidders: 980,
      capacity: 80,
      clusters: ['Mathematics', 'Business Studies', 'Economics'],
      description: 'Business program with strong industry connections and entrepreneurship focus.',
      status: 'active',
      userBid: null,
      helbEligible: false,
      scholarships: ['Academic Excellence', 'Leadership']
    }
  ];

  const placeBid = (opportunityId, priority) => {
    setSelectedPriority(prev => ({ ...prev, [opportunityId]: priority }));
    setActiveBids(prev => [...prev, { opportunityId, priority, timestamp: new Date() }]);
    console.log(`Priority ${priority} set for program ${opportunityId}`);
  };

  const getBidProgress = (current, min, max) => {
    return ((current - min) / (max - min)) * 100;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">KUCCPS Program Selection</h1>
        <p className="text-gray-600 mt-1">Select and prioritize your preferred university programs through KUCCPS</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Available Slots</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">2</div>
            <div className="text-sm text-gray-600">Programs Selected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">B (65)</div>
            <div className="text-sm text-gray-600">Your KCSE Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">78%</div>
            <div className="text-sm text-gray-600">Match Probability</div>
          </CardContent>
        </Card>
      </div>

      {/* KUCCPS Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <div className="font-medium text-blue-900">KUCCPS Selection Guidelines</div>
              <div className="text-sm text-blue-700">
                Select up to 6 programs in order of preference. KUCCPS will place you in the highest-preference program 
                where you meet the cut-off points. Consider your KCSE performance, subject cluster, and career goals.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Programs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Programs</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">AI Match Score:</span>
            <Badge className="bg-green-100 text-green-800">85% Compatible</Badge>
          </div>
        </div>
        
        {kuccpsOpportunities.map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{program.program}</CardTitle>
                    <Badge className={getStatusColor(program.status)}>
                      {program.status === 'urgent' ? 'Deadline Soon' : 'Active'}
                    </Badge>
                    {program.helbEligible && (
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        HELB Eligible
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="mt-1">
                    {program.institution} • {program.location} • Code: {program.code}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Current Cut-off</div>
                  <div className="font-bold text-green-600">
                    {program.currentCutoff} points
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{program.description}</p>
              
              {/* Subject Clusters */}
              <div>
                <div className="text-sm font-medium mb-2">Required Subject Clusters:</div>
                <div className="flex flex-wrap gap-1">
                  {program.clusters.map((cluster, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cluster}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Scholarships */}
              {program.scholarships.length > 0 && (
                <div>
                  <div className="text-sm font-medium mb-2">Available Scholarships:</div>
                  <div className="flex flex-wrap gap-1">
                    {program.scholarships.map((scholarship, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Star className="w-3 h-3 mr-1" />
                        {scholarship}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Cut-off Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Cut-off Points:</span>
                  <span className="font-bold text-green-600">
                    {program.currentCutoff} points
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cut-off Range</span>
                    <span>{Math.round(getBidProgress(program.currentCutoff, program.minCutoff, program.maxCutoff))}%</span>
                  </div>
                  <Progress 
                    value={getBidProgress(program.currentCutoff, program.minCutoff, program.maxCutoff)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{program.minCutoff} pts (Min)</span>
                    <span>{program.maxCutoff} pts (Historical Max)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    {program.timeLeft}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    {program.totalBidders} applicants
                  </div>
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 text-gray-400 mr-2" />
                    {program.capacity} slots
                  </div>
                </div>
              </div>

              {/* User's Selection */}
              {selectedPriority[program.id] && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Your Priority:</span>
                    <span className="font-bold text-blue-600">
                      Choice #{selectedPriority[program.id]}
                    </span>
                  </div>
                </div>
              )}

              {/* Selection Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Capacity: {program.capacity} students
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <select 
                    className="px-3 py-1 border rounded text-sm mr-2"
                    onChange={(e) => placeBid(program.id, e.target.value)}
                    value={selectedPriority[program.id] || ''}
                  >
                    <option value="">Select Priority</option>
                    <option value="1">1st Choice</option>
                    <option value="2">2nd Choice</option>
                    <option value="3">3rd Choice</option>
                    <option value="4">4th Choice</option>
                    <option value="5">5th Choice</option>
                    <option value="6">6th Choice</option>
                  </select>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                    disabled={!selectedPriority[program.id]}
                  >
                    Add to List
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bidding;
