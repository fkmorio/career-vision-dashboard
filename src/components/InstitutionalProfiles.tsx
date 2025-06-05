import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, FileText, Brain, TrendingUp, Award, Download } from "lucide-react";

const InstitutionalProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  // CBA Performance Levels according to Kenyan CBC Framework
  const cbaLevels = {
    level4: { range: '17-20', performance: 'Exceeding Expectation', color: 'bg-green-100 text-green-800' },
    level3: { range: '12-16', performance: 'Meeting Expectation', color: 'bg-blue-100 text-blue-800' },
    level2: { range: '07-11', performance: 'Approaching Expectation', color: 'bg-yellow-100 text-yellow-800' },
    level1: { range: '00-06', performance: 'Below Expectation', color: 'bg-red-100 text-red-800' }
  };

  const kenyanInstitutions = [
    {
      id: 1,
      name: 'University of Nairobi',
      logo: '/placeholder.svg',
      sector: 'Public University',
      location: 'Nairobi',
      rating: 4.6,
      students: '84,000+',
      description: 'Kenya\'s premier university offering comprehensive programs across all disciplines.',
      kuccpsCode: '01100',
      cutoffPoints: { min: 'C+', max: 'A-', avg: 'B' },
      cbaRequirement: 'level3',
      openings: 8500,
      clusters: ['Medicine & Health Sciences', 'Engineering', 'Business', 'Arts & Humanities'],
      programs: ['Medicine', 'Engineering', 'Law', 'Business', 'Education'],
      helbEligible: true,
      scholarships: ['Government Scholarships', 'Merit-based Awards', 'Need-based Support'],
      facilities: ['Research Labs', 'Digital Library', 'Teaching Hospital', 'Innovation Hub']
    },
    {
      id: 2,
      name: 'Kenyatta University',
      logo: '/placeholder.svg',
      sector: 'Public University',
      location: 'Kahawa, Nairobi',
      rating: 4.4,
      students: '70,000+',
      description: 'Leading institution in education, health sciences, and applied sciences.',
      kuccpsCode: '01200',
      cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
      cbaRequirement: 'level3',
      openings: 7200,
      clusters: ['Education', 'Health Sciences', 'Pure & Applied Sciences', 'Economics & Business'],
      programs: ['Education', 'Nursing', 'Medicine', 'Engineering', 'Business'],
      helbEligible: true,
      scholarships: ['HELB Loans', 'University Scholarships', 'Research Grants'],
      facilities: ['Teaching Hospital', 'Science Labs', 'Sports Complex', 'Conference Centre']
    },
    {
      id: 3,
      name: 'Jomo Kenyatta University (JKUAT)',
      logo: '/placeholder.svg',
      sector: 'Public University',
      location: 'Juja, Kiambu',
      rating: 4.5,
      students: '40,000+',
      description: 'Technology-focused university specializing in engineering, technology, and agriculture.',
      kuccpsCode: '01300',
      cutoffPoints: { min: 'B-', max: 'A-', avg: 'B' },
      cbaRequirement: 'level3',
      openings: 5800,
      clusters: ['Engineering', 'Agriculture', 'Health Sciences', 'Architecture & Building Sciences'],
      programs: ['Engineering', 'ICT', 'Agriculture', 'Architecture', 'Medicine'],
      helbEligible: true,
      scholarships: ['STEM Scholarships', 'Innovation Awards', 'Industry Partnerships'],
      facilities: ['Engineering Labs', 'Research Centers', 'Incubation Hub', 'Modern Library']
    },
    {
      id: 4,
      name: 'Strathmore University',
      logo: '/placeholder.svg',
      sector: 'Private University',
      location: 'Nairobi',
      rating: 4.8,
      students: '15,000+',
      description: 'Premier private university known for business, ICT, and professional programs.',
      kuccpsCode: '02100',
      cutoffPoints: { min: 'B', max: 'A', avg: 'B+' },
      cbaRequirement: 'level4',
      openings: 3200,
      clusters: ['Business & Economics', 'ICT', 'Law', 'Humanities & Social Sciences'],
      programs: ['Business', 'ICT', 'Law', 'Actuarial Science', 'Development Studies'],
      helbEligible: true,
      scholarships: ['Merit Scholarships', 'Needs-based Bursaries', 'Alumni Scholarships'],
      facilities: ['Business Incubator', 'ICT Labs', 'Moot Court', 'Executive Centre']
    },
    {
      id: 5,
      name: 'Kabarak University',
      logo: '/placeholder.svg',
      sector: 'Private University',
      location: 'Nakuru',
      rating: 4.3,
      students: '12,000+',
      description: 'Faith-based university offering holistic education with strong moral foundation.',
      kuccpsCode: '02200',
      cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
      cbaRequirement: 'level2',
      openings: 2800,
      clusters: ['Education', 'Business', 'Health Sciences', 'Engineering & Technology'],
      programs: ['Education', 'Business', 'Nursing', 'Engineering', 'Computer Science'],
      helbEligible: true,
      scholarships: ['Church Scholarships', 'Academic Excellence Awards', 'Sports Scholarships'],
      facilities: ['Modern Labs', 'Teaching Hospital', 'Conference Center', 'Sports Complex']
    },
    {
      id: 6,
      name: 'Mount Kenya University',
      logo: '/placeholder.svg',
      sector: 'Private University',
      location: 'Thika (Multiple Campuses)',
      rating: 4.2,
      students: '45,000+',
      description: 'Fast-growing private university with multiple campuses across Kenya.',
      kuccpsCode: '02300',
      cutoffPoints: { min: 'C', max: 'B', avg: 'C+' },
      cbaRequirement: 'level2',
      openings: 6500,
      clusters: ['Business', 'Health Sciences', 'Education', 'Pure & Applied Sciences'],
      programs: ['Business', 'Medicine', 'Nursing', 'Education', 'Agriculture'],
      helbEligible: true,
      scholarships: ['Merit Scholarships', 'Regional Bursaries', 'Professional Development Awards'],
      facilities: ['Multiple Campuses', 'Clinical Training Sites', 'Research Centers', 'Digital Library']
    },
    {
      id: 7,
      name: 'United States International University',
      logo: '/placeholder.svg',
      sector: 'Private University',
      location: 'Nairobi',
      rating: 4.7,
      students: '8,000+',
      description: 'American-style liberal arts university offering international standard education.',
      kuccpsCode: '02400',
      cutoffPoints: { min: 'B-', max: 'A', avg: 'B' },
      cbaRequirement: 'level3',
      openings: 1800,
      clusters: ['Business', 'Liberal Arts', 'ICT', 'International Relations'],
      programs: ['International Business', 'Psychology', 'ICT', 'International Relations'],
      helbEligible: true,
      scholarships: ['Academic Merit Scholarships', 'International Exchange Programs', 'Leadership Awards'],
      facilities: ['American-style Campus', 'Modern Library', 'Student Center', 'Research Labs']
    },
    {
      id: 8,
      name: 'Catholic University of Eastern Africa',
      logo: '/placeholder.svg',
      sector: 'Private University',
      location: 'Nairobi',
      rating: 4.4,
      students: '10,000+',
      description: 'Catholic university providing quality education with ethical foundation.',
      kuccpsCode: '02500',
      cutoffPoints: { min: 'C+', max: 'B+', avg: 'B-' },
      cbaRequirement: 'level2',
      openings: 2200,
      clusters: ['Arts & Social Sciences', 'Education', 'Business', 'Theology'],
      programs: ['Social Work', 'Education', 'Business', 'Theology', 'Development Studies'],
      helbEligible: true,
      scholarships: ['Catholic Church Scholarships', 'Social Justice Awards', 'Academic Excellence'],
      facilities: ['Chapel', 'Community Service Centers', 'Library', 'Research Centers']
    }
  ];

  const aiRecommendations = {
    topMatches: [
      { institution: 'University of Nairobi', match: 92, reason: 'Strong STEM performance aligns with Engineering programs', cbaLevel: 'level4' },
      { institution: 'JKUAT', match: 88, reason: 'Technology interests match university specialization', cbaLevel: 'level3' },
      { institution: 'Strathmore University', match: 75, reason: 'Leadership skills suit business programs', cbaLevel: 'level4' }
    ],
    competencyAlignment: {
      'Mathematics': 'Engineering & Technology Programs',
      'Sciences': 'Health Sciences & Research',
      'Languages': 'Law & International Relations'
    }
  };

  const filteredInstitutions = kenyanInstitutions.filter(institution => {
    const matchesSearch = institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.sector.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         institution.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || institution.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['all', ...new Set(kenyanInstitutions.map(i => i.sector))];

  const downloadDocumentation = () => {
    const doc = `
CAREER VISION PLATFORM - COMPREHENSIVE DOCUMENTATION

1. OVERVIEW
The Career Vision Platform is designed to support Kenya's transition to Competency-Based Curriculum (CBC) and Competency-Based Assessment (CBA) framework, providing AI-powered guidance for students, parents, educators, and policymakers.

2. CBA PERFORMANCE LEVELS
Level 4 (17-20 marks): Exceeding Expectation - Students demonstrate exceptional mastery
Level 3 (12-16 marks): Meeting Expectation - Students meet required competency standards
Level 2 (07-11 marks): Approaching Expectation - Students show progress toward competency
Level 1 (00-06 marks): Below Expectation - Students require additional support

3. INSTITUTIONAL CATEGORIES
Public Universities: Government-funded institutions with KUCCPS placement
Private Universities: Privately-funded institutions with varied admission criteria
Technical Institutions: TVET colleges focusing on practical skills
Professional Colleges: Specialized institutions for specific careers

4. KEY FEATURES
- AI-Powered Competency Assessment
- Dynamic Bidding System for KUCCPS
- Real-time Placement Insights
- Institutional Profiling
- Policy Adaptability Framework
- Gamification & Incentive Model

5. SUPPORTED INSTITUTIONS
${kenyanInstitutions.map(inst => `
${inst.name} (${inst.kuccpsCode})
- Sector: ${inst.sector}
- Location: ${inst.location}
- CBA Requirement: ${cbaLevels[inst.cbaRequirement].performance}
- Available Slots: ${inst.openings}
`).join('')}

6. ASSESSMENT INTEGRATION
The platform integrates with KNEC's CBA system to provide:
- Real-time competency tracking
- Personalized pathway recommendations
- Performance trend analysis
- Intervention suggestions

7. PRIVACY & SECURITY
- Data anonymization protocols
- Secure handling of student information
- GDPR-compliant data processing
- Ethical AI implementation

Generated on: ${new Date().toLocaleDateString()}
`;

    const element = document.createElement('a');
    const file = new Blob([doc], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Career_Vision_Platform_Documentation.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kenyan Universities & Institutions</h1>
          <p className="text-gray-600 mt-1">Explore institutions through KUCCPS placement system with CBA integration</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            onClick={downloadDocumentation}
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Documentation
          </Button>
          <Button 
            onClick={() => setShowAIRecommendations(!showAIRecommendations)}
            className="bg-gradient-to-r from-purple-600 to-blue-600"
          >
            <Brain className="w-4 h-4 mr-2" />
            {showAIRecommendations ? 'Hide' : 'Show'} AI Recommendations
          </Button>
        </div>
      </div>

      {/* CBA Performance Levels Reference */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center text-green-800">
            <Award className="w-5 h-5 mr-2" />
            CBA Performance Levels (CBC Framework)
          </CardTitle>
          <CardDescription>Kenya's Competency-Based Assessment grading system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(cbaLevels).map(([level, data]) => (
              <div key={level} className={`p-4 rounded-lg ${data.color}`}>
                <div className="text-center">
                  <div className="font-bold text-lg">{data.range}</div>
                  <div className="font-medium">{data.performance}</div>
                  <div className="text-xs mt-1">Level {level.slice(-1)}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations Panel */}
      {showAIRecommendations && (
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-800">
              <Brain className="w-5 h-5 mr-2" />
              AI-Powered Institution Recommendations
            </CardTitle>
            <CardDescription>Based on your CBC competency assessment and CBA performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Top Matches for You:</h4>
              <div className="space-y-2">
                {aiRecommendations.topMatches.map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium">{match.institution}</span>
                      <p className="text-sm text-gray-600">{match.reason}</p>
                      <div className="mt-1">
                        <Badge className={cbaLevels[match.cbaLevel].color}>
                          CBA: {cbaLevels[match.cbaLevel].performance}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {match.match}% Match
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Competency-Program Alignment:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(aiRecommendations.competencyAlignment).map(([competency, program]) => (
                  <div key={competency} className="p-2 bg-blue-100 rounded text-center">
                    <div className="font-medium text-blue-800">{competency}</div>
                    <div className="text-xs text-blue-600">{program}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search institutions, programs, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector === 'all' ? 'All Institutions' : sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Institution Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstitutions.map((institution) => (
          <Card key={institution.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{institution.name.split(' ')[0][0]}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{institution.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{institution.sector}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {institution.rating}
                      </div>
                      {institution.helbEligible && (
                        <Badge className="bg-green-100 text-green-800 text-xs">HELB Eligible</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">KUCCPS Code</div>
                  <div className="font-bold text-blue-600">{institution.kuccpsCode}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{institution.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  {institution.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  {institution.students}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">KCSE Cut-off Points</div>
                <div className="flex justify-between text-sm">
                  <span>Min: {institution.cutoffPoints.min}</span>
                  <span>Avg: {institution.cutoffPoints.avg}</span>
                  <span>Max: {institution.cutoffPoints.max}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">CBA Requirement</div>
                <Badge className={cbaLevels[institution.cbaRequirement].color}>
                  {cbaLevels[institution.cbaRequirement].performance}
                </Badge>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Available Clusters</div>
                <div className="flex flex-wrap gap-1">
                  {institution.clusters.slice(0, 3).map((cluster, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cluster}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Key Programs</div>
                <div className="flex flex-wrap gap-1">
                  {institution.programs.slice(0, 4).map((program, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {program}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Scholarships & Support</div>
                <div className="flex flex-wrap gap-1">
                  {institution.scholarships.slice(0, 2).map((scholarship, index) => (
                    <Badge key={index} className="bg-orange-100 text-orange-800 text-xs">
                      {scholarship}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm">
                  <span className="font-medium text-green-600">{institution.openings}</span> available slots
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    View Trends
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
                    <FileText className="w-4 h-4 mr-1" />
                    Express Interest
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Policy Insights Panel */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Award className="w-5 h-5 mr-2" />
            Real-Time Placement Insights (CBA-Enabled)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-blue-600">75%</div>
              <div className="text-sm text-gray-600">KUCCPS Placement Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">32,500</div>
              <div className="text-sm text-gray-600">Total University Slots</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600">65%</div>
              <div className="text-sm text-gray-600">HELB Approval Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-gray-600">CBA Implementation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstitutionalProfiles;
