
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";

interface CBALevel {
  range: string;
  performance: string;
  color: string;
}

interface AIRecommendation {
  institution: string;
  match: number;
  reason: string;
  cbaLevel: string;
}

interface AIRecommendationsData {
  topMatches: AIRecommendation[];
  competencyAlignment: Record<string, string>;
}

interface AIRecommendationsPanelProps {
  aiRecommendations: AIRecommendationsData;
  cbaLevels: Record<string, CBALevel>;
}

const AIRecommendationsPanel = ({ aiRecommendations, cbaLevels }: AIRecommendationsPanelProps) => {
  return (
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
  );
};

export default AIRecommendationsPanel;
