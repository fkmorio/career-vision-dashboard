import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Download, Database, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '../contexts/AuthContext';
import CBALevelsCard from './institutions/CBALevelsCard';
import AIRecommendationsPanel from './institutions/AIRecommendationsPanel';
import InstitutionFilters from './institutions/InstitutionFilters';
import InstitutionCard from './institutions/InstitutionCard';
import PlacementInsightsPanel from './institutions/PlacementInsightsPanel';
import DatabaseReporting from './institutions/DatabaseReporting';
import { kenyanInstitutions, cbaLevels, aiRecommendations } from './institutions/institutionData';

interface EnhancedInstitution {
  id: number;
  name: string;
  logo: string;
  sector: string;
  location: string;
  rating: number;
  students: string;
  description: string;
  kuccpsCode: string;
  cutoffPoints: { min: string; max: string; avg: string };
  cbaRequirement: string;
  openings: number;
  clusters: string[];
  programs: string[];
  helbEligible: boolean;
  scholarships: string[];
  facilities: string[];
  matchScore?: number;
  recommendationReason?: string;
}

const InstitutionalProfiles = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

  // Dynamic filtering based on user profile
  const getRecommendedInstitutions = (): EnhancedInstitution[] => {
    if (!user) return kenyanInstitutions as EnhancedInstitution[];
    
    // Filter institutions based on user's performance and cluster
    return kenyanInstitutions.filter(institution => {
      // Since we don't have KCSE grades in the new auth system, use a default threshold
      const institutionRequirement = cbaLevels[institution.cbaRequirement];
      return true; // Keep all institutions for now
    }).map(institution => ({
      ...institution,
      matchScore: calculateMatchScore(institution, user),
      recommendationReason: getRecommendationReason(institution, user)
    }));
  };

  const calculateMatchScore = (institution: any, user: any): number => {
    let score = 70; // Base score
    
    // Boost score for cluster alignment
    if (user.profileData?.cluster === 'STEM' && institution.sector === 'Public University') score += 15;
    if (user.profileData?.cluster === 'Technical' && institution.sector.includes('TVET')) score += 20;
    if (user.profileData?.cluster === 'Business' && institution.name.toLowerCase().includes('business')) score += 10;
    
    // Boost for role alignment
    if (user.role === 'student') score += 10;
    
    return Math.min(score, 98);
  };

  const getRecommendationReason = (institution: any, user: any): string => {
    const reasons = [];
    if (user.profileData?.cluster === 'STEM' && institution.sector === 'Public University') {
      reasons.push('Strong STEM programs');
    }
    if (user.role === 'student') {
      reasons.push('Matches your student profile');
    }
    if (institution.helbEligible) {
      reasons.push('HELB funding available');
    }
    return reasons.join(', ') || 'Good academic fit';
  };

  const filteredInstitutions = getRecommendedInstitutions().filter(institution => {
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

2. CBA PERFORMANCE LEVELS (Kenya's Assessment Framework)
Level 4 (17-20 marks): Exceeding Expectation - Students demonstrate exceptional mastery
Level 3 (12-16 marks): Meeting Expectation - Students meet required competency standards  
Level 2 (07-11 marks): Approaching Expectation - Students show progress toward competency
Level 1 (00-06 marks): Below Expectation - Students require additional support

3. INSTITUTIONAL CATEGORIES
Public Universities: Government-funded institutions with KUCCPS placement
Private Universities: Privately-funded institutions with varied admission criteria
National Polytechnics: Advanced technical institutions offering diploma and degree programs
Public TVET: Government technical and vocational education colleges
Private TVET: Private technical and vocational training institutions

4. SUPPORTED INSTITUTIONS
${kenyanInstitutions.map(inst => `
${inst.name} (${inst.kuccpsCode})
- Sector: ${inst.sector}
- Location: ${inst.location}
- CBA Requirement: ${cbaLevels[inst.cbaRequirement].performance}
- Available Slots: ${inst.openings}
- HELB Eligible: ${inst.helbEligible ? 'Yes' : 'No'}
`).join('')}

5. KEY FEATURES
- AI-Powered Competency Assessment
- Dynamic Bidding System for KUCCPS
- Real-time Placement Insights
- Comprehensive Institutional Database
- CBA Integration & Tracking
- Policy Adaptability Framework
- Gamification & Incentive Model

6. ASSESSMENT INTEGRATION
The platform integrates with KNEC's CBA system to provide:
- Real-time competency tracking
- Personalized pathway recommendations
- Performance trend analysis
- Intervention suggestions

7. DATABASE & REPORTING
- Comprehensive institutional profiles
- Real-time placement statistics
- Downloadable reports in multiple formats
- Performance analytics and trends

8. PRIVACY & SECURITY
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
          <h1 className="text-3xl font-bold text-gray-900">
            {user ? `Recommended Institutions for ${user.name}` : 'Kenyan Universities & Institutions'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user 
              ? `Personalized recommendations based on your ${user.profileData?.cluster || 'current'} cluster and profile`
              : 'Comprehensive database including Universities, Polytechnics, and TVET colleges'
            }
          </p>
        </div>
        <div className="flex space-x-2">
          {user && (
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
              <Target className="w-3 h-3 mr-1" />
              {filteredInstitutions.filter(i => (i.matchScore || 0) >= 85).length} Top Matches
            </Badge>
          )}
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

      <CBALevelsCard cbaLevels={cbaLevels} />

      {showAIRecommendations && (
        <AIRecommendationsPanel 
          aiRecommendations={aiRecommendations} 
          cbaLevels={cbaLevels} 
        />
      )}

      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="institutions">
            {user ? 'Your Matches' : 'Institution Profiles'}
          </TabsTrigger>
          <TabsTrigger value="database">Database & Reports</TabsTrigger>
          <TabsTrigger value="insights">Placement Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="space-y-6">
          <InstitutionFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedSector={selectedSector}
            setSelectedSector={setSelectedSector}
            sectors={sectors}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredInstitutions
              .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
              .map((institution) => (
              <div key={institution.id} className="relative">
                <InstitutionCard 
                  institution={institution} 
                  cbaLevels={cbaLevels} 
                />
                {user && institution.matchScore && (
                  <div className="absolute top-2 right-2">
                    <Badge 
                      className={`${
                        institution.matchScore >= 90 ? 'bg-green-600' :
                        institution.matchScore >= 80 ? 'bg-blue-600' :
                        institution.matchScore >= 70 ? 'bg-yellow-600' :
                        'bg-gray-600'
                      } text-white`}
                    >
                      {institution.matchScore}% Match
                    </Badge>
                  </div>
                )}
                {user && institution.recommendationReason && (
                  <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-800">
                    <strong>Why recommended:</strong> {institution.recommendationReason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="database">
          <DatabaseReporting />
        </TabsContent>

        <TabsContent value="insights">
          <PlacementInsightsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstitutionalProfiles;
