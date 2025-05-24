
import { supabase } from '@/integrations/supabase/client';

export interface AnalyticsEvent {
  event_type: string;
  user_id?: string;
  custom_data?: Record<string, any>;
  timestamp?: string;
}

export interface PaymentAnalytics {
  payment_id: string;
  user_id: string;
  amount: number;
  status: 'initiated' | 'completed' | 'failed' | 'cancelled';
  attempt_number?: number;
  error_code?: string;
  duration_ms?: number;
  metadata?: Record<string, any>;
}

export interface UserAnalytics {
  user_id: string;
  action: 'login' | 'signup' | 'logout' | 'profile_update';
  auth_method?: 'email' | 'pi_network';
  metadata?: Record<string, any>;
}

class AnalyticsService {
  // Track general events
  async trackEvent(event: AnalyticsEvent): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('analytics')
        .insert({
          user_id: event.user_id,
          custom_data: {
            type: event.event_type,
            ...event.custom_data,
            timestamp: event.timestamp || new Date().toISOString()
          }
        });

      if (error) {
        console.error('Error tracking analytics event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error tracking analytics event:', error);
      return false;
    }
  }

  // Track payment-specific analytics
  async trackPaymentEvent(analytics: PaymentAnalytics): Promise<boolean> {
    return this.trackEvent({
      event_type: 'payment_analytics',
      user_id: analytics.user_id,
      custom_data: {
        payment_id: analytics.payment_id,
        amount: analytics.amount,
        status: analytics.status,
        attempt_number: analytics.attempt_number,
        error_code: analytics.error_code,
        duration_ms: analytics.duration_ms,
        metadata: analytics.metadata
      }
    });
  }

  // Track user-specific analytics
  async trackUserEvent(analytics: UserAnalytics): Promise<boolean> {
    return this.trackEvent({
      event_type: 'user_analytics',
      user_id: analytics.user_id,
      custom_data: {
        action: analytics.action,
        auth_method: analytics.auth_method,
        metadata: analytics.metadata
      }
    });
  }

  // Track page views
  async trackPageView(page: string, user_id?: string): Promise<boolean> {
    return this.trackEvent({
      event_type: 'page_view',
      user_id,
      custom_data: {
        page,
        url: window.location.href,
        referrer: document.referrer,
        user_agent: navigator.userAgent
      }
    });
  }

  // Track errors
  async trackError(error: Error, context?: string, user_id?: string): Promise<boolean> {
    return this.trackEvent({
      event_type: 'error',
      user_id,
      custom_data: {
        error_message: error.message,
        error_stack: error.stack,
        context,
        url: window.location.href
      }
    });
  }

  // Get analytics summary for admin dashboard
  async getAnalyticsSummary(timeframe: 'day' | 'week' | 'month' = 'week'): Promise<any> {
    try {
      const now = new Date();
      const startDate = new Date();
      
      switch (timeframe) {
        case 'day':
          startDate.setDate(now.getDate() - 1);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }

      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching analytics summary:', error);
        return null;
      }

      // Process and categorize the data
      const summary = {
        total_events: data.length,
        payment_events: data.filter(d => d.custom_data?.type?.includes('payment')).length,
        user_events: data.filter(d => d.custom_data?.type?.includes('user')).length,
        page_views: data.filter(d => d.custom_data?.type === 'page_view').length,
        errors: data.filter(d => d.custom_data?.type === 'error').length,
        by_day: this.groupByDay(data),
        top_pages: this.getTopPages(data),
        error_summary: this.getErrorSummary(data)
      };

      return summary;
    } catch (error) {
      console.error('Error fetching analytics summary:', error);
      return null;
    }
  }

  private groupByDay(data: any[]): Record<string, number> {
    return data.reduce((acc, item) => {
      const date = new Date(item.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});
  }

  private getTopPages(data: any[]): Array<{ page: string; views: number }> {
    const pageViews = data
      .filter(d => d.custom_data?.type === 'page_view')
      .reduce((acc, item) => {
        const page = item.custom_data?.page || 'unknown';
        acc[page] = (acc[page] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(pageViews)
      .map(([page, views]) => ({ page, views: views as number }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private getErrorSummary(data: any[]): Array<{ error: string; count: number }> {
    const errors = data
      .filter(d => d.custom_data?.type === 'error')
      .reduce((acc, item) => {
        const error = item.custom_data?.error_message || 'unknown';
        acc[error] = (acc[error] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(errors)
      .map(([error, count]) => ({ error, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService;
