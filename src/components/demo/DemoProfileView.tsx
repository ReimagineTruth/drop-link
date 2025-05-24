
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Users, Heart, Calendar, ArrowUpRight, Clock } from "lucide-react";

interface DemoProfileViewProps {
  onTip: (amount: number) => void;
  onLinkClick: (title: string) => void;
  tipAmount: number;
}

const DemoProfileView = ({ onTip, onLinkClick, tipAmount }: DemoProfileViewProps) => {
  return (
    <div className="h-full overflow-y-auto">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative"></div>
      
      {/* Profile Section */}
      <div className="px-4 pb-6 -mt-12 relative z-10">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg mx-auto">
          <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold">Demo Pioneer</h1>
          <p className="text-gray-500 text-sm">@demo.pi</p>
          <p className="text-gray-700 mt-2 text-sm">🚀 Pi Network enthusiast sharing the latest updates and tutorials</p>
          
          <div className="flex justify-center gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => onLinkClick('Follow')}>
              <Users size={14} className="mr-1" />
              Follow
            </Button>
            <Button size="sm" onClick={() => onTip(1)} className="bg-purple-600 hover:bg-purple-700">
              <Heart size={14} className="mr-1" />
              Tip 1π
            </Button>
          </div>
          
          {tipAmount > 0 && (
            <p className="text-sm text-green-600 mt-2">💰 {tipAmount}π earned from tips!</p>
          )}
        </div>
      </div>
      
      {/* Links Section */}
      <div className="px-4 space-y-3 pb-6">
        {[
          { title: "📚 Pi Network Beginner Guide", subtitle: "Everything you need to know", clicks: 1247 },
          { title: "🎥 Latest Pi Update Video", subtitle: "Breaking down the mainnet news", clicks: 856 },
          { title: "💬 Join My Discord", subtitle: "Connect with other Pioneers", clicks: 634 },
          { title: "🔒 Premium Content", subtitle: "Unlock exclusive Pi strategies • 2π", premium: true },
          { title: "☕ Buy Me Coffee", subtitle: "Support my content creation", clicks: 423 }
        ].map((link, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => onLinkClick(link.title)}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{link.title}</p>
                <p className="text-xs text-gray-500">{link.subtitle}</p>
              </div>
              {link.premium ? (
                <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</div>
              ) : (
                <div className="text-xs text-gray-400">{link.clicks} clicks</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DemoProfileView;
