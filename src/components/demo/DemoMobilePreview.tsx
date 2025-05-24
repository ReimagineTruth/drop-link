
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import DemoProfileView from "./DemoProfileView";
import DemoDashboardView from "./DemoDashboardView";

interface DemoMobilePreviewProps {
  activeView: 'profile' | 'dashboard';
  setActiveView: (view: 'profile' | 'dashboard') => void;
  onTip: (amount: number) => void;
  onLinkClick: (title: string) => void;
  tipAmount: number;
}

const DemoMobilePreview = ({ 
  activeView, 
  setActiveView, 
  onTip, 
  onLinkClick, 
  tipAmount 
}: DemoMobilePreviewProps) => {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <div className="w-[380px] h-[760px] bg-black rounded-3xl p-2 shadow-2xl">
          <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
            {/* Status Bar */}
            <div className="bg-black text-white text-xs py-2 px-4 flex justify-between items-center">
              <span>9:41</span>
              <span className="font-semibold">demo.pi</span>
              <span>100%</span>
            </div>
            
            {activeView === 'profile' ? (
              <DemoProfileView onTip={onTip} onLinkClick={onLinkClick} tipAmount={tipAmount} />
            ) : (
              <DemoDashboardView />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoMobilePreview;
