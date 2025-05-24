
import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

interface PaymentRetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  exponentialBackoff?: boolean;
}

interface PaymentAttempt {
  attemptNumber: number;
  timestamp: Date;
  error?: string;
  success: boolean;
}

export const usePaymentRetry = (options: PaymentRetryOptions = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 2000,
    exponentialBackoff = true
  } = options;

  const [isRetrying, setIsRetrying] = useState(false);
  const [attempts, setAttempts] = useState<PaymentAttempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);

  const calculateDelay = useCallback((attempt: number) => {
    if (!exponentialBackoff) return retryDelay;
    return retryDelay * Math.pow(2, attempt - 1);
  }, [retryDelay, exponentialBackoff]);

  const retryPayment = useCallback(async (
    paymentFunction: () => Promise<any>,
    onSuccess?: (result: any) => void,
    onFinalFailure?: (error: any) => void
  ) => {
    setIsRetrying(true);
    setCurrentAttempt(0);
    setAttempts([]);

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      setCurrentAttempt(attempt);
      
      try {
        console.log(`Payment attempt ${attempt}/${maxRetries}`);
        
        const result = await paymentFunction();
        
        const successAttempt: PaymentAttempt = {
          attemptNumber: attempt,
          timestamp: new Date(),
          success: true
        };
        
        setAttempts(prev => [...prev, successAttempt]);
        setIsRetrying(false);
        
        toast({
          title: "Payment Successful",
          description: attempt > 1 ? `Succeeded on attempt ${attempt}` : "Payment completed successfully",
        });
        
        onSuccess?.(result);
        return result;
        
      } catch (error) {
        const failedAttempt: PaymentAttempt = {
          attemptNumber: attempt,
          timestamp: new Date(),
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        };
        
        setAttempts(prev => [...prev, failedAttempt]);
        
        if (attempt < maxRetries) {
          const delay = calculateDelay(attempt);
          console.log(`Payment attempt ${attempt} failed, retrying in ${delay}ms...`);
          
          toast({
            title: "Payment Failed",
            description: `Attempt ${attempt}/${maxRetries} failed. Retrying in ${delay/1000}s...`,
            variant: "destructive",
          });
          
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error(`Payment failed after ${maxRetries} attempts:`, error);
          setIsRetrying(false);
          
          toast({
            title: "Payment Failed",
            description: `Payment failed after ${maxRetries} attempts. Please try again later.`,
            variant: "destructive",
          });
          
          onFinalFailure?.(error);
          throw error;
        }
      }
    }
  }, [maxRetries, calculateDelay]);

  return {
    retryPayment,
    isRetrying,
    currentAttempt,
    attempts,
    maxRetries
  };
};
