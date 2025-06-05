
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Brain, User, GraduationCap, TrendingUp, Award, MessageSquare, Target, BarChart3 } from "lucide-react";
import { CompetencyPredictor, learningAreas } from '../data/competencyAssessment';

interface UserProfile {
  role: 'student' | 'parent' | 'educator' | 'administrator' | 'policymaker';
  name: string;
  query: string;
}

const InteractiveAI = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({ role: 'student', name: '', query: '' });
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCompetencyTest, setShowCompetencyTest] = useState(false);
  const [competencyScores, setCompetencyScores] = useState<Record<string, number>>({});

  const roleFeatures = {
    student: {
      icon: User,
      color: 'blue',
      features: ['Competency Assessment', 'Pathway Recommendations', 'Institution Matching', 'Skill Badges'],
      sampleQueries: [
        'What career pathways match my strengths in mathematics and science?',
        'Which universities should I apply to based on my KCSE performance?',
        'How can I improve my competency scores for better placement?'
      ]
    },
    parent: {
      icon: User,
      color: 'green',
      features: ['Child Progress Tracking', 'Competency Results', 'Career Guidance', 'Support Resources'],
      sampleQueries: [
        'How is my child performing in different learning areas?',
        'What career options are available for my child\'s competency level?',
        'How can I support my child\'s pathway selection?'
      ]
    },
    educator: {
      icon: GraduationCap,
      color: 'purple',
      features: ['Student Analytics', 'Competency Insights', 'Tailored Guidance', 'Progress Monitoring'],
      sampleQueries: [
        'Which students need additional support in mathematics?',
        'What are the trending career pathways among my students?',
        'How can I help students with below-expectation performance?'
      ]
    },
    administrator: {
      icon: BarChart3,
      color: 'orange',
      features: ['Student Demand Analytics', 'Bidding Dashboard', 'Intake Strategy', 'Scholarship Management'],
      sampleQueries: [
        'What programs have the highest student demand?',
        'How should we adjust our intake numbers based on bidding trends?',
        'Which scholarship criteria attract top performers?'
      ]
    },
    policymaker: {
      icon: TrendingUp,
      color: 'red',
      features: ['Placement Trends', 'Policy Impact Analysis', 'Education Planning', 'Resource Allocation'],
      sampleQueries: [
        'What are the current trends in STEM pathway selection?',
        'How effective is the current CBC assessment system?',
        'Where should we invest in new educational resources?'
      ]
    }
  };

  const generateAIResponse = (profile: UserProfile) => {
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      let response = '';
      
      switch (profile.role) {
        case 'student':
          response = `Hello ${profile.name}! Based on your query about "${profile.query}", here's my analysis:

🎯 **Competency-Based Recommendations:**
- Your strongest areas appear to be in STEM subjects
- I recommend focusing on Engineering or Health Sciences pathways
- Consider universities like JKUAT or University of Nairobi for technical programs

🏆 **Skill Badges You Can Earn:**
- STEM Excellence Badge (Complete advanced mathematics assessment)
- Research Pioneer Badge (Participate in science fair projects)
- Leadership Badge (Take on student leadership roles)

📊 **Institution Matching:**
- University of Nairobi (92% match) - Strong STEM programs
- JKUAT (88% match) - Technology focus aligns with your interests
- Strathmore (75% match) - Innovation and business opportunities

Would you like me to provide a detailed pathway plan or take a competency assessment?`;
          break;
          
        case 'parent':
          response = `Dear ${profile.name}, regarding "${profile.query}":

👨‍👩‍👧‍👦 **Your Child's Progress Summary:**
- Current competency level: Meeting Expectations (Level 3)
- Strongest areas: Mathematics and Integrated Science
- Areas for improvement: Languages and Social Studies

🎯 **Career Guidance Recommendations:**
- Engineering and Technology pathways show high potential
- Consider STEM-related extracurricular activities
- Focus on building communication skills for well-rounded development

💡 **How You Can Help:**
- Provide a conducive learning environment at home
- Encourage participation in science and math competitions
- Support their interests with relevant learning resources

Regular monitoring through our parent dashboard will keep you updated on their progress.`;
          break;
          
        case 'educator':
          response = `Dear Educator ${profile.name}, regarding "${profile.query}":

📈 **Student Analytics Overview:**
- 23% of students are at Exceeding Expectations level
- 45% are Meeting Expectations
- 32% need additional support (Approaching/Below Expectations)

🎯 **Tailored Guidance Recommendations:**
- Implement differentiated instruction for various competency levels
- Focus on practical applications for below-expectation students
- Create peer mentoring programs pairing high and low performers

📊 **Key Insights:**
- Students with parental support show 40% better outcomes
- Hands-on learning activities improve competency scores by 25%
- Regular assessment feedback increases student engagement

I recommend scheduling individual student consultations and implementing competency-based learning modules.`;
          break;
          
        case 'administrator':
          response = `Dear Administrator ${profile.name}, regarding "${profile.query}":

📊 **Current Bidding Trends:**
- Engineering programs: 340% oversubscribed
- Medicine: 280% oversubscribed  
- Business programs: 150% demand
- Arts programs: 85% demand

💡 **Strategic Recommendations:**
- Consider increasing engineering intake by 25%
- Implement merit-based selection for high-demand programs
- Create bridge programs for students with lower cut-off points

🎓 **Scholarship Optimization:**
- STEM scholarships attract top 10% performers
- Need-based aid increases diversity by 30%
- Research assistantships retain high achievers

The data suggests adjusting your intake strategy to match student competency profiles and market demands.`;
          break;
          
        case 'policymaker':
          response = `Dear Policymaker ${profile.name}, regarding "${profile.query}":

📈 **National Placement Trends:**
- 68% of students prefer STEM pathways
- Rural students show 20% lower placement rates
- Gender parity achieved in most fields except engineering (65% male)

🎯 **Policy Impact Analysis:**
- CBC system shows 15% improvement in competency-based placement
- Early intervention programs reduce dropout rates by 30%
- Digital literacy initiatives increase rural participation by 25%

💡 **Strategic Recommendations:**
- Invest in rural ICT infrastructure
- Expand girls-in-STEM programs
- Create alternative pathways for non-traditional learners

The data indicates need for targeted interventions in rural areas and continued support for competency-based assessment expansion.`;
          break;
      }
      
      setAiResponse(response);
      setIsProcessing(false);
    }, 2000);
  };

  const takeCompetencyTest = () => {
    setShowCompetencyTest(true);
    // Initialize competency scores
    const initialScores: Record<string, number> = {};
    learningAreas.forEach(area => {
      initialScores[area.id] = Math.floor(Math.random() * 16) + 5; // Random score between 5-20
    });
    setCompetencyScores(initialScores);
  };

  const getCompetencyLevel = (score: number) => {
    if (score >= 17) return { level: 4, performance: 'Exceeding Expectation', color: 'bg-green-500' };
    if (score >= 12) return { level: 3, performance: 'Meeting Expectation', color: 'bg-blue-500' };
    if (score >= 7) return { level: 2, performance: 'Approaching Expectation', color: 'bg-yellow-500' };
    return { level: 1, performance: 'Below Expectation', color: 'bg-red-500' };
  };

  const currentRole = roleFeatures[userProfile.role];
  const RoleIcon = currentRole.icon;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive AI Assistant</h1>
        <p className="text-gray-600">Get personalized guidance based on CBC competency assessment</p>
      </div>

      {/* Role Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Select Your Role
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {Object.entries(roleFeatures).map(([role, features]) => {
              const Icon = features.icon;
              return (
                <Button
                  key={role}
                  variant={userProfile.role === role ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                    userProfile.role === role ? `bg-${features.color}-600` : ''
                  }`}
                  onClick={() => setUserProfile({ ...userProfile, role: role as any })}
                >
                  <Icon className="w-6 h-6" />
                  <span className="text-sm capitalize">{role}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* User Profile Input */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <RoleIcon className={`w-5 h-5 mr-2 text-${currentRole.color}-600`} />
            {userProfile.role === 'student' && 'Student Profile'}
            {userProfile.role === 'parent' && 'Parent Profile'}
            {userProfile.role === 'educator' && 'Educator Profile'}
            {userProfile.role === 'administrator' && 'Administrator Profile'}
            {userProfile.role === 'policymaker' && 'Policymaker Profile'}
          </CardTitle>
          <CardDescription>
            Available features: {currentRole.features.join(', ')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Name</label>
            <Input
              placeholder="Enter your name"
              value={userProfile.name}
              onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Your Question or Request</label>
            <Textarea
              placeholder="Ask me anything about competency assessment, career pathways, or institutional guidance..."
              value={userProfile.query}
              onChange={(e) => setUserProfile({ ...userProfile, query: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sample Questions:</label>
            <div className="space-y-1">
              {currentRole.sampleQueries.map((query, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-auto p-2 text-left justify-start text-sm text-gray-600"
                  onClick={() => setUserProfile({ ...userProfile, query })}
                >
                  • {query}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => generateAIResponse(userProfile)}
              disabled={!userProfile.name || !userProfile.query || isProcessing}
              className="flex-1"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {isProcessing ? 'Processing...' : 'Get AI Guidance'}
            </Button>
            
            {userProfile.role === 'student' && (
              <Button
                onClick={takeCompetencyTest}
                variant="outline"
                className="flex-1"
              >
                <Target className="w-4 h-4 mr-2" />
                Take Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Competency Test Results */}
      {showCompetencyTest && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Award className="w-5 h-5 mr-2" />
              Your CBC Competency Assessment Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learningAreas.map((area) => {
              const score = competencyScores[area.id] || 0;
              const level = getCompetencyLevel(score);
              return (
                <div key={area.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{area.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{score}/20</span>
                      <Badge className={`${level.color} text-white`}>
                        Level {level.level}
                      </Badge>
                    </div>
                  </div>
                  <Progress value={(score / 20) * 100} className="h-2" />
                  <p className="text-xs text-gray-600">{level.performance} - {area.description}</p>
                </div>
              );
            })}
            
            <div className="mt-4 p-4 bg-white rounded-lg">
              <h4 className="font-medium mb-2">Recommended Career Pathways:</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(competencyScores)
                  .filter(([_, score]) => score >= 12)
                  .map(([areaId, _]) => {
                    const area = learningAreas.find(a => a.id === areaId);
                    return area?.careerPathways.slice(0, 2).map((pathway, index) => (
                      <Badge key={`${areaId}-${index}`} variant="outline" className="justify-center">
                        {pathway}
                      </Badge>
                    ));
                  })}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* AI Response */}
      {aiResponse && (
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-800">
              <Brain className="w-5 h-5 mr-2" />
              AI Assistant Response
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-sm">{aiResponse}</div>
            
            {userProfile.role === 'student' && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" size="sm">
                  <Award className="w-4 h-4 mr-2" />
                  View Skill Badges
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="w-4 h-4 mr-2" />
                  Express Interest
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Track Progress
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Gamification Elements */}
      {userProfile.role === 'student' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-600" />
              Your Achievement Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'STEM Explorer', earned: true, description: 'Completed science assessment' },
                { name: 'Math Wizard', earned: true, description: 'Scored above average in mathematics' },
                { name: 'Future Leader', earned: false, description: 'Complete leadership assessment' },
                { name: 'Innovation Pioneer', earned: false, description: 'Submit creative project' }
              ].map((badge, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-center ${
                    badge.earned 
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-300' 
                      : 'bg-gray-100 border-gray-300'
                  } border`}
                >
                  <Award className={`w-8 h-8 mx-auto mb-2 ${
                    badge.earned ? 'text-yellow-600' : 'text-gray-400'
                  }`} />
                  <div className={`font-medium text-sm ${
                    badge.earned ? 'text-yellow-800' : 'text-gray-500'
                  }`}>
                    {badge.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveAI;
