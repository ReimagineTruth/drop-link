
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import PiAdsNetwork from "@/components/PiAdsNetwork";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface MobilePreviewProps {
  selectedPlan: PlanType;
  onTip: (amount: string) => void;
  tipAmount: number;
}

const MobilePreview = ({ selectedPlan, onTip, tipAmount }: MobilePreviewProps) => {
  const planColors: Record<PlanType, string> = {
    free: 'bg-gray-500',
    starter: 'bg-green-500',
    pro: 'bg-blue-500',
    premium: 'bg-purple-500'
  };

  const planIcons: Record<PlanType, JSX.Element> = {
    free: <span className="w-4 h-4">🔒</span>,
    starter: <span className="w-4 h-4">❤️</span>,
    pro: <span className="w-4 h-4">🛒</span>,
    premium: <span className="w-4 h-4">📚</span>
  };

  const demoProfile = {
    username: "alexcrypto",
    displayName: "Alex Chen",
    title: "Pi Network Educator & Course Creator",
    bio: "Teaching Pi Network fundamentals through courses and tutorials 🚀 Support my work with Pi tips!",
    piEarnings: "1,247.8",
    supporters: "89",
    courseSales: "156"
  };

  const getDemoContent = () => {
    // Use type-safe comparison for free plan
    const isFree = selectedPlan === 'free';
    
    if (isFree) {
      return [
        { 
          title: "My Website", 
          url: "https://example.com", 
          icon: "🌐", 
          type: "link"
        }
      ];
    }

    const tipOptions = !isFree ? [
      { title: "☕ Buy me coffee", amount: "1π", description: "Support my daily content creation", type: "tip" },
      { title: "🍕 Buy me lunch", amount: "5π", description: "Fuel my research and tutorials", type: "tip" },
      { title: "💝 Big support", amount: "25π", description: "Help me create premium content", type: "tip" }
    ] : [];

    const digitalProducts = (selectedPlan === 'pro' || selectedPlan === 'premium') ? [
      { 
        title: "🎓 Complete Pi Network Course", 
        price: "15π", 
        description: "Master Pi Network from basics to advanced strategies",
        sales: "89 sales",
        type: "course"
      },
      { 
        title: "📖 Pi Mining Guide eBook", 
        price: "8π", 
        description: "Comprehensive guide to maximizing your Pi earnings",
        sales: "67 sales", 
        type: "ebook"
      },
      { 
        title: "🔮 1-on-1 Pi Consultation", 
        price: "50π", 
        description: "Personal consultation on Pi Network strategies",
        sales: "23 bookings",
        type: "service"
      }
    ] : [];

    const freeContent = [
      { 
        title: "📺 Free Pi Tutorial Series", 
        url: "https://youtube.com/@alexcrypto", 
        icon: "🎥", 
        description: "Weekly Pi Network tutorials",
        type: "free"
      },
      { 
        title: "💬 Join My Discord", 
        url: "https://discord.gg/alexcrypto", 
        icon: "💬", 
        description: "Connect with other Pi pioneers",
        type: "free"
      }
    ];

    return [...tipOptions, ...digitalProducts, ...freeContent];
  };

  const canUsePiDomain = selectedPlan !== 'free';
  const showDroplinkBadge = selectedPlan === 'free';

  return (
    <div className="flex justify-center">
      <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 border relative">
        {/* Profile Header */}
        <div className="text-center mb-6">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
            <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">AC</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{canUsePiDomain ? '@alexcrypto.pi' : '@alexcrypto'}</h2>
          <h3 className="text-lg font-semibold text-gray-800 mt-1">{demoProfile.displayName}</h3>
          <p className="text-gray-600 mt-2 text-sm leading-relaxed">{demoProfile.title}</p>
          <p className="text-gray-500 mt-2 text-xs leading-relaxed">{demoProfile.bio}</p>
          
          {/* Stats Row */}
          <div className="flex justify-around mt-4 text-center">
            <div>
              <p className="font-bold text-lg text-blue-600">{demoProfile.piEarnings}π</p>
              <p className="text-xs text-gray-500">Total Earned</p>
            </div>
            <div>
              <p className="font-bold text-lg text-green-600">{demoProfile.supporters}</p>
              <p className="text-xs text-gray-500">Supporters</p>
            </div>
            <div>
              <p className="font-bold text-lg text-purple-600">{demoProfile.courseSales}</p>
              <p className="text-xs text-gray-500">Sales</p>
            </div>
          </div>
          
          <Badge className={`${planColors[selectedPlan]} text-white mt-3`}>
            {planIcons[selectedPlan]}
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan
          </Badge>

          {tipAmount > 0 && (
            <div className="mt-3 p-2 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800 font-semibold">
                🎉 +{tipAmount}π received in tips!
              </p>
            </div>
          )}
        </div>

        {/* Pi AdNetwork for free plan - Platform ads (revenue goes to platform) */}
        {selectedPlan === 'free' && (
          <div className="mb-4">
            <div className="text-center mb-2">
              <p className="text-xs text-gray-500">Platform Advertisement</p>
            </div>
            <PiAdsNetwork placementId="demo-profile-platform-ad" />
            <div className="text-center mt-1">
              <p className="text-xs text-gray-400">Ad revenue supports platform development</p>
            </div>
          </div>
        )}

        {/* Template Preview for Pro/Premium plans */}
        {(selectedPlan === 'pro' || selectedPlan === 'premium') && (
          <div className="mb-4">
            <div className="text-center mb-3">
              <h4 className="text-sm font-semibold text-gray-700">✨ Template Previews</h4>
              <p className="text-xs text-gray-500">Choose from {selectedPlan === 'premium' ? '99' : '66'} premium templates</p>
            </div>
            <div className="grid grid-cols-5 gap-1 mb-3">
              {[
                { name: "Ocean Pro", bg: "bg-gradient-to-br from-blue-400 to-blue-600" },
                { name: "Coral Reef", bg: "bg-gradient-to-br from-pink-400 to-orange-500" },
                { name: "Digital Matrix", bg: "bg-gradient-to-br from-green-400 to-blue-500" },
                { name: "Corporate Elite", bg: "bg-gradient-to-br from-indigo-500 to-purple-600" },
                { name: "Creative Burst", bg: "bg-gradient-to-br from-purple-500 to-pink-500" }
              ].map((template, index) => (
                <div key={index} className={`${template.bg} rounded-md h-12 flex items-center justify-center transition-transform hover:scale-105 cursor-pointer`}>
                  <span className="text-white text-xs font-bold text-center leading-tight px-1">
                    {template.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Droplink Badge */}
        {showDroplinkBadge && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg rounded-full px-3 py-1 flex items-center gap-1 text-xs">
              <span className="text-gray-600">Made with</span>
              <span className="font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Droplink
              </span>
            </div>
          </div>
        )}

        {/* Content & Products */}
        <div className="space-y-3">
          {getDemoContent().map((item, index) => (
            <div 
              key={index}
              className={`w-full p-3 rounded-lg border-2 transition-all cursor-pointer ${
                item.type === 'tip'
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md' 
                  : item.type === 'course' || item.type === 'ebook' || item.type === 'service'
                  ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md'
                  : item.type === 'free'
                  ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
              onClick={() => {
                if (item.type === 'tip' && 'amount' in item) {
                  onTip(item.amount);
                }
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon || '💎'}</span>
                  <div className="text-left">
                    <span className="font-medium text-sm block">{item.title}</span>
                    {'description' in item && (
                      <span className="text-xs text-gray-600">{item.description}</span>
                    )}
                    {'sales' in item && (
                      <span className="text-xs text-green-600 font-semibold">{item.sales}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {'price' in item && (
                    <span className="font-bold text-purple-600">{item.price}</span>
                  )}
                  {'amount' in item && (
                    <span className="font-bold text-yellow-600">{item.amount}</span>
                  )}
                  {item.type === 'free' && (
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {selectedPlan === 'free' && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 font-medium text-center mb-2">
                🔒 Upgrade to monetize with Pi
              </p>
              <p className="text-xs text-yellow-600 text-center">
                Free plan: 1 link only • Platform ads • No Pi tips • No product sales
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobilePreview;
