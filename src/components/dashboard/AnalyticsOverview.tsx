
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Eye, MousePointerClick, TrendingUp, Users } from "lucide-react";
import FeatureGate from "@/components/FeatureGate";
import { useUserPermissions } from "@/hooks/useUserPermissions";

const AnalyticsOverview = () => {
  const { permissions } = useUserPermissions();

  const analyticsData = {
    totalViews: 1247,
    totalClicks: 389,
    clickRate: 31.2,
    topCountries: ["United States", "Canada", "United Kingdom"],
    recentActivity: [
      { type: "view", time: "2 minutes ago", location: "New York, US" },
      { type: "click", time: "5 minutes ago", link: "Instagram", location: "Toronto, CA" },
      { type: "view", time: "8 minutes ago", location: "London, UK" }
    ]
  };

  return (
    <div className="space-y-6">
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
          featureName="Location Analytics"
          fallback={
            <Card className="opacity-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Top Locations
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
                Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">892</div>
              <p className="text-xs text-muted-foreground">Unique visitors</p>
            </CardContent>
          </Card>
        </FeatureGate>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FeatureGate 
          feature="performanceAnalytics" 
          featureName="Performance Charts"
          fallback={
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Overview
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
                Performance Overview
              </CardTitle>
              <CardDescription>
                Track your link performance over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">This Week</span>
                  <span className="font-medium">+24% views</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <div className="text-xs text-gray-500">
                  Your profile is performing 24% better than last week
                </div>
              </div>
            </CardContent>
          </Card>
        </FeatureGate>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest visits and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeatureGate 
              feature="basicAnalytics" 
              featureName="Activity Feed"
              fallback={
                <div className="text-center p-4">
                  <p className="text-sm text-gray-600">
                    Activity tracking available with Starter plan
                  </p>
                </div>
              }
            >
              <div className="space-y-3">
                {analyticsData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'view' ? 'bg-blue-500' : 'bg-green-500'
                      }`} />
                      <span>{activity.type === 'view' ? 'Profile view' : `${activity.link} click`}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </FeatureGate>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
