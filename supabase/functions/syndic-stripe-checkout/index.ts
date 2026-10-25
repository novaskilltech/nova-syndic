// Supabase Edge Function: create-checkout-session
// Deno TypeScript runtime

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import Stripe from "https://esm.sh/stripe@14.18.0?target=deno";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
    );

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { planInterval, returnUrl } = await req.json(); // 'month' ou 'year'
    const isYearly = planInterval === "year";

    // Tarification Nova Syndic en MAD :
    // Mensuel : 199 MAD (19900 centimes) -> ~12 DH / appart pour 16 lots
    // Annuel  : 1800 MAD / an (180000 centimes) équivalent à 150 MAD/mois -> ~9 DH / appart pour 16 lots
    const unitAmount = isYearly ? 180000 : 19900;
    const interval = isYearly ? "year" : "month";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        planInterval: interval,
      },
      line_items: [
        {
          price_data: {
            currency: "mad",
            product_data: {
              name: isYearly 
                ? "Nova Syndic Pro - Abonnement Annuel (150 DH/mois)" 
                : "Nova Syndic Pro - Abonnement Mensuel (199 DH/mois)",
              description: isYearly
                ? "Gestion complète de copropriété (Loi 18-00) • Soit ~9 DH/appartement/mois pour un immeuble de 16 appartements"
                : "Gestion complète de copropriété (Loi 18-00) • Soit ~12 DH/appartement/mois pour un immeuble de 16 appartements",
            },
            unit_amount: unitAmount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${returnUrl}?session_id={CHECKOUT_SESSION_ID}&payment=success`,
      cancel_url: `${returnUrl}?payment=cancelled`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
