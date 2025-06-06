
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import { useUser } from '../contexts/UserContext';
import { GraduationCap, User, School } from 'lucide-react';

interface WelcomeFormData {
  name: string;
  studentId: string;
  school: string;
  kcseGrade: string;
  cluster: string;
}

const WelcomeSetup = () => {
  const { login } = useUser();
  const form = useForm<WelcomeFormData>();

  const clusters = [
    "Mathematics & Physical Sciences",
    "Biological & Physical Sciences", 
    "Technical/Applied Sciences",
    "Business Studies",
    "Humanities",
    "Arts & Sports Science"
  ];

  const kcseGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-"];

  const onSubmit = (data: WelcomeFormData) => {
    const userData = {
      ...data,
      kuccpsStatus: "Active - Bidding Open",
      helbStatus: "Application Submitted",
      competencyScore: 85,
      applications: 6,
      bids: 4,
      interviews: 2
    };
    
    login(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to Career Vision
          </CardTitle>
          <CardDescription className="text-lg">
            Your AI-powered KUCCPS placement companion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Full name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Wanjiku Mwangi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentId"
                  rules={{ required: "Student ID is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KCSE Index Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., KCSE2024001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="school"
                rules={{ required: "School name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <School className="w-4 h-4" />
                      Secondary School
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Nairobi Girls High School" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="kcseGrade"
                  rules={{ required: "KCSE grade is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>KCSE Grade</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your grade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {kcseGrades.map((grade) => (
                            <SelectItem key={grade} value={grade}>
                              Grade {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cluster"
                  rules={{ required: "Cluster selection is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Cluster</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your cluster" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {clusters.map((cluster) => (
                            <SelectItem key={cluster} value={cluster}>
                              {cluster}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                Start Your Journey
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeSetup;
