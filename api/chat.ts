import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_INSTRUCTION = `
Tu es "Mon Assistant Syndic", un assistant IA expert en gestion de copropriété au Maroc.
Ton rôle est d'aider les syndics (professionnels ou bénévoles), les conseils syndicaux et les copropriétaires.

Directives :
1. Langue : Réponds en Français par défaut. Si l'utilisateur s'adresse à toi en arabe ou en Darija, réponds en Arabe/Darija fluide. Utilise le vocabulaire marocain approprié (Loi 18-00, Wajibati, Assemblée Générale, Quitus, etc.).
2. Expertise : Connais parfaitement la Loi 18-00 relative au statut de la copropriété des immeubles bâtis au Maroc (majorités en AG, charges communes, réparations urgentes, syndic bénévole vs professionnel, recouvrement des impayés).
3. Style : Professionnel, pédagogue, structuré et bienveillant. Fais des réponses concrètes et actionnables avec des puces Markdown.
4. Services : 
   - Convocations et PV d'AG.
   - Conseils sur le recouvrement des cotisations impayées.
   - Modèles de messages WhatsApp courtois et fermes.
   - Droits et devoirs des copropriétaires (parties privatives vs communes).
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const kiloApiKey = process.env.KILO_API_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnYiOiJwcm9kdWN0aW9uIiwia2lsb1VzZXJJZCI6ImQ0ZmEzY2FlLTQxNWMtNDQxMi05NzM4LTZlZDk1NjUwOWIyMSIsImFwaVRva2VuUGVwcGVyIjpudWxsLCJ2ZXJzaW9uIjozLCJpYXQiOjE3OTI5NzUxNzYsImV4cCI6MTk1MDY1NTE3Nn0.jt2N8IyfjjNWNViBr_LzmgI4bslANJzwFxSUcqSfWbI';

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message requis.' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_INSTRUCTION }
    ];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.text) {
          messages.push({
            role: item.sender === 'user' ? 'user' : 'assistant',
            content: item.text
          });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    // Modèles Kilo ordonnés par pertinence et rapidité
    const modelsToTry = [
      'deepseek/deepseek-chat',
      'openai/gpt-4o-mini',
      'anthropic/claude-3-5-haiku',
      'kilo-auto/efficient'
    ];

    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        const response = await fetch('https://api.kilo.ai/api/gateway/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${kiloApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages,
            max_tokens: 1500,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Kilo error [${response.status}]: ${errText}`);
        }

        const data: any = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (content && typeof content === 'string' && content.trim().length > 0) {
          return res.status(200).json({ text: content.trim() });
        }
      } catch (err: any) {
        console.warn(`Modèle ${model} indisponible sur Kilo: ${err.message}. Essai suivant...`);
        lastError = err;
      }
    }

    throw lastError || new Error('Aucun modèle Kilo n\'a pu répondre.');
  } catch (error: any) {
    console.error('Erreur API Chat Kilo:', error);
    return res.status(500).json({ 
      error: 'AI_ERROR', 
      message: error.message || 'Erreur lors de la génération de la réponse IA.' 
    });
  }
}
