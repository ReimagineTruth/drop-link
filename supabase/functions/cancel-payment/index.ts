
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

    const { paymentId, accessToken } = await req.json();

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
    
    // Cancel payment with Pi Network API
    const apiUrl = payment.metadata?.sandbox ? PI_SANDBOX_URL : PI_API_URL;
    const cancelUrl = `${apiUrl}/payments/${paymentId}/cancel`;
    
    const headers = {
      "Authorization": `Key ${piApiKey}`,
      "Content-Type": "application/json"
    };
    
    try {
      const cancelResponse = await fetch(cancelUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({})
      });
      
      if (!cancelResponse.ok) {
        const errorData = await cancelResponse.json();
        console.error("Pi API Error:", errorData);
      }
    } catch (apiError) {
      console.error("Error calling Pi API:", apiError);
    }
    
    // Update payment status in database regardless of API response
    await supabaseClient
      .from('payments')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString()
      })
      .eq('id', payment.id);

    return new Response(JSON.stringify({ 
      success: true, 
      message: "Payment cancelled successfully"
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
