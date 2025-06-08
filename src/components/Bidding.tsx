import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  TrendingUp, 
  Clock, 
  Users, 
  MapPin, 
  Star, 
  DollarSign, 
  Calendar, 
  GraduationCap,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Building,
  Award,
  Calculator,
  Info,
  ArrowUpDown,
  Filter
} from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import FundingCalculator from './bidding/FundingCalculator';
import FundingInfoPanel from './bidding/FundingInfoPanel';

const Bidding = () => {
  const { user } = useAuth();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [transitionType, setTransitionType] = useState<'JSS-SSS' | 'SSS-Tertiary'>('SSS-Tertiary');
  const [selectedCluster, setSelectedCluster] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [showOnlyAffordable, setShowOnlyAffordable] = useState(false);

  // Transition types
  const transitionTypes = [
    { value: 'JSS-SSS' as const, label: 'JSS to SSS (Grade 9 → Grade 10)', description: 'Junior Secondary to Senior Secondary School' },
    { value: 'SSS-Tertiary' as const, label: 'SSS to Tertiary (Grade 12 → University/TVET)', description: 'Senior Secondary to Tertiary Education' }
  ];

  // Generate dynamic opportunities based on transition type and user profile
  const generatePrograms = () => {
    const basePrograms = [
      // University Programs (SSS-Tertiary)
      {
        id: 1,
        name: 'Bachelor of Medicine and Bachelor of Surgery',
        institution: 'University of Nairobi',
        code: 'J01/01/01',
        points: 75,
        cluster: 'STEM',
        duration: '6 years',
        annualFee: 185000,
        totalCost: 1110000,
        currentBand: 'A',
        competitiveness: 95,
        employability: 98,
        marketDemand: 'Very High',
        transitionType: 'SSS-Tertiary' as const,
        placementStats: {
          applied: 12450,
          placed: 285,
          cutoffTrend: 'stable'
        },
        fundingOptions: {
          helb: 60000,
          scholarship: 90,
          workStudy: true
        },
        careerOutlook: {
          startingSalary: 120000,
          growthRate: 15,
          jobSecurity: 'Very High'
        }
      },
      {
        id: 2,
        name: 'Bachelor of Engineering (Computer)',
        institution: 'Jomo Kenyatta University',
        code: 'J07/04/02',
        points: 68,
        cluster: 'STEM',
        duration: '4 years',
        annualFee: 165000,
        totalCost: 660000,
        currentBand: 'A-',
        competitiveness: 82,
        employability: 95,
        marketDemand: 'Very High',
        transitionType: 'SSS-Tertiary' as const,
        placementStats: {
          applied: 8920,
          placed: 520,
          cutoffTrend: 'rising'
        },
        fundingOptions: {
          helb: 60000,
          scholarship: 75,
          workStudy: true
        },
        careerOutlook: {
          startingSalary: 85000,
          growthRate: 25,
          jobSecurity: 'Very High'
        }
      },
      // Secondary Programs (JSS-SSS)
      {
        id: 3,
        name: 'Science, Technology, Engineering & Mathematics (STEM)',
        institution: 'Alliance High School',
        code: 'SS/STEM/001',
        points: 85,
        cluster: 'STEM',
        duration: '3 years',
        annualFee: 45000,
        totalCost: 135000,
        currentBand: 'Level 4',
        competitiveness: 88,
        employability: 92,
        marketDemand: 'High',
        transitionType: 'JSS-SSS' as const,
        placementStats: {
          applied: 3200,
          placed: 180,
          cutoffTrend: 'stable'
        },
        fundingOptions: {
          fdse: 22244,
          scholarship: 85,
          workStudy: false
        },
        careerOutlook: {
          universityReadiness: 95,
          pathwayOptions: 15,
          skillDevelopment: 'Excellent'
        }
      },
      {
        id: 4,
        name: 'Arts & Social Sciences Pathway',
        institution: 'Starehe Boys Centre',
        code: 'SS/ARTS/002',
        points: 78,
        cluster: 'Arts',
        duration: '3 years',
        annualFee: 38000,
        totalCost: 114000,
        currentBand: 'Level 4',
        competitiveness: 75,
        employability: 85,
        marketDemand: 'Moderate',
        transitionType: 'JSS-SSS' as const,
        placementStats: {
          applied: 2800,
          placed: 280,
          cutoffTrend: 'stable'
        },
        fundingOptions: {
          fdse: 22244,
          scholarship: 70,
          workStudy: false
        },
        careerOutlook: {
          universityReadiness: 88,
          pathwayOptions: 12,
          skillDevelopment: 'Very Good'
        }
      },
      // TVET Programs
      {
        id: 5,
        name: 'Diploma in Information Communication Technology',
        institution: 'Kenya Institute of Management',
        code: 'T07/04/01',
        points: 45,
        cluster: 'Technical',
        duration: '3 years',
        annualFee: 85000,
        totalCost: 255000,
        currentBand: 'Credit',
        competitiveness: 60,
        employability: 88,
        marketDemand: 'High',
        transitionType: 'SSS-Tertiary' as const,
        placementStats: {
          applied: 2200,
          placed: 450,
          cutoffTrend: 'stable'
        },
        fundingOptions: {
          helb: 50000,
          tvetCapitation: 30000,
          scholarship: 60,
          workStudy: true
        },
        careerOutlook: {
          startingSalary: 45000,
          growthRate: 18,
          jobSecurity: 'High'
        }
      }
    ];

    // Filter by transition type and cluster
    return basePrograms.filter(program => {
      const matchesTransition = program.transitionType === transitionType;
      const matchesCluster = selectedCluster === 'all' || program.cluster === selectedCluster;
      return matchesTransition && matchesCluster;
    });
  };

  const programs = generatePrograms();

  const getAffordabilityStatus = (program) => {
    const maxAffordable = 100000; // Example threshold
    if (program.annualFee <= maxAffordable) return { status: 'affordable', color: 'text-green-600' };
    if (program.fundingOptions.scholarship >= 70) return { status: 'with aid', color: 'text-yellow-600' };
    return { status: 'challenging', color: 'text-red-600' };
  };

  const getCompetitivenessColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getBandColor = (band, transitionType) => {
    if (transitionType === 'JSS-SSS') {
      // CBC Proficiency Levels
      if (band.includes('Level 4')) return 'bg-green-100 text-green-800';
      if (band.includes('Level 3')) return 'bg-blue-100 text-blue-800';
      return 'bg-gray-100 text-gray-800';
    } else {
      // University grades
      if (band.includes('A')) return 'bg-green-100 text-green-800';
      if (band.includes('B')) return 'bg-blue-100 text-blue-800';
      return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getProgramType = (transitionType) => {
    return transitionType === 'JSS-SSS' ? 'secondary' : 'university';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Educational Pathway Bidding
          </h1>
          <p className="text-gray-600 mt-1">
            Choose your educational journey with comprehensive funding information
          </p>
        </div>
        {user && (
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            {user.name} - {user.profileData?.cluster || 'General'} Track
          </Badge>
        )}
      </div>

      {/* Transition Type Selector */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowUpDown className="w-5 h-5 mr-2 text-purple-600" />
            Choose Your Transition Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={transitionType === 'JSS-SSS' ? 'default' : 'outline'}
              onClick={() => setTransitionType('JSS-SSS')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <GraduationCap className="w-6 h-6 mb-2" />
              <div>JSS → Senior Secondary</div>
              <div className="text-xs opacity-75">Grade 9 to Grade 10+</div>
            </Button>
            <Button
              variant={transitionType === 'SSS-Tertiary' ? 'default' : 'outline'}
              onClick={() => setTransitionType('SSS-Tertiary')}
              className="h-20 flex flex-col items-center justify-center"
            >
              <Building className="w-6 h-6 mb-2" />
              <div>SSS → Tertiary Education</div>
              <div className="text-xs opacity-75">University, College, TVET</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Cluster/Field</label>
              <Select value={selectedCluster} onValueChange={setSelectedCluster}>
                <SelectTrigger>
                  <SelectValue placeholder="All clusters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Clusters</SelectItem>
                  <SelectItem value="STEM">STEM</SelectItem>
                  <SelectItem value="Arts">Arts & Social Sciences</SelectItem>
                  <SelectItem value="Technical">Technical & Vocational</SelectItem>
                  <SelectItem value="Sports">Sports & Performing Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="cost-low">Cost (Low to High)</SelectItem>
                  <SelectItem value="cost-high">Cost (High to Low)</SelectItem>
                  <SelectItem value="competitiveness">Competitiveness</SelectItem>
                  <SelectItem value="employability">Employability</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant={showOnlyAffordable ? 'default' : 'outline'}
                onClick={() => setShowOnlyAffordable(!showOnlyAffordable)}
                className="w-full"
              >
                <Filter className="w-4 h-4 mr-2" />
                Affordable Only
              </Button>
            </div>
            <div className="flex items-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Info className="w-4 h-4 mr-2" />
                    Funding Guide
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Complete Funding Guide</DialogTitle>
                    <DialogDescription>
                      Learn about all available funding options for your education
                    </DialogDescription>
                  </DialogHeader>
                  <FundingInfoPanel />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programs Grid */}
      <div className="grid gap-6">
        {programs.map((program) => {
          const affordability = getAffordabilityStatus(program);
          const programType = getProgramType(program.transitionType);
          
          if (showOnlyAffordable && affordability.status === 'challenging') return null;
          
          return (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <Badge className={getBandColor(program.currentBand, program.transitionType)}>
                        {program.currentBand}
                      </Badge>
                      <Badge variant="outline">{program.cluster}</Badge>
                    </div>
                    <CardDescription className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {program.institution}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {program.duration}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {program.code}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {program.points} {transitionType === 'JSS-SSS' ? 'CBE Points' : 'KCSE Points'}
                    </div>
                    <div className="text-sm text-gray-600">Required</div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Cost and Funding Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600">
                      KES {program.annualFee.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Annual Fee</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      KES {program.totalCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Total Cost</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${affordability.color}`}>
                      {affordability.status}
                    </div>
                    <div className="text-sm text-gray-600">Affordability</div>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className={`text-xl font-bold ${getCompetitivenessColor(program.competitiveness)}`}>
                      {program.competitiveness}%
                    </div>
                    <div className="text-xs text-gray-600">Competitiveness</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-xl font-bold text-green-600">
                      {program.employability}%
                    </div>
                    <div className="text-xs text-gray-600">Employability</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-xl font-bold text-purple-600">
                      {program.placementStats.placed}
                    </div>
                    <div className="text-xs text-gray-600">Placed</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg border">
                    <div className="text-xl font-bold text-orange-600">
                      {program.marketDemand}
                    </div>
                    <div className="text-xs text-gray-600">Market Demand</div>
                  </div>
                </div>

                {/* Placement Statistics */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Placement Rate</span>
                    <span>{Math.round((program.placementStats.placed / program.placementStats.applied) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(program.placementStats.placed / program.placementStats.applied) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-600">
                    {program.placementStats.placed} placed out of {program.placementStats.applied} applications
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    onClick={() => setSelectedProgram(program)}
                    className="flex-1 min-w-[150px]"
                  >
                    <Target className="w-4 h-4 mr-2" />
                    Apply Now
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1 min-w-[150px]">
                        <Calculator className="w-4 h-4 mr-2" />
                        Funding Calculator
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{program.name} - Funding Calculator</DialogTitle>
                        <DialogDescription>
                          Calculate your funding options and financial planning
                        </DialogDescription>
                      </DialogHeader>
                      <FundingCalculator 
                        programCost={program.totalCost}
                        programType={programType as 'university' | 'tvet' | 'secondary'}
                        transitionType={program.transitionType}
                      />
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Info className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>{program.name}</DialogTitle>
                        <DialogDescription>{program.institution}</DialogDescription>
                      </DialogHeader>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="overview">Overview</TabsTrigger>
                          <TabsTrigger value="funding">Funding</TabsTrigger>
                          <TabsTrigger value="career">Career Outlook</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Program Details</h4>
                              <div className="space-y-1 text-sm">
                                <div>Duration: {program.duration}</div>
                                <div>Code: {program.code}</div>
                                <div>Cluster: {program.cluster}</div>
                                <div>Current Band: {program.currentBand}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Requirements</h4>
                              <div className="space-y-1 text-sm">
                                <div>Points: {program.points}</div>
                                <div>Market Demand: {program.marketDemand}</div>
                                <div>Employability: {program.employability}%</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="funding" className="space-y-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Cost Breakdown</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Annual Fee:</span>
                                  <span>KES {program.annualFee.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                  <span>Total Program Cost:</span>
                                  <span>KES {program.totalCost.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Available Funding</h4>
                              <div className="space-y-2">
                                {program.fundingOptions.helb && (
                                  <div className="flex justify-between">
                                    <span>HELB Loan:</span>
                                    <span>KES {program.fundingOptions.helb.toLocaleString()}/year</span>
                                  </div>
                                )}
                                {program.fundingOptions.fdse && (
                                  <div className="flex justify-between">
                                    <span>FDSE Support:</span>
                                    <span>KES {program.fundingOptions.fdse.toLocaleString()}/year</span>
                                  </div>
                                )}
                                {program.fundingOptions.tvetCapitation && (
                                  <div className="flex justify-between">
                                    <span>TVET Capitation:</span>
                                    <span>KES {program.fundingOptions.tvetCapitation.toLocaleString()}/year</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Scholarship (Up to):</span>
                                  <span>{program.fundingOptions.scholarship}% of costs</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="career" className="space-y-4">
                          {program.careerOutlook.startingSalary ? (
                            <div>
                              <h4 className="font-medium mb-2">Career Prospects</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Starting Salary:</span>
                                  <span>KES {program.careerOutlook.startingSalary.toLocaleString()}/month</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Growth Rate:</span>
                                  <span>{program.careerOutlook.growthRate}% annually</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Job Security:</span>
                                  <span>{program.careerOutlook.jobSecurity}</span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <h4 className="font-medium mb-2">Pathway Preparation</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>University Readiness:</span>
                                  <span>{program.careerOutlook.universityReadiness}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Career Pathway Options:</span>
                                  <span>{program.careerOutlook.pathwayOptions}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Skill Development:</span>
                                  <span>{program.careerOutlook.skillDevelopment}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {programs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Programs Found</h3>
            <p className="text-gray-600">
              Try adjusting your filters to see more programs for your selected transition path.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Bidding;
