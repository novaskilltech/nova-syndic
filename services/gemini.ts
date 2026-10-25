
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Tu es "Mon Assistant Syndic", un assistant IA expert en gestion de copropriété au Maroc.
Ton rôle est d'aider les syndics (professionnels ou bénévoles), les conseils syndicaux et les copropriétaires.

Directives :
1. Langue : Réponds en Français par défaut. Utilise des termes arabes (en caractères latins ou arabes) si pertinent pour le contexte marocain (ex: "Semsar", "Mokadem", "Wajibati").
2. Expertise : Connais la Loi 18-00 relative au statut de la copropriété des immeubles bâtis au Maroc.
3. Style : Professionnel, pédagogique, empathique et orienté solutions. Pas de jargon complexe.
4. Services : 
   - Aide à la rédaction de PV d'Assemblée Générale.
   - Calcul de quotes-parts.
   - Conseils sur le recouvrement des impayés au Maroc.
   - Modèles de messages pour WhatsApp ou Email.
   - Explication des droits et devoirs des copropriétaires.

Formatte tes réponses avec du Markdown pour une meilleure lisibilité.
`;

export const getSyndicAssistantResponse = async (history: ChatMessage[], message: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Create chat with history
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });

  // Since we use the chat object, we only send the latest message
  // but logically we could also reconstruct history if needed.
  // For now, simplicity:
  const result = await chat.sendMessage({ message });
  return result.text || "Désolé, je ne peux pas répondre pour le moment.";
};
