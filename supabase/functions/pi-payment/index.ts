
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

    const { paymentData, user, accessToken } = await req.json();

    // Validate request data
    if (!paymentData || !user || !user.id) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Approve payment with Pi Network API
    const apiUrl = paymentData.metadata?.sandbox ? PI_SANDBOX_URL : PI_API_URL;
    const approveUrl = `${apiUrl}/payments/${paymentData.paymentId}/approve`;
    
    const piApiKey = Deno.env.get("PI_API_KEY") ?? "ckta3qej1mjqit2rlqt6nutpw089uynyotj3g9spwqlhrvvggqv7hoe6cn3plgb5";
    
    const headers = {
      "Authorization": `Key ${piApiKey}`,
      "Content-Type": "application/json"
    };
    
    if (accessToken) {
      // If we have a user access token, use it for additional verification
      try {
        const userUrl = `${apiUrl}/me`;
        const userResponse = await fetch(userUrl, {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        
        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log("Pi user verified:", userData.username);
        }
      } catch (error) {
        console.error("Error verifying Pi user:", error);
      }
    }
    
    // Approve payment
    const approveResponse = await fetch(approveUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({})
    });
    
    if (!approveResponse.ok) {
      const errorData = await approveResponse.json();
      throw new Error(`Payment approval failed: ${JSON.stringify(errorData)}`);
    }
    
    const approveData = await approveResponse.json();
    console.log("Payment approved:", approveData);

    // Store the payment in the database
    const { data: payment, error: paymentError } = await supabaseClient
      .from('payments')
      .insert({
        user_id: user.id,
        amount: paymentData.amount,
        pi_payment_id: paymentData.paymentId,
        status: 'pending',
        memo: paymentData.memo,
        metadata: paymentData.metadata || {}
      })
      .select('*')
      .single();

    if (paymentError) {
      return new Response(JSON.stringify({ error: `Payment creation failed: ${paymentError.message}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    // If this is a subscription payment, create/update the subscription
    if (paymentData.metadata && paymentData.metadata.isSubscription) {
      const plan = paymentData.metadata.plan;
      const duration = paymentData.metadata.duration;
      
      // Calculate expiration date
      const expiresAt = new Date();
      if (duration === 'annual') {
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);
      } else {
        expiresAt.setMonth(expiresAt.getMonth() + 1);
      }

      // Check if there's an existing subscription
      const { data: existingSub } = await supabaseClient
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .maybeSingle();

      // Create or update subscription
      if (existingSub) {
        await supabaseClient
          .from('subscriptions')
          .update({
            plan,
            expires_at: expiresAt.toISOString(),
            payment_id: payment.id,
            amount: paymentData.amount,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSub.id);
      } else {
        await supabaseClient
          .from('subscriptions')
          .insert({
            user_id: user.id,
            plan,
            is_active: true,
            expires_at: expiresAt.toISOString(),
            started_at: new Date().toISOString(),
            payment_id: payment.id,
            amount: paymentData.amount
          });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      payment: payment,
      message: "Payment recorded successfully"
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
