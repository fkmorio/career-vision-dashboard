
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle } from "lucide-react";

const CareerGoalsStep = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Set Your Career Goals</h2>
        <p className="text-gray-600">Define what you want to achieve in your chosen pathway</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Short-term Goals (1-2 years)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Complete KCSE with required grades</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Research and apply to institutions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Secure admission to preferred program</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Adapt to tertiary education environment</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Long-term Goals (3-7 years)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Graduate with excellent grades</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Secure employment in chosen field</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Contribute to Kenya's development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-4 h-4" />
              <span className="text-sm">Consider further studies or entrepreneurship</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerGoalsStep;
