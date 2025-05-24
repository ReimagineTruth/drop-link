
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePaymentRetry } from '@/hooks/usePaymentRetry';
import { usePaymentAnalytics } from '@/hooks/usePaymentAnalytics';
import PaymentErrorHandler from './PaymentErrorHandler';
import { createPiPayment } from '@/services/piPaymentService';
import { useUser } from '@/context/UserContext';
import { Pi, Shield, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface EnhancedPiPaymentProps {
  amount: number;
  memo: string;
  metadata?: Record<string, any>;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  children?: React.ReactNode;
}

const EnhancedPiPayment = ({ 
  amount, 
  memo, 
  metadata = {}, 
  onSuccess, 
  onError, 
  children 
}: EnhancedPiPaymentProps) => {
  const [paymentError, setPaymentError] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useUser();
  const { trackPaymentEvent } = usePaymentAnalytics();
  
  const { retryPayment, isRetrying, currentAttempt, maxRetries } = usePaymentRetry({
    maxRetries: 3,
    retryDelay: 2000,
    exponentialBackoff: true
  });

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a payment",
        variant: "destructive",
      });
      return;
    }

    setPaymentError(null);
    setIsProcessing(true);

    const paymentFunction = async () => {
      // Track payment initiation
      await trackPaymentEvent({
        event_type: 'payment_initiated',
        amount,
        currency: 'Pi',
        metadata
      });

      const paymentData = {
        amount,
        memo,
        metadata: {
          ...metadata,
          user_id: user.id,
          timestamp: new Date().toISOString()
        }
      };

      return await createPiPayment(paymentData, user);
    };

    try {
      await retryPayment(
        paymentFunction,
        async (result) => {
          // Track successful payment
          await trackPaymentEvent({
            event_type: 'payment_completed',
            amount,
            currency: 'Pi',
            payment_id: result?.paymentId,
            metadata
          });
          
          toast({
            title: "Payment Successful",
            description: `Successfully paid ${amount}π`,
          });
          
          onSuccess?.(result);
          setIsProcessing(false);
        },
        async (error) => {
          // Track failed payment
          await trackPaymentEvent({
            event_type: 'payment_failed',
            amount,
            currency: 'Pi',
            error_message: error instanceof Error ? error.message : 'Unknown error',
            metadata
          });

          // Categorize error for better UX
          const categorizedError = categorizePaymentError(error);
          setPaymentError(categorizedError);
          onError?.(error);
          setIsProcessing(false);
        }
      );
    } catch (error) {
      const categorizedError = categorizePaymentError(error);
      setPaymentError(categorizedError);
      setIsProcessing(false);
    }
  };

  const categorizePaymentError = (error: any) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const lowerMessage = errorMessage.toLowerCase();

    if (lowerMessage.includes('insufficient') || lowerMessage.includes('balance')) {
      return {
        code: 'INSUFFICIENT_BALANCE',
        message: 'Insufficient Pi balance',
        details: errorMessage,
        recoverable: false
      };
    }

    if (lowerMessage.includes('network') || lowerMessage.includes('connection')) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection error',
        details: errorMessage,
        recoverable: true
      };
    }

    if (lowerMessage.includes('cancelled') || lowerMessage.includes('cancel')) {
      return {
        code: 'PAYMENT_CANCELLED',
        message: 'Payment was cancelled',
        details: errorMessage,
        recoverable: true
      };
    }

    if (lowerMessage.includes('browser') || lowerMessage.includes('pi browser')) {
      return {
        code: 'PI_BROWSER_REQUIRED',
        message: 'Pi Browser is required for payments',
        details: errorMessage,
        recoverable: false
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unexpected error occurred',
      details: errorMessage,
      recoverable: true
    };
  };

  const handleRetry = () => {
    setPaymentError(null);
    handlePayment();
  };

  const handleCancel = () => {
    setPaymentError(null);
    setIsProcessing(false);
  };

  if (paymentError) {
    return (
      <PaymentErrorHandler
        error={paymentError}
        onRetry={paymentError.recoverable ? handleRetry : undefined}
        onCancel={handleCancel}
        isRetrying={isRetrying}
      />
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pi className="h-6 w-6 text-yellow-600" />
          Pi Payment
        </CardTitle>
        <CardDescription>
          Secure payment powered by Pi Network
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600">
            {amount}π
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {memo}
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Secure
          </div>
          <div className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            Instant
          </div>
        </div>

        {children || (
          <Button
            onClick={handlePayment}
            disabled={isProcessing || isRetrying}
            className="w-full"
            size="lg"
          >
            {isRetrying ? (
              <>
                Retrying... ({currentAttempt}/{maxRetries})
              </>
            ) : isProcessing ? (
              'Processing Payment...'
            ) : (
              `Pay ${amount}π`
            )}
          </Button>
        )}

        {(isProcessing || isRetrying) && (
          <div className="text-center text-sm text-muted-foreground">
            <div className="animate-pulse">
              Processing your payment securely...
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedPiPayment;
