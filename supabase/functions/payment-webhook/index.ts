
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { paymentId, status, transactionId, error: paymentError } = await req.json();

    // Validate webhook signature (in production, verify this comes from Pi Network)
    const webhookSignature = req.headers.get('X-Pi-Signature');
    if (!webhookSignature) {
      return new Response(JSON.stringify({ error: "Missing webhook signature" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    // Find the payment in our database
    const { data: payment, error: fetchError } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('pi_payment_id', paymentId)
      .maybeSingle();

    if (fetchError) {
      console.error('Error fetching payment:', fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!payment) {
      return new Response(JSON.stringify({ error: "Payment not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Update payment status
    const updateData: any = {
      status,
      updated_at: new Date().toISOString()
    };

    if (transactionId) {
      updateData.pi_transaction_id = transactionId;
    }

    if (paymentError) {
      updateData.metadata = {
        ...payment.metadata,
        error: paymentError
      };
    }

    const { error: updateError } = await supabaseClient
      .from('payments')
      .update(updateData)
      .eq('id', payment.id);

    if (updateError) {
      console.error('Error updating payment:', updateError);
      return new Response(JSON.stringify({ error: updateError.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // Log analytics event
    await supabaseClient
      .from('analytics')
      .insert({
        user_id: payment.user_id,
        custom_data: {
          type: 'payment_webhook',
          payment_id: paymentId,
          status,
          transaction_id: transactionId,
          timestamp: new Date().toISOString()
        }
      });

    // If payment is completed and it's a subscription, update subscription status
    if (status === 'completed' && payment.subscription_id) {
      await supabaseClient
        .from('subscriptions')
        .update({
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.subscription_id);
    }

    console.log(`Payment webhook processed: ${paymentId} -> ${status}`);

    return new Response(JSON.stringify({ 
      success: true,
      message: `Payment ${paymentId} updated to ${status}`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : "Unknown error" 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
