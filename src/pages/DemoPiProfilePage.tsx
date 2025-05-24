
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlanSelector from "@/components/demo/PlanSelector";
import DomainStatus from "@/components/demo/DomainStatus";
import MobilePreview from "@/components/demo/MobilePreview";
import FeaturesBreakdown from "@/components/demo/FeaturesBreakdown";

type PlanType = 'free' | 'starter' | 'pro' | 'premium';

const DemoPiProfilePage = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('pro');
  const [tipAmount, setTipAmount] = useState(0);

  const canUsePiDomain = selectedPlan !== 'free';
  const canReceiveTips = selectedPlan !== 'free';
  const canSellProducts = selectedPlan === 'pro' || selectedPlan === 'premium';

  const handleTip = (amount: string) => {
    const piAmount = parseFloat(amount.replace('π', ''));
    setTipAmount(prev => prev + piAmount);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Live Pi Creator Demo</h1>
            <p className="text-xl text-gray-600 mb-2">
              See how <span className="font-bold text-blue-600">alexcrypto.pi</span> monetizes with Pi tips & digital products
            </p>
            <p className="text-lg text-gray-500 mb-6">
              <span className="bg-yellow-100 px-3 py-1 rounded-full text-yellow-800 font-medium">
                ⚠️ .pi domain + Pi products require paid plans
              </span>
            </p>
            
            <PlanSelector 
              selectedPlan={selectedPlan} 
              onPlanChange={setSelectedPlan} 
            />

            <DomainStatus canUsePiDomain={canUsePiDomain} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MobilePreview 
              selectedPlan={selectedPlan}
              onTip={handleTip}
              tipAmount={tipAmount}
            />

            <FeaturesBreakdown 
              selectedPlan={selectedPlan}
              canUsePiDomain={canUsePiDomain}
              canSellProducts={canSellProducts}
              canReceiveTips={canReceiveTips}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DemoPiProfilePage;
