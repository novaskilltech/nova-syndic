
import React, { useState } from 'react';
import { MOCK_MAINTENANCE } from '../constants';
import { AlertCircle, Clock, CheckCircle2, ChevronRight, Plus, Share2, X } from 'lucide-react';

const Maintenance: React.FC = () => {
  const [issues, setIssues] = useState(MOCK_MAINTENANCE);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({ title: '', priority: 'MEDIUM' as 'LOW' | 'MEDIUM' | 'HIGH' });

  const handleAddIssue = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (issues.length + 1).toString();
    setIssues([{ 
      id, 
      title: newIssue.title, 
      priority: newIssue.priority, 
      status: 'OPEN', 
      date: new Date().toISOString().split('T')[0] 
    }, ...issues]);
    setIsModalOpen(false);
    setNewIssue({ title: '', priority: 'MEDIUM' });
  };

  const handleShare = (issue: any) => {
    if (navigator.share) {
      navigator.share({
        title: `Intervention: ${issue.title}`,
        text: `Statut: ${issue.status} | Priorité: ${issue.priority} | Date: ${issue.date}`,
        url: window.location.href
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center no-print">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Interventions & Maintenance</h2>
          <p className="text-gray-500">Suivi des travaux et réparations de l'immeuble</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Signaler
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {issues.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${
                item.status === 'OPEN' ? 'bg-rose-100 text-rose-600' :
                item.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-600' :
                'bg-emerald-100 text-emerald-600'
              }`}>
                {item.status === 'OPEN' ? <AlertCircle size={20} /> :
                 item.status === 'IN_PROGRESS' ? <Clock size={20} /> :
                 <CheckCircle2 size={20} />}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{item.title}</h4>
                <div className="flex items-center gap-3 text-xs mt-1">
                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                    item.priority === 'HIGH' ? 'bg-rose-100 text-rose-700' :
                    item.priority === 'MEDIUM' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    Priorité {item.priority}
                  </span>
                  <span className="text-gray-400">{item.date}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleShare(item)}
                className="p-2 text-gray-400 hover:text-blue-600 no-print"
              >
                <Share2 size={18} />
              </button>
              <span className={`text-sm font-medium ${
                item.status === 'OPEN' ? 'text-rose-600' :
                item.status === 'IN_PROGRESS' ? 'text-amber-600' :
                'text-emerald-600'
              }`}>
                {item.status === 'OPEN' ? 'À traiter' :
                 item.status === 'IN_PROGRESS' ? 'En cours' :
                 'Terminé'}
              </span>
              <ChevronRight className="text-gray-300 no-print" />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Signaler un Problème</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddIssue} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description du problème</label>
                <textarea required className="w-full border rounded-lg p-2 resize-none" rows={3} value={newIssue.title} onChange={e => setNewIssue({...newIssue, title: e.target.value})} placeholder="Ex: Panne ascenseur, ampoule grillée..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                <select className="w-full border rounded-lg p-2" value={newIssue.priority} onChange={e => setNewIssue({...newIssue, priority: e.target.value as any})}>
                  <option value="LOW">Basse</option>
                  <option value="MEDIUM">Moyenne</option>
                  <option value="HIGH">Haute / Urgente</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                Signaler l'incident
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
