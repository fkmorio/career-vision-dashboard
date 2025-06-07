
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Upload, 
  Award, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  Star,
  Brain,
  TrendingUp
} from "lucide-react";
import { useCBC } from '../contexts/CBCContext';
import { useUser } from '../contexts/UserContext';

const CBCAssessmentPortal = () => {
  const { competencies, assessments, addAssessment, updateCompetency } = useCBC();
  const { user } = useUser();
  const [selectedSubject, setSelectedSubject] = useState('');
  const [assessmentType, setAssessmentType] = useState<'CBA' | 'SBA'>('CBA');
  const [feedback, setFeedback] = useState('');

  const competencyLevels = [
    { level: 'Emerging', color: 'bg-red-100 text-red-800', description: 'Below Expectations' },
    { level: 'Developing', color: 'bg-yellow-100 text-yellow-800', description: 'Approaching Expectations' },
    { level: 'Proficient', color: 'bg-green-100 text-green-800', description: 'Meeting Expectations' },
    { level: 'Exceeding', color: 'bg-blue-100 text-blue-800', description: 'Exceeding Expectations' }
  ];

  const getCompetencyColor = (level: string) => {
    const competency = competencyLevels.find(c => c.level === level);
    return competency?.color || 'bg-gray-100 text-gray-800';
  };

  const cbcSubjects = [
    'Integrated Science',
    'Mathematics',
    'English',
    'Kiswahili',
    'Social Studies',
    'Creative Arts',
    'Computer Science',
    'Business Studies',
    'Physical Education',
    'Life Skills'
  ];

  const handleSubmitAssessment = () => {
    if (!selectedSubject || !feedback) return;

    addAssessment({
      type: assessmentType,
      subject: selectedSubject,
      grade: user?.kcseGrade ? parseInt(user.kcseGrade.replace(/[^\d]/g, '')) || 8 : 8,
      competencyLevel: 3, // Default to proficient
      feedback,
      portfolio: []
    });

    setSelectedSubject('');
    setFeedback('');
  };

  const generateAIFeedback = (subject: string, level: number) => {
    const feedbackTemplates = {
      'Integrated Science': [
        'Demonstrates excellent scientific inquiry skills and understanding of natural phenomena.',
        'Shows good grasp of scientific concepts with minor areas for improvement.',
        'Developing scientific thinking skills, needs more practice with experiments.',
        'Beginning to understand basic scientific principles, requires additional support.'
      ],
      'Mathematics': [
        'Excellent problem-solving abilities and mathematical reasoning.',
        'Good understanding of mathematical concepts with consistent application.',
        'Developing mathematical skills, needs practice with complex problems.',
        'Beginning to grasp basic mathematical concepts, requires more support.'
      ]
    };

    const subjectFeedback = feedbackTemplates[subject as keyof typeof feedbackTemplates] || feedbackTemplates['Integrated Science'];
    return subjectFeedback[Math.max(0, 4 - level)] || subjectFeedback[0];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CBC Assessment Portal</h1>
          <p className="text-gray-600 mt-1">
            Competency-Based Curriculum assessment and portfolio management
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <Award className="w-4 h-4 mr-2" />
          CBC Aligned
        </Badge>
      </div>

      <Tabs defaultValue="competencies" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="competencies">Core Competencies</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="portfolio">Digital Portfolio</TabsTrigger>
          <TabsTrigger value="rubrics">CBC Rubrics</TabsTrigger>
        </TabsList>

        <TabsContent value="competencies" className="space-y-6">
          {/* Core Competencies Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-purple-600" />
                Core Competencies Progress
              </CardTitle>
              <CardDescription>
                Track development across CBC's seven core competencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competencies.map((competency) => (
                  <div key={competency.id} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{competency.name}</h3>
                      <Badge className={getCompetencyColor(competency.level)}>
                        {competency.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{competency.description}</p>
                    <Progress 
                      value={(competencyLevels.findIndex(c => c.level === competency.level) + 1) * 25} 
                      className="h-2" 
                    />
                    <div className="text-xs text-gray-500">
                      Last assessed: {competency.assessmentDate.toLocaleDateString()}
                    </div>
                    {competency.evidence.length > 0 && (
                      <div className="text-xs">
                        <span className="font-medium">Evidence: </span>
                        {competency.evidence.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments" className="space-y-6">
          {/* Assessment Entry Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit New Assessment</CardTitle>
              <CardDescription>
                Record CBA (Classroom-Based) or SBA (School-Based) assessments
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Assessment Type</label>
                  <Select 
                    value={assessmentType} 
                    onValueChange={(value: 'CBA' | 'SBA') => setAssessmentType(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select assessment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBA">CBA - Classroom-Based Assessment</SelectItem>
                      <SelectItem value="SBA">SBA - School-Based Assessment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {cbcSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Assessment Feedback</label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide competency-based feedback..."
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleSubmitAssessment}>
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Assessment
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setFeedback(generateAIFeedback(selectedSubject, 3))}
                >
                  <Star className="w-4 h-4 mr-2" />
                  Generate AI Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Assessments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Assessments</CardTitle>
              <CardDescription>
                Latest CBA and SBA entries with competency levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{assessment.type}</Badge>
                        <span className="font-medium">{assessment.subject}</span>
                        <span className="text-sm text-gray-600">Grade {assessment.grade}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getCompetencyColor(
                          competencyLevels[assessment.competencyLevel - 1]?.level || 'Developing'
                        )}>
                          Level {assessment.competencyLevel}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {assessment.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{assessment.feedback}</p>
                    {assessment.portfolio.length > 0 && (
                      <div className="mt-2 text-xs text-blue-600">
                        Portfolio items: {assessment.portfolio.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-green-600" />
                Digital Portfolio
              </CardTitle>
              <CardDescription>
                Upload and manage evidence of learning and competency development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Upload Projects</p>
                  <Button variant="outline" size="sm">Browse Files</Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Add Reflections</p>
                  <Button variant="outline" size="sm">Write Reflection</Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Award className="w-8 h-8 mx-auto mb-4 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Link Achievements</p>
                  <Button variant="outline" size="sm">Add Achievement</Button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Recent Portfolio Items</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium">Science Fair Project</div>
                        <div className="text-sm text-gray-600">Integrated Science • Uploaded 2 days ago</div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Verified</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Award className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium">Math Competition Certificate</div>
                        <div className="text-sm text-gray-600">Mathematics • Uploaded 1 week ago</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Pending Review</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rubrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                CBC Assessment Rubrics
              </CardTitle>
              <CardDescription>
                Standardized rubrics for competency-based assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-4 py-2 text-left">Criteria</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Emerging (1)</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Developing (2)</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Proficient (3)</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">Exceeding (4)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Understanding of Task</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Misunderstood task completely</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Limited grasp of task</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Clear understanding</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Deep understanding; insightful</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Planning & Organization</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">No evidence of planning</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Poorly organized</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Reasonable structure</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Excellent planning; coherent</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2 font-medium">Communication</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Disorganized and unclear</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Poor communication</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Mostly clear</td>
                        <td className="border border-gray-300 px-4 py-2 text-sm">Excellent clarity</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-blue-800">CBA Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1 text-gray-600">
                        <li>• Continuous assessment during learning</li>
                        <li>• Focus on competency mastery</li>
                        <li>• Use observation and peer assessment</li>
                        <li>• Document in learner portfolios</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-green-800">SBA Guidelines</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <ul className="space-y-1 text-gray-600">
                        <li>• Structured projects and practicals</li>
                        <li>• Standardized by KNEC</li>
                        <li>• Real-life task application</li>
                        <li>• Submit through KNEC portal</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CBCAssessmentPortal;
