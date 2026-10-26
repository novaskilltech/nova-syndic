import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

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

  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY_MISSING', message: 'Clé Gemini API non configurée.' });
  }

  try {
    const { message, history } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message requis.' });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Modèles avec fallback pour garantir 100% de disponibilité
    const modelsToTry = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: message,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          }
        });

        if (response && response.text) {
          return res.status(200).json({ text: response.text });
        }
      } catch (err: any) {
        console.warn(`Modèle ${modelName} indisponible: ${err.message}. Essai du suivant...`);
        lastError = err;
      }
    }

    throw lastError || new Error('Impossible d\'obtenir une réponse de Gemini.');
  } catch (error: any) {
    console.error('Erreur API Chat Gemini:', error);
    return res.status(500).json({ 
      error: 'AI_ERROR', 
      message: error.message || 'Erreur lors de la génération de la réponse IA.' 
    });
  }
}
