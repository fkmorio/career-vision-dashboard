
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

interface Pathway {
  id: string;
  title: string;
  description: string;
  subjects: string[];
  careers: string[];
  duration: string;
  icon: string;
}

interface PathwaySelectionStepProps {
  pathways: Pathway[];
  selectedPathway: string | null;
  onSelectPathway: (pathwayId: string) => void;
}

const PathwaySelectionStep = ({ pathways, selectedPathway, onSelectPathway }: PathwaySelectionStepProps) => {
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
            onClick={() => onSelectPathway(pathway.id)}
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
};

export default PathwaySelectionStep;
