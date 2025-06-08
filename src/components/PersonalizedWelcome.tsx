
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from 'react-hook-form';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { GraduationCap, User, School, Users, BookOpen, Settings } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
  role: UserRole;
}

const PersonalizedWelcome = () => {
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const form = useForm<LoginFormData>();

  const roleOptions = [
    { value: 'student', label: 'Student', icon: GraduationCap, description: 'Access your CBC pathway and assessments' },
    { value: 'teacher', label: 'Teacher', icon: BookOpen, description: 'Manage assessments and provide feedback' },
    { value: 'parent', label: 'Parent/Guardian', icon: Users, description: 'Track your child\'s progress' },
    { value: 'educator', label: 'Educator/Counselor', icon: User, description: 'Provide career guidance and support' },
    { value: 'administrator', label: 'Administrator', icon: Settings, description: 'System management and analytics' }
  ];

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const getRoleSpecificContent = (role: UserRole) => {
    switch (role) {
      case 'student':
        return {
          title: 'Student Portal',
          description: 'Access your CBC learning journey, pathway recommendations, and competency assessments',
          features: [
            'CBC Pathway Explorer with AI recommendations',
            'Digital Portfolio and Competency Tracking',
            'Assessment results and feedback',
            'Career guidance and planning tools'
          ]
        };
      case 'teacher':
        return {
          title: 'Teacher Dashboard',
          description: 'Manage CBC assessments, provide feedback, and track learner progress',
          features: [
            'CBC-aligned assessment rubrics',
            'Student competency tracking',
            'AI-powered feedback generation',
            'Class performance analytics'
          ]
        };
      case 'parent':
        return {
          title: 'Parent Portal',
          description: 'Monitor your child\'s CBC progress and pathway decisions',
          features: [
            'Child\'s competency development tracking',
            'Pathway recommendation insights',
            'Communication with teachers',
            'Progress reports and achievements'
          ]
        };
      case 'educator':
        return {
          title: 'Educator Console',
          description: 'Provide career guidance and support CBC implementation',
          features: [
            'Student pathway guidance tools',
            'Career counseling resources',
            'CBC curriculum support',
            'Learner analytics and insights'
          ]
        };
      case 'administrator':
        return {
          title: 'Administrator Panel',
          description: 'Manage CBC system, analyze data, and oversee operations',
          features: [
            'System-wide analytics and reporting',
            'User management and permissions',
            'CBC implementation monitoring',
            'Data export and compliance tools'
          ]
        };
    }
  };

  const currentRoleContent = getRoleSpecificContent(selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            CBC Career Vision
          </CardTitle>
          <CardDescription className="text-lg">
            Kenya's Comprehensive Competency-Based Education Platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              {roleOptions.map((role) => (
                <TabsTrigger key={role.value} value={role.value} className="text-sm">
                  <role.icon className="w-4 h-4 mr-1" />
                  {role.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {roleOptions.map((role) => (
              <TabsContent key={role.value} value={role.value}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Role Information */}
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <role.icon className="w-5 h-5 text-blue-600" />
                        {currentRoleContent.title}
                      </CardTitle>
                      <CardDescription>
                        {currentRoleContent.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-medium mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {currentRoleContent.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-green-600 mt-1">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Login Form */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Sign In to Your Account</CardTitle>
                      <CardDescription>
                        Access your personalized CBC dashboard
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="email"
                            rules={{ 
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                              }
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder={`${role.value}@example.com`} 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="password"
                            rules={{ required: "Password is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                  <Input type="password" placeholder="Enter your password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="role"
                            rules={{ required: "Role selection is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Account Type</FormLabel>
                                <Select 
                                  onValueChange={(value) => {
                                    field.onChange(value);
                                    setSelectedRole(value as UserRole);
                                  }} 
                                  value={selectedRole}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your role" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {roleOptions.map((roleOption) => (
                                      <SelectItem key={roleOption.value} value={roleOption.value}>
                                        <div className="flex items-center gap-2">
                                          <roleOption.icon className="w-4 h-4" />
                                          <span>{roleOption.label}</span>
                                        </div>
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                            disabled={isLoading}
                          >
                            {isLoading ? 'Signing In...' : `Sign In as ${roleOptions.find(r => r.value === selectedRole)?.label}`}
                          </Button>
                        </form>
                      </Form>

                      <div className="mt-4 p-3 bg-yellow-50 rounded border border-yellow-200">
                        <p className="text-sm text-yellow-800">
                          <strong>Demo Mode:</strong> Use any email/password combination to explore the platform.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedWelcome;
