
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, DollarSign, Users, TrendingUp, AlertCircle } from "lucide-react";

const Bidding = () => {
  const [activeBids, setActiveBids] = useState([]);

  const opportunities = [
    {
      id: 1,
      company: 'TechCorp India',
      position: 'Software Engineer',
      type: 'Full-time',
      location: 'Bangalore',
      package: { min: 8, max: 15, currency: '₹', unit: 'LPA' },
      currentBid: 12,
      minBid: 8,
      maxBid: 15,
      deadline: '2024-06-10',
      timeLeft: '2 days',
      totalBidders: 45,
      requirements: ['React', 'Node.js', 'MongoDB'],
      description: 'Join our growing team to build next-generation web applications.',
      status: 'active',
      userBid: null
    },
    {
      id: 2,
      company: 'DataFlow Solutions',
      position: 'Data Analyst',
      type: 'Full-time',
      location: 'Mumbai',
      package: { min: 6, max: 12, currency: '₹', unit: 'LPA' },
      currentBid: 9,
      minBid: 6,
      maxBid: 12,
      deadline: '2024-06-08',
      timeLeft: '5 hours',
      totalBidders: 32,
      requirements: ['Python', 'SQL', 'Tableau'],
      description: 'Analyze complex datasets to drive business insights.',
      status: 'urgent',
      userBid: 8.5
    },
    {
      id: 3,
      company: 'InnovateX',
      position: 'Product Manager',
      type: 'Full-time',
      location: 'Pune',
      package: { min: 15, max: 25, currency: '₹', unit: 'LPA' },
      currentBid: 20,
      minBid: 15,
      maxBid: 25,
      deadline: '2024-06-15',
      timeLeft: '1 week',
      totalBidders: 28,
      requirements: ['Strategy', 'Analytics', 'Leadership'],
      description: 'Lead product development for our flagship mobile application.',
      status: 'active',
      userBid: null
    }
  ];

  const placeBid = (opportunityId, bidAmount) => {
    setActiveBids(prev => [...prev, { opportunityId, bidAmount, timestamp: new Date() }]);
    console.log(`Bid placed: ${bidAmount} for opportunity ${opportunityId}`);
  };

  const getBidProgress = (current, min, max) => {
    return ((current - min) / (max - min)) * 100;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Placement Bidding</h1>
        <p className="text-gray-600 mt-1">Bid on opportunities and negotiate your ideal package</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-gray-600">Active Opportunities</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Your Bids</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">₹12L</div>
            <div className="text-sm text-gray-600">Avg Winning Bid</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">85%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Bidding Instructions */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="space-y-1">
              <div className="font-medium text-blue-900">How Bidding Works</div>
              <div className="text-sm text-blue-700">
                Companies post opportunities with package ranges. You can bid within that range based on your skills and experience. 
                Higher bids increase your chances but should reflect your value proposition.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Opportunities */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Available Opportunities</h2>
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-lg">{opportunity.position}</CardTitle>
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status === 'urgent' ? 'Ending Soon' : 'Active'}
                    </Badge>
                  </div>
                  <CardDescription className="mt-1">
                    {opportunity.company} • {opportunity.location} • {opportunity.type}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Package Range</div>
                  <div className="font-bold text-green-600">
                    {opportunity.package.currency}{opportunity.package.min}-{opportunity.package.max} {opportunity.package.unit}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{opportunity.description}</p>
              
              {/* Requirements */}
              <div>
                <div className="text-sm font-medium mb-2">Requirements:</div>
                <div className="flex flex-wrap gap-1">
                  {opportunity.requirements.map((req, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bidding Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Current Winning Bid:</span>
                  <span className="font-bold text-green-600">
                    {opportunity.package.currency}{opportunity.currentBid} {opportunity.package.unit}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bid Progress</span>
                    <span>{Math.round(getBidProgress(opportunity.currentBid, opportunity.minBid, opportunity.maxBid))}%</span>
                  </div>
                  <Progress 
                    value={getBidProgress(opportunity.currentBid, opportunity.minBid, opportunity.maxBid)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{opportunity.package.currency}{opportunity.minBid}</span>
                    <span>{opportunity.package.currency}{opportunity.maxBid}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-400 mr-2" />
                    {opportunity.timeLeft}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-2" />
                    {opportunity.totalBidders} bidders
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 text-gray-400 mr-2" />
                    Competitive
                  </div>
                </div>
              </div>

              {/* User's Bid */}
              {opportunity.userBid && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-900">Your Current Bid:</span>
                    <span className="font-bold text-blue-600">
                      {opportunity.package.currency}{opportunity.userBid} {opportunity.package.unit}
                    </span>
                  </div>
                </div>
              )}

              {/* Bidding Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  Min bid: {opportunity.package.currency}{opportunity.minBid + 0.5} {opportunity.package.unit}
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                    onClick={() => placeBid(opportunity.id, opportunity.currentBid + 0.5)}
                  >
                    <DollarSign className="w-4 h-4 mr-1" />
                    {opportunity.userBid ? 'Update Bid' : 'Place Bid'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Bidding;
