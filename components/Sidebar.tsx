
import React from 'react';
import { NAVIGATION_ITEMS } from '../constants';
import { AppView } from '../types';
import { Building2 } from 'lucide-react';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <div className="w-64 bg-white border-r h-screen fixed left-0 top-0 hidden md:flex flex-col shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-black tracking-tight text-blue-600 flex items-center gap-2">
          <img 
            src="/logo.jpg" 
            alt="Nova Syndic" 
            className="w-8 h-8 rounded-lg object-cover shadow-sm border border-blue-200"
          />
          <span>Nova<span className="text-gray-900">Syndic</span></span>
          <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-md ml-auto">
            MAROC
          </span>
        </h1>
      </div>
      
      <nav className="flex-1 mt-2 px-4 space-y-1">
        {NAVIGATION_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeView === item.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mini banner argumentaire */}
      <div className="mx-4 mb-4 p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl text-xs text-blue-900">
        <p className="font-bold">Pour 16 appartements :</p>
        <p className="text-emerald-600 font-extrabold mt-0.5">≈ 9 à 12 DH / appart / mois</p>
        <p className="text-[10px] text-gray-500 mt-1">Loi 18-00 marocaine</p>
      </div>

      <div className="p-4 border-t text-[11px] text-gray-400 text-center font-medium">
        © 2026 Nova Syndic Maroc
      </div>
    </div>
  );
};

export default Sidebar;
