import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
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
  Zap,
  Scan,
  Filter,
  Target,
  Sparkles,
  FileCheck,
  AlertCircle,
  TrendingUp,
  Microscope,
  Bot
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

interface ContentAnalysis {
  isAIGenerated: boolean;
  confidence: number;
  watermarkDetected: boolean;
  biasLevel: 'low' | 'medium' | 'high';
  toxicityScore: number;
  ethicalRating: number;
  recommendations: string[];
}

const ResponsibleAI = () => {
  const { user, updatePreferences } = useAuth();
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);
  const [contentToAnalyze, setContentToAnalyze] = useState('');
  const [analysisResult, setAnalysisResult] = useState<ContentAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [rlhfDemo, setRlhfDemo] = useState({
    originalResponse: '',
    improvedResponse: '',
    humanFeedback: '',
    showImprovement: false
  });

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
    biasScore: 15,
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

  const analyzeContent = async () => {
    if (!contentToAnalyze.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: ContentAnalysis = {
        isAIGenerated: contentToAnalyze.includes('AI') || contentToAnalyze.length > 100,
        confidence: Math.random() * 40 + 60,
        watermarkDetected: Math.random() > 0.5,
        biasLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
        toxicityScore: Math.random() * 30,
        ethicalRating: Math.random() * 30 + 70,
        recommendations: [
          'Consider adding diverse perspectives to the content',
          'Verify factual claims with multiple sources',
          'Add appropriate disclaimers for AI-generated content'
        ]
      };
      
      setAnalysisResult(mockAnalysis);
      setIsAnalyzing(false);
    }, 2000);
  };

  const demonstrateRLHF = () => {
    const originalResponse = "STEM is the best pathway for all students who are good at math.";
    const improvedResponse = "STEM is an excellent pathway for students who show strong aptitude and interest in mathematics, science, and technology. However, it's important to consider each student's unique strengths, interests, and career goals. Other pathways like Social Sciences, Arts, or TVET may be equally valuable depending on individual circumstances and Kenya's diverse career landscape.";
    
    setRlhfDemo({
      originalResponse,
      improvedResponse,
      humanFeedback: feedbackText || "The original response shows bias by suggesting STEM is universally 'best'. Consider individual differences and cultural context.",
      showImprovement: true
    });
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

  const WatermarkVisualization = ({ detected }: { detected: boolean }) => (
    <div className={`p-3 rounded-lg border-2 ${detected ? 'border-blue-300 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}>
      <div className="flex items-center space-x-2">
        <Scan className={`w-5 h-5 ${detected ? 'text-blue-600' : 'text-gray-500'}`} />
        <span className={`font-medium ${detected ? 'text-blue-900' : 'text-gray-700'}`}>
          Digital Watermark: {detected ? 'Detected' : 'Not Found'}
        </span>
      </div>
      {detected && (
        <div className="mt-2 text-sm text-blue-700">
          ✓ Content verified as AI-generated with source attribution
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Responsible AI Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Interactive demonstrations of ethical AI practices in CBC pathway guidance
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <Shield className="w-4 h-4 mr-2" />
          Ethics Compliant
        </Badge>
      </div>

      {/* Interactive Content Analysis Tool */}
      <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Microscope className="w-5 h-5 mr-2" />
            AI Content Analysis Lab
          </CardTitle>
          <CardDescription>
            Test watermarking, bias detection, and content filtering in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Enter content to analyze:</label>
            <Textarea
              placeholder="Paste or type any educational content to analyze for AI generation, bias, and safety..."
              value={contentToAnalyze}
              onChange={(e) => setContentToAnalyze(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={analyzeContent} 
            disabled={!contentToAnalyze.trim() || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Bot className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Scan className="w-4 h-4 mr-2" />
                Analyze Content
              </>
            )}
          </Button>

          {analysisResult && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-3">
                <WatermarkVisualization detected={analysisResult.watermarkDetected} />
                
                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">AI Detection</span>
                    <Badge variant={analysisResult.isAIGenerated ? "destructive" : "secondary"}>
                      {analysisResult.isAIGenerated ? 'AI-Generated' : 'Human-Created'}
                    </Badge>
                  </div>
                  <Progress value={analysisResult.confidence} className="mb-1" />
                  <span className="text-xs text-gray-600">{analysisResult.confidence.toFixed(1)}% confidence</span>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Bias Level</span>
                    <Badge variant={analysisResult.biasLevel === 'low' ? 'secondary' : analysisResult.biasLevel === 'medium' ? 'default' : 'destructive'}>
                      {analysisResult.biasLevel.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Safety Score</span>
                    <Badge variant={analysisResult.toxicityScore < 20 ? 'secondary' : 'destructive'}>
                      {analysisResult.toxicityScore < 20 ? 'Safe' : 'Flagged'}
                    </Badge>
                  </div>
                  <Progress value={100 - analysisResult.toxicityScore} className="mb-1" />
                  <span className="text-xs text-gray-600">{(100 - analysisResult.toxicityScore).toFixed(1)}% safe</span>
                </div>

                <div className="p-3 bg-white rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Ethical Rating</span>
                    <Badge variant={analysisResult.ethicalRating > 80 ? 'secondary' : 'default'}>
                      {analysisResult.ethicalRating.toFixed(0)}/100
                    </Badge>
                  </div>
                  <Progress value={analysisResult.ethicalRating} className="mb-1" />
                </div>

                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-medium text-orange-800 mb-2">Recommendations:</h4>
                  <ul className="text-sm text-orange-700 space-y-1">
                    {analysisResult.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* RLHF Demonstration */}
      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <TrendingUp className="w-5 h-5 mr-2" />
            Reinforcement Learning from Human Feedback (RLHF) Demo
          </CardTitle>
          <CardDescription>
            See how human feedback improves AI responses for CBC guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Provide feedback on AI responses:</label>
            <Input
              placeholder="e.g., 'This response seems biased towards STEM students...'"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
          </div>

          <Button onClick={demonstrateRLHF} className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            Demonstrate RLHF Improvement
          </Button>

          {rlhfDemo.showImprovement && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Original Response (Biased)
                </h4>
                <p className="text-sm text-red-700 mb-3">{rlhfDemo.originalResponse}</p>
                <div className="p-2 bg-red-100 rounded text-xs text-red-600">
                  <strong>Human Feedback:</strong> {rlhfDemo.humanFeedback}
                </div>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Improved Response (RLHF)
                </h4>
                <p className="text-sm text-green-700">{rlhfDemo.improvedResponse}</p>
                <div className="mt-3 flex items-center text-xs text-green-600">
                  <Target className="w-3 h-3 mr-1" />
                  More balanced, inclusive, and contextually appropriate
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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

      {/* Enhanced Responsible AI Principles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Eye className="w-5 h-5 mr-2" />
            Our Enhanced AI Principles
          </CardTitle>
          <CardDescription>
            How we ensure fair and responsible AI in CBC education with cutting-edge practices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <Scan className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-blue-900">Digital Watermarking</div>
                  <div className="text-blue-700">All AI-generated content includes invisible watermarks for transparency and source verification</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-green-900">RLHF Integration</div>
                  <div className="text-green-700">Continuous improvement through educator and student feedback to align with Kenyan educational values</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                <Filter className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-purple-900">Advanced Guardrails</div>
                  <div className="text-purple-700">Multi-layer content filters preventing bias, misinformation, and harmful recommendations</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                <FileCheck className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="font-medium text-orange-900">Continuous Ethical Audits</div>
                  <div className="text-orange-700">Regular impact assessments ensuring fairness across gender, region, and socioeconomic status</div>
                </div>
              </div>

              {responsibleAIGuidelines.principles.slice(0, 2).map((principle, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{principle.split(':')[0]}</div>
                    <div className="text-gray-700">{principle.split(':')[1]}</div>
                  </div>
                </div>
              ))}
            </div>
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
