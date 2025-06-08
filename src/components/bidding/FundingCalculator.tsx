
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calculator, DollarSign, GraduationCap, HandHeart, Building, Users, CheckCircle, AlertCircle } from "lucide-react";

interface FundingCalculatorProps {
  programCost: number;
  programType: 'university' | 'tvet' | 'secondary';
  transitionType: 'JSS-SSS' | 'SSS-Tertiary';
}

const FundingCalculator: React.FC<FundingCalculatorProps> = ({ programCost, programType, transitionType }) => {
  const [householdIncome, setHouseholdIncome] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [previousSchool, setPreviousSchool] = useState<string>('');
  const [showResults, setShowResults] = useState(false);

  const calculateEligibility = () => {
    setShowResults(true);
  };

  const getFundingOptions = () => {
    const options = [];

    // Government Capitation
    if (programType === 'secondary') {
      options.push({
        name: 'Free Day Secondary Education (FDSE)',
        amount: 22244,
        type: 'Government Capitation',
        coverage: 'Tuition, exams, learning materials',
        eligibility: 'All public secondary students',
        icon: GraduationCap,
        color: 'bg-blue-100 text-blue-800'
      });
    }

    if (programType === 'tvet') {
      options.push({
        name: 'TVET Capitation',
        amount: 30000,
        type: 'Government Support',
        coverage: 'Annual support for public TVET',
        eligibility: 'Registered TVET students',
        icon: Building,
        color: 'bg-green-100 text-green-800'
      });
    }

    // HELB Loans
    if (programType === 'university' || programType === 'tvet') {
      const helbAmount = programType === 'university' ? 60000 : 50000;
      options.push({
        name: 'HELB Loan',
        amount: helbAmount,
        type: 'Student Loan',
        coverage: 'Tuition and upkeep allowance',
        eligibility: 'University/TVET students',
        icon: DollarSign,
        color: 'bg-purple-100 text-purple-800'
      });
    }

    // UFB Scholarships (University)
    if (programType === 'university') {
      const scholarshipPercentage = getScholarshipCategory();
      const scholarshipAmount = (programCost * scholarshipPercentage) / 100;
      
      options.push({
        name: `UFB Scholarship (${scholarshipPercentage}%)`,
        amount: scholarshipAmount,
        type: 'Government Scholarship',
        coverage: `${scholarshipPercentage}% of tuition and living expenses`,
        eligibility: getScholarshipEligibility(scholarshipPercentage),
        icon: HandHeart,
        color: 'bg-orange-100 text-orange-800'
      });
    }

    // NGO/Private Scholarships
    options.push({
      name: 'Private Scholarships',
      amount: programCost * 0.5,
      type: 'Private/NGO Support',
      coverage: 'Varies - partial to full support',
      eligibility: 'Merit and need-based',
      icon: Users,
      color: 'bg-pink-100 text-pink-800'
    });

    return options;
  };

  const getScholarshipCategory = () => {
    if (householdIncome < 50000) return 100; // Vulnerable
    if (householdIncome < 120000) return 85; // Very Needy
    if (householdIncome < 250000) return 65; // Needy
    return 30; // Less Needy
  };

  const getScholarshipEligibility = (percentage: number) => {
    if (percentage === 100) return 'Vulnerable households';
    if (percentage === 85) return 'Very needy families';
    if (percentage === 65) return 'Needy households';
    return 'Moderate need families';
  };

  const calculateTotalSupport = () => {
    return getFundingOptions().reduce((total, option) => total + option.amount, 0);
  };

  const calculateRemainingCost = () => {
    const totalSupport = calculateTotalSupport();
    return Math.max(0, programCost - totalSupport);
  };

  const getCoveragePercentage = () => {
    const totalSupport = calculateTotalSupport();
    return Math.min(100, (totalSupport / programCost) * 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="w-5 h-5 mr-2 text-blue-600" />
          Funding Calculator
        </CardTitle>
        <CardDescription>
          Discover available funding options for your {transitionType} journey
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Monthly Household Income (KES)</label>
            <Input
              type="number"
              value={householdIncome}
              onChange={(e) => setHouseholdIncome(Number(e.target.value))}
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Location Type</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urban">Urban</SelectItem>
                <SelectItem value="rural">Rural</SelectItem>
                <SelectItem value="hardship">Hardship Area</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Previous School Type</label>
            <Select value={previousSchool} onValueChange={setPreviousSchool}>
              <SelectTrigger>
                <SelectValue placeholder="Select school type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public School</SelectItem>
                <SelectItem value="private">Private School</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateEligibility} className="w-full">
          Calculate Funding Options
        </Button>

        {/* Results Section */}
        {showResults && (
          <div className="space-y-6">
            {/* Summary */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      KES {programCost.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Program Cost</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      KES {calculateTotalSupport().toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Available Support</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      KES {calculateRemainingCost().toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Remaining Cost</div>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Coverage</span>
                    <span>{getCoveragePercentage().toFixed(1)}%</span>
                  </div>
                  <Progress value={getCoveragePercentage()} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Funding Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Available Funding Options</h3>
              {getFundingOptions().map((option, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          <option.icon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{option.name}</h4>
                            <Badge className={option.color}>{option.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{option.coverage}</p>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-700">Eligible: {option.eligibility}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          KES {option.amount.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">per year</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Application Steps */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span>Apply for HELB loan/bursary before program start</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span>Submit UFB scholarship application (if applicable)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span>Research and apply for private scholarships</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span>Contact your constituency/county for additional bursaries</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FundingCalculator;
