
import React from 'react';
import { useUserPermissions } from '@/hooks/useUserPermissions';
import UpgradeModal from '@/components/UpgradeModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FeatureGateProps {
  feature: keyof ReturnType<typeof useUserPermissions>['permissions'];
  fallback?: React.ReactNode;
  children: React.ReactNode;
  featureName?: string;
}

const FeatureGate = ({ feature, fallback, children, featureName }: FeatureGateProps) => {
  const { permissions, isDeveloperMode } = useUserPermissions();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const navigate = useNavigate();

  const hasAccess = permissions[feature];

  const handleNavigateToPricing = () => {
    navigate('/pricing');
  };

  // In developer mode, always show children with a developer badge
  if (isDeveloperMode) {
    return (
      <div className="relative">
        {children}
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded z-10">
          🚀 DEV
        </div>
      </div>
    );
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      <div onClick={() => setShowUpgradeModal(true)} className="cursor-pointer">
        <div className="relative">
          <div className="opacity-50 pointer-events-none">
            {children}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg">
            <div className="text-center p-4">
              <div className="text-lg font-semibold text-white mb-2">🔒 Premium Feature</div>
              <div className="text-sm text-white/80">Click to upgrade</div>
            </div>
          </div>
        </div>
      </div>

      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        featureName={featureName || feature.toString()}
        onNavigateToPricing={handleNavigateToPricing}
      />
    </>
  );
};

export default FeatureGate;
