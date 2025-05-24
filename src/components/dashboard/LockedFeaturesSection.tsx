
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Crown, Star, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { useUserPermissions } from "@/hooks/useUserPermissions";
import { useUser } from "@/context/UserContext";

const LockedFeaturesSection = () => {
  const { permissions, plan } = useUserPermissions();
  const { isAdmin } = useUser();

  // Don't show locked features for admins
  if (isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-green-600" />
            Admin Access
          </CardTitle>
          <CardDescription>
            You have access to all premium features as an admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-medium">🎉 All features unlocked!</p>
            <p className="text-green-700 text-sm mt-1">
              As an admin, you can test all premium functionality without restrictions.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const lockedFeatures = [
    {
      name: "QR Code Generator",
      description: "Generate QR codes for offline sharing",
      plan: "pro",
      icon: <Zap className="w-5 h-5" />,
      available: permissions.hasQRCode
    },
    {
      name: "Link Scheduling",
      description: "Schedule when your links appear and disappear",
      plan: "pro", 
      icon: <Star className="w-5 h-5" />,
      available: permissions.hasScheduling
    },
    {
      name: "Performance Analytics",
      description: "Advanced visitor insights and detailed reports",
      plan: "pro",
      icon: <Star className="w-5 h-5" />,
      available: permissions.performanceAnalytics
    },
    {
      name: "Custom Button Styles",
      description: "Personalize your button designs and colors",
      plan: "pro",
      icon: <Star className="w-5 h-5" />,
      available: permissions.customButtonStyles
    },
    {
      name: "Pi Payments Integration",
      description: "Sell products and services with Pi cryptocurrency",
      plan: "premium",
      icon: <Crown className="w-5 h-5" />,
      available: permissions.canSellWithPiPayments
    },
    {
      name: "Data Export",
      description: "Export your analytics data for external analysis",
      plan: "premium",
      icon: <Crown className="w-5 h-5" />,
      available: permissions.hasDataExport
    },
    {
      name: "Whitelabel Option",
      description: "Remove Droplink branding from your pages",
      plan: "premium",
      icon: <Crown className="w-5 h-5" />,
      available: permissions.hasWhitelabel
    },
    {
      name: "Priority Support",
      description: "4-hour response time guarantee",
      plan: "premium",
      icon: <Crown className="w-5 h-5" />,
      available: permissions.hasPrioritySupport
    }
  ];

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'pro':
        return 'bg-blue-500';
      case 'premium':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPlanIcon = (planType: string) => {
    switch (planType) {
      case 'pro':
        return <Star className="w-4 h-4" />;
      case 'premium':
        return <Crown className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };

  // Filter features to show only locked ones and some available ones for context
  const featuresToShow = lockedFeatures.filter(feature => {
    // Show locked features and some available ones for context
    return !feature.available || Math.random() > 0.7; // Show some available features randomly
  });

  // If all features are available, show a success message
  if (featuresToShow.filter(f => !f.available).length === 0 && plan !== 'free') {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Premium Features
          </CardTitle>
          <CardDescription>
            You have access to advanced features with your {plan} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-medium">🎉 Great choice!</p>
            <p className="text-green-700 text-sm mt-1">
              You're unlocking powerful features to grow your presence.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Unlock More Features
        </CardTitle>
        <CardDescription>
          Upgrade your plan to access these powerful features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {featuresToShow.slice(0, 6).map((feature, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border-2 ${
                feature.available 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {feature.available ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="font-medium">{feature.name}</h3>
                </div>
                <Badge 
                  className={`${getPlanColor(feature.plan)} text-white text-xs flex items-center gap-1`}
                >
                  {getPlanIcon(feature.plan)}
                  {feature.plan}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
              {feature.available && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  ✓ Available in your plan
                </div>
              )}
            </div>
          ))}
        </div>

        {plan === 'free' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Ready to unlock more?</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to Starter to get unlimited links, analytics, and more premium features
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing">
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Starter (8π/month)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline">
                  View All Features
                </Button>
              </Link>
            </div>
          </div>
        )}

        {plan === 'starter' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Take it to the next level</h3>
            <p className="text-gray-600 mb-4">
              Upgrade to Pro for advanced analytics, QR codes, scheduling, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing">
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Pro (12π/month)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline">
                  Compare Plans
                </Button>
              </Link>
            </div>
          </div>
        )}

        {plan === 'pro' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg mb-2">Go Premium</h3>
            <p className="text-gray-600 mb-4">
              Get the ultimate experience with Pi payments, whitelabel, and priority support
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing">
                <Button className="bg-gradient-hero hover:bg-secondary">
                  Upgrade to Premium (18π/month)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="outline">
                  See Premium Features
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LockedFeaturesSection;
