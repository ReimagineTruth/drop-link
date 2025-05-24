
// Pi Network SDK type declarations
declare global {
  interface Window {
    Pi?: {
      init: (config: { version: string; sandbox?: boolean }) => void;
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound?: (payment: any) => void
      ) => Promise<{
        accessToken: string;
        user: {
          uid: string;
          username?: string;
        };
      }>;
      createPayment: (
        payment: {
          amount: number;
          identifier: string;
          memo?: string;
          metadata?: Record<string, any>;
        },
        callbacks: {
          onReadyForServerApproval: (paymentId: string) => void;
          onReadyForServerCompletion: (paymentId: string, txid: string) => void;
          onCancel: (paymentId: string) => void;
          onError: (error: Error, payment?: any) => void;
        }
      ) => Promise<any>;
    };
  }
}

export {};
