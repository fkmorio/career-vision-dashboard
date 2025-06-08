
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  MapPin,
  ArrowRight,
  Star,
  CheckCircle
} from "lucide-react";
import { useCBC } from '../contexts/CBCContext';
import { useAuth } from '../contexts/AuthContext';

const CBCPathwayExplorer = () => {
  const { pathways, getPathwayRecommendations, setCurrentPathway } = useCBC();
  const { user } = useAuth();
  const [selectedPathway, setSelectedPathway] = useState<string>('');

  const recommendedPathways = user ? getPathwayRecommendations(user) : pathways;

  const getPathwayIcon = (pathwayName: string) => {
    switch (pathwayName) {
      case 'STEM': return '🔬';
      case 'Social Sciences & Arts': return '🎨';
      case 'Sports & Performing Arts': return '🎭';
      case 'TVET': return '🔧';
      default: return '📚';
    }
  };

  const getMatchPercentage = (pathway: any) => {
    if (!user) return 75;
    return pathway.recommendationScore || 75;
  };

  const handleSelectPathway = (pathway: any) => {
    setCurrentPathway(pathway);
    setSelectedPathway(pathway.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CBC Pathway Explorer</h1>
          <p className="text-gray-600 mt-1">
            {user 
              ? `AI-powered pathway recommendations for ${user.name} (${user.profileData?.cluster || 'General'} cluster)`
              : 'Discover your ideal Senior Secondary School pathway'
            }
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <Brain className="w-4 h-4 mr-2" />
          AI Recommendations
        </Badge>
      </div>

      {/* AI Recommendation Overview */}
      {user && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-900">
              <Target className="w-5 h-5 mr-2" />
              Your Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your role ({user.role}), school ({user.profileData?.school || 'Not specified'}), 
              and current cluster ({user.profileData?.cluster || 'General'})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {recommendedPathways.filter((p: any) => getMatchPercentage(p) >= 80).length}
                </div>
                <div className="text-sm text-gray-600">High Match Pathways</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(recommendedPathways.reduce((acc: number, p: any) => 
                    acc + getMatchPercentage(p), 0) / recommendedPathways.length)}%
                </div>
                <div className="text-sm text-gray-600">Average Match Rate</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{user.profileData?.cluster || 'General'}</div>
                <div className="text-sm text-gray-600">Current Cluster</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-orange-600">Grade {user.profileData?.grade || 9}</div>
                <div className="text-sm text-gray-600">Selection Phase</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pathway Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {recommendedPathways.map((pathway: any, index: number) => {
          const matchPercentage = getMatchPercentage(pathway);
          const isHighMatch = matchPercentage >= 80;
          const isSelected = selectedPathway === pathway.id;
          
          return (
            <Card 
              key={pathway.id} 
              className={`relative hover:shadow-lg transition-all cursor-pointer ${
                isSelected ? 'ring-2 ring-blue-500 border-blue-300' : ''
              } ${isHighMatch ? 'border-green-300 bg-green-50' : ''}`}
              onClick={() => handleSelectPathway(pathway)}
            >
              {/* Recommendation Badge */}
              {user && index === 0 && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                    <Star className="w-3 h-3 mr-1" />
                    Top Match
                  </Badge>
                </div>
              )}
              
              {user && (
                <div className="absolute top-4 right-4">
                  <Badge className={`${
                    matchPercentage >= 90 ? 'bg-green-600' :
                    matchPercentage >= 80 ? 'bg-blue-600' :
                    matchPercentage >= 70 ? 'bg-yellow-600' :
                    'bg-gray-600'
                  } text-white`}>
                    {matchPercentage}% Match
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{getPathwayIcon(pathway.name)}</span>
                  <div>
                    <CardTitle className="text-xl">{pathway.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {pathway.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Match Progress */}
                {user && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Compatibility Score</span>
                      <span className="font-medium">{matchPercentage}%</span>
                    </div>
                    <Progress value={matchPercentage} className="h-2" />
                  </div>
                )}

                {/* Core Subjects */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Core Subjects</h4>
                  <div className="flex flex-wrap gap-1">
                    {pathway.coreSubjects.slice(0, 4).map((subject: string) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {pathway.coreSubjects.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{pathway.coreSubjects.length - 4} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Career Opportunities */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Sample Careers</h4>
                  <div className="text-sm text-gray-600">
                    {pathway.careerOpportunities.slice(0, 3).join(' • ')}
                    {pathway.careerOpportunities.length > 3 && ' • and more'}
                  </div>
                </div>

                {/* Tracks */}
                <div>
                  <h4 className="font-medium text-sm mb-2">Available Tracks</h4>
                  <div className="space-y-2">
                    {pathway.tracks.map((track: any) => (
                      <div key={track.id} className="bg-gray-50 rounded p-2">
                        <div className="font-medium text-sm">{track.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {track.careers.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button 
                    size="sm" 
                    className={isSelected ? 'bg-green-600 hover:bg-green-700' : ''}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Target className="w-4 h-4 mr-2" />
                        Select Pathway
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>

                {/* Why Recommended */}
                {user && pathway.recommendationScore && (
                  <div className="bg-blue-50 rounded p-3 mt-4">
                    <div className="text-sm font-medium text-blue-900 mb-1">
                      Why this pathway is recommended:
                    </div>
                    <div className="text-xs text-blue-800">
                      {user.profileData?.cluster === pathway.name && '✓ Matches your current cluster focus'}
                      {user.role === 'student' && ' ✓ Aligns with your student profile'}
                      {pathway.name === 'STEM' && user.role === 'student' && ' ✓ Excellent for your academic profile'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedPathway && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="flex items-center text-green-900">
              <CheckCircle className="w-5 h-5 mr-2" />
              Pathway Selection Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <span className="font-medium">Selected Pathway: </span>
                {pathways.find(p => p.id === selectedPathway)?.name}
              </div>
              <div className="text-sm text-gray-600">
                Next steps: Complete Grade 9 assessments, submit preference form through school, 
                and prepare for Senior Secondary School placement.
              </div>
              <div className="flex space-x-2">
                <Button size="sm">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Submit Preference
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Find Schools
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CBCPathwayExplorer;
