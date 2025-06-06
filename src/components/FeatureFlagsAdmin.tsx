
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Plus, Trash2, Flag, BarChart3 } from "lucide-react";
import { useFeatureFlags, FeatureFlag } from '../contexts/FeatureFlagsContext';

const FeatureFlagsAdmin = () => {
  const { flags, updateFlag, addFlag, removeFlag } = useFeatureFlags();
  const [newFlag, setNewFlag] = useState<Partial<FeatureFlag>>({
    name: '',
    description: '',
    enabled: false,
    rolloutPercentage: 0,
    targetAudience: 'all'
  });

  const handleAddFlag = () => {
    if (newFlag.name && newFlag.description) {
      const flag: FeatureFlag = {
        id: newFlag.name.toLowerCase().replace(/\s+/g, '-'),
        name: newFlag.name,
        description: newFlag.description,
        enabled: newFlag.enabled || false,
        rolloutPercentage: newFlag.rolloutPercentage || 0,
        targetAudience: newFlag.targetAudience || 'all'
      };
      addFlag(flag);
      setNewFlag({
        name: '',
        description: '',
        enabled: false,
        rolloutPercentage: 0,
        targetAudience: 'all'
      });
    }
  };

  const getStatusColor = (flag: FeatureFlag) => {
    if (!flag.enabled) return 'bg-gray-500';
    if (flag.rolloutPercentage === 100) return 'bg-green-500';
    if (flag.rolloutPercentage > 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const getStatusText = (flag: FeatureFlag) => {
    if (!flag.enabled) return 'Disabled';
    if (flag.rolloutPercentage === 100) return 'Full Rollout';
    if (flag.rolloutPercentage > 50) return 'Major Rollout';
    return 'Limited Rollout';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Flag className="w-8 h-8 mr-3 text-blue-600" />
            Feature Flags Administration
          </h1>
          <p className="text-gray-600 mt-1">Manage A/B testing and feature rollouts</p>
        </div>
        <Badge variant="outline" className="bg-blue-100 text-blue-800">
          {Object.keys(flags).length} Flags Active
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="manage">Manage Flags</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(flags).map((flag) => (
              <Card key={flag.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{flag.name}</CardTitle>
                    <Badge className={`${getStatusColor(flag)} text-white`}>
                      {getStatusText(flag)}
                    </Badge>
                  </div>
                  <CardDescription>{flag.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Enabled</Label>
                    <Switch
                      checked={flag.enabled}
                      onCheckedChange={(checked) => updateFlag(flag.id, { enabled: checked })}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Rollout: {flag.rolloutPercentage}%</Label>
                    </div>
                    <Slider
                      value={[flag.rolloutPercentage]}
                      onValueChange={([value]) => updateFlag(flag.id, { rolloutPercentage: value })}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Target: {flag.targetAudience}</span>
                    {flag.variant && <span>Variant: {flag.variant}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Feature Flag
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Flag Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., New Dashboard Design"
                    value={newFlag.name || ''}
                    onChange={(e) => setNewFlag({ ...newFlag, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select
                    value={newFlag.targetAudience}
                    onValueChange={(value) => setNewFlag({ ...newFlag, targetAudience: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="educators">Educators</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Describe what this feature flag controls"
                  value={newFlag.description || ''}
                  onChange={(e) => setNewFlag({ ...newFlag, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newFlag.enabled || false}
                    onCheckedChange={(checked) => setNewFlag({ ...newFlag, enabled: checked })}
                  />
                  <Label>Start Enabled</Label>
                </div>
                <Button onClick={handleAddFlag} disabled={!newFlag.name || !newFlag.description}>
                  Add Flag
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Flags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.values(flags).map((flag) => (
                  <div key={flag.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{flag.name}</h3>
                      <p className="text-sm text-gray-600">{flag.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant={flag.enabled ? "default" : "secondary"}>
                          {flag.enabled ? "Enabled" : "Disabled"}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {flag.rolloutPercentage}% rollout
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFlag(flag.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Feature Flag Analytics
              </CardTitle>
              <CardDescription>
                Monitor feature flag performance and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {Object.values(flags).filter(f => f.enabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Active Flags</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(flags).filter(f => f.rolloutPercentage === 100).length}
                  </div>
                  <div className="text-sm text-gray-600">Full Rollouts</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {Object.values(flags).filter(f => f.rolloutPercentage > 0 && f.rolloutPercentage < 100).length}
                  </div>
                  <div className="text-sm text-gray-600">A/B Tests</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    {Object.values(flags).filter(f => !f.enabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Disabled</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Analytics Integration Ready</h4>
                <p className="text-sm text-blue-700">
                  This system is ready for integration with Azure Application Insights, Google Analytics, 
                  or your preferred analytics platform to track feature usage and conversion rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FeatureFlagsAdmin;
