
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.7';

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'welcome' | 'tip_received' | 'subscription_update' | 'link_analytics';
  email: string;
  data: Record<string, any>;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { type, email, data }: NotificationRequest = await req.json();

    let subject = '';
    let html = '';

    switch (type) {
      case 'welcome':
        subject = 'Welcome to Droplink! 🎉';
        html = `
          <h1>Welcome to Droplink, ${data.username}!</h1>
          <p>Thank you for joining the Pi Network's premier link-in-bio platform.</p>
          <p>Get started by:</p>
          <ul>
            <li>Adding your first link</li>
            <li>Customizing your profile</li>
            <li>Setting up your .pi domain</li>
          </ul>
          <p><a href="${data.profileUrl}" style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Your Profile</a></p>
        `;
        break;

      case 'tip_received':
        subject = `You received ${data.amount}π from ${data.senderUsername}! 💰`;
        html = `
          <h1>You received a tip!</h1>
          <p><strong>${data.senderUsername}</strong> sent you <strong>${data.amount}π</strong></p>
          ${data.message ? `<p>Message: "${data.message}"</p>` : ''}
          <p><a href="${data.dashboardUrl}" style="background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Dashboard</a></p>
        `;
        break;

      case 'subscription_update':
        subject = `Subscription Updated - ${data.plan} Plan Active`;
        html = `
          <h1>Subscription Updated</h1>
          <p>Your <strong>${data.plan}</strong> plan is now active!</p>
          <p>You now have access to:</p>
          <ul>
            ${data.features.map((feature: string) => `<li>${feature}</li>`).join('')}
          </ul>
          <p><a href="${data.dashboardUrl}" style="background: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Manage Subscription</a></p>
        `;
        break;

      case 'link_analytics':
        subject = `Weekly Analytics Report - ${data.totalClicks} clicks this week!`;
        html = `
          <h1>Your Weekly Analytics Report</h1>
          <p>Great week! Here's your link performance:</p>
          <ul>
            <li><strong>Total Clicks:</strong> ${data.totalClicks}</li>
            <li><strong>Most Popular Link:</strong> ${data.topLink}</li>
            <li><strong>Profile Views:</strong> ${data.profileViews}</li>
          </ul>
          <p><a href="${data.analyticsUrl}" style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">View Full Analytics</a></p>
        `;
        break;

      default:
        throw new Error('Unknown notification type');
    }

    const emailResponse = await resend.emails.send({
      from: "Droplink <notifications@droplink.space>",
      to: [email],
      subject,
      html,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log notification in database
    await supabase
      .from('notifications')
      .insert({
        type,
        email,
        subject,
        sent_at: new Date().toISOString(),
        status: 'sent'
      });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("Error in send-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
