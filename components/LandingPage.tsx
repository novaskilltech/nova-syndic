import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Bot, 
  Wallet, 
  Users, 
  FileCheck, 
  Zap,
  Globe,
  MessagesSquare,
  BadgePercent
} from 'lucide-react';

interface LandingPageProps {
  onStartTrial: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartTrial, onOpenPricing }) => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('year');
  const [lang, setLang] = useState<'darija' | 'fr'>('darija');

  const isDarija = lang === 'darija';

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white ${isDarija ? 'font-ar' : ''}`}>
      {/* Top Navbar */}
      <nav className="h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="Nova Syndic Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-blue-500/20 border border-blue-500/30"
          />
          <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
            Nova<span className="text-blue-500">Syndic</span>
            {isDarija && <span className="text-sm font-bold text-slate-400 mr-2">نوفا سانديك</span>}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">
            {isDarija ? 'المغرب • القانون 18-00' : 'Maroc • Loi 18-00'}
          </span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Sélecteur de langue DARIJA / FRANÇAIS */}
          <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center text-xs font-bold">
            <button
              onClick={() => setLang('darija')}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                isDarija ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇲🇦 الدارجة
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                !isDarija ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Français
            </button>
          </div>

          <button
            onClick={onStartTrial}
            className="px-4 md:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
          >
            <span>{isDarija ? 'دخول التطبيق' : 'Espace Démo'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-16 md:pt-24 pb-20 px-6 lg:px-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-xs font-semibold text-slate-300">
            <Sparkles size={14} className="text-amber-400" />
            <span>
              {isDarija 
                ? 'أول منصة مغربية ذكية لتسيير السانديك بالذكاء الاصطناعي والقانون 18-00' 
                : 'La 1ère solution de copropriété avec Assistant IA au Maroc'}
            </span>
          </div>

          {isDarija ? (
            /* VERSION DARIJA */
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.25] text-white">
              تهنى من صداع السانديك وكناش الكريدي، <br />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                بثمن قهوة للشقة فالشهر !
              </span>
            </h1>
          ) : (
            /* VERSION FRANÇAIS */
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white">
              La sérénité pour votre copropriété, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                pour le prix d'un café par appartement.
              </span>
            </h1>
          )}

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            {isDarija
              ? 'تتبع الواجبات الشهرية (Wajibati)، تذكير الملاك فالواتساب بلا حراج، حساب المصاريف، وذكاء اصطناعي كيجاوّبك قانونياً على أي نزاع أو جمع عام وفق القانون 18-00.'
              : 'Suivi des charges (Wajibati), relances impayés WhatsApp, génération de PV d\'AG et un assistant IA juriste expert de la Loi 18-00 marocaine.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenPricing}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
            >
              <Zap size={20} className="text-yellow-300 fill-current" />
              <span>{isDarija ? 'شوف الأثمنة بالدرهم المغربي' : 'Voir les Formules en Dirhams'}</span>
            </button>
            <button
              onClick={onStartTrial}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-base transition-all"
            >
              {isDarija ? 'جرّب المنصة دابا' : 'Découvrir la Démo'}
            </button>
          </div>
        </div>
      </header>

      {/* SECTION ARGUMENTAIRE PRIX MAROC - COÛT PAR APPARTEMENT (DARIJA & FR) */}
      <section className="py-16 px-6 lg:px-16 bg-slate-900/60 border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {isDarija ? 'حسبة ساهلة وشفافة' : 'Transparence & Économie Réelle'}
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              {isDarija ? 'شحال كاطيح عليك نوفا سانديك فالعمارة ؟' : 'Combien coûte Nova Syndic pour votre immeuble ?'}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              {isDarija 
                ? 'ثمن رمزي مدروس باش كل عمارة وإقامة فالمغرب تستافد من نظام احترافي بلا ما تثقل على الجيران.' 
                : 'Nous avons pensé un modèle tarifaire ultra-accessible pour les syndics bénévoles et les conseils syndicaux au Maroc.'}
            </p>
          </div>

          {/* Toggle Pricing */}
          <div className="flex justify-center mb-10">
            <div className="bg-slate-950 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-800">
              <button
                onClick={() => setBillingCycle('month')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  billingCycle === 'month'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isDarija ? 'خلاص شهري (199 درهم / شهر)' : 'Mensuel (199 DH / mois)'}
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                  billingCycle === 'year'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{isDarija ? 'خلاص سنوي (150 درهم / شهر)' : 'Annuel (150 DH / mois)'}</span>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                  -25%
                </span>
              </button>
            </div>
          </div>

          {/* Cartes d'Impact / Calcul pour 16 appartements */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Boîte Démonstration 16 appartements */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/40 relative shadow-2xl">
              <div className="absolute -top-3 left-8 bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {isDarija ? 'مثال لعمارة مغربية ديال 16 شقة' : 'Exemple Typique Immeuble au Maroc'}
              </div>

              <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm mb-4">
                <Building2 className="text-blue-400" size={20} />
                <span>
                  {isDarija 
                    ? 'إلى كانت عندك عمارة فيها 16 شقة :' 
                    : 'Pour un immeuble de 16 appartements :'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-6xl font-black text-white">
                    {billingCycle === 'year' ? '≈ 9 دراهم' : '≈ 12 درهم'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">
                    {isDarija ? '/ للشقة فالشهر' : '/ appartement / mois'}
                  </span>
                </div>
                <p className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Sparkles size={16} />
                  <span>
                    {isDarija 
                      ? 'ثمن ديريـزوار مقارنة مع راحة البال والشفافية مع الجيران.' 
                      : 'Un prix dérisoire pour en finir avec les litiges et les oublis.'}
                  </span>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <p>
                  • <strong>{isDarija ? 'الاشتراك الشهري :' : 'Abonnement mensuel :'}</strong> 199 DH / {isDarija ? 'شهر للعمارة كاملة (كتجي تقريبا 12 درهم للشقة)' : 'mois pour tout l\'immeuble (soit ≈ 12,40 DH par lot)'}.
                </p>
                <p>
                  • <strong>{isDarija ? 'الاشتراك السنوي :' : 'Abonnement annuel :'}</strong> 1 800 DH / {isDarija ? 'عام، يعني 150 درهم للشهر (كتجي تقريبا 9 دراهم للشقة)' : 'an, soit 150 DH / mois (soit ≈ 9,35 DH par lot)'}.
                </p>
              </div>
            </div>

            {/* Avantages Inclus */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-400" size={24} />
                <span>{isDarija ? 'شنو غادي تربح مع نوفا سانديك ؟' : 'Ce que cela remplace dans votre gestion :'}</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    title: isDarija ? "تهنى من الكريدي ودفتر الحسابات" : "Recouvrement 100% digitalisé",
                    desc: isDarija 
                      ? "كتعرف شكون مخلص وشكون ما مخلصش بضغطة زر وحدة وبلا إحراج مع السكان." 
                      : "Terminé les cahiers égarés et les doutes sur qui a payé sa cotisation du mois."
                  },
                  {
                    title: isDarija ? "مستشار قانوني بالذكاء الاصطناعي (القانون 18-00)" : "Assistant IA Juridique Loi 18-00",
                    desc: isDarija 
                      ? "سولو على أي حاجة : الأغلبية فالجمع العام، السطح، الكراج، والديون العالقة." 
                      : "Posez toutes vos questions sur les majorités en AG, les impayés et les parties communes."
                  },
                  {
                    title: isDarija ? "محاضر الجموع العامة (PV d'AG) واجدة" : "PV d'Assemblée Générale en 3 clics",
                    desc: isDarija 
                      ? "كتوجد التقرير ومحضر الجمع العام مطبوع وقانوني فدقايق معدودة." 
                      : "Générez des procès-verbaux juridiquement clairs et prêts à imprimer."
                  },
                  {
                    title: isDarija ? "أداء ساهل بـ Carte Bancaire وفاتورة فورية" : "Paiement de l'abonnement par Carte Bancaire",
                    desc: isDarija 
                      ? "أداء رسمي ومحمي عبر منصة Stripe بالدرهم المغربي مع توصيل فوري." 
                      : "Règlement sécurisé en Dirhams marocains via Stripe Checkout avec facture automatique."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto py-8 px-6 border-t border-slate-900 text-center text-xs text-slate-500">
        <p>© 2026 Nova Syndic Maroc &bull; {isDarija ? 'مطور خصيصاً للإقامات والعمارات بالمغرب وفق القانون 18-00 المتعلق بالملكية المشتركة.' : 'Conçu pour les copropriétés au Maroc en conformité avec la Loi 18-00.'}</p>
      </footer>
    </div>
  );
};
export default LandingPage;
