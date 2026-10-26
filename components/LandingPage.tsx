import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  ArrowRight, 
  Zap,
  Globe
} from 'lucide-react';

interface LandingPageProps {
  onStartTrial: () => void;
  onOpenPricing: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartTrial, onOpenPricing }) => {
  const [billingCycle, setBillingCycle] = useState<'month' | 'year'>('year');
  const [lang, setLang] = useState<'ar' | 'fr'>('ar');

  const isArabic = lang === 'ar';

  return (
    <div 
      dir={isArabic ? 'rtl' : 'ltr'} 
      className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white ${isArabic ? 'font-ar' : ''}`}
    >
      {/* Top Navbar */}
      <nav className="h-16 sm:h-20 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-3.5 sm:px-6 lg:px-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <img 
            src="/logo.jpg" 
            alt="Nova Syndic Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover shadow-lg shadow-blue-500/20 border border-blue-500/30"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-1.5">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center">
              Nova<span className="text-blue-500">Syndic</span>
            </span>
            {isArabic && <span className="text-[12px] sm:text-sm font-bold text-slate-400">نوفا سينديك</span>}
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 text-blue-400 border border-blue-500/30 px-2.5 py-0.5 rounded-full mx-1 hidden md:inline-block">
            {isArabic ? 'المغرب • القانون 18.00' : 'Maroc • Loi 18-00'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Sélecteur de langue ARABE LITTÉRAIRE / FRANÇAIS */}
          <div className="bg-slate-900 border border-slate-800 p-0.5 sm:p-1 rounded-xl flex items-center text-[11px] sm:text-xs font-bold">
            <button
              onClick={() => setLang('ar')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                isArabic ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              🇲🇦 العربية
            </button>
            <button
              onClick={() => setLang('fr')}
              className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg transition-all ${
                !isArabic ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Français
            </button>
          </div>

          <button
            onClick={onStartTrial}
            className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>{isArabic ? 'الدخول للمنصة' : 'Accéder à la Démo'}</span>
            <ArrowRight size={14} className={isArabic ? 'rotate-180' : ''} />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-16 md:pt-24 pb-20 px-6 lg:px-16 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-blue-600/20 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold text-slate-300 max-w-full">
            <Sparkles size={14} className="text-amber-400 flex-shrink-0" />
            <span className="truncate sm:whitespace-normal">
              {isArabic 
                ? 'المنصة المغربية الأولى لإدارة الملكية المشتركة بالذكاء الاصطناعي والقانون رقم 18.00' 
                : 'La 1ère solution de copropriété avec Assistant IA au Maroc'}
            </span>
          </div>

          {isArabic ? (
            /* VERSION ARABE LITTÉRAIRE */
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.35] text-white break-words">
              إدارة احترافية وشفافة لإقامتكم السكنية،{' '}
              <span className="block mt-2 sm:mt-1 bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                بتكلفة فنجان قهوة للشقة شهرياً !
              </span>
            </h1>
          ) : (
            /* VERSION FRANÇAIS */
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.2] text-white">
              La sérénité pour votre copropriété,{' '}
              <span className="block mt-1 sm:inline bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                pour le prix d'un café par lot.
              </span>
            </h1>
          )}

          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed px-2">
            {isArabic
              ? 'متابعة دقيقة للواجبات الشهرية، إشعارات تلقائية عبر تطبيق واتساب، ضبط المصاريف، ومساعد قانوني ذكي يجيب فورياً على كافة استفسارات الجموع العامة وفق القانون المغربي 18.00.'
              : 'Suivi des charges (Wajibati), relances impayés WhatsApp, génération de PV d\'AG et un assistant IA juriste expert de la Loi 18-00 marocaine.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <button
              onClick={onOpenPricing}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Zap size={18} className="text-yellow-300 fill-current" />
              <span>{isArabic ? 'الاطلاع على باقات الاشتراك بالدرهم' : 'Voir les Formules en Dirhams'}</span>
            </button>
            <button
              onClick={onStartTrial}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-sm sm:text-base transition-all active:scale-95 text-center"
            >
              {isArabic ? 'تجربة المنصة الآن' : 'Découvrir la Démo'}
            </button>
          </div>
        </div>
      </header>

      {/* SECTION ARGUMENTAIRE PRIX MAROC - COÛT PAR APPARTEMENT */}
      <section className="py-16 px-6 lg:px-16 bg-slate-900/60 border-y border-slate-800/80 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              {isArabic ? 'وضوح وشفافية مالية تامة' : 'Transparence & Économie Réelle'}
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              {isArabic ? 'كم تبلغ تكلفة نوفا سينديك لإقامتكم؟' : 'Combien coûte Nova Syndic pour votre immeuble ?'}
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              {isArabic 
                ? 'نموذج اشتراك رمزي ومدروس بعناية لتمكين كافة الإقامات بالمغرب من نظام تدبير مهني ومتطور.' 
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
                {isArabic ? 'اشتراك شهري (199 درهم / شهرياً)' : 'Mensuel (199 DH / mois)'}
              </button>
              <button
                onClick={() => setBillingCycle('year')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
                  billingCycle === 'year'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>{isArabic ? 'اشتراك سنوي (150 درهم / شهرياً)' : 'Annuel (150 DH / mois)'}</span>
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
              <div className="absolute -top-3 start-8 bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                {isArabic ? 'نموذج إقامة سكنية نموذجية (16 شقة)' : 'Exemple Typique Immeuble au Maroc'}
              </div>

              <div className="flex items-center gap-3 text-slate-300 font-semibold text-sm mb-4">
                <Building2 className="text-blue-400" size={20} />
                <span>
                  {isArabic 
                    ? 'بالنسبة لإقامة سكنية تتكون من 16 شقة :' 
                    : 'Pour un immeuble de 16 appartements :'}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl lg:text-6xl font-black text-white">
                    {billingCycle === 'year' ? '≈ 9 دراهم' : '≈ 12 درهماً'}
                  </span>
                  <span className="text-lg font-bold text-slate-400">
                    {isArabic ? '/ للشقة في الشهر' : '/ appartement / mois'}
                  </span>
                </div>
                <p className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Sparkles size={16} />
                  <span>
                    {isArabic 
                      ? 'مبلغ رمزي يضمن لكم الشفافية التامة وراحة البال بين الجيران.' 
                      : 'Un prix dérisoire pour en finir avec les litiges et les oublis.'}
                  </span>
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <p>
                  • <strong>{isArabic ? 'الاشتراك الشهري :' : 'Abonnement mensuel :'}</strong> 199 DH / {isArabic ? 'شهرياً لكامل الإقامة (ما يعادل تقريباً 12.40 درهم للشقة)' : 'mois pour tout l\'immeuble (soit ≈ 12,40 DH par lot)'}.
                </p>
                <p>
                  • <strong>{isArabic ? 'الاشتراك السنوي :' : 'Abonnement annuel :'}</strong> 1 800 DH / {isArabic ? 'سنوياً، أي 150 درهماً للشهر (ما يعادل تقريباً 9.35 دراهم للشقة)' : 'an, soit 150 DH / mois (soit ≈ 9,35 DH par lot)'}.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={billingCycle === 'year' ? 'https://buy.stripe.com/5kQ3cvbwCeV9b3R1eugbm0y' : 'https://buy.stripe.com/14A28reIO28n1thbT8gbm0x'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <Sparkles size={18} className="text-yellow-300" />
                  <span>
                    {isArabic 
                      ? `الاشتراك الآن عبر البطاقة البنكية (${billingCycle === 'year' ? '1 800 درهم / سنوياً' : '199 درهم / شهرياً'})`
                      : `S'abonner maintenant via Stripe (${billingCycle === 'year' ? '1 800 DH / an' : '199 DH / mois'})`}
                  </span>
                </a>
                <p className="text-center text-[11px] text-slate-500 mt-2 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  <span>{isArabic ? 'أداء إلكتروني آمن 100% موثق بواسطة منصة Stripe' : 'Paiement sécurisé 100% garanti par Stripe'}</span>
                </p>
              </div>
            </div>

            {/* Avantages Inclus */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-blue-400" size={24} />
                <span>{isArabic ? 'المزايا الأساسية لنظام نوفا سينديك :' : 'Ce que cela remplace dans votre gestion :'}</span>
              </h3>

              <div className="space-y-3">
                {[
                  {
                    title: isArabic ? "استخلاص رقمي منظم وتوثيق فوري" : "Recouvrement 100% digitalisé",
                    desc: isArabic 
                      ? "معرفة المبالغ المستخلصة والمتأخرات بدقة وبضغطة زر واحدة دون أي حرج مع الملاك." 
                      : "Terminé les cahiers égarés et les doutes sur qui a payé sa cotisation du mois."
                  },
                  {
                    title: isArabic ? "مساعد قانوني بالذكاء الاصطناعي (القانون 18.00)" : "Assistant IA Juridique Loi 18-00",
                    desc: isArabic 
                      ? "إجابات قانونية موثوقة وفورية حول الأغلبية المطلوبة بالجموع العامة والأجزاء المشتركة." 
                      : "Posez toutes vos questions sur les majorités en AG, les impayés et les parties communes."
                  },
                  {
                    title: isArabic ? "صياغة استدعاءات ومحاضر الجموع العامة" : "PV d'Assemblée Générale en 3 clics",
                    desc: isArabic 
                      ? "إعداد محاضر الجموع العامة الرسمية بصيغة قانونية جاهزة للطباعة والتوقيع خلال دقائق." 
                      : "Générez des procès-verbaux juridiquement clairs et prêts à imprimer."
                  },
                  {
                    title: isArabic ? "سداد إلكتروني آمن وفواتير معتمدة" : "Paiement de l'abonnement par Carte Bancaire",
                    desc: isArabic 
                      ? "أداء رسمي ومحمي بالدرهم المغربي مع إصدار فوري لوصل وسجل الاشتراك." 
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
        <p>© 2026 Nova Syndic Maroc &bull; {isArabic ? 'صُمم خصيصاً للإقامات السكنية بالمملكة المغربية بما يتوافق مع مقتضيات القانون رقم 18.00 المتعلق بالملكية المشتركة.' : 'Conçu pour les copropriétés au Maroc en conformité avec la Loi 18-00.'}</p>
      </footer>
    </div>
  );
};
export default LandingPage;
