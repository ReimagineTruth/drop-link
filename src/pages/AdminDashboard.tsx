
import { useState, useEffect } from "react";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, TrendingUp, DollarSign, Globe, Calendar, Activity, 
  Crown, Star, Zap, CheckCircle, AlertCircle, UserCheck,
  Database, Settings, BarChart3, PieChart as PieChartIcon
} from "lucide-react";
import { useAdminStatus } from "@/hooks/useAdminStatus";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Mock data for comprehensive analytics
const mockUserGrowthData = [
  { month: 'Jan', free: 145, starter: 65, pro: 28, premium: 12, total: 250 },
  { month: 'Feb', free: 167, starter: 78, pro: 35, premium: 18, total: 298 },
  { month: 'Mar', free: 189, starter: 82, pro: 42, premium: 24, total: 337 },
  { month: 'Apr', free: 201, starter: 96, pro: 48, premium: 32, total: 377 },
  { month: 'May', free: 223, starter: 105, pro: 55, premium: 40, total: 423 },
  { month: 'Jun', free: 245, starter: 118, pro: 62, premium: 48, total: 473 }
];

const mockRevenueData = [
  { month: 'Jan', revenue: 450, subscriptions: 105, tips: 125 },
  { month: 'Feb', revenue: 620, subscriptions: 131, tips: 145 },
  { month: 'Mar', revenue: 780, subscriptions: 148, tips: 162 },
  { month: 'Apr', revenue: 920, subscriptions: 176, tips: 189 },
  { month: 'May', revenue: 1100, subscriptions: 200, tips: 210 },
  { month: 'Jun', revenue: 1320, subscriptions: 228, tips: 245 }
];

const mockCountryData = [
  { name: 'United States', users: 1245, percentage: 35 },
  { name: 'Philippines', users: 892, percentage: 25 },
  { name: 'India', users: 645, percentage: 18 },
  { name: 'Brazil', users: 423, percentage: 12 },
  { name: 'Others', users: 350, percentage: 10 }
];

const mockDomainData = [
  { type: '.pi domains', count: 234, color: '#8b5cf6' },
  { type: 'Custom domains', count: 89, color: '#3b82f6' },
  { type: 'Subdomain only', count: 1250, color: '#10b981' }
];

const AdminDashboard = () => {
  const { isAdmin, isLoading } = useAdminStatus();
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  const totalUsers = 3555;
  const totalRevenue = 15420;
  const activeSubscriptions = 1283;
  const piDomains = 234;
  const customDomains = 89;
  const monthlyGrowth = 18.5;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="max-w-md">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Access Denied</h2>
              <p className="text-gray-600">You need admin privileges to access this dashboard.</p>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Comprehensive analytics and user management</p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-3xl font-bold">{totalUsers.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +{monthlyGrowth}% this month
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-3xl font-bold">{totalRevenue.toLocaleString()}π</p>
                    <p className="text-sm text-green-600 mt-1">
                      +24% this month
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                    <p className="text-3xl font-bold">{activeSubscriptions.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-1">
                      +15% this month
                    </p>
                  </div>
                  <Crown className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pi Domains</p>
                    <p className="text-3xl font-bold">{piDomains}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      {customDomains} custom domains
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Analytics */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="geography">Geography</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Growth Trend</CardTitle>
                    <CardDescription>Monthly user acquisition by plan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockUserGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="premium" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" />
                          <Area type="monotone" dataKey="pro" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                          <Area type="monotone" dataKey="starter" stackId="1" stroke="#10b981" fill="#10b981" />
                          <Area type="monotone" dataKey="free" stackId="1" stroke="#6b7280" fill="#6b7280" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Monthly revenue breakdown</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={mockRevenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => `${value}π`} />
                          <Legend />
                          <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} name="Total Revenue" />
                          <Line type="monotone" dataKey="subscriptions" stroke="#3b82f6" strokeWidth={2} name="Subscriptions" />
                          <Line type="monotone" dataKey="tips" stroke="#10b981" strokeWidth={2} name="Tips" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Subscription Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                          <span className="text-sm">Free</span>
                        </div>
                        <span className="text-sm font-medium">2,045 (58%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span className="text-sm">Starter</span>
                        </div>
                        <span className="text-sm font-medium">544 (15%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span className="text-sm">Pro</span>
                        </div>
                        <span className="text-sm font-medium">270 (8%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-sm">Premium</span>
                        </div>
                        <span className="text-sm font-medium">156 (4%)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Daily Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">New Signups</span>
                        <span className="font-medium">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Active Users</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">New Subscriptions</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Pi Domains Created</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">System Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">API Status</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Healthy
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Database</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Optimal
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pi Network</span>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="geography" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Users by Country</CardTitle>
                  <CardDescription>Geographic distribution of user base</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockCountryData.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-6 bg-gray-200 rounded"></div>
                          <span className="font-medium">{country.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${country.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium w-16 text-right">
                            {country.users.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-600 w-12 text-right">
                            {country.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="domains" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Domain Distribution</CardTitle>
                    <CardDescription>How users are accessing their profiles</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockDomainData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {mockDomainData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Domain Statistics</CardTitle>
                    <CardDescription>Detailed breakdown of domain usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Pi Domains (.pi)</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Registered</span>
                          <span className="font-medium">{piDomains}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Active This Month</span>
                          <span className="font-medium">187</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Most Popular</span>
                          <span className="font-medium">crypto.pi</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Custom Domains</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Connected</span>
                          <span className="font-medium">{customDomains}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Verified</span>
                          <span className="font-medium">76</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">SSL Enabled</span>
                          <span className="font-medium">89</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
