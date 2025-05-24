
import { useState, useCallback, useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { usePaymentAnalytics } from '@/hooks/usePaymentAnalytics';

interface RetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  exponentialBackoff?: boolean;
  jitterFactor?: number;
}

interface PaymentAttempt {
  attemptNumber: number;
  timestamp: Date;
  error?: string;
  success: boolean;
  duration?: number;
}

interface PaymentError {
  code: string;
  message: string;
  recoverable: boolean;
  retryAfter?: number;
}

export const useEnhancedPaymentRetry = (options: RetryOptions = {}) => {
  const {
    maxRetries = 3,
    baseDelay = 2000,
    maxDelay = 30000,
    exponentialBackoff = true,
    jitterFactor = 0.1
  } = options;

  const [isRetrying, setIsRetrying] = useState(false);
  const [attempts, setAttempts] = useState<PaymentAttempt[]>([]);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const { trackPaymentEvent } = usePaymentAnalytics();
  const abortControllerRef = useRef<AbortController | null>(null);

  const calculateDelay = useCallback((attempt: number, error?: PaymentError) => {
    // If error specifies retry delay, use that
    if (error?.retryAfter) {
      return Math.min(error.retryAfter * 1000, maxDelay);
    }

    let delay = baseDelay;
    
    if (exponentialBackoff) {
      delay = baseDelay * Math.pow(2, attempt - 1);
    }
    
    // Add jitter to prevent thundering herd
    const jitter = delay * jitterFactor * (Math.random() - 0.5);
    delay += jitter;
    
    return Math.min(delay, maxDelay);
  }, [baseDelay, maxDelay, exponentialBackoff, jitterFactor]);

  const categorizeError = (error: any): PaymentError => {
    const errorMessage = error?.message || error?.toString() || 'Unknown error';
    const lowerMessage = errorMessage.toLowerCase();

    if (lowerMessage.includes('insufficient')) {
      return {
        code: 'INSUFFICIENT_BALANCE',
        message: 'Insufficient Pi balance',
        recoverable: false
      };
    }

    if (lowerMessage.includes('network') || lowerMessage.includes('timeout') || lowerMessage.includes('connection')) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network connection error',
        recoverable: true,
        retryAfter: 5
      };
    }

    if (lowerMessage.includes('cancelled') || lowerMessage.includes('canceled')) {
      return {
        code: 'PAYMENT_CANCELLED',
        message: 'Payment was cancelled',
        recoverable: true
      };
    }

    if (lowerMessage.includes('rate limit') || lowerMessage.includes('too many requests')) {
      return {
        code: 'RATE_LIMITED',
        message: 'Too many requests',
        recoverable: true,
        retryAfter: 30
      };
    }

    if (lowerMessage.includes('invalid') || lowerMessage.includes('validation')) {
      return {
        code: 'INVALID_REQUEST',
        message: 'Invalid payment request',
        recoverable: false
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: errorMessage,
      recoverable: true
    };
  };

  const cancelRetry = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsRetrying(false);
    setCurrentAttempt(0);
  }, []);

  const retryPayment = useCallback(async (
    paymentFunction: () => Promise<any>,
    onSuccess?: (result: any) => void,
    onFinalFailure?: (error: PaymentError) => void
  ) => {
    // Cancel any existing retry
    cancelRetry();
    
    setIsRetrying(true);
    setCurrentAttempt(0);
    setAttempts([]);
    
    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    let lastError: PaymentError | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      if (signal.aborted) {
        console.log('Payment retry cancelled by user');
        return;
      }

      setCurrentAttempt(attempt);
      const startTime = Date.now();
      
      try {
        console.log(`Payment attempt ${attempt}/${maxRetries}`);
        
        // Track attempt start
        await trackPaymentEvent({
          event_type: 'payment_initiated',
          metadata: { 
            attempt_number: attempt,
            max_retries: maxRetries 
          }
        });
        
        const result = await paymentFunction();
        const duration = Date.now() - startTime;
        
        const successAttempt: PaymentAttempt = {
          attemptNumber: attempt,
          timestamp: new Date(),
          success: true,
          duration
        };
        
        setAttempts(prev => [...prev, successAttempt]);
        setIsRetrying(false);
        
        // Track success
        await trackPaymentEvent({
          event_type: 'payment_completed',
          metadata: { 
            attempt_number: attempt,
            duration,
            total_attempts: attempt
          }
        });
        
        toast({
          title: "Payment Successful",
          description: attempt > 1 ? 
            `Payment completed on attempt ${attempt}/${maxRetries}` : 
            "Payment completed successfully",
        });
        
        onSuccess?.(result);
        return result;
        
      } catch (error) {
        if (signal.aborted) {
          return;
        }

        const duration = Date.now() - startTime;
        const categorizedError = categorizeError(error);
        lastError = categorizedError;
        
        const failedAttempt: PaymentAttempt = {
          attemptNumber: attempt,
          timestamp: new Date(),
          error: categorizedError.message,
          success: false,
          duration
        };
        
        setAttempts(prev => [...prev, failedAttempt]);
        
        // Track failure
        await trackPaymentEvent({
          event_type: 'payment_failed',
          error_message: categorizedError.message,
          metadata: { 
            attempt_number: attempt,
            error_code: categorizedError.code,
            duration
          }
        });
        
        console.error(`Payment attempt ${attempt} failed:`, categorizedError);
        
        // Don't retry if error is not recoverable
        if (!categorizedError.recoverable) {
          console.log('Error is not recoverable, stopping retries');
          break;
        }
        
        if (attempt < maxRetries) {
          const delay = calculateDelay(attempt, categorizedError);
          console.log(`Retrying payment in ${delay}ms...`);
          
          toast({
            title: "Payment Failed",
            description: `Attempt ${attempt}/${maxRetries} failed. Retrying in ${Math.round(delay/1000)}s...`,
            variant: "destructive",
          });
          
          // Wait for delay or abort signal
          try {
            await new Promise((resolve, reject) => {
              const timeout = setTimeout(resolve, delay);
              signal.addEventListener('abort', () => {
                clearTimeout(timeout);
                reject(new Error('Aborted'));
              });
            });
          } catch {
            // Aborted during delay
            return;
          }
        }
      }
    }
    
    // All attempts failed
    setIsRetrying(false);
    
    if (lastError) {
      console.error(`Payment failed after ${maxRetries} attempts:`, lastError);
      
      toast({
        title: "Payment Failed",
        description: `Payment failed after ${maxRetries} attempts: ${lastError.message}`,
        variant: "destructive",
      });
      
      onFinalFailure?.(lastError);
    }
  }, [maxRetries, calculateDelay, trackPaymentEvent, cancelRetry]);

  return {
    retryPayment,
    cancelRetry,
    isRetrying,
    currentAttempt,
    attempts,
    maxRetries
  };
};
