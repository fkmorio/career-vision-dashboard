
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

const PlacementInsightsPanel = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center text-blue-800">
          <Award className="w-5 h-5 mr-2" />
          Real-Time Placement Insights (CBA-Enabled)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-blue-600">75%</div>
            <div className="text-sm text-gray-600">KUCCPS Placement Rate</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-green-600">32,500</div>
            <div className="text-sm text-gray-600">Total University Slots</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-orange-600">65%</div>
            <div className="text-sm text-gray-600">HELB Approval Rate</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">CBA Implementation</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlacementInsightsPanel;
