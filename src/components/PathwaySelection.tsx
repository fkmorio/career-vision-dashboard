
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { interests, pathways, institutionTypes, steps } from '../data/pathwayData';
import ProgressIndicator from './pathway/ProgressIndicator';
import InterestAssessmentStep from './pathway/InterestAssessmentStep';
import PathwaySelectionStep from './pathway/PathwaySelectionStep';
import InstitutionSelectionStep from './pathway/InstitutionSelectionStep';
import CareerGoalsStep from './pathway/CareerGoalsStep';
import ActionPlanStep from './pathway/ActionPlanStep';

const PathwaySelection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedInstitutionType, setSelectedInstitutionType] = useState<string | null>(null);

  const toggleInterest = (interestId: string) => {
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
          <InterestAssessmentStep
            interests={interests}
            selectedInterests={selectedInterests}
            onToggleInterest={toggleInterest}
          />
        );
      case 2:
        return (
          <PathwaySelectionStep
            pathways={pathways}
            selectedPathway={selectedPathway}
            onSelectPathway={setSelectedPathway}
          />
        );
      case 3:
        return (
          <InstitutionSelectionStep
            institutionTypes={institutionTypes}
            selectedInstitutionType={selectedInstitutionType}
            onSelectInstitutionType={setSelectedInstitutionType}
          />
        );
      case 4:
        return <CareerGoalsStep />;
      case 5:
        return (
          <ActionPlanStep
            selectedPathway={selectedPathway}
            selectedInstitutionType={selectedInstitutionType}
            pathways={pathways}
            institutionTypes={institutionTypes}
          />
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

      <ProgressIndicator currentStep={currentStep} steps={steps} />

      <Card>
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

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
