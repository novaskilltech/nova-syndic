
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
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    const data = await response.json();
    if (response.ok && data.text) {
      return data.text;
    }
    throw new Error(data.message || data.error || 'Erreur API IA');
  } catch (error: any) {
    console.error('getSyndicAssistantResponse error:', error);
    // Réponse de secours intelligente Loi 18-00 si hors-ligne
    if (message.toLowerCase().includes('convoquer') || message.toLowerCase().includes('ag')) {
      return `### Convocation de l'Assemblée Générale (Loi 18-00)

Conformément à la **Loi 18-00** relative à la copropriété au Maroc :

1. **Délai :** Les convocations doivent être adressées au moins **15 jours** avant la date de la réunion (sauf urgence motivée).
2. **Moyen de notification :** Lettre recommandée avec accusé de réception ou remise en main propre contre récépissé émargé.
3. **Contenu obligatoire :**
   - Date, heure et lieu précis de la réunion.
   - **Ordre du jour détaillé** (seuls les points inscrits peuvent être votés).
   - États financiers prévisionnels et devis de travaux si vote financier.
4. **Quorum :**
   - 1ère convocation : Présence ou représentation d'au moins **la moitié** des quotes-parts des copropriétaires.
   - Si quorum non atteint : Convocation d'une 2nde AG sous 30 jours, statuant à la majorité des présents.`;
    }

    return "Désolé, une erreur temporaire est survenue lors de la connexion à l'IA. Veuillez réessayer dans un instant.";
  }
};
