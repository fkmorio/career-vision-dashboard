import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Clock, GraduationCap, Users, TrendingUp, AlertCircle, MapPin, Star, Target, Brain } from "lucide-react";
import { useUser } from '../contexts/UserContext';

const Bidding = () => {
  const { user } = useUser();
  const [activeBids, setActiveBids] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState({});

  // Generate dynamic opportunities based on user profile
  const generateUserOpportunities = () => {
    if (!user) return [];

    const userPoints = parseInt(user.kcseGrade.replace(/[^\d]/g, '')) || 65;
    
    const baseOpportunities = [
      {
        id: 1,
        institution: 'University of Nairobi',
        program: user.cluster === 'STEM' ? 'Bachelor of Medicine and Bachelor of Surgery' : 
                 user.cluster === 'Business' ? 'Bachelor of Commerce' : 'Bachelor of Arts',
        code: 'J01/01/01',
        type: 'Degree',
        location: 'Nairobi',
        cutoffPoints: { 
          current: user.cluster === 'STEM' ? 75 : user.cluster === 'Business' ? 68 : 62, 
          minimum: user.cluster === 'STEM' ? 70 : user.cluster === 'Business' ? 62 : 55, 
          maximum: user.cluster === 'STEM' ? 84 : user.cluster === 'Business' ? 75 : 68 
        },
        deadline: '2024-06-15',
        timeLeft: '3 days',
        totalBidders: user.cluster === 'STEM' ? 2840 : 1840,
        capacity: user.cluster === 'STEM' ? 150 : 200,
        clusters: user.cluster === 'STEM' ? ['Mathematics', 'Physics', 'Chemistry', 'Biology'] :
                  user.cluster === 'Business' ? ['Mathematics', 'Business Studies', 'Economics'] :
                  ['English', 'Literature', 'History', 'Geography'],
        description: `Premier ${user.cluster.toLowerCase()} program with excellent career prospects.`,
        status: 'active',
        userBid: null,
        helbEligible: true,
        scholarships: ['Merit-based', 'Need-based'],
        matchScore: calculateMatchScore(userPoints, user.cluster, 'University'),
        competitiveness: userPoints >= 75 ? 'Low' : userPoints >= 65 ? 'Medium' : 'High'
      },
      {
        id: 2,
        institution: user.cluster === 'Technical' ? 'Kiambu Institute of Science and Technology' : 'JKUAT',
        program: user.cluster === 'Technical' ? 'Diploma in Information Technology' : 
                 'Bachelor of Science in Computer Science',
        code: user.cluster === 'Technical' ? 'T07/04/01' : 'J07/04/02',
        type: user.cluster === 'Technical' ? 'Diploma' : 'Degree',
        location: 'Kiambu',
        cutoffPoints: { 
          current: user.cluster === 'Technical' ? 45 : 65, 
          minimum: user.cluster === 'Technical' ? 40 : 58, 
          maximum: user.cluster === 'Technical' ? 55 : 72 
        },
        deadline: '2024-06-12',
        timeLeft: '8 hours',
        totalBidders: 1560,
        capacity: 120,
        clusters: user.cluster === 'Technical' ? ['Mathematics', 'Physics', 'Computer Studies'] :
                  ['Mathematics', 'Physics', 'Computer Studies'],
        description: 'Technology-focused program with industry partnerships and internships.',
        status: 'urgent',
        userBid: null,
        helbEligible: true,
        scholarships: ['Tech Innovation Fund'],
        matchScore: calculateMatchScore(userPoints, user.cluster, user.cluster === 'Technical' ? 'TVET' : 'University'),
        competitiveness: userPoints >= (user.cluster === 'Technical' ? 50 : 70) ? 'Low' : 'Medium'
      }
    ];

    return baseOpportunities.filter(opp => 
      userPoints >= opp.cutoffPoints.minimum - 10 // Show opportunities within reach
    );
  };

  const calculateMatchScore = (userPoints, cluster, institutionType) => {
    let score = 60;
    
    // Points alignment
    if (userPoints >= 75) score += 20;
    else if (userPoints >= 65) score += 15;
    else if (userPoints >= 55) score += 10;
    
    // Cluster alignment
    if (cluster === 'STEM' && institutionType === 'University') score += 15;
    if (cluster === 'Technical' && institutionType === 'TVET') score += 20;
    if (cluster === 'Business' && institutionType === 'University') score += 10;
    
    return Math.min(score, 98);
  };

  const kuccpsOpportunities = generateUserOpportunities();

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

  const getCompetitivenessColor = (competitiveness) => {
    switch(competitiveness) {
      case 'Low': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'High': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const userPoints = user ? parseInt(user.kcseGrade.replace(/[^\d]/g, '')) || 65 : 65;
  const matchProbability = kuccpsOpportunities.length > 0 
    ? Math.round(kuccpsOpportunities.reduce((acc, opp) => acc + opp.matchScore, 0) / kuccpsOpportunities.length)
    : 78;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user ? `KUCCPS Selection for ${user.name}` : 'KUCCPS Program Selection'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user 
              ? `AI-curated programs for your ${user.cluster} cluster and ${user.kcseGrade} performance`
              : 'Select and prioritize your preferred university programs through KUCCPS'
            }
          </p>
        </div>
        {user && (
          <div className="text-right">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Brain className="w-4 h-4 mr-1" />
              AI Optimized
            </Badge>
            <div className="text-sm text-gray-600 mt-1">Competency: {user.competencyScore}</div>
          </div>
        )}
      </div>

      {/* AI Recommendations Panel */}
      {user && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="flex items-center text-indigo-900">
              <Target className="w-5 h-5 mr-2" />
              AI Selection Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">{matchProbability}%</div>
                <div className="text-sm text-gray-600">Overall Match Rate</div>
                <div className="text-xs text-indigo-600 mt-1">AI Calculated</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {kuccpsOpportunities.filter(opp => opp.matchScore >= 80).length}
                </div>
                <div className="text-sm text-gray-600">High Match Programs</div>
                <div className="text-xs text-green-600 mt-1">80%+ compatibility</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.cluster}</div>
                <div className="text-sm text-gray-600">Your Cluster</div>
                <div className="text-xs text-blue-600 mt-1">Optimized Selection</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {kuccpsOpportunities.filter(opp => opp.competitiveness === 'Low').length}
                </div>
                <div className="text-sm text-gray-600">Safe Choices</div>
                <div className="text-xs text-purple-600 mt-1">Low Competition</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
            <div className="text-2xl font-bold text-green-600">
              {Object.keys(selectedPriority).length}
            </div>
            <div className="text-sm text-gray-600">Programs Selected</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {user ? user.kcseGrade : 'B (65)'}
            </div>
            <div className="text-sm text-gray-600">Your KCSE Points</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{matchProbability}%</div>
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
                {user 
                  ? `Based on your ${user.cluster} cluster and ${user.kcseGrade} performance, we've curated the best matching programs. AI has optimized your selection for maximum placement probability.`
                  : 'Select up to 6 programs in order of preference. KUCCPS will place you in the highest-preference program where you meet the cut-off points. Consider your KCSE performance, subject cluster, and career goals.'
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Programs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {user ? 'AI-Recommended Programs' : 'Available Programs'}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">AI Match Score:</span>
            <Badge className="bg-green-100 text-green-800">{matchProbability}% Compatible</Badge>
          </div>
        </div>
        
        {kuccpsOpportunities
          .sort((a, b) => b.matchScore - a.matchScore)
          .map((program) => (
          <Card key={program.id} className="hover:shadow-lg transition-shadow relative">
            {program.matchScore >= 85 && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-600 text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Top Match
                </Badge>
              </div>
            )}
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
                    <Badge className={`bg-gray-100 ${getCompetitivenessColor(program.competitiveness)}`}>
                      {program.competitiveness} Competition
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">
                    {program.institution} • {program.location} • Code: {program.code}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">AI Match Score</div>
                  <div className="font-bold text-purple-600">
                    {program.matchScore}%
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Cut-off: {program.cutoffPoints.current} pts
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
                    {program.cutoffPoints.current} points
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Cut-off Range</span>
                    <span>{Math.round(getBidProgress(program.cutoffPoints.current, program.cutoffPoints.minimum, program.cutoffPoints.maximum))}%</span>
                  </div>
                  <Progress 
                    value={getBidProgress(program.cutoffPoints.current, program.cutoffPoints.minimum, program.cutoffPoints.maximum)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{program.cutoffPoints.minimum} pts (Min)</span>
                    <span>{program.cutoffPoints.maximum} pts (Historical Max)</span>
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
                  Capacity: {program.capacity} students • Competition: {program.competitiveness}
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
