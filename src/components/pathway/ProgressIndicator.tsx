
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";

interface ProgressIndicatorProps {
  currentStep: number;
  steps: Array<{ id: number; title: string; description: string }>;
}

const ProgressIndicator = ({ currentStep, steps }: ProgressIndicatorProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                currentStep >= step.id ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="text-sm">{step.id}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          {steps.map((step) => (
            <div key={step.id} className="text-center max-w-20">
              <div className="font-medium text-xs">{step.title}</div>
              <div className="text-xs">{step.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;
