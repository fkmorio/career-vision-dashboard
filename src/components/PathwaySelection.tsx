
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, ArrowRight, Book, GraduationCap } from "lucide-react";

const PathwaySelection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState(null);

  const steps = [
    { id: 1, title: "Assess Interests", description: "Discover your academic interests" },
    { id: 2, title: "Choose Pathway", description: "Select your academic pathway" },
    { id: 3, title: "Select Institution", description: "Choose institution type" },
    { id: 4, title: "Career Goals", description: "Define your career objectives" },
    { id: 5, title: "Action Plan", description: "Build your transition plan" }
  ];

  const interests = [
    { id: 'creative', label: 'Creative & Artistic Expression', icon: '🎨' },
    { id: 'sports', label: 'Sports & Physical Education', icon: '⚽' },
    { id: 'social', label: 'Social Issues & Community', icon: '🤝' },
    { id: 'research', label: 'Research & Analysis', icon: '📊' },
    { id: 'technology', label: 'Technology & Innovation', icon: '💻' },
    { id: 'science', label: 'Science & Laboratory Work', icon: '🔬' },
    { id: 'mathematics', label: 'Mathematics & Problem Solving', icon: '📐' },
    { id: 'engineering', label: 'Engineering & Design', icon: '⚙️' }
  ];

  const pathways = [
    {
      id: 'arts-sports',
      title: 'Arts & Sports Science',
      description: 'Creative arts, performing arts, sports science, and physical education',
      subjects: ['Fine Arts', 'Music', 'Drama', 'Sports Science', 'Physical Education', 'Media Studies'],
      careers: ['Artist', 'Sports Coach', 'Physical Therapist', 'Media Producer', 'Event Coordinator'],
      duration: '3-4 years',
      icon: '🎭'
    },
    {
      id: 'social-sciences',
      title: 'Social Sciences',
      description: 'Humanities, social studies, languages, and business studies',
      subjects: ['Psychology', 'Sociology', 'Political Science', 'Economics', 'Business Studies', 'Languages'],
      careers: ['Social Worker', 'Counselor', 'Business Manager', 'Policy Analyst', 'Teacher'],
      duration: '3-4 years',
      icon: '🏛️'
    },
    {
      id: 'stem',
      title: 'Science, Technology, Engineering & Mathematics (STEM)',
      description: 'Mathematics, sciences, engineering, and technology fields',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Engineering'],
      careers: ['Engineer', 'Doctor', 'Software Developer', 'Research Scientist', 'Data Analyst'],
      duration: '3-6 years',
      icon: '🔬'
    }
  ];

  const institutionTypes = [
    {
      id: 'university',
      title: 'Public/Private Universities',
      description: 'Comprehensive degree programs leading to bachelor\'s, master\'s and PhD',
      examples: ['University of Nairobi', 'Kenyatta University', 'Strathmore University', 'USIU-Africa'],
      programs: ['Bachelor of Arts', 'Bachelor of Science', 'Bachelor of Engineering', 'Bachelor of Medicine'],
      duration: '3-6 years',
      requirements: 'C+ and above in KCSE'
    },
    {
      id: 'tvet',
      title: 'TVET Institutions',
      description: 'Technical and Vocational Education and Training for practical skills',
      examples: ['Kenya Technical Trainers College', 'Eldoret National Polytechnic', 'Mombasa Technical Training Institute'],
      programs: ['Certificate Courses', 'Diploma Programs', 'Higher Diploma'],
      duration: '6 months - 3 years',
      requirements: 'D+ and above in KCSE'
    },
    {
      id: 'polytechnic',
      title: 'National Polytechnics',
      description: 'Specialized technical education with strong industry partnerships',
      examples: ['Kenya Polytechnic University College', 'Mombasa Polytechnic University College'],
      programs: ['Technical Diplomas', 'Higher National Diplomas', 'Bachelor of Technology'],
      duration: '2-4 years',
      requirements: 'C- and above in KCSE'
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
              <p className="text-gray-600">As a senior secondary student, select areas that excite you (minimum 2)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {interests.map((interest) => (
                <Card 
                  key={interest.id}
                  className={`cursor-pointer transition-all ${
                    selectedInterests.includes(interest.id) 
                      ? 'ring-2 ring-green-500 bg-green-50' 
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{interest.icon}</span>
                      <span className="font-medium">{interest.label}</span>
                      {selectedInterests.includes(interest.id) && (
                        <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
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
              <h2 className="text-2xl font-bold mb-2">Choose Your Academic Pathway</h2>
              <p className="text-gray-600">Based on your interests, select the pathway that aligns with your goals</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pathways.map((pathway) => (
                <Card 
                  key={pathway.id}
                  className={`cursor-pointer transition-all ${
                    selectedPathway === pathway.id 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPathway(pathway.id)}
                >
                  <CardHeader className="text-center">
                    <div className="text-4xl mb-2">{pathway.icon}</div>
                    <CardTitle className="text-lg">{pathway.title}</CardTitle>
                    <CardDescription className="text-sm">{pathway.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Core Subjects:</div>
                      <div className="flex flex-wrap gap-1">
                        {pathway.subjects.slice(0, 3).map((subject, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {subject}
                          </Badge>
                        ))}
                        {pathway.subjects.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{pathway.subjects.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-2">Career Opportunities:</div>
                      <div className="text-sm text-gray-600">
                        {pathway.careers.slice(0, 3).join(', ')}
                        {pathway.careers.length > 3 && '...'}
                      </div>
                    </div>
                    <div className="text-xs text-green-600 border-t pt-2">
                      Duration: {pathway.duration}
                    </div>
                    {selectedPathway === pathway.id && (
                      <div className="flex justify-center">
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      </div>
                    )}
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
              <h2 className="text-2xl font-bold mb-2">Select Institution Type</h2>
              <p className="text-gray-600">Choose the type of institution that best fits your pathway and goals</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {institutionTypes.map((institution) => (
                <Card 
                  key={institution.id}
                  className={`cursor-pointer transition-all ${
                    selectedInstitutionType === institution.id 
                      ? 'ring-2 ring-orange-500 bg-orange-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedInstitutionType(institution.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{institution.title}</CardTitle>
                      {selectedInstitutionType === institution.id && (
                        <CheckCircle className="w-6 h-6 text-orange-500" />
                      )}
                    </div>
                    <CardDescription>{institution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Examples:</div>
                      <div className="text-xs text-gray-600">
                        {institution.examples.slice(0, 2).join(', ')}...
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Programs:</div>
                      <div className="flex flex-wrap gap-1">
                        {institution.programs.slice(0, 2).map((program, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 text-xs border-t pt-2">
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-1 font-medium">{institution.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Requirements:</span>
                        <span className="ml-1 font-medium text-blue-600">{institution.requirements}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Set Your Career Goals</h2>
              <p className="text-gray-600">Define what you want to achieve in your chosen pathway</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Short-term Goals (1-2 years)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Complete KCSE with required grades</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Research and apply to institutions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Secure admission to preferred program</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Adapt to tertiary education environment</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Long-term Goals (3-7 years)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Graduate with excellent grades</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Secure employment in chosen field</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Contribute to Kenya's development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4" />
                    <span className="text-sm">Consider further studies or entrepreneurship</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Your Transition Action Plan</h2>
              <p className="text-gray-600">Here's your roadmap from senior secondary to tertiary education</p>
            </div>
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <GraduationCap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Congratulations on Your Plan!</h3>
                  <p className="text-gray-600">
                    Your pathway to {pathways.find(p => p.id === selectedPathway)?.title} via {institutionTypes.find(i => i.id === selectedInstitutionType)?.title} is ready.
                  </p>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">Next Steps:</div>
                    <div className="space-y-1 text-sm">
                      <div>✅ Focus on KCSE preparation and target grades</div>
                      <div>✅ Research specific institutions and programs</div>
                      <div>✅ Prepare application documents</div>
                      <div>✅ Apply for scholarships and funding</div>
                      <div>✅ Connect with career guidance counselors</div>
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
      case 3: return selectedInstitutionType !== null;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Academic Pathway Selection</h1>
        <p className="text-gray-600 mt-1">Plan your transition from senior secondary school to tertiary education in Kenya</p>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{step.id}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {steps.map((step) => (
              <div key={step.id} className="text-center max-w-20">
                <div className="font-medium text-xs">{step.title}</div>
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
          onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
          disabled={!canProceed()}
          className="bg-gradient-to-r from-green-600 to-blue-600"
        >
          {currentStep === 5 ? 'Complete' : 'Next'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default PathwaySelection;
