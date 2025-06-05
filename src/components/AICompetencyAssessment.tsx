
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Brain, Shield, TrendingUp, Target, CheckCircle, AlertTriangle } from "lucide-react";
import { 
  CompetencyPredictor, 
  SecureAssessmentHandler,
  learningAreas, 
  competencyLevels,
  type StudentProfile,
  type AssessmentResult,
  type PathwayPrediction 
} from '../data/competencyAssessment';

const AICompetencyAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([]);
  const [predictions, setPredictions] = useState<PathwayPrediction[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile>({
    upiNumber: 'UPI2024001',
    name: 'Wanjiku Mwangi',
    grade: 12,
    school: 'Nairobi Girls High School',
    assessmentHistory: [],
    interests: ['science', 'technology', 'problem-solving'],
    parentalSupport: 'high'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate assessment questions for each learning area
  const assessmentQuestions = {
    mathematics: [
      "Solve a complex algebraic equation involving quadratic functions",
      "Apply calculus concepts to real-world optimization problems",
      "Demonstrate statistical analysis of data sets"
    ],
    sciences: [
      "Design and conduct a scientific experiment",
      "Analyze chemical reactions and their applications",
      "Explain biological processes and their interconnections"
    ],
    languages: [
      "Compose a persuasive essay on a contemporary issue",
      "Demonstrate comprehension of complex literary texts",
      "Communicate effectively in multiple languages"
    ],
    social_studies: [
      "Analyze historical events and their modern implications",
      "Evaluate social policies and their impact on communities",
      "Demonstrate understanding of governance systems"
    ],
    creative_arts: [
      "Create an original artistic work expressing personal ideas",
      "Critique artistic works using aesthetic principles",
      "Demonstrate technical skills in chosen art form"
    ],
    physical_education: [
      "Plan and execute a fitness training program",
      "Demonstrate leadership in team sports activities",
      "Apply health and nutrition principles"
    ]
  };

  const [currentAssessment, setCurrentAssessment] = useState({
    areaId: '',
    score: 0,
    responses: [] as number[]
  });

  const startAssessment = (areaId: string) => {
    setCurrentAssessment({
      areaId,
      score: 0,
      responses: []
    });
    setCurrentStep(1);
  };

  const submitResponse = (questionIndex: number, score: number) => {
    const newResponses = [...currentAssessment.responses];
    newResponses[questionIndex] = score;
    setCurrentAssessment(prev => ({
      ...prev,
      responses: newResponses
    }));
  };

  const completeAssessment = () => {
    if (!SecureAssessmentHandler.validateAssessmentInput({
      score: currentAssessment.responses.reduce((a, b) => a + b, 0),
      learningAreaId: currentAssessment.areaId
    })) {
      alert('Invalid assessment data. Please try again.');
      return;
    }

    const totalScore = currentAssessment.responses.reduce((a, b) => a + b, 0);
    const level = competencyLevels.find(l => {
      const [min, max] = l.markRange.split('-').map(n => parseInt(n));
      return totalScore >= min && totalScore <= (max || 20);
    }) || competencyLevels[0];

    const newResult: AssessmentResult = {
      learningAreaId: currentAssessment.areaId,
      score: totalScore,
      level,
      strengths: generateStrengths(currentAssessment.areaId, currentAssessment.responses),
      improvementAreas: generateImprovementAreas(currentAssessment.areaId, currentAssessment.responses)
    };

    setAssessmentResults(prev => {
      const filtered = prev.filter(r => r.learningAreaId !== currentAssessment.areaId);
      return [...filtered, newResult];
    });

    setCurrentStep(0);
  };

  const generateStrengths = (areaId: string, responses: number[]): string[] => {
    const area = learningAreas.find(a => a.id === areaId);
    const strengths: string[] = [];
    
    responses.forEach((score, index) => {
      if (score >= 4) {
        strengths.push(area?.keyCompetencies[index] || `Skill ${index + 1}`);
      }
    });
    
    return strengths;
  };

  const generateImprovementAreas = (areaId: string, responses: number[]): string[] => {
    const area = learningAreas.find(a => a.id === areaId);
    const improvements: string[] = [];
    
    responses.forEach((score, index) => {
      if (score < 3) {
        improvements.push(area?.keyCompetencies[index] || `Skill ${index + 1}`);
      }
    });
    
    return improvements;
  };

  const generatePredictions = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updatedProfile: StudentProfile = {
      ...studentProfile,
      assessmentHistory: assessmentResults
    };
    
    const predictor = CompetencyPredictor.getInstance();
    const pathwayPredictions = predictor.predictPathways(updatedProfile);
    
    setPredictions(pathwayPredictions);
    setIsProcessing(false);
    setCurrentStep(2);
  };

  const getCompetencyColor = (level: number) => {
    switch (level) {
      case 4: return 'text-green-600 bg-green-100';
      case 3: return 'text-blue-600 bg-blue-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 1: return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (currentStep === 1) {
    const area = learningAreas.find(a => a.id === currentAssessment.areaId);
    const questions = assessmentQuestions[currentAssessment.areaId] || [];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">AI Competency Assessment: {area?.name}</h2>
          <p className="text-gray-600">{area?.description}</p>
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            Your responses are processed securely and anonymously to generate personalized recommendations.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          {questions.map((question, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">Task {index + 1}</CardTitle>
                <CardDescription>{question}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm font-medium">Rate your ability to perform this task:</p>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map(score => (
                      <Button
                        key={score}
                        variant={currentAssessment.responses[index] === score ? "default" : "outline"}
                        onClick={() => submitResponse(index, score)}
                        className="text-xs"
                      >
                        {score}
                      </Button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 grid grid-cols-5 gap-2">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setCurrentStep(0)}>
            Back to Areas
          </Button>
          <Button 
            onClick={completeAssessment}
            disabled={currentAssessment.responses.length < questions.length}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Complete Assessment
          </Button>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">AI-Generated Pathway Predictions</h2>
          <p className="text-gray-600">Based on your competency assessment and CBC framework</p>
        </div>

        <Alert>
          <Brain className="h-4 w-4" />
          <AlertDescription>
            These predictions use ethical AI algorithms that consider your competencies, interests, and CBC requirements.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          {predictions.slice(0, 3).map((prediction, index) => {
            const area = learningAreas.find(a => a.id === prediction.pathwayId);
            return (
              <Card key={prediction.pathwayId} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <span>#{index + 1} {area?.name}</span>
                      <Badge className={`ml-2 ${prediction.confidence >= 70 ? 'bg-green-100 text-green-800' : prediction.confidence >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        {Math.round(prediction.confidence)}% Match
                      </Badge>
                    </CardTitle>
                  </div>
                  <Progress value={prediction.confidence} className="mt-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Why this pathway suits you:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {prediction.reasoning.map((reason, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Requirements to pursue:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {prediction.requirements.slice(0, 3).map((req, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {prediction.improvementPlan.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Improvement Plan:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {prediction.improvementPlan.slice(0, 2).map((plan, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <TrendingUp className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>{plan}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setCurrentStep(0)} variant="outline">
            Take Another Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">AI Competency Assessment</h1>
        <p className="text-gray-600">Discover your pathway based on CBC Competency Based Assessment framework</p>
      </div>

      {/* Security Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          This assessment follows strict security protocols with encrypted data handling and ethical AI practices.
        </AlertDescription>
      </Alert>

      {/* Assessment Progress */}
      {assessmentResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Competency Profile</CardTitle>
            <CardDescription>Based on CBC assessment framework</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assessmentResults.map(result => {
                const area = learningAreas.find(a => a.id === result.learningAreaId);
                return (
                  <div key={result.learningAreaId} className={`p-4 rounded-lg ${getCompetencyColor(result.level.level)}`}>
                    <div className="font-medium">{area?.name}</div>
                    <div className="text-sm">{result.level.performance}</div>
                    <div className="text-xs mt-1">{result.score}/20 marks (Level {result.level.level})</div>
                  </div>
                );
              })}
            </div>
            
            {assessmentResults.length >= 3 && (
              <div className="mt-4 text-center">
                <Button onClick={generatePredictions} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
                  {isProcessing ? (
                    <>
                      <Brain className="w-4 h-4 mr-2 animate-spin" />
                      AI Processing...
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4 mr-2" />
                      Generate AI Pathway Predictions
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Learning Areas Assessment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningAreas.map(area => {
          const completed = assessmentResults.find(r => r.learningAreaId === area.id);
          return (
            <Card key={area.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {area.name}
                  {completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                </CardTitle>
                <CardDescription>{area.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm font-medium mb-1">Key Competencies:</div>
                  <div className="flex flex-wrap gap-1">
                    {area.keyCompetencies.map(comp => (
                      <Badge key={comp} variant="secondary" className="text-xs">
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium mb-1">Career Pathways:</div>
                  <div className="text-xs text-gray-600">
                    {area.careerPathways.slice(0, 3).join(', ')}...
                  </div>
                </div>
                {completed ? (
                  <div className={`p-2 rounded text-center ${getCompetencyColor(completed.level.level)}`}>
                    <div className="font-medium">{completed.level.performance}</div>
                    <div className="text-xs">{completed.score}/20 marks</div>
                  </div>
                ) : (
                  <Button 
                    onClick={() => startAssessment(area.id)}
                    className="w-full"
                    variant="outline"
                  >
                    Start Assessment
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* CBC Information */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">About CBC Competency Assessment</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>This assessment aligns with Kenya's Competency Based Curriculum (CBC) framework:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Measures practical application of knowledge, skills, and values</li>
            <li>Uses multiple assessment methods beyond traditional exams</li>
            <li>Focuses on real-world problem-solving abilities</li>
            <li>Provides continuous feedback for improvement</li>
            <li>Supports personalized learning pathways</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AICompetencyAssessment;
