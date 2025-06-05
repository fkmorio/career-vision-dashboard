
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Database, BarChart3, FileSpreadsheet } from "lucide-react";
import { institutionalDatabase, kenyanInstitutions, cbaLevels } from './institutionData';

const DatabaseReporting = () => {
  const generateCSVReport = () => {
    const headers = [
      'Institution Name', 'Sector', 'Location', 'KUCCPS Code', 'Rating', 
      'Students', 'CBA Requirement', 'Available Openings', 'HELB Eligible', 
      'Cut-off Min', 'Cut-off Max', 'Cut-off Avg'
    ];
    
    const csvContent = [
      headers.join(','),
      ...kenyanInstitutions.map(inst => [
        `"${inst.name}"`,
        `"${inst.sector}"`,
        `"${inst.location}"`,
        inst.kuccpsCode,
        inst.rating,
        `"${inst.students}"`,
        `"${cbaLevels[inst.cbaRequirement].performance}"`,
        inst.openings,
        inst.helbEligible ? 'Yes' : 'No',
        inst.cutoffPoints.min,
        inst.cutoffPoints.max,
        inst.cutoffPoints.avg
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kenya_Institutions_Database.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateDetailedReport = () => {
    const report = `
KENYA INSTITUTIONAL DATABASE COMPREHENSIVE REPORT
Generated on: ${new Date().toLocaleDateString()}

===============================================================
EXECUTIVE SUMMARY
===============================================================

Total Institutions: ${institutionalDatabase.totalInstitutions}
Total Capacity: ${institutionalDatabase.totalCapacity.toLocaleString()} students
Average Rating: ${institutionalDatabase.averageRating}/5.0
HELB Eligible Institutions: ${institutionalDatabase.helbEligibleCount}/${institutionalDatabase.totalInstitutions}

===============================================================
SECTOR BREAKDOWN
===============================================================

Public Universities: ${institutionalDatabase.sectorBreakdown['Public University']} institutions
Private Universities: ${institutionalDatabase.sectorBreakdown['Private University']} institutions
National Polytechnics: ${institutionalDatabase.sectorBreakdown['National Polytechnic']} institutions
Public TVET Colleges: ${institutionalDatabase.sectorBreakdown['Public TVET']} institutions
Private TVET Colleges: ${institutionalDatabase.sectorBreakdown['Private TVET']} institutions

===============================================================
CBA PERFORMANCE LEVEL DISTRIBUTION
===============================================================

Level 4 (Exceeding Expectation): ${institutionalDatabase.cbaLevelDistribution.level4} institutions
Level 3 (Meeting Expectation): ${institutionalDatabase.cbaLevelDistribution.level3} institutions
Level 2 (Approaching Expectation): ${institutionalDatabase.cbaLevelDistribution.level2} institutions
Level 1 (Below Expectation): ${institutionalDatabase.cbaLevelDistribution.level1} institutions

===============================================================
REGIONAL DISTRIBUTION
===============================================================

Nairobi Region: ${institutionalDatabase.regionalDistribution.Nairobi} institutions
Central Kenya: ${institutionalDatabase.regionalDistribution['Central Kenya']} institutions
Coast Region: ${institutionalDatabase.regionalDistribution.Coast} institutions
Western Region: ${institutionalDatabase.regionalDistribution.Western} institutions
Rift Valley: ${institutionalDatabase.regionalDistribution['Rift Valley']} institutions

===============================================================
DETAILED INSTITUTIONAL PROFILES
===============================================================

${kenyanInstitutions.map(inst => `
${inst.name} (${inst.kuccpsCode})
Sector: ${inst.sector}
Location: ${inst.location}
Rating: ${inst.rating}/5.0
Student Population: ${inst.students}
Available Openings: ${inst.openings}
CBA Requirement: ${cbaLevels[inst.cbaRequirement].performance}
KCSE Cut-off: ${inst.cutoffPoints.min} - ${inst.cutoffPoints.max} (Avg: ${inst.cutoffPoints.avg})
HELB Eligible: ${inst.helbEligible ? 'Yes' : 'No'}

Key Programs: ${inst.programs.join(', ')}
Clusters: ${inst.clusters.join(', ')}
Scholarships: ${inst.scholarships.join(', ')}
Facilities: ${inst.facilities.join(', ')}

Description: ${inst.description}
`).join('\n---\n')}

===============================================================
METHODOLOGY & DATA SOURCES
===============================================================

This report is compiled from:
- KUCCPS institutional data
- KNEC CBA framework guidelines
- HELB eligibility records
- Institutional websites and profiles
- Ministry of Education databases

For updates and corrections, please contact the Career Vision Platform administration.

===============================================================
END OF REPORT
===============================================================
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kenya_Institutions_Detailed_Report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Database className="w-5 h-5 mr-2" />
            Institutional Database Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{institutionalDatabase.totalInstitutions}</div>
              <div className="text-sm text-gray-600">Total Institutions</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{institutionalDatabase.totalCapacity.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Capacity</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{institutionalDatabase.averageRating}</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{institutionalDatabase.helbEligibleCount}</div>
              <div className="text-sm text-gray-600">HELB Eligible</div>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={generateCSVReport} className="bg-green-600 hover:bg-green-700">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Download CSV Database
            </Button>
            <Button onClick={generateDetailedReport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Detailed Report
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Sector Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sector</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(institutionalDatabase.sectorBreakdown).map(([sector, count]) => (
                  <TableRow key={sector}>
                    <TableCell className="font-medium">{sector}</TableCell>
                    <TableCell className="text-right">{count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>CBA Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CBA Level</TableHead>
                  <TableHead className="text-right">Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(institutionalDatabase.cbaLevelDistribution).map(([level, count]) => (
                  <TableRow key={level}>
                    <TableCell className="font-medium">
                      {cbaLevels[level as keyof typeof cbaLevels].performance}
                    </TableCell>
                    <TableCell className="text-right">{count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabaseReporting;
