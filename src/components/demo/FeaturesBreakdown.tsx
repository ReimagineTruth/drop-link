
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
    free: ['1 Link Only', 'Basic Profile', 'Pi AdNetwork', 'No .pi Domain', 'Shows Droplink Badge', 'No Pi Tips', 'No Product Sales'],
    starter: ['.pi Domain Connection', 'Unlimited Links', 'Pi Tips', 'Basic Analytics', 'Hide Droplink Badge'],
    pro: ['.pi Domain Connection', 'Pi Tips & Products', 'Digital Sales', 'Performance Analytics', 'Custom Themes', 'Hide Droplink Badge'],
    premium: ['.pi Domain Connection', 'Pi Payments Pro', 'Priority Support', 'Data Export', 'Whitelabel', 'Hide Droplink Badge']
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
                  feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales')
                    ? 'bg-red-50 text-red-700' 
                    : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales')
                    ? 'bg-green-50 text-green-700' 
                    : 'bg-blue-50 text-blue-700'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  feature.includes('No .pi Domain') || feature.includes('Shows Droplink Badge') || feature.includes('No Pi Tips') || feature.includes('No Product Sales')
                    ? 'bg-red-500' 
                    : feature.includes('.pi Domain') || feature.includes('Pi Tips') || feature.includes('Pi Payments') || feature.includes('Hide Droplink Badge') || feature.includes('Digital Sales')
                    ? 'bg-green-500' 
                    : 'bg-blue-500'
                }`}></div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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

      <Card>
        <CardHeader>
          <CardTitle>Pi Creator Monetization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
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
              <div className="bg-blue-500 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm mt-1">📊</div>
              <div>
                <h4 className="font-semibold">Track Performance</h4>
                <p className="text-sm text-gray-600">See your earnings, supporters, and sales analytics</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeaturesBreakdown;
