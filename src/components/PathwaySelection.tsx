
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, Book } from "lucide-react";

const PathwaySelection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const steps = [
    { id: 1, title: "Assess Interests", description: "Discover your career interests" },
    { id: 2, title: "Explore Pathways", description: "Choose your career path" },
    { id: 3, title: "Set Goals", description: "Define your career objectives" },
    { id: 4, title: "Create Plan", description: "Build your action plan" }
  ];

  const interests = [
    { id: 'tech', label: 'Technology & Programming', icon: '💻' },
    { id: 'design', label: 'Design & Creativity', icon: '🎨' },
    { id: 'business', label: 'Business & Management', icon: '📊' },
    { id: 'research', label: 'Research & Development', icon: '🔬' },
    { id: 'teaching', label: 'Teaching & Training', icon: '👨‍🏫' },
    { id: 'consulting', label: 'Consulting & Advisory', icon: '💼' }
  ];

  const pathways = [
    {
      id: 'software',
      title: 'Software Development',
      description: 'Build applications, websites, and software solutions',
      avgSalary: '₹8-25L',
      growth: 'High',
      skills: ['Programming', 'Problem Solving', 'System Design'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart'],
      duration: '0-2 years experience needed'
    },
    {
      id: 'data',
      title: 'Data Science & Analytics',
      description: 'Analyze data to drive business decisions and insights',
      avgSalary: '₹6-30L',
      growth: 'Very High',
      skills: ['Statistics', 'Python/R', 'Machine Learning'],
      companies: ['Netflix', 'Uber', 'Swiggy', 'Zomato'],
      duration: '1-3 years experience needed'
    },
    {
      id: 'product',
      title: 'Product Management',
      description: 'Lead product development and strategy',
      avgSalary: '₹10-35L',
      growth: 'High',
      skills: ['Strategy', 'Communication', 'Analytics'],
      companies: ['PayTM', 'BYJU\'S', 'OLA', 'PhonePe'],
      duration: '2-4 years experience needed'
    },
    {
      id: 'consulting',
      title: 'Management Consulting',
      description: 'Solve complex business problems for organizations',
      avgSalary: '₹12-40L',
      growth: 'Medium',
      skills: ['Problem Solving', 'Communication', 'Business Acumen'],
      companies: ['McKinsey', 'BCG', 'Bain', 'Deloitte'],
      duration: '0-2 years experience needed'
    }
  ];

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">What interests you most?</h2>
              <p className="text-gray-600">Select all areas that excite you (minimum 2)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <Card 
                  key={interest.id}
                  className={`cursor-pointer transition-all ${
                    selectedInterests.includes(interest.id) 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{interest.icon}</span>
                      <span className="font-medium">{interest.label}</span>
                      {selectedInterests.includes(interest.id) && (
                        <CheckCircle className="w-5 h-5 text-blue-500 ml-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Choose Your Career Pathway</h2>
              <p className="text-gray-600">Based on your interests, here are recommended pathways</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pathways.map((pathway) => (
                <Card 
                  key={pathway.id}
                  className={`cursor-pointer transition-all ${
                    selectedPathway === pathway.id 
                      ? 'ring-2 ring-green-500 bg-green-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPathway(pathway.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pathway.title}</CardTitle>
                      {selectedPathway === pathway.id && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>
                    <CardDescription>{pathway.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Avg Salary:</span>
                        <div className="font-medium text-green-600">{pathway.avgSalary}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Growth:</span>
                        <div className={`font-medium ${
                          pathway.growth === 'Very High' ? 'text-green-600' :
                          pathway.growth === 'High' ? 'text-blue-600' : 'text-orange-600'
                        }`}>{pathway.growth}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Key Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {pathway.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Top Companies:</div>
                      <div className="text-sm text-gray-600">
                        {pathway.companies.join(', ')}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 border-t pt-2">
                      {pathway.duration}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Set Your Career Goals</h2>
              <p className="text-gray-600">Define what you want to achieve in your chosen pathway</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Short-term Goals (6-12 months)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Complete relevant certifications</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Build portfolio projects</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Network with professionals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Apply to target companies</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Long-term Goals (2-5 years)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Achieve senior role position</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Earn target salary range</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Lead projects or teams</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Consider entrepreneurship</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Personalized Action Plan</h2>
              <p className="text-gray-600">Here's your roadmap to success</p>
            </div>
            <Card className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Congratulations!</h3>
                  <p className="text-gray-600">Your pathway to success in {pathways.find(p => p.id === selectedPathway)?.title} is ready.</p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Next Steps:</div>
                    <div className="space-y-1 text-sm">
                      <div>✅ Complete skills assessment</div>
                      <div>✅ Join relevant training programs</div>
                      <div>✅ Start building your portfolio</div>
                      <div>✅ Connect with mentors</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch(currentStep) {
      case 1: return selectedInterests.length >= 2;
      case 2: return selectedPathway !== null;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Career Pathway Selection</h1>
        <p className="text-gray-600 mt-1">Discover and plan your ideal career journey</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {steps.map((step) => (
              <div key={step.id} className="text-center">
                <div className="font-medium">{step.title}</div>
                <div className="text-xs">{step.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
          disabled={!canProceed()}
          className="bg-gradient-to-r from-blue-600 to-green-600"
        >
          {currentStep === 4 ? 'Complete' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PathwaySelection;
