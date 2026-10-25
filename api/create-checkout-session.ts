import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Vérifier si la clé Stripe est configurée
  if (!stripeSecretKey) {
    return res.status(400).json({
      error: 'STRIPE_SECRET_KEY_MISSING',
      message: 'Veuillez renseigner votre clé secrète Stripe (STRIPE_SECRET_KEY) dans les variables d\'environnement Vercel.',
      setupHelp: 'https://vercel.com/novaskilltechs-projects/src_app/settings/environment-variables'
    });
  }

  try {
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    });

    const { planInterval, returnUrl } = req.body || {};
    const isYearly = planInterval === 'year';

    // Grille Tarifaire Nova Syndic :
    // Mensuel : 199 MAD (19900 centimes) -> ≈ 12 DH / appart pour 16 lots
    // Annuel  : 1800 MAD (180000 centimes) -> ≈ 9 DH / appart pour 16 lots (150 DH / mois)
    const unitAmount = isYearly ? 180000 : 19900;
    const interval = isYearly ? 'year' : 'month';

    const origin = returnUrl || req.headers.referer || 'https://nova-syndic-maroc.vercel.app';
    const cleanOrigin = origin.split('?')[0];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'mad',
            product_data: {
              name: isYearly 
                ? 'Nova Syndic Pro - Abonnement Annuel (150 DH/mois)' 
                : 'Nova Syndic Pro - Abonnement Mensuel (199 DH/mois)',
              description: isYearly
                ? 'Gestion complète de copropriété (Loi 18-00) • Soit ≈ 9 DH/appartement/mois pour 16 appartements'
                : 'Gestion complète de copropriété (Loi 18-00) • Soit ≈ 12 DH/appartement/mois pour 16 appartements',
            },
            unit_amount: unitAmount,
            recurring: { interval },
          },
          quantity: 1,
        },
      ],
      success_url: `${cleanOrigin}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${cleanOrigin}?payment=cancelled`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return res.status(500).json({
      error: 'STRIPE_ERROR',
      message: error.message || 'Erreur lors de la communication avec Stripe.'
    });
  }
}
