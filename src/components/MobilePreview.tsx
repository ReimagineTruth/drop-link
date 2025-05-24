
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Heart, Users, BarChart3 } from "lucide-react";

const MobilePreview = () => {
  const navigate = useNavigate();
  const { profile, isLoggedIn } = useUser();
  
  // Username from profile or demo username if not logged in
  const displayUsername = profile?.username || "pioneer";
  
  const handleProfileClick = () => {
    if (isLoggedIn && profile) {
      navigate(`/u/${profile.username}`);
    } else {
      navigate('/signup');
    }
  };
  
  const handleLinkClick = (linkTitle: string) => {
    // Demo interaction
    console.log(`Clicked on ${linkTitle}`);
  };
  
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Your Droplink Profile</h2>
        <p className="text-lg mb-12 max-w-2xl mx-auto">
          One elegant page to showcase your links, products, and Pi earnings.
        </p>
        
        <div className="flex justify-center">
          <div className="w-80 bg-white rounded-3xl shadow-2xl p-6 border relative">
            {/* Profile Header */}
            <div className="text-center mb-6">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src={profile?.avatar_url || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`} />
                <AvatarFallback className="bg-blue-500 text-white text-2xl font-bold">
                  {displayUsername.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">@{displayUsername}</h2>
              <h3 className="text-lg font-semibold text-gray-800 mt-1">
                {profile?.display_name || "Digital Creator"}
              </h3>
              <p className="text-gray-600 mt-2 text-sm leading-relaxed">Pi Network Enthusiast</p>
              <p className="text-gray-500 mt-2 text-xs leading-relaxed">
                {profile?.bio || "Sharing Pi Network updates and tutorials 🚀 Support my work with Pi tips!"}
              </p>
              
              {/* Stats Row */}
              <div className="flex justify-around mt-4 text-center">
                <div>
                  <p className="font-bold text-lg text-blue-600">247.8π</p>
                  <p className="text-xs text-gray-500">Total Earned</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-green-600">89</p>
                  <p className="text-xs text-gray-500">Supporters</p>
                </div>
                <div>
                  <p className="font-bold text-lg text-purple-600">56</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
              </div>
              
              <Badge className="bg-blue-500 text-white mt-3">
                <span className="w-4 h-4">🛒</span>
                Pro Plan
              </Badge>
            </div>

            {/* Template Preview */}
            <div className="mb-4">
              <div className="text-center mb-3">
                <h4 className="text-sm font-semibold text-gray-700">✨ Template Previews</h4>
                <p className="text-xs text-gray-500">Choose from 66 premium templates</p>
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

            {/* Content & Products */}
            <div className="space-y-3">
              {[
                { 
                  title: "☕ Buy me coffee", 
                  amount: "1π", 
                  description: "Support my daily content creation", 
                  type: "tip",
                  icon: "☕"
                },
                { 
                  title: "🎓 Complete Pi Network Course", 
                  price: "15π", 
                  description: "Master Pi Network from basics to advanced strategies",
                  sales: "89 sales",
                  type: "course",
                  icon: "🎓"
                },
                { 
                  title: "📺 Free Pi Tutorial Series", 
                  url: "https://youtube.com", 
                  icon: "🎥", 
                  description: "Weekly Pi Network tutorials",
                  type: "free"
                },
                { 
                  title: "💬 Join My Discord", 
                  url: "https://discord.gg", 
                  icon: "💬", 
                  description: "Connect with other Pi pioneers",
                  type: "free"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`w-full p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    item.type === 'tip'
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 hover:shadow-md' 
                      : item.type === 'course'
                      ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 hover:shadow-md'
                      : item.type === 'free'
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border-green-200 hover:shadow-md'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    if (item.type === 'tip' || item.type === 'course') {
                      handleLinkClick(item.title);
                    } else if (item.type === 'free') {
                      handleProfileClick();
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
            </div>

            {/* CTA Section */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleProfileClick}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg w-full"
              >
                {isLoggedIn ? "View Your Profile" : "Create Your Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobilePreview;
