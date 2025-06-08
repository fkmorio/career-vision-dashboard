
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Eye, 
  Users, 
  CheckCircle, 
  AlertTriangle, 
  Info,
  Settings,
  Brain,
  Lock,
  Zap
} from "lucide-react";
import { useAuth } from '../contexts/AuthContext';
import { responsibleAIGuidelines } from '../data/cbeTransitions';

interface AIRecommendation {
  id: string;
  type: 'pathway' | 'career' | 'assessment' | 'intervention';
  recommendation: string;
  confidence: number;
  reasoning: string[];
  biasScore: number;
  humanReviewRequired: boolean;
  dataPoints: string[];
  alternatives: string[];
}

const ResponsibleAI = () => {
  const { user, updatePreferences } = useAuth();
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);

  // Mock AI recommendation for demonstration
  const mockRecommendation: AIRecommendation = {
    id: 'rec_001',
    type: 'pathway',
    recommendation: 'STEM Pathway with Technology & Engineering Track',
    confidence: 87,
    reasoning: [
      'Strong performance in Mathematics (Level 3 - Proficient)',
      'Excellent problem-solving competency demonstrated',
      'Interest in technology and innovation projects',
      'Aligned with current labor market demands in Kenya'
    ],
    biasScore: 15, // Lower is better (0-100 scale)
    humanReviewRequired: false,
    dataPoints: [
      'Academic performance across 3 terms',
      'Competency assessments in 5 learning areas',
      'Interest inventory responses',
      'Project portfolio analysis'
    ],
    alternatives: [
      'Social Sciences & Arts with Creative Arts Track',
      'STEM with Pure Sciences Track'
    ]
  };

  const toggleAIRecommendations = (enabled: boolean) => {
    updatePreferences({ aiRecommendations: enabled });
  };

  const BiasIndicator = ({ score }: { score: number }) => {
    const getBiasLevel = (score: number) => {
      if (score <= 20) return { level: 'Low', color: 'text-green-600', bgColor: 'bg-green-100' };
      if (score <= 50) return { level: 'Medium', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      return { level: 'High', color: 'text-red-600', bgColor: 'bg-red-100' };
    };

    const biasInfo = getBiasLevel(score);

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${biasInfo.bgColor} ${biasInfo.color}`}>
        <Shield className="w-3 h-3 mr-1" />
        Bias Risk: {biasInfo.level} ({score}/100)
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Responsible AI Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Transparent, fair, and ethical AI recommendations for CBC pathway guidance
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <Shield className="w-4 h-4 mr-2" />
          Ethics Compliant
        </Badge>
      </div>

      {/* AI Settings and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            AI Recommendation Settings
          </CardTitle>
          <CardDescription>
            Control how AI recommendations are generated and presented
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable AI Recommendations</div>
              <div className="text-sm text-gray-600">Allow AI to suggest pathways and career options</div>
            </div>
            <Switch
              checked={user?.preferences.aiRecommendations || false}
              onCheckedChange={toggleAIRecommendations}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Require Human Review</div>
              <div className="text-sm text-gray-600">All recommendations reviewed by educators</div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Show AI Reasoning</div>
              <div className="text-sm text-gray-600">Display why recommendations were made</div>
            </div>
            <Switch 
              checked={showExplanation}
              onCheckedChange={setShowExplanation}
            />
          </div>
        </CardContent>
      </Card>

      {/* Responsible AI Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Our AI Principles
          </CardTitle>
          <CardDescription>
            How we ensure fair and responsible AI in CBC education
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {responsibleAIGuidelines.principles.map((principle, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900">{principle.split(':')[0]}</div>
                  <div className="text-blue-700">{principle.split(':')[1]}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sample AI Recommendation with Transparency */}
      {user?.preferences.aiRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              AI Recommendation Example
            </CardTitle>
            <CardDescription>
              Sample recommendation with full transparency and explanation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-blue-900">{mockRecommendation.recommendation}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-blue-600">
                    {mockRecommendation.confidence}% Confidence
                  </Badge>
                  <BiasIndicator score={mockRecommendation.biasScore} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Zap className="w-4 h-4 mr-1" />
                    Why This Recommendation?
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {mockRecommendation.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Lock className="w-4 h-4 mr-1" />
                    Data Used
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {mockRecommendation.dataPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-400 mr-2">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-200">
                <h4 className="font-medium mb-2">Alternative Pathways Considered:</h4>
                <div className="flex flex-wrap gap-2">
                  {mockRecommendation.alternatives.map((alt, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {alt}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Request Human Review
                </Button>
                <Button size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept Recommendation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ethical Safeguards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Ethical Safeguards in Action
          </CardTitle>
          <CardDescription>
            Active measures ensuring responsible AI usage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Bias Detection Rate</div>
              <div className="text-xs text-green-700 mt-1">Last 30 days</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Recommendations Audited</div>
              <div className="text-xs text-blue-700 mt-1">Human oversight</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">User Consent Rate</div>
              <div className="text-xs text-purple-700 mt-1">Data usage approval</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <div className="font-medium text-yellow-800">Continuous Monitoring</div>
                <div className="text-sm text-yellow-700 mt-1">
                  Our AI systems are continuously monitored for bias, accuracy, and ethical compliance. 
                  All recommendations undergo regular audits to ensure fairness across gender, region, 
                  and socioeconomic backgrounds.
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResponsibleAI;
