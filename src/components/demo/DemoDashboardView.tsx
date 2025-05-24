
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings, BarChart3 } from "lucide-react";

const DemoDashboardView = () => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Demo Pioneer!</p>
      </div>
      
      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">1,247</p>
            <p className="text-xs text-gray-500">Total Visitors</p>
            <p className="text-xs text-green-500">↑ 12% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">856</p>
            <p className="text-xs text-gray-500">Link Clicks</p>
            <p className="text-xs text-green-500">↑ 8% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">42π</p>
            <p className="text-xs text-gray-500">Pi Tips Earned</p>
            <p className="text-xs text-green-500">↑ 15% this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">5</p>
            <p className="text-xs text-gray-500">Active Links</p>
            <p className="text-xs text-gray-400">Manage →</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Quick Actions</h2>
        <div className="space-y-2">
          <Button className="w-full justify-start" variant="outline">
            <Plus size={16} className="mr-2" />
            Add New Link
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <Settings size={16} className="mr-2" />
            Customize Theme
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <BarChart3 size={16} className="mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="p-4">
        <h2 className="font-semibold mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {[
            "New tip received: 1π from @pioneer123",
            "Link clicked: Pi Network Guide",
            "New follower: @crypto_enthusiast",
            "Profile updated successfully"
          ].map((activity, index) => (
            <div key={index} className="text-sm p-2 bg-white rounded border-l-4 border-blue-500">
              {activity}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemoDashboardView;
