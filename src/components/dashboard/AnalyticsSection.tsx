
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@/context/UserContext";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { Lock, BarChart3, TrendingUp, Users, Globe } from "lucide-react";

interface AnalyticsSectionProps {
  subscription: any;
}

const AnalyticsSection = ({ subscription }: AnalyticsSectionProps) => {
  const { isAdmin } = useUser();
  const { permissions, plan } = useUserPermissions();
  
  // Check if user has any analytics access
  const hasBasicAnalytics = permissions.basicAnalytics;
  const hasPerformanceAnalytics = permissions.performanceAnalytics;
  const hasLocationAnalytics = permissions.locationAnalytics;

  if (!hasBasicAnalytics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Analytics & Insights
          </CardTitle>
          <CardDescription>
            Upgrade to Starter to access basic analytics and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-6 rounded-lg text-center">
            <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="font-medium mb-2">Analytics Locked</h3>
            <p className="text-gray-600 mb-4">Get insights into your profile performance</p>
            <ul className="text-sm text-gray-600 mb-4 space-y-1">
              <li>• View total clicks and visitors</li>
              <li>• Track link performance</li>
              <li>• Monitor engagement trends</li>
            </ul>
            <Link to="/pricing">
              <Button className="bg-gradient-hero hover:bg-secondary">
                Upgrade to Starter (8π/month)
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Analytics & Insights
          {plan === 'starter' && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Basic</span>}
          {hasPerformanceAnalytics && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Advanced</span>}
        </CardTitle>
        <CardDescription>
          Track detailed performance metrics of your page and links
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Basic Analytics - Available for Starter+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-blue-900">Total Visitors</h3>
              </div>
              <p className="text-2xl font-bold text-blue-600">1,247</p>
              <p className="text-xs text-green-600">↑ 12% this week</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <h3 className="font-medium text-purple-900">Link Clicks</h3>
              </div>
              <p className="text-2xl font-bold text-purple-600">856</p>
              <p className="text-xs text-green-600">↑ 8% this week</p>
            </div>
          </div>

          {/* Performance Analytics - Pro+ */}
          {hasPerformanceAnalytics ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-900 mb-1">Top Referrers</h3>
                <ol className="list-decimal pl-5 text-sm text-green-700">
                  <li>Direct visits (45%)</li>
                  <li>Instagram (25%)</li>
                  <li>Pi Browser (20%)</li>
                </ol>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-1">Device Types</h3>
                <ol className="list-decimal pl-5 text-sm text-orange-700">
                  <li>Mobile (78%)</li>
                  <li>Desktop (18%)</li>
                  <li>Tablet (4%)</li>
                </ol>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-medium text-indigo-900 mb-1">Peak Hours</h3>
                <ol className="list-decimal pl-5 text-sm text-indigo-700">
                  <li>2PM - 4PM</li>
                  <li>7PM - 9PM</li>
                  <li>10AM - 12PM</li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-blue-900">Performance Analytics</h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Pro Feature</span>
              </div>
              <p className="text-sm text-blue-700 mb-3">Get detailed insights into referrers, devices, and engagement patterns</p>
              <Link to="/pricing">
                <Button size="sm" className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro (12π/month)
                </Button>
              </Link>
            </div>
          )}

          {/* Location Analytics - Pro+ */}
          {hasLocationAnalytics ? (
            <div className="bg-emerald-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <h3 className="font-medium text-emerald-900">Top Locations</h3>
              </div>
              <ol className="list-decimal pl-5 text-sm text-emerald-700">
                <li>United States (35%)</li>
                <li>United Kingdom (18%)</li>
                <li>Germany (12%)</li>
                <li>Canada (10%)</li>
              </ol>
            </div>
          ) : (
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-emerald-600" />
                <Globe className="w-4 h-4 text-emerald-600" />
                <h3 className="font-medium text-emerald-900">Location Analytics</h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded">Pro Feature</span>
              </div>
              <p className="text-sm text-emerald-700">See where your visitors are coming from around the world</p>
            </div>
          )}
          
          {/* Export Report - Premium */}
          <div className="border border-blue-200 p-6 rounded-lg flex justify-center items-center">
            <div className="text-center">
              <p className="text-gray-500 mb-2">Detailed charts and reports</p>
              {permissions.hasDataExport ? (
                <Button variant="outline">Export Report</Button>
              ) : (
                <div className="space-y-2">
                  <Button variant="outline" disabled className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Export Report
                  </Button>
                  <p className="text-xs text-gray-500">Available with Premium plan</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsSection;
