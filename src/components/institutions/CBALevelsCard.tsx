
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

interface CBALevel {
  range: string;
  performance: string;
  color: string;
}

interface CBALevelsCardProps {
  cbaLevels: Record<string, CBALevel>;
}

const CBALevelsCard = ({ cbaLevels }: CBALevelsCardProps) => {
  return (
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
  );
};

export default CBALevelsCard;
