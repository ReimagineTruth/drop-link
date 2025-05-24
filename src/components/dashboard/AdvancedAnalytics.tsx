
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Eye, MousePointerClick, TrendingUp, Users, Globe, Download, Calendar } from "lucide-react";
import FeatureGate from "@/components/FeatureGate";
import { useUserPermissions } from "@/hooks/useUserPermissions";

const AdvancedAnalytics = () => {
  const { permissions } = useUserPermissions();

  const analyticsData = {
    totalViews: 12847,
    totalClicks: 3892,
    clickRate: 30.3,
    uniqueVisitors: 8921,
    topCountries: ["United States", "Canada", "United Kingdom", "Germany", "Australia"],
    topDevices: ["iPhone", "Android", "Desktop", "iPad"],
    topReferrers: ["Instagram", "Twitter", "Direct", "Google"],
    weeklyData: [
      { day: 'Mon', views: 120, clicks: 45 },
      { day: 'Tue', views: 150, clicks: 52 },
      { day: 'Wed', views: 180, clicks: 67 },
      { day: 'Thu', views: 140, clicks: 48 },
      { day: 'Fri', views: 200, clicks: 78 },
      { day: 'Sat', views: 170, clicks: 61 },
      { day: 'Sun', views: 160, clicks: 58 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FeatureGate 
          feature="basicAnalytics" 
          featureName="Basic Analytics"
          fallback={
            <Card className="opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Upgrade for analytics</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Profile Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate 
          feature="basicAnalytics" 
          featureName="Click Analytics"
          fallback={
            <Card className="opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MousePointerClick className="w-4 h-4" />
                  Link Clicks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Upgrade for analytics</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MousePointerClick className="w-4 h-4" />
                Link Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.totalClicks.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last week</p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate 
          feature="performanceAnalytics" 
          featureName="Performance Analytics"
          fallback={
            <Card className="opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Click Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Pro feature</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Click Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.clickRate}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last week</p>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate 
          feature="locationAnalytics" 
          featureName="Unique Visitors"
          fallback={
            <Card className="opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Unique Visitors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">--</div>
                <p className="text-xs text-muted-foreground">Pro feature</p>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureGate 
          feature="performanceAnalytics" 
          featureName="Weekly Performance"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Weekly Performance
                </CardTitle>
                <CardDescription>
                  Detailed analytics and charts
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8">
                <div className="text-gray-400 mb-4">
                  <BarChart3 className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="font-medium mb-2">Performance Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get detailed insights about your link performance
                </p>
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Weekly Performance
              </CardTitle>
              <CardDescription>
                Views and clicks over the last 7 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.weeklyData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{day.day}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-blue-500" />
                        <span className="text-sm">{day.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MousePointerClick className="w-3 h-3 text-green-500" />
                        <span className="text-sm">{day.clicks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FeatureGate>

        <FeatureGate 
          feature="locationAnalytics" 
          featureName="Geographic Analytics"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Geographic Data
                </CardTitle>
                <CardDescription>
                  See where your visitors come from
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center p-8">
                <div className="text-gray-400 mb-4">
                  <Globe className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="font-medium mb-2">Geographic Analytics</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Track visitor locations and demographics
                </p>
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro
                </Button>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Top Countries
              </CardTitle>
              <CardDescription>
                Countries with most visitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topCountries.map((country, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{country}</span>
                    <span className="text-xs text-gray-500">
                      {Math.floor(Math.random() * 30 + 10)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>

      {/* Export and Advanced Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FeatureGate 
          feature="hasDataExport" 
          featureName="Data Export"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Export Data
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Export your analytics data
                </p>
                <Button disabled className="w-full">
                  Premium Feature
                </Button>
              </CardContent>
            </Card>
          }
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                Download detailed analytics reports
              </p>
              <Button className="w-full">
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </FeatureGate>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Date Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Customize analytics period
            </p>
            <Button variant="outline" className="w-full">
              Last 30 Days
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Growth Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+24%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedAnalytics;
