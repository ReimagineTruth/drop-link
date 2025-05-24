
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, RefreshCw, ExternalLink, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentError {
  code: string;
  message: string;
  details?: string;
  recoverable: boolean;
}

interface PaymentErrorHandlerProps {
  error: PaymentError | null;
  onRetry?: () => void;
  onCancel?: () => void;
  isRetrying?: boolean;
}

const PaymentErrorHandler = ({ error, onRetry, onCancel, isRetrying }: PaymentErrorHandlerProps) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!error) return null;

  const getErrorSolution = (code: string) => {
    switch (code) {
      case 'INSUFFICIENT_BALANCE':
        return {
          title: 'Insufficient Pi Balance',
          description: 'You don\'t have enough Pi to complete this payment.',
          actions: [
            { label: 'Check Pi Wallet', action: () => window.open('https://minepi.com/wallet', '_blank') },
            { label: 'Mine More Pi', action: () => window.open('https://minepi.com', '_blank') }
          ]
        };
      case 'NETWORK_ERROR':
        return {
          title: 'Network Connection Issue',
          description: 'Unable to connect to Pi Network. Please check your internet connection.',
          actions: [
            { label: 'Retry Payment', action: onRetry },
            { label: 'Check Connection', action: () => toast({ title: 'Check your internet connection and try again.' }) }
          ]
        };
      case 'PAYMENT_CANCELLED':
        return {
          title: 'Payment Cancelled',
          description: 'The payment was cancelled by the user.',
          actions: [
            { label: 'Try Again', action: onRetry }
          ]
        };
      case 'INVALID_AMOUNT':
        return {
          title: 'Invalid Payment Amount',
          description: 'The payment amount is not valid. Please check and try again.',
          actions: [
            { label: 'Retry Payment', action: onRetry }
          ]
        };
      case 'PI_BROWSER_REQUIRED':
        return {
          title: 'Pi Browser Required',
          description: 'Pi payments can only be made through Pi Browser.',
          actions: [
            { label: 'Open in Pi Browser', action: () => window.open('https://minepi.com/download', '_blank') }
          ]
        };
      default:
        return {
          title: 'Payment Error',
          description: 'An unexpected error occurred during payment processing.',
          actions: [
            { label: 'Retry Payment', action: onRetry },
            { label: 'Contact Support', action: () => window.open('/help', '_blank') }
          ]
        };
    }
  };

  const solution = getErrorSolution(error.code);

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-800">
          <AlertTriangle className="h-5 w-5" />
          {solution.title}
        </CardTitle>
        <CardDescription className="text-red-600">
          {solution.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Error:</strong> {error.message}
            {error.details && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="p-0 h-auto text-red-600 hover:text-red-800"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  {showDetails ? 'Hide Details' : 'Show Details'}
                </Button>
                {showDetails && (
                  <div className="mt-2 p-2 bg-red-100 rounded text-sm">
                    {error.details}
                  </div>
                )}
              </div>
            )}
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          {solution.actions.map((action, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              size="sm"
              onClick={action.action}
              disabled={isRetrying}
              className="flex items-center gap-2"
            >
              {action.label === 'Retry Payment' && <RefreshCw className={`h-4 w-4 ${isRetrying ? 'animate-spin' : ''}`} />}
              {action.label.includes('Open') && <ExternalLink className="h-4 w-4" />}
              {action.label}
            </Button>
          ))}
          
          {onCancel && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancel}
              disabled={isRetrying}
            >
              Cancel
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentErrorHandler;
