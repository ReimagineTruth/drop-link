
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

    const { paymentId, transactionId, status } = await req.json();

    // Validate request data
    if (!paymentId || !status) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log(`Processing payment ${paymentId} with status ${status}`);

    // Update the payment in the database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .update({
        status,
        pi_transaction_id: transactionId || null,
        updated_at: new Date().toISOString()
      })
      .eq('pi_payment_id', paymentId)
      .select('*')
      .single();

    if (paymentError) {
      console.error("Payment update error:", paymentError);
      return new Response(JSON.stringify({ error: `Payment update failed: ${paymentError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    console.log("Payment updated:", payment);

    // If payment is completed and has a subscription associated with it
    if (status === 'completed' && payment.subscription_id) {
      console.log(`Activating subscription ${payment.subscription_id}`);
      
      // Activate the subscription
      const { error: subscriptionError } = await supabaseClient
        .from('subscriptions')
        .update({
          is_active: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', payment.subscription_id);

      if (subscriptionError) {
        console.error("Error activating subscription:", subscriptionError);
        return new Response(JSON.stringify({ error: `Subscription activation failed: ${subscriptionError.message}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }
      
      console.log(`Subscription ${payment.subscription_id} activated successfully`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      payment: payment,
      message: `Payment ${status} successfully`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    console.error("Error processing payment:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
