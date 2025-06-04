
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Interest {
  id: string;
  label: string;
  icon: string;
}

interface InterestAssessmentStepProps {
  interests: Interest[];
  selectedInterests: string[];
  onToggleInterest: (interestId: string) => void;
}

const InterestAssessmentStep = ({ interests, selectedInterests, onToggleInterest }: InterestAssessmentStepProps) => {
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
            onClick={() => onToggleInterest(interest.id)}
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
};

export default InterestAssessmentStep;
