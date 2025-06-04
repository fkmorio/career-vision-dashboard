
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

interface ActionPlanStepProps {
  selectedPathway: string | null;
  selectedInstitutionType: string | null;
  pathways: Array<{ id: string; title: string }>;
  institutionTypes: Array<{ id: string; title: string }>;
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
            <div className="space-y-2">
              <div className="text-sm text-gray-600">Next Steps:</div>
              <div className="space-y-1 text-sm">
                <div>✅ Focus on KCSE preparation and target grades</div>
                <div>✅ Research specific institutions and programs</div>
                <div>✅ Prepare application documents</div>
                <div>✅ Apply for scholarships and funding</div>
                <div>✅ Connect with career guidance counselors</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPlanStep;
