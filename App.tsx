
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Owners from './components/Owners';
import Finances from './components/Finances';
import Maintenance from './components/Maintenance';
import Documents from './components/Documents';
import AIAssistant from './components/AIAssistant';
import LandingPage from './components/LandingPage';
import SubscriptionModal from './components/SubscriptionModal';
import { AppView } from './types';
import { Menu, X, Bell, Bot, CreditCard, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [showLanding, setShowLanding] = useState(false); // Toggle démo/landing

  const handleSubscribe = async (planInterval: 'month' | 'year') => {
    // Appel vers l'Edge Function Supabase create-checkout-session
    const supabaseUrl = 'https://jabdiekkjdayrfsinwct.supabase.co';
    const functionUrl = `${supabaseUrl}/functions/v1/syndic-stripe-checkout`;
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        planInterval,
        returnUrl: window.location.href.split('?')[0],
      }),
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error(data.error || 'Erreur lors de la création de la session Stripe');
    }
  };

  if (showLanding) {
    return (
      <>
        <LandingPage 
          onStartTrial={() => setShowLanding(false)} 
          onOpenPricing={() => setIsPricingModalOpen(true)} 
        />
        <SubscriptionModal 
          isOpen={isPricingModalOpen} 
          onClose={() => setIsPricingModalOpen(false)}
          onSubscribe={handleSubscribe}
        />
      </>
    );
  }

  const renderView = () => {
    switch (activeView) {
      case AppView.DASHBOARD: return <Dashboard />;
      case AppView.OWNERS: return <Owners />;
      case AppView.FINANCES: return <Finances />;
      case AppView.MAINTENANCE: return <Maintenance />;
      case AppView.DOCUMENTS: return <Documents />;
      case AppView.AI_ASSISTANT: return <AIAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar Desktop */}
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 transition-all duration-300">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500">Maroc, Casablanca</span>
              <button 
                onClick={() => setShowLanding(true)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1"
              >
                <Sparkles size={12} className="text-blue-600" />
                <span>Voir Landing Page</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Bouton d'Abonnement Stripe */}
            <button 
              onClick={() => setIsPricingModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
            >
              <CreditCard size={14} />
              <span>Abonnement (dès 150 DH/mois)</span>
            </button>

            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-1"></div>
            
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">Syndic Residence Al Firdaous</p>
                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Compte Administrateur</p>
              </div>
              <img 
                src="https://picsum.photos/seed/user/100/100" 
                alt="Avatar" 
                className="w-10 h-10 rounded-full border-2 border-blue-500 p-0.5"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-72 bg-white h-full shadow-2xl animate-slideInLeft">
            <div className="p-6 flex justify-between items-center border-b">
              <h1 className="text-xl font-bold text-blue-600">SyndicApp</h1>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                <X size={24} />
              </button>
            </div>
            <nav className="p-4 space-y-2">
              {[
                { id: AppView.DASHBOARD, label: 'Tableau de bord' },
                { id: AppView.OWNERS, label: 'Copropriétaires' },
                { id: AppView.FINANCES, label: 'Finances' },
                { id: AppView.MAINTENANCE, label: 'Maintenance' },
                { id: AppView.DOCUMENTS, label: 'Documents' },
                { id: AppView.AI_ASSISTANT, label: 'Assistant IA' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium ${
                    activeView === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsPricingModalOpen(true);
                  }}
                  className="w-full text-center py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md"
                >
                  S'abonner à Nova Syndic
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Floating Action Button for Mobile Chat */}
      {activeView !== AppView.AI_ASSISTANT && (
        <button 
          onClick={() => setActiveView(AppView.AI_ASSISTANT)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 md:hidden"
        >
          <Bot size={28} />
        </button>
      )}

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={isPricingModalOpen} 
        onClose={() => setIsPricingModalOpen(false)}
        onSubscribe={handleSubscribe}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
