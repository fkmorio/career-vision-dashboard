
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Download } from "lucide-react";
import CBALevelsCard from './institutions/CBALevelsCard';
import AIRecommendationsPanel from './institutions/AIRecommendationsPanel';
import InstitutionFilters from './institutions/InstitutionFilters';
import InstitutionCard from './institutions/InstitutionCard';
import PlacementInsightsPanel from './institutions/PlacementInsightsPanel';
import { kenyanInstitutions, cbaLevels, aiRecommendations } from './institutions/institutionData';

const InstitutionalProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);

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

      <CBALevelsCard cbaLevels={cbaLevels} />

      {showAIRecommendations && (
        <AIRecommendationsPanel 
          aiRecommendations={aiRecommendations} 
          cbaLevels={cbaLevels} 
        />
      )}

      <InstitutionFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        sectors={sectors}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInstitutions.map((institution) => (
          <InstitutionCard 
            key={institution.id} 
            institution={institution} 
            cbaLevels={cbaLevels} 
          />
        ))}
      </div>

      <PlacementInsightsPanel />
    </div>
  );
};

export default InstitutionalProfiles;
