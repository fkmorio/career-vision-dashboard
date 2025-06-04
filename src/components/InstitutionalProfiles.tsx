
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Star, MapPin, Users, FileText } from "lucide-react";

const InstitutionalProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');

  const companies = [
    {
      id: 1,
      name: 'Google',
      logo: '/placeholder.svg',
      sector: 'Technology',
      location: 'Bangalore, India',
      rating: 4.8,
      employees: '50,000+',
      description: 'Global technology leader focusing on internet-related services and products.',
      packages: { min: '₹15L', max: '₹45L', avg: '₹28L' },
      openings: 25,
      requirements: ['Computer Science', 'Software Engineering', 'Data Science'],
      skills: ['Python', 'Java', 'Machine Learning', 'System Design'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Stock Options', 'Learning Budget']
    },
    {
      id: 2,
      name: 'Microsoft',
      logo: '/placeholder.svg',
      sector: 'Technology',
      location: 'Hyderabad, India',
      rating: 4.7,
      employees: '25,000+',
      description: 'Leading technology company developing software, services, and solutions.',
      packages: { min: '₹12L', max: '₹35L', avg: '₹22L' },
      openings: 18,
      requirements: ['Computer Science', 'Information Technology'],
      skills: ['C#', 'Azure', 'React', 'Node.js'],
      benefits: ['Health Insurance', 'Remote Work', 'Professional Development']
    },
    {
      id: 3,
      name: 'TCS',
      logo: '/placeholder.svg',
      sector: 'IT Services',
      location: 'Mumbai, India',
      rating: 4.2,
      employees: '500,000+',
      description: 'Global IT services, consulting and business solutions organization.',
      packages: { min: '₹3.5L', max: '₹8L', avg: '₹5L' },
      openings: 150,
      requirements: ['Any Engineering', 'Computer Applications'],
      skills: ['Java', 'SQL', 'Web Development', 'Testing'],
      benefits: ['Training Programs', 'Career Growth', 'Global Exposure']
    },
    {
      id: 4,
      name: 'Amazon',
      logo: '/placeholder.svg',
      sector: 'E-commerce',
      location: 'Bangalore, India',
      rating: 4.5,
      employees: '100,000+',
      description: 'World\'s largest online marketplace and cloud computing platform.',
      packages: { min: '₹18L', max: '₹42L', avg: '₹25L' },
      openings: 32,
      requirements: ['Computer Science', 'Electronics'],
      skills: ['AWS', 'Python', 'Distributed Systems', 'Leadership'],
      benefits: ['Stock Options', 'Health Benefits', 'Innovation Time']
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.sector.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === 'all' || company.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const sectors = ['all', ...new Set(companies.map(c => c.sector))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Institutional Profiles</h1>
        <p className="text-gray-600 mt-1">Explore companies and discover your next career opportunity</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search companies, sectors, or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>
                    {sector === 'all' ? 'All Sectors' : sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Company Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">{company.name[0]}</span>
                  </div>
                  <div>
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary">{company.sector}</Badge>
                      <div className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        {company.rating}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Avg Package</div>
                  <div className="font-bold text-green-600">{company.packages.avg}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{company.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                  {company.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-gray-400 mr-2" />
                  {company.employees}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Package Range</div>
                <div className="flex justify-between text-sm">
                  <span>Min: {company.packages.min}</span>
                  <span>Max: {company.packages.max}</span>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Key Skills Required</div>
                <div className="flex flex-wrap gap-1">
                  {company.skills.slice(0, 4).map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-medium mb-2">Benefits</div>
                <div className="flex flex-wrap gap-1">
                  {company.benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm">
                  <span className="font-medium text-blue-600">{company.openings}</span> openings
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600">
                    <FileText className="w-4 h-4 mr-1" />
                    Apply Now
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

export default InstitutionalProfiles;
