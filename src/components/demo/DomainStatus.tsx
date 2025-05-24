
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Lock } from "lucide-react";

interface DomainStatusProps {
  canUsePiDomain: boolean;
}

const DomainStatus = ({ canUsePiDomain }: DomainStatusProps) => {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <Card className={`border-2 ${canUsePiDomain ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-3">
            {canUsePiDomain ? (
              <>
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div className="text-center">
                  <p className="font-bold text-green-800">✅ Pi Domain Connected</p>
                  <p className="text-sm text-green-600">
                    <span className="font-mono font-bold">alexcrypto.pi</span> → <span className="font-mono">droplink.space/@alexcrypto</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <Lock className="w-6 h-6 text-red-600" />
                <div className="text-center">
                  <p className="font-bold text-red-800">❌ Pi Domain Unavailable</p>
                  <p className="text-sm text-red-600">Upgrade to any paid plan to connect your .pi domain</p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainStatus;
