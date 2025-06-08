
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users, TrendingUp, Shield, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';

const EquityDashboard = () => {
  const { getNotificationsByCategory } = useNotifications();

  const equityMetrics = {
    genderBalance: { current: 65, target: 50, trend: 'improving' },
    economicDiversity: { current: 78, target: 80, trend: 'stable' },
    geographicInclusion: { current: 82, target: 85, trend: 'improving' },
    accessibilityCompliance: { current: 94, target: 95, trend: 'excellent' }
  };

  const biasAlerts = getNotificationsByCategory('bias-detection');
  const fairnessUpdates = getNotificationsByCategory('fairness');

  const getStatusColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 95) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (current: number, target: number) => {
    const percentage = (current / target) * 100;
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Equity & Fairness Dashboard</h2>
        <p className="text-gray-600 mt-1">Real-time monitoring of fairness metrics and bias detection</p>
      </div>

      {/* Equity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              Gender Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {equityMetrics.genderBalance.current}%
                </span>
                <Badge variant="outline" className="text-green-600">
                  Improving
                </Badge>
              </div>
              <Progress 
                value={equityMetrics.genderBalance.current} 
                className="h-2"
              />
              <p className="text-xs text-gray-600">
                Target: {equityMetrics.genderBalance.target}% (balanced representation)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-purple-600" />
              Economic Diversity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {equityMetrics.economicDiversity.current}%
                </span>
                <Badge variant="outline" className="text-yellow-600">
                  Stable
                </Badge>
              </div>
              <Progress 
                value={equityMetrics.economicDiversity.current} 
                className="h-2"
              />
              <p className="text-xs text-gray-600">
                Target: {equityMetrics.economicDiversity.target}% (income diversity)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Shield className="w-4 h-4 mr-2 text-green-600" />
              Geographic Inclusion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {equityMetrics.geographicInclusion.current}%
                </span>
                <Badge variant="outline" className="text-green-600">
                  Improving
                </Badge>
              </div>
              <Progress 
                value={equityMetrics.geographicInclusion.current} 
                className="h-2"
              />
              <p className="text-xs text-gray-600">
                Target: {equityMetrics.geographicInclusion.target}% (rural representation)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="w-4 h-4 mr-2 text-indigo-600" />
              Accessibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {equityMetrics.accessibilityCompliance.current}%
                </span>
                <Badge variant="outline" className="text-green-600">
                  Excellent
                </Badge>
              </div>
              <Progress 
                value={equityMetrics.accessibilityCompliance.current} 
                className="h-2"
              />
              <p className="text-xs text-gray-600">
                Target: {equityMetrics.accessibilityCompliance.target}% (WCAG compliance)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bias Alerts */}
      {biasAlerts.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center text-red-700">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Active Bias Alerts
            </CardTitle>
            <CardDescription>
              AI-detected potential bias requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {biasAlerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-red-900">{alert.title}</h4>
                    <p className="text-sm text-red-700 mt-1">{alert.message}</p>
                    {alert.metadata?.biasScore && (
                      <div className="mt-2">
                        <span className="text-xs text-red-600">
                          Bias Score: {(alert.metadata.biasScore * 100).toFixed(1)}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fairness Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
            Active Fairness Initiatives
          </CardTitle>
          <CardDescription>
            Current programs promoting equity and inclusion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">STEM Gender Initiative</h4>
              <p className="text-sm text-blue-700 mt-1">
                Targeted support and mentorship for female students in STEM pathways
              </p>
              <Badge className="mt-2 bg-blue-100 text-blue-800">Active</Badge>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">Rural Access Program</h4>
              <p className="text-sm text-green-700 mt-1">
                Enhanced support for students from rural and underserved areas
              </p>
              <Badge className="mt-2 bg-green-100 text-green-800">Expanding</Badge>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">Accessibility Enhancement</h4>
              <p className="text-sm text-purple-700 mt-1">
                Continuous improvement of platform accessibility features
              </p>
              <Badge className="mt-2 bg-purple-100 text-purple-800">Ongoing</Badge>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900">Economic Support Tracking</h4>
              <p className="text-sm text-orange-700 mt-1">
                Real-time monitoring of financial aid distribution equity
              </p>
              <Badge className="mt-2 bg-orange-100 text-orange-800">Monitoring</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquityDashboard;
