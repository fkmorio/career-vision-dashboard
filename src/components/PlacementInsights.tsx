
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PlacementInsights = () => {
  const placementTrends = [
    { year: '2020', kuccpsPlaced: 68, tvetEnrolled: 45, universityPlaced: 52 },
    { year: '2021', kuccpsPlaced: 72, tvetEnrolled: 48, universityPlaced: 55 },
    { year: '2022', kuccpsPlaced: 75, tvetEnrolled: 52, universityPlaced: 58 },
    { year: '2023', kuccpsPlaced: 78, tvetEnrolled: 55, universityPlaced: 62 },
    { year: '2024', kuccpsPlaced: 82, tvetEnrolled: 58, universityPlaced: 65 }
  ];

  const clusterData = [
    { cluster: 'STEM', students: 2800, placed: 2240 },
    { cluster: 'Humanities', students: 3200, placed: 2560 },
    { cluster: 'Business', students: 2400, placed: 1920 },
    { cluster: 'Arts & Sports', students: 1600, placed: 1280 },
    { cluster: 'Technical', students: 2000, placed: 1800 }
  ];

  const institutionTypes = [
    { name: 'Public Universities', value: 45, color: '#3b82f6' },
    { name: 'Private Universities', value: 20, color: '#10b981' },
    { name: 'TVET Institutions', value: 25, color: '#f59e0b' },
    { name: 'National Polytechnics', value: 10, color: '#ef4444' }
  ];

  const helbData = [
    { category: 'Full Loans', amount: 45, students: 15000 },
    { category: 'Partial Loans', amount: 30, students: 12000 },
    { category: 'Scholarships', amount: 15, students: 5000 },
    { category: 'Self-Sponsored', amount: 10, students: 8000 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Kenya Placement Insights</h1>
        <p className="text-gray-600 mt-1">Real-time analytics on tertiary education placement through KUCCPS</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">82%</div>
              <div className="text-sm text-gray-600 mt-1">KUCCPS Placement Rate</div>
              <div className="text-xs text-green-600 mt-1">↑ 4% from last year</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">127K</div>
              <div className="text-sm text-gray-600 mt-1">Students Placed</div>
              <div className="text-xs text-blue-600 mt-1">2024 KUCCPS Cycle</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">KSh 8.2B</div>
              <div className="text-sm text-gray-600 mt-1">HELB Disbursed</div>
              <div className="text-xs text-purple-600 mt-1">Academic Year 2024</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">342</div>
              <div className="text-sm text-gray-600 mt-1">Institutions</div>
              <div className="text-xs text-orange-600 mt-1">Universities & TVETs</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Placement Trends by Category</CardTitle>
            <CardDescription>KUCCPS, TVET, and University placement rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={placementTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="kuccpsPlaced" stroke="#3b82f6" strokeWidth={3} name="KUCCPS %" />
                <Line type="monotone" dataKey="tvetEnrolled" stroke="#10b981" strokeWidth={3} name="TVET %" />
                <Line type="monotone" dataKey="universityPlaced" stroke="#f59e0b" strokeWidth={3} name="University %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Placement by Subject Cluster</CardTitle>
            <CardDescription>Students placed by academic cluster (CBC alignment)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clusterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cluster" />
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
            <CardTitle>Institution Type Distribution</CardTitle>
            <CardDescription>Student placement across different institution types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={institutionTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {institutionTypes.map((entry, index) => (
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
            <CardTitle>Top Universities by Intake</CardTitle>
            <CardDescription>Leading institutions in student placement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { university: 'University of Nairobi', intake: 8500, cutoff: 'B+' },
                { university: 'Kenyatta University', intake: 7200, cutoff: 'B' },
                { university: 'Moi University', intake: 6800, cutoff: 'B' },
                { university: 'JKUAT', intake: 5400, cutoff: 'B+' },
                { university: 'Egerton University', intake: 4900, cutoff: 'B-' }
              ].map((institution, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium">{institution.university}</div>
                      <div className="text-sm text-gray-600">{institution.intake} students</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-green-600">{institution.cutoff}</div>
                    <div className="text-xs text-gray-600">Min KCSE Grade</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* HELB Financing Overview */}
      <Card>
        <CardHeader>
          <CardTitle>HELB Financing Overview</CardTitle>
          <CardDescription>Student loan and scholarship distribution for 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {helbData.map((item, index) => (
              <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{item.amount}%</div>
                <div className="text-sm font-medium mt-1">{item.category}</div>
                <div className="text-xs text-gray-600 mt-1">{item.students.toLocaleString()} students</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlacementInsights;
