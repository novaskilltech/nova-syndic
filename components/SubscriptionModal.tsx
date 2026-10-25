import React, { useState } from 'react';
import { Check, ShieldCheck, Zap, Sparkles, Building2, HelpCircle } from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSubscribe: (planInterval: 'month' | 'year') => Promise<void>;
  currentStatus?: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubscribe,
  currentStatus
}) => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('year');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const STRIPE_LINKS = {
    month: 'https://buy.stripe.com/14A28reIO28n1thbT8gbm0x',
    year: 'https://buy.stripe.com/5kQ3cvbwCeV9b3R1eugbm0y',
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);
      // Redirection directe et instantanée vers le paiement Stripe hébergé
      const directUrl = STRIPE_LINKS[billingCycle];
      if (directUrl) {
        window.location.href = directUrl;
        return;
      }
      await onSubscribe(billingCycle);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Une erreur est survenue lors de l'accès au paiement Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden relative">
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles size={14} className="text-yellow-300" />
            Tarification Spéciale Copropriété Maroc
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Activez Nova Syndic pour votre Résidence
          </h2>
          <p className="text-blue-100 mt-2 text-sm max-w-lg mx-auto">
            La solution tout-en-un conforme à la Loi 18-00 marocaine : suivi des cotisations, comptabilité, maintenance et assistant IA.
          </p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          {/* Toggle Mensuel / Annuel */}
          <div className="flex justify-center">
            <div className="bg-gray-100 p-1.5 rounded-2xl flex items-center gap-1 border border-gray-200">
              <button
                onClick={() => setBillingCycle('month')}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  billingCycle === 'month'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Paiement Mensuel
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className={`px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                  billingCycle === 'year'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Paiement Annuel
                <span className="bg-amber-400 text-gray-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  -25%
                </span>
              </button>
            </div>
          </div>

          {/* Carte Tarifaire Principale */}
          <div className="bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border-2 border-blue-200 rounded-3xl p-6 relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-blue-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Offre Immeuble Complet</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl md:text-5xl font-black text-gray-900">
                    {billingCycle === 'year' ? '150' : '199'}
                  </span>
                  <span className="text-xl font-bold text-gray-600">DH / mois</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {billingCycle === 'year' ? 'Facturé 1 800 DH pour l\'année entière' : 'Sans engagement, résiliable à tout moment'}
                </p>
              </div>

              {/* Badge Démonstration coût par appartement (16 lots) */}
              <div className="bg-white border border-blue-200 shadow-sm rounded-2xl p-4 text-center md:text-right">
                <div className="flex items-center justify-center md:justify-end gap-1.5 text-blue-700 font-bold text-sm">
                  <Building2 size={16} />
                  Pour un immeuble de 16 appartements :
                </div>
                <div className="text-2xl font-black text-emerald-600 mt-0.5">
                  {billingCycle === 'year' ? '≈ 9 DH' : '≈ 12 DH'}
                  <span className="text-xs font-semibold text-gray-600"> / appart / mois</span>
                </div>
                <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                  Un coût dérisoire pour la paix sociale et la clarté financière
                </p>
              </div>
            </div>

            {/* Inclusions */}
            <div className="grid sm:grid-cols-2 gap-3 pt-6">
              {[
                "Gestion illimitée des copropriétaires & lots",
                "Suivi des cotisations & impayés (Wajibati)",
                "Assistant IA juridique (Loi 18-00 marocaine)",
                "Générateur de convocations & PV d'AG",
                "Gestion des pannes, réclamations & artisans",
                "Reçus & rappels WhatsApp préformatés",
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Connexion sécurisée à Stripe...</span>
              ) : (
                <>
                  <Zap size={20} className="text-yellow-300 fill-current" />
                  <span>S'abonner en Dirhams via Stripe ({billingCycle === 'year' ? '1 800 DH / an' : '199 DH / mois'})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-500" /> Paiement chiffré SSL Stripe
              </span>
              <span>•</span>
              <span>Cartes bancaires marocaines et internationales acceptées</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubscriptionModal;
