
import React, { useState } from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { ArrowUpRight, ArrowDownLeft, Calendar, Tag, Plus, Download, Printer, X } from 'lucide-react';

const Finances: React.FC = () => {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'INCOME' | 'EXPENSE'>('INCOME');
  const [newTx, setNewTx] = useState({ description: '', amount: 0, category: 'Charges', date: new Date().toISOString().split('T')[0] });

  const handleAddTx = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (transactions.length + 1).toString();
    setTransactions([{ ...newTx, id, type: modalType, status: 'COMPLETED' }, ...transactions]);
    setIsModalOpen(false);
    setNewTx({ description: '', amount: 0, category: 'Charges', date: new Date().toISOString().split('T')[0] });
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Categorie', 'Type', 'Montant'];
    const rows = transactions.map(t => [t.date, t.description, t.category, t.type, t.amount]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "finances_syndic.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Gestion Financière</h2>
          <p className="text-gray-500">Suivi des recettes et dépenses</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => { setModalType('INCOME'); setIsModalOpen(true); }}
            className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={18} /> Encaisser
          </button>
          <button 
            onClick={() => { setModalType('EXPENSE'); setIsModalOpen(true); }}
            className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors shadow-sm flex items-center gap-2"
          >
            <Plus size={18} /> Payer
          </button>
          <button onClick={exportCSV} className="p-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50">
            <Download size={20} />
          </button>
          <button onClick={() => window.print()} className="p-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50">
            <Printer size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-white p-5 rounded-xl shadow-sm border flex flex-col justify-between hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${
                tx.type === 'INCOME' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {tx.type === 'INCOME' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
              </div>
              <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
                tx.status === 'COMPLETED' ? 'bg-gray-100 text-gray-600' : 'bg-amber-100 text-amber-700'
              }`}>
                {tx.status}
              </span>
            </div>
            
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 line-clamp-1">{tx.description}</h4>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Tag size={12} />
                  {tx.category}
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Calendar size={12} />
                  {tx.date}
                </div>
              </div>
            </div>

            <div className={`text-xl font-bold ${
              tx.type === 'INCOME' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {tx.type === 'INCOME' ? '+' : '-'} {tx.amount.toLocaleString()} MAD
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{modalType === 'INCOME' ? 'Nouvelle Recette' : 'Nouvelle Dépense'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddTx} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Désignation / Motif</label>
                <input required type="text" className="w-full border rounded-lg p-2" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Montant (MAD)</label>
                  <input required type="number" className="w-full border rounded-lg p-2" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: Number(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input required type="date" className="w-full border rounded-lg p-2" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select className="w-full border rounded-lg p-2" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})}>
                  <option>Charges</option>
                  <option>Maintenance</option>
                  <option>Sécurité</option>
                  <option>Eau/Electricité</option>
                  <option>Nettoyage</option>
                  <option>Autres</option>
                </select>
              </div>
              <button type="submit" className={`w-full text-white py-3 rounded-xl font-bold ${modalType === 'INCOME' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'}`}>
                Confirmer l'opération
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Finances;
