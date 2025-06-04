
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface InstitutionType {
  id: string;
  title: string;
  description: string;
  examples: string[];
  programs: string[];
  duration: string;
  requirements: string;
}

interface InstitutionSelectionStepProps {
  institutionTypes: InstitutionType[];
  selectedInstitutionType: string | null;
  onSelectInstitutionType: (institutionId: string) => void;
}

const InstitutionSelectionStep = ({ institutionTypes, selectedInstitutionType, onSelectInstitutionType }: InstitutionSelectionStepProps) => {
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
            onClick={() => onSelectInstitutionType(institution.id)}
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
};

export default InstitutionSelectionStep;
