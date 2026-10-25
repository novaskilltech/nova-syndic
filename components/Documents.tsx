
import React from 'react';
import { FileText, Download, ShieldCheck, Share2 } from 'lucide-react';

const Documents: React.FC = () => {
  const categories = [
    { name: 'PV Assemblée Générale', count: 12, icon: <FileText size={20} className="text-blue-500" /> },
    { name: 'Contrats & Assurances', count: 5, icon: <ShieldCheck size={20} className="text-emerald-500" /> },
    { name: 'Règlement Copropriété', count: 2, icon: <FileText size={20} className="text-indigo-500" /> },
    { name: 'Factures Fournisseurs', count: 45, icon: <Share2 size={20} className="text-amber-500" /> },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Documents & Archives</h2>
          <p className="text-gray-500">Tous vos documents officiels centralisés</p>
        </div>
        <button className="bg-white border text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 shadow-sm transition-colors">
          Importer un document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer group">
            <div className="mb-4">{cat.icon}</div>
            <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.count} fichiers</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Documents Récents</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { name: 'PV AG extraordinaire 2023.pdf', size: '1.2 MB', date: '12 Jan 2024' },
            { name: 'Contrat Ascenseur Schindler.pdf', size: '4.5 MB', date: '05 Jan 2024' },
            { name: 'Assurance Multirisque Immeuble.pdf', size: '2.8 MB', date: '20 Dec 2023' },
          ].map((doc, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="text-gray-400" />
                <div>
                  <div className="font-medium text-gray-900">{doc.name}</div>
                  <div className="text-xs text-gray-500">{doc.size} • Ajouté le {doc.date}</div>
                </div>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documents;
