import type { VercelRequest, VercelResponse } from '@vercel/node';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to buffer request stream
async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let eventPayload: any;

  try {
    const rawBody = await buffer(req);
    const bodyStr = rawBody.toString('utf8');

    try {
      eventPayload = JSON.parse(bodyStr);
    } catch {
      return res.status(400).send('Webhook Error: Invalid JSON body');
    }

    console.log(`[Nova Syndic Stripe Webhook] Reçu: ${eventPayload.type} (${eventPayload.id})`);

    switch (eventPayload.type) {
      case 'checkout.session.completed': {
        const session = eventPayload.data.object;
        console.log(`[Stripe Checkout] Paiement réussi pour client: ${session.customer_email || session.id}`);
        // Ici: débloquer le compte syndic / marquer l'abonnement comme actif
        break;
      }
      case 'customer.subscription.updated': {
        const subscription = eventPayload.data.object;
        console.log(`[Stripe Subscription] Abonnement mis à jour: ${subscription.id} - statut: ${subscription.status}`);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = eventPayload.data.object;
        console.log(`[Stripe Subscription] Abonnement résilié: ${subscription.id}`);
        break;
      }
      default:
        console.log(`Événement non traité: ${eventPayload.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error(`Erreur webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
