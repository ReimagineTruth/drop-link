
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PI_API_URL = "https://api.minepi.com/v2";
const PI_SANDBOX_URL = "https://api.sandbox.minepi.com/v2"; // For sandbox mode

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

    const { paymentId, transactionId, status, accessToken } = await req.json();

    // Validate request data
    if (!paymentId) {
      return new Response(JSON.stringify({ error: "Invalid request data: paymentId is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get the payment from the database
    const { data: payment, error: fetchError } = await supabaseClient
      .from('payments')
      .select('*')
      .eq('pi_payment_id', paymentId)
      .maybeSingle();

    if (fetchError) {
      return new Response(JSON.stringify({ error: `Error fetching payment: ${fetchError.message}` }), {
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

    const piApiKey = Deno.env.get("PI_API_KEY") ?? "ckta3qej1mjqit2rlqt6nutpw089uynyotj3g9spwqlhrvvggqv7hoe6cn3plgb5";
    
    // Handle complete or cancel
    if (status === 'completed' && transactionId) {
      // Complete payment with Pi Network API
      const apiUrl = payment.metadata?.sandbox ? PI_SANDBOX_URL : PI_API_URL;
      const completeUrl = `${apiUrl}/payments/${paymentId}/complete`;
      
      const headers = {
        "Authorization": `Key ${piApiKey}`,
        "Content-Type": "application/json"
      };
      
      const completeResponse = await fetch(completeUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ txid: transactionId })
      });
      
      if (!completeResponse.ok) {
        const errorData = await completeResponse.json();
        console.error("Pi API Error:", errorData);
        throw new Error(`Payment completion failed: ${JSON.stringify(errorData)}`);
      }
      
      // Update payment status in database
      await supabaseClient
        .from('payments')
        .update({
          status: 'completed',
          transaction_id: transactionId,
          completed_at: new Date().toISOString()
        })
        .eq('id', payment.id);
        
      // If this is a subscription payment, ensure subscription is active
      if (payment.metadata?.isSubscription) {
        const { data: subscription } = await supabaseClient
          .from('subscriptions')
          .select('*')
          .eq('payment_id', payment.id)
          .maybeSingle();
          
        if (subscription) {
          await supabaseClient
            .from('subscriptions')
            .update({
              is_active: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', subscription.id);
        }
      }
    } else if (status === 'cancelled') {
      // Cancel payment with Pi Network API
      const apiUrl = payment.metadata?.sandbox ? PI_SANDBOX_URL : PI_API_URL;
      const cancelUrl = `${apiUrl}/payments/${paymentId}/cancel`;
      
      const headers = {
        "Authorization": `Key ${piApiKey}`,
        "Content-Type": "application/json"
      };
      
      const cancelResponse = await fetch(cancelUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({})
      });
      
      // Update payment status in database
      await supabaseClient
        .from('payments')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('id', payment.id);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Payment ${status} successfully`
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
