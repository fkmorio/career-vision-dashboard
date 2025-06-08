
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, GraduationCap, Users, TrendingUp, AlertCircle, MapPin, Star, Target, Brain, DollarSign, Calendar, BookOpen, ArrowRight } from "lucide-react";
import { useAuth } from '../contexts/AuthContext';

const Bidding = () => {
  const { user } = useAuth();
  const [activeBids, setActiveBids] = useState([]);
  const [selectedPriority, setSelectedPriority] = useState({});
  const [transitionType, setTransitionType] = useState('jss-to-sss'); // Default transition

  // Transition types
  const transitionTypes = [
    { value: 'jss-to-sss', label: 'JSS to SSS (Grade 9 → Grade 10)', description: 'Junior Secondary to Senior Secondary School' },
    { value: 'sss-to-tertiary', label: 'SSS to Tertiary (Grade 12 → University/TVET)', description: 'Senior Secondary to Tertiary Education' }
  ];

  // Generate dynamic opportunities based on transition type and user profile
  const generateUserOpportunities = () => {
    if (!user) return [];

    const userPoints = parseInt(user.profileData?.grade?.toString() || '65') || 65;
    
    if (transitionType === 'jss-to-sss') {
      return [
        {
          id: 1,
          institution: 'Nairobi High School',
          program: 'STEM Pathway - Senior Secondary',
          code: 'SSS-STEM-001',
          type: 'Senior Secondary',
          location: 'Nairobi',
          cutoffPoints: { current: 75, minimum: 70, maximum: 85 },
          deadline: '2024-06-15',
          timeLeft: '3 days',
          totalBidders: 840,
          capacity: 120,
          clusters: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
          description: 'Focus on Science, Technology, Engineering, and Mathematics for university preparation.',
          status: 'active',
          userBid: null,
          helbEligible: false,
          scholarships: ['Academic Excellence', 'STEM Scholarship'],
          matchScore: calculateMatchScore(userPoints, user.profileData?.cluster || 'General', 'SSS'),
          competitiveness: userPoints >= 75 ? 'Low' : userPoints >= 65 ? 'Medium' : 'High',
          fees: { tuition: 45000, boarding: 25000, other: 15000 },
          duration: '3 years (Grade 10-12)',
          currentBand: 'A',
          nextReviewDate: '2024-07-01'
        },
        {
          id: 2,
          institution: 'Kiambu Technical High School',
          program: 'TVET Pathway - Technical Track',
          code: 'SSS-TVET-002',
          type: 'Senior Secondary',
          location: 'Kiambu',
          cutoffPoints: { current: 55, minimum: 50, maximum: 65 },
          deadline: '2024-06-12',
          timeLeft: '8 hours',
          totalBidders: 560,
          capacity: 80,
          clusters: ['Mathematics', 'Physics', 'Technical Studies'],
          description: 'Technical and Vocational pathway leading to practical skills and TVET colleges.',
          status: 'urgent',
          userBid: null,
          helbEligible: false,
          scholarships: ['Technical Skills Fund'],
          matchScore: calculateMatchScore(userPoints, user.profileData?.cluster || 'General', 'SSS'),
          competitiveness: userPoints >= 60 ? 'Low' : 'Medium',
          fees: { tuition: 35000, boarding: 20000, other: 10000 },
          duration: '3 years (Grade 10-12)',
          currentBand: 'B',
          nextReviewDate: '2024-07-15'
        }
      ];
    } else {
      return [
        {
          id: 3,
          institution: 'University of Nairobi',
          program: 'Bachelor of Medicine and Bachelor of Surgery',
          code: 'J01/01/01',
          type: 'Degree',
          location: 'Nairobi',
          cutoffPoints: { current: 75, minimum: 70, maximum: 84 },
          deadline: '2024-06-15',
          timeLeft: '3 days',
          totalBidders: 2840,
          capacity: 150,
          clusters: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
          description: 'Premier medical program with excellent career prospects.',
          status: 'active',
          userBid: null,
          helbEligible: true,
          scholarships: ['Merit-based', 'Need-based'],
          matchScore: calculateMatchScore(userPoints, user.profileData?.cluster || 'General', 'University'),
          competitiveness: userPoints >= 75 ? 'Low' : userPoints >= 65 ? 'Medium' : 'High',
          fees: { tuition: 120000, boarding: 45000, other: 25000 },
          duration: '6 years',
          currentBand: 'A+',
          nextReviewDate: '2024-08-01'
        },
        {
          id: 4,
          institution: 'Kiambu Institute of Science and Technology',
          program: 'Diploma in Information Technology',
          code: 'T07/04/01',
          type: 'Diploma',
          location: 'Kiambu',
          cutoffPoints: { current: 45, minimum: 40, maximum: 55 },
          deadline: '2024-06-12',
          timeLeft: '8 hours',
          totalBidders: 1560,
          capacity: 120,
          clusters: ['Mathematics', 'Physics', 'Computer Studies'],
          description: 'Technology-focused program with industry partnerships and internships.',
          status: 'urgent',
          userBid: null,
          helbEligible: true,
          scholarships: ['Tech Innovation Fund'],
          matchScore: calculateMatchScore(userPoints, user.profileData?.cluster || 'General', 'TVET'),
          competitiveness: userPoints >= 50 ? 'Low' : 'Medium',
          fees: { tuition: 85000, boarding: 35000, other: 15000 },
          duration: '3 years',
          currentBand: 'B+',
          nextReviewDate: '2024-07-20'
        }
      ];
    }
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

  const getBandColor = (band) => {
    switch(band) {
      case 'A+': return 'bg-green-600 text-white';
      case 'A': return 'bg-green-500 text-white';
      case 'B+': return 'bg-blue-500 text-white';
      case 'B': return 'bg-blue-400 text-white';
      case 'C': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const userPoints = user ? parseInt(user.profileData?.grade?.toString() || '65') || 65 : 65;
  const matchProbability = kuccpsOpportunities.length > 0 
    ? Math.round(kuccpsOpportunities.reduce((acc, opp) => acc + opp.matchScore, 0) / kuccpsOpportunities.length)
    : 78;

  const currentTransition = transitionTypes.find(t => t.value === transitionType);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user ? `Enhanced KUCCPS Selection for ${user.name}` : 'Enhanced KUCCPS Program Selection'}
          </h1>
          <p className="text-gray-600 mt-1">
            Choose your transition pathway and explore programs with detailed costs, duration, and current performance bands
          </p>
        </div>
        {user && (
          <div className="text-right">
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
              <Brain className="w-4 h-4 mr-1" />
              AI Optimized
            </Badge>
            <div className="text-sm text-gray-600 mt-1">Role: {user.role}</div>
          </div>
        )}
      </div>

      {/* Transition Type Selection */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-900">
            <ArrowRight className="w-5 h-5 mr-2" />
            Select Your Transition Pathway
          </CardTitle>
          <CardDescription>Choose the educational transition that applies to your current situation</CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={transitionType} onValueChange={setTransitionType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transition type" />
            </SelectTrigger>
            <SelectContent>
              {transitionTypes.map((transition) => (
                <SelectItem key={transition.value} value={transition.value}>
                  <div>
                    <div className="font-medium">{transition.label}</div>
                    <div className="text-sm text-gray-600">{transition.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {currentTransition && (
            <div className="mt-3 p-3 bg-white rounded-lg border">
              <div className="font-medium text-blue-900">{currentTransition.label}</div>
              <div className="text-sm text-gray-600">{currentTransition.description}</div>
            </div>
          )}
        </CardContent>
      </Card>

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
                <div className="text-2xl font-bold text-blue-600">{user.profileData?.cluster || 'General'}</div>
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
              {user ? `Grade ${user.profileData?.grade || 9}` : 'B (65)'}
            </div>
            <div className="text-sm text-gray-600">Your Current Grade</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{matchProbability}%</div>
            <div className="text-sm text-gray-600">Match Probability</div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <div className="font-medium text-blue-900">Enhanced KUCCPS Selection Guidelines</div>
              <div className="text-sm text-blue-700">
                {user 
                  ? `For your ${currentTransition?.label} transition, we've curated programs with detailed cost breakdowns, course duration, and current performance bands. Consider your academic performance, financial capacity, and career goals.`
                  : `Select programs based on your transition type. Review program costs, duration, and current performance bands to make informed decisions.`
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
            <span className="text-sm text-gray-600">Current Transition:</span>
            <Badge className="bg-green-100 text-green-800">{currentTransition?.label}</Badge>
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
                    <Badge className={`${getBandColor(program.currentBand)}`}>
                      Band {program.currentBand}
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
              
              {/* Enhanced Program Details with Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="costs">Costs</TabsTrigger>
                  <TabsTrigger value="duration">Duration</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-3">
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
                </TabsContent>

                <TabsContent value="costs" className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white rounded">
                        <DollarSign className="w-5 h-5 mx-auto text-blue-600 mb-1" />
                        <div className="font-bold text-blue-600">{formatCurrency(program.fees.tuition)}</div>
                        <div className="text-xs text-gray-600">Annual Tuition</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded">
                        <DollarSign className="w-5 h-5 mx-auto text-green-600 mb-1" />
                        <div className="font-bold text-green-600">{formatCurrency(program.fees.boarding)}</div>
                        <div className="text-xs text-gray-600">Boarding (Annual)</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded">
                        <DollarSign className="w-5 h-5 mx-auto text-orange-600 mb-1" />
                        <div className="font-bold text-orange-600">{formatCurrency(program.fees.other)}</div>
                        <div className="text-xs text-gray-600">Other Fees</div>
                      </div>
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded text-center">
                      <div className="font-bold text-lg text-blue-800">
                        {formatCurrency(program.fees.tuition + program.fees.boarding + program.fees.other)}
                      </div>
                      <div className="text-sm text-blue-600">Total Annual Cost</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="duration" className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-center mb-3">
                      <Calendar className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-xl text-purple-600">{program.duration}</div>
                      <div className="text-sm text-gray-600 mt-1">Program Duration</div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                      <div className="font-medium mb-2">What to expect:</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Structured academic progression</li>
                        <li>Competency-based assessments</li>
                        <li>Career guidance and counseling</li>
                        <li>Industry exposure and internships</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded">
                        <Badge className={`${getBandColor(program.currentBand)} mb-2`}>
                          Band {program.currentBand}
                        </Badge>
                        <div className="text-xs text-gray-600">Current Performance Band</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded">
                        <div className="font-bold text-gray-800">{program.nextReviewDate}</div>
                        <div className="text-xs text-gray-600">Next Review Date</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-2">Performance Indicators:</div>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Graduate employment rate: 92%</li>
                        <li>Industry satisfaction: High</li>
                        <li>Student satisfaction: 4.2/5</li>
                        <li>Research output: Above average</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

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
                  <Badge className={`${getCompetitivenessColor(program.competitiveness)} mr-2`}>
                    {program.competitiveness} Competition
                  </Badge>
                  <span>Capacity: {program.capacity} students</span>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-1" />
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
