
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PlacementInsights = () => {
  const placementTrends = [
    { year: '2020', placed: 85, avgPackage: 6.5 },
    { year: '2021', placed: 92, avgPackage: 7.2 },
    { year: '2022', placed: 89, avgPackage: 8.1 },
    { year: '2023', placed: 94, avgPackage: 9.3 },
    { year: '2024', placed: 97, avgPackage: 10.2 }
  ];

  const departmentData = [
    { department: 'CSE', students: 120, placed: 116 },
    { department: 'ECE', students: 100, placed: 94 },
    { department: 'Mech', students: 80, placed: 75 },
    { department: 'Civil', students: 70, placed: 63 },
    { department: 'EEE', students: 90, placed: 84 }
  ];

  const sectorData = [
    { name: 'IT Services', value: 45, color: '#3b82f6' },
    { name: 'Product', value: 25, color: '#10b981' },
    { name: 'Consulting', value: 15, color: '#f59e0b' },
    { name: 'Finance', value: 10, color: '#ef4444' },
    { name: 'Others', value: 5, color: '#8b5cf6' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Placement Insights</h1>
        <p className="text-gray-600 mt-1">Comprehensive analytics and trends for placement performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">97%</div>
              <div className="text-sm text-gray-600 mt-1">Placement Rate</div>
              <div className="text-xs text-green-600 mt-1">↑ 3% from last year</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">₹10.2L</div>
              <div className="text-sm text-gray-600 mt-1">Avg Package</div>
              <div className="text-xs text-blue-600 mt-1">↑ 9.7% from last year</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">₹45L</div>
              <div className="text-sm text-gray-600 mt-1">Highest Package</div>
              <div className="text-xs text-purple-600 mt-1">Google, USA</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">180+</div>
              <div className="text-sm text-gray-600 mt-1">Companies</div>
              <div className="text-xs text-orange-600 mt-1">↑ 25 new this year</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Placement Trends</CardTitle>
            <CardDescription>Year-over-year placement percentage and average package</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="placed" stroke="#3b82f6" strokeWidth={3} name="Placement %" />
                <Line yAxisId="right" type="monotone" dataKey="avgPackage" stroke="#10b981" strokeWidth={3} name="Avg Package (L)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department-wise Performance</CardTitle>
            <CardDescription>Students placed by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#e5e7eb" name="Total Students" />
                <Bar dataKey="placed" fill="#3b82f6" name="Placed Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sector Distribution</CardTitle>
            <CardDescription>Distribution of placements across sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Recruiters</CardTitle>
            <CardDescription>Companies hiring the most students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { company: 'TCS', hires: 45, package: '₹3.5L' },
                { company: 'Infosys', hires: 38, package: '₹4.2L' },
                { company: 'Wipro', hires: 32, package: '₹3.8L' },
                { company: 'Accenture', hires: 28, package: '₹5.1L' },
                { company: 'Amazon', hires: 15, package: '₹18L' }
              ].map((recruiter, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{recruiter.company}</div>
                      <div className="text-sm text-gray-600">{recruiter.hires} hires</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{recruiter.package}</div>
                    <div className="text-xs text-gray-600">Avg Package</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlacementInsights;
