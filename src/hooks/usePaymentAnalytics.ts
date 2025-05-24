
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUser } from '@/context/UserContext';

interface PaymentAnalytics {
  totalTransactions: number;
  successfulPayments: number;
  failedPayments: number;
  totalAmount: number;
  averageAmount: number;
  successRate: number;
  recentPayments: any[];
}

interface PaymentEvent {
  event_type: 'payment_initiated' | 'payment_completed' | 'payment_failed' | 'payment_cancelled';
  amount?: number;
  currency?: string;
  payment_id?: string;
  error_message?: string;
  metadata?: Record<string, any>;
}

export const usePaymentAnalytics = () => {
  const [analytics, setAnalytics] = useState<PaymentAnalytics>({
    totalTransactions: 0,
    successfulPayments: 0,
    failedPayments: 0,
    totalAmount: 0,
    averageAmount: 0,
    successRate: 0,
    recentPayments: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  const trackPaymentEvent = async (event: PaymentEvent) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('analytics')
        .insert({
          user_id: user.id,
          custom_data: {
            type: 'payment_event',
            ...event,
            timestamp: new Date().toISOString()
          }
        });

      if (error) {
        console.error('Error tracking payment event:', error);
      } else {
        console.log('Payment event tracked:', event.event_type);
      }
    } catch (error) {
      console.error('Error tracking payment event:', error);
    }
  };

  const fetchAnalytics = async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);

      // Fetch payment data
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (paymentsError) {
        console.error('Error fetching payments:', paymentsError);
        return;
      }

      // Calculate analytics
      const totalTransactions = payments?.length || 0;
      const successfulPayments = payments?.filter(p => p.status === 'completed').length || 0;
      const failedPayments = payments?.filter(p => p.status === 'failed' || p.status === 'cancelled').length || 0;
      const totalAmount = payments?.filter(p => p.status === 'completed').reduce((sum, p) => sum + Number(p.amount), 0) || 0;
      const averageAmount = successfulPayments > 0 ? totalAmount / successfulPayments : 0;
      const successRate = totalTransactions > 0 ? (successfulPayments / totalTransactions) * 100 : 0;

      setAnalytics({
        totalTransactions,
        successfulPayments,
        failedPayments,
        totalAmount,
        averageAmount,
        successRate,
        recentPayments: payments?.slice(0, 10) || []
      });

    } catch (error) {
      console.error('Error fetching payment analytics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [user?.id]);

  return {
    analytics,
    isLoading,
    trackPaymentEvent,
    refreshAnalytics: fetchAnalytics
  };
};
