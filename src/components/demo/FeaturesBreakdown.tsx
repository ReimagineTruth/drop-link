
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Heart, ShoppingCart, BookOpen } from "lucide-react";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

interface FeaturesBreakdownProps {
  selectedPlan: PlanType;
  canUsePiDomain: boolean;
  canSellProducts: boolean;
  canReceiveTips: boolean;
}

const FeaturesBreakdown = ({ selectedPlan, canUsePiDomain, canSellProducts, canReceiveTips }: FeaturesBreakdownProps) => {
  const planFeatures: Record<PlanType, string[]> = {
    free: ['1 Link Only', 'Basic Profile', 'Pi AdNetwork', 'No .pi Domain', 'Shows Droplink Badge', 'No Pi Tips', 'No Product Sales', 'No Templates'],
    starter: ['.pi Domain Connection', 'Unlimited Links', 'Pi Tips', 'Basic Analytics', 'Hide Droplink Badge', '33 Templates'],
    pro: ['.pi Domain Connection', 'Pi Tips & Products', 'Digital Sales', 'Performance Analytics', 'Custom Themes', 'Hide Droplink Badge', '66 Templates', 'Template Previews'],
    premium: ['.pi Domain Connection', 'Pi Payments Pro', 'Priority Support', 'Data Export', 'Whitelabel', 'Hide Droplink Badge', '99 Templates', 'Template Previews', 'Advanced Customization']
  };

  const planIcons: Record<PlanType, JSX.Element> = {
    free: <Lock className="w-4 h-4" />,
    starter: <Heart className="w-4 h-4" />,
    pro: <ShoppingCart className="w-4 h-4" />,
    premium: <BookOpen className="w-4 h-4" />
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {planIcons[selectedPlan]}
            {selectedPlan.charAt(0).toUpperCase() + selectedPlan.slice(1)} Plan Features
          </CardTitle>
          <CardDescription>
            {canUsePiDomain 
              ? "✅ Pi domain connection included" 
              : "❌ Pi domain connection requires paid plan"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3">
            {planFeatures[selectedPlan].map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-2 p-2 rounded ${
                  feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales') || feature.includes('No Templates')
                    ? 'bg-red-50 text-red-700' 
                    : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales') || feature.includes('Templates') || feature.includes('Pi AdNetwork')
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales') || feature.includes('No Templates')
                    ? 'bg-red-500' 
                    : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales') || feature.includes('Templates') || feature.includes('Pi AdNetwork')
                    ? 'bg-green-500' 
                    : 'bg-blue-500'
                }`}></div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Template Showcase for Pro/Premium */}
      {(selectedPlan === 'pro' || selectedPlan === 'premium') && (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-purple-800">Template Gallery</CardTitle>
            <CardDescription className="text-purple-600">
              Access to {selectedPlan === 'premium' ? '99' : '66'} premium templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-purple-700 font-medium">Featured Templates:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "Ocean Professional", category: "Business", preview: "bg-gradient-to-br from-blue-500 to-cyan-500" },
                  { name: "Coral Reef", category: "Creative", preview: "bg-gradient-to-br from-pink-500 to-orange-500" },
                  { name: "Digital Matrix", category: "Tech", preview: "bg-gradient-to-br from-green-500 to-blue-500" },
                  { name: "Corporate Elite", category: "Business", preview: "bg-gradient-to-br from-indigo-600 to-purple-600" }
                ].map((template, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-purple-200">
                    <div className={`w-8 h-8 rounded ${template.preview}`}></div>
                    <div>
                      <p className="text-xs font-medium text-purple-800">{template.name}</p>
                      <p className="text-xs text-purple-600">{template.category}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-3">
                <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  + {selectedPlan === 'premium' ? '95' : '62'} more templates available
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedPlan !== 'free' && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">Real Pi Earnings Example</CardTitle>
            <CardDescription className="text-green-600">Based on actual creator performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Tips received (this month)</span>
                <span className="font-semibold text-green-600">+347.2π</span>
              </div>
              {canSellProducts && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm">Course sales</span>
                    <span className="font-semibold text-green-600">+675.5π</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">eBook sales</span>
                    <span className="font-semibold text-green-600">+225.1π</span>
                  </div>
                </>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Total This Month</span>
                  <span className="font-bold text-lg text-green-600">
                    {canSellProducts ? '1,247.8π' : '347.2π'}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pi AdNetwork info for free plan */}
      {selectedPlan === 'free' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">Pi AdNetwork</CardTitle>
            <CardDescription className="text-blue-600">Earn Pi through advertisements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">📺</div>
                <div>
                  <h4 className="font-semibold text-blue-800">Ad Revenue</h4>
                  <p className="text-sm text-blue-600">Display ads on your profile and earn Pi from views</p>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Estimated monthly earnings</span>
                <span className="font-semibold text-blue-600">5-15π</span>
              </div>
              <div className="bg-blue-100 p-2 rounded text-center">
                <p className="text-xs text-blue-700">Upgrade to remove ads and enable Pi tips & product sales</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Pi Creator Monetization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Pi AdNetwork for free users */}
            <div className={`flex items-start gap-3 ${selectedPlan !== 'free' ? 'opacity-50' : ''}`}>
              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">📺</div>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  Pi AdNetwork
                  {selectedPlan !== 'free' && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Free Plan Only</span>}
                  {selectedPlan === 'free' && <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">Active</span>}
                </h4>
                <p className="text-sm text-gray-600">Earn Pi through ad revenue on your profile</p>
              </div>
            </div>

            <div className={`flex items-start gap-3 ${!canReceiveTips ? 'opacity-50' : ''}`}>
              <div className="bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">💰</div>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  Pi Tips
                  {!canReceiveTips && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Paid Plans Only</span>}
                </h4>
                <p className="text-sm text-gray-600">Supporters can tip you Pi for your content and tutorials</p>
              </div>
            </div>
            
            <div className={`flex items-start gap-3 ${!canSellProducts ? 'opacity-50' : ''}`}>
              <div className="bg-purple-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">🎓</div>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  Digital Products
                  {!canSellProducts && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">Pro+ Plans Only</span>}
                </h4>
                <p className="text-sm text-gray-600">Sell courses, eBooks, and services directly for Pi</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-green-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">📊</div>
              <div>
                <h4 className="font-semibold">Track Performance</h4>
                <p className="text-sm text-gray-600">See your earnings, supporters, and analytics</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesBreakdown;
