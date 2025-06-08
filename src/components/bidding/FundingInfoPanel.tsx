
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  GraduationCap, 
  Building, 
  DollarSign, 
  HandHeart, 
  Users, 
  MapPin, 
  Phone, 
  ExternalLink,
  Info,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const FundingInfoPanel = () => {
  const fundingCategories = [
    {
      id: 'government',
      title: 'Government Support',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-800',
      programs: [
        {
          name: 'Free Day Secondary Education (FDSE)',
          amount: 'KES 22,244/year',
          target: 'Public secondary students',
          coverage: 'Tuition, exams, learning materials',
          eligibility: 'All public secondary school students',
          application: 'Automatic upon enrollment'
        },
        {
          name: 'TVET Capitation',
          amount: 'KES 30,000/year',
          target: 'Public TVET students',
          coverage: 'Direct support to institutions',
          eligibility: 'Registered TVET students via KUCCPS',
          application: 'Through TVET MIS system'
        }
      ]
    },
    {
      id: 'helb',
      title: 'HELB Support',
      icon: DollarSign,
      color: 'bg-green-100 text-green-800',
      programs: [
        {
          name: 'HELB University Loan',
          amount: 'KES 37,000-60,000/year',
          target: 'University students',
          coverage: 'Tuition and upkeep allowance',
          eligibility: 'Kenyan citizens in approved programs',
          application: 'Online at helb.co.ke'
        },
        {
          name: 'HELB TVET Loan',
          amount: 'KES 37,000-50,000/year',
          target: 'TVET students',
          coverage: 'Tuition and upkeep',
          eligibility: 'Certificate and diploma students',
          application: 'Online at helb.co.ke'
        },
        {
          name: 'HELB Bursary',
          amount: 'Varies (non-repayable)',
          target: 'Needy students',
          coverage: 'Additional support for vulnerable students',
          eligibility: 'Demonstrated financial need',
          application: 'Part of HELB loan application'
        }
      ]
    },
    {
      id: 'scholarships',
      title: 'Scholarships',
      icon: HandHeart,
      color: 'bg-purple-100 text-purple-800',
      programs: [
        {
          name: 'UFB Scholarship',
          amount: '60-100% of costs',
          target: 'University freshmen',
          coverage: 'Tuition and living expenses',
          eligibility: 'Based on household income assessment',
          application: 'Through university admission portal'
        },
        {
          name: 'Wings to Fly (Equity Bank)',
          amount: '100% secondary costs',
          target: 'Bright, needy secondary students',
          coverage: 'Tuition, boarding, uniform, transport',
          eligibility: 'Top KCPE performers from vulnerable backgrounds',
          application: 'Equity Bank branches'
        },
        {
          name: 'Elimu Scholarship',
          amount: '100% secondary costs',
          target: 'Top 2023 KCPE performers',
          coverage: 'Full secondary education support',
          eligibility: 'Vulnerable backgrounds, top performance',
          application: 'Ministry of Education + partners'
        }
      ]
    },
    {
      id: 'local',
      title: 'Local Support',
      icon: MapPin,
      color: 'bg-orange-100 text-orange-800',
      programs: [
        {
          name: 'NG-CDF Bursaries',
          amount: 'Varies by constituency',
          target: 'Secondary and tertiary students',
          coverage: 'Partial tuition support',
          eligibility: 'Residents of specific constituencies',
          application: 'Local CDF offices'
        },
        {
          name: 'County Bursaries',
          amount: 'Varies by county',
          target: 'Students from specific counties',
          coverage: 'Partial education costs',
          eligibility: 'County residents with financial need',
          application: 'County government offices'
        }
      ]
    },
    {
      id: 'private',
      title: 'Private & NGO',
      icon: Users,
      color: 'bg-pink-100 text-pink-800',
      programs: [
        {
          name: 'KCB Foundation',
          amount: 'Partial to full support',
          target: 'Merit-based students',
          coverage: 'Varies by program',
          eligibility: 'Academic excellence and need',
          application: 'KCB Foundation website'
        },
        {
          name: 'Zawadi Africa',
          amount: 'Full university support',
          target: 'African women in STEM',
          coverage: 'Tuition, living, leadership development',
          eligibility: 'Women pursuing STEM fields',
          application: 'zawadiafrica.org'
        },
        {
          name: 'Church & Community',
          amount: 'Varies',
          target: 'Community members',
          coverage: 'Partial support',
          eligibility: 'Community affiliation',
          application: 'Local churches and organizations'
        }
      ]
    }
  ];

  const applicationTips = [
    {
      title: 'Start Early',
      description: 'Begin applications 6-12 months before your program starts',
      icon: AlertCircle,
      color: 'text-orange-600'
    },
    {
      title: 'Complete Documentation',
      description: 'Gather all required documents: ID, academic certificates, financial statements',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Multiple Applications',
      description: 'Apply to multiple funding sources to maximize your chances',
      icon: Info,
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Info className="w-5 h-5 mr-2 text-blue-600" />
            Kenya Education Funding Guide
          </CardTitle>
          <CardDescription>
            Comprehensive overview of funding options available for your educational journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="government" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              {fundingCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="w-4 h-4 mr-1" />
                  <span className="hidden md:inline">{category.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {fundingCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <category.icon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <Badge className={category.color}>{category.programs.length} Programs</Badge>
                </div>

                <div className="grid gap-4">
                  {category.programs.map((program, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium text-lg">{program.name}</h4>
                            <p className="text-gray-600 text-sm">{program.target}</p>
                          </div>
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {program.amount}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                            <div>
                              <span className="text-sm font-medium">Coverage: </span>
                              <span className="text-sm text-gray-600">{program.coverage}</span>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Users className="w-4 h-4 text-blue-500 mt-0.5" />
                            <div>
                              <span className="text-sm font-medium">Eligibility: </span>
                              <span className="text-sm text-gray-600">{program.eligibility}</span>
                            </div>
                          </div>

                          <div className="flex items-start space-x-2">
                            <ExternalLink className="w-4 h-4 text-purple-500 mt-0.5" />
                            <div>
                              <span className="text-sm font-medium">Application: </span>
                              <span className="text-sm text-gray-600">{program.application}</span>
                            </div>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="mt-3">
                              <Info className="w-4 h-4 mr-1" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{program.name}</DialogTitle>
                              <DialogDescription>Detailed information and application process</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Funding Amount</h4>
                                <p className="text-green-600 font-bold text-lg">{program.amount}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">What's Covered</h4>
                                <p className="text-gray-600">{program.coverage}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Eligibility Requirements</h4>
                                <p className="text-gray-600">{program.eligibility}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">How to Apply</h4>
                                <p className="text-gray-600">{program.application}</p>
                              </div>
                              <Button className="w-full">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Start Application
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Application Tips */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Application Success Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {applicationTips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                <tip.icon className={`w-5 h-5 ${tip.color} mt-0.5`} />
                <div>
                  <h4 className="font-medium text-gray-900">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FundingInfoPanel;
