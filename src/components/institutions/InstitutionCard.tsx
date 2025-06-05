
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, FileText, TrendingUp } from "lucide-react";

interface CBALevel {
  range: string;
  performance: string;
  color: string;
}

interface Institution {
  id: number;
  name: string;
  logo: string;
  sector: string;
  location: string;
  rating: number;
  students: string;
  description: string;
  kuccpsCode: string;
  cutoffPoints: { min: string; max: string; avg: string };
  cbaRequirement: string;
  openings: number;
  clusters: string[];
  programs: string[];
  helbEligible: boolean;
  scholarships: string[];
  facilities: string[];
}

interface InstitutionCardProps {
  institution: Institution;
  cbaLevels: Record<string, CBALevel>;
}

const InstitutionCard = ({ institution, cbaLevels }: InstitutionCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">{institution.name.split(' ')[0][0]}</span>
            </div>
            <div>
              <CardTitle className="text-xl">{institution.name}</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary">{institution.sector}</Badge>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  {institution.rating}
                </div>
                {institution.helbEligible && (
                  <Badge className="bg-green-100 text-green-800 text-xs">HELB Eligible</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">KUCCPS Code</div>
            <div className="font-bold text-blue-600">{institution.kuccpsCode}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">{institution.description}</p>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
            {institution.location}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-2" />
            {institution.students}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">KCSE Cut-off Points</div>
          <div className="flex justify-between text-sm">
            <span>Min: {institution.cutoffPoints.min}</span>
            <span>Avg: {institution.cutoffPoints.avg}</span>
            <span>Max: {institution.cutoffPoints.max}</span>
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">CBA Requirement</div>
          <Badge className={cbaLevels[institution.cbaRequirement].color}>
            {cbaLevels[institution.cbaRequirement].performance}
          </Badge>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Available Clusters</div>
          <div className="flex flex-wrap gap-1">
            {institution.clusters.slice(0, 3).map((cluster, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {cluster}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Key Programs</div>
          <div className="flex flex-wrap gap-1">
            {institution.programs.slice(0, 4).map((program, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {program}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Scholarships & Support</div>
          <div className="flex flex-wrap gap-1">
            {institution.scholarships.slice(0, 2).map((scholarship, index) => (
              <Badge key={index} className="bg-orange-100 text-orange-800 text-xs">
                {scholarship}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm">
            <span className="font-medium text-green-600">{institution.openings}</span> available slots
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              View Trends
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-green-600 to-blue-600">
              <FileText className="w-4 h-4 mr-1" />
              Express Interest
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstitutionCard;
