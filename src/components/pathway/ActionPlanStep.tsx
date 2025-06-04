
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Target, BookOpen } from "lucide-react";
import { cbcGradingSystem } from '../../data/pathwayData';

interface ActionPlanStepProps {
  selectedPathway: string | null;
  selectedInstitutionType: string | null;
  pathways: Array<{ id: string; title: string; minKcseGrade: string; competencyLevel: string }>;
  institutionTypes: Array<{ id: string; title: string; gradingAlignment: string }>;
}

const ActionPlanStep = ({ selectedPathway, selectedInstitutionType, pathways, institutionTypes }: ActionPlanStepProps) => {
  const selectedPathwayData = pathways.find(p => p.id === selectedPathway);
  const selectedInstitutionData = institutionTypes.find(i => i.id === selectedInstitutionType);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Your Transition Action Plan</h2>
        <p className="text-gray-600">Here's your roadmap from senior secondary to tertiary education</p>
      </div>
      
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold">Congratulations on Your Plan!</h3>
            <p className="text-gray-600">
              Your pathway to {selectedPathwayData?.title} via {selectedInstitutionData?.title} is ready.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold">CBC Grade Requirements</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm font-medium text-blue-800">Target KCSE Grade:</div>
                <div className="text-blue-600">{selectedPathwayData?.minKcseGrade}</div>
                <div className="text-xs text-blue-700">{selectedPathwayData?.competencyLevel}</div>
              </div>
              <div className="bg-green-50 p-3 rounded">
                <div className="text-sm font-medium text-green-800">Institution Alignment:</div>
                <div className="text-xs text-green-700">{selectedInstitutionData?.gradingAlignment}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <h3 className="font-bold">CBC Grading System</h3>
            </div>
            <div className="space-y-2">
              {cbcGradingSystem.grades.slice(0, 4).map((grade) => (
                <div key={grade.grade} className="flex justify-between text-xs">
                  <span className="font-medium">{grade.grade}: {grade.markRange}</span>
                  <span className="text-gray-600">{grade.competency}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-bold mb-4">Next Steps for CBC Success:</h3>
          <div className="space-y-2 text-sm">
            <div>✅ Focus on competency-based learning and practical skills</div>
            <div>✅ Aim for {selectedPathwayData?.minKcseGrade} in KCSE exams</div>
            <div>✅ Develop both academic and practical competencies</div>
            <div>✅ Research specific institutions and their CBC requirements</div>
            <div>✅ Prepare application documents emphasizing competencies</div>
            <div>✅ Apply for scholarships and funding opportunities</div>
            <div>✅ Connect with career guidance counselors familiar with CBC</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPlanStep;
