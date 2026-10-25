
import React, { useState } from 'react';
import { MOCK_OWNERS } from '../constants';
import { Search, Plus, Phone, Mail, MoreVertical, Download, Printer, Share2, X } from 'lucide-react';

const Owners: React.FC = () => {
  const [owners, setOwners] = useState(MOCK_OWNERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOwner, setNewOwner] = useState({ name: '', lotNumber: '', phone: '', email: '', balance: 0 });

  const filteredOwners = owners.filter(o => 
    o.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddOwner = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (owners.length + 1).toString();
    setOwners([...owners, { ...newOwner, id }]);
    setNewOwner({ name: '', lotNumber: '', phone: '', email: '', balance: 0 });
    setIsModalOpen(false);
  };

  const exportToCSV = () => {
    const headers = ['Nom', 'Lot', 'Telephone', 'Email', 'Solde'];
    const rows = owners.map(o => [o.name, o.lotNumber, o.phone, o.email, o.balance]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "coproprietaires_syndic.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Liste des Copropriétaires',
          text: `Il y a ${owners.length} copropriétaires enregistrés dans le système.`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Erreur de partage:', err);
      }
    } else {
      alert("Le partage n'est pas supporté sur ce navigateur.");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Copropriétaires</h2>
          <p className="text-gray-500">Gérez les résidents et leurs informations</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Ajouter</span>
          </button>
          <button onClick={exportToCSV} className="p-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50" title="Télécharger Excel">
            <Download size={20} />
          </button>
          <button onClick={handlePrint} className="p-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50" title="Imprimer">
            <Printer size={20} />
          </button>
          <button onClick={handleShare} className="p-2 bg-white border rounded-lg text-gray-600 hover:bg-gray-50" title="Partager">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex items-center gap-4 no-print">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto print:overflow-visible">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">Nom & Lot</th>
                <th className="px-6 py-4 font-semibold">Contact</th>
                <th className="px-6 py-4 font-semibold">Solde (MAD)</th>
                <th className="px-6 py-4 font-semibold text-right no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">{owner.name}</div>
                      <div className="text-sm text-gray-500">{owner.lotNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} className="text-gray-400" />
                        {owner.phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail size={14} className="text-gray-400" />
                        {owner.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${
                      owner.balance < 0 ? 'text-rose-600' : owner.balance > 0 ? 'text-emerald-600' : 'text-gray-900'
                    }`}>
                      {owner.balance.toLocaleString()} MAD
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right no-print">
                    <button className="p-1 hover:bg-gray-200 rounded transition-colors text-gray-400">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ajout */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-fadeIn">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Nouveau Copropriétaire</h3>
              <button onClick={() => setIsModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleAddOwner} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                <input required type="text" className="w-full border rounded-lg p-2" value={newOwner.name} onChange={e => setNewOwner({...newOwner, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Appartement / Lot</label>
                  <input required type="text" className="w-full border rounded-lg p-2" value={newOwner.lotNumber} onChange={e => setNewOwner({...newOwner, lotNumber: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Solde Initial (MAD)</label>
                  <input type="number" className="w-full border rounded-lg p-2" value={newOwner.balance} onChange={e => setNewOwner({...newOwner, balance: Number(e.target.value)})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                <input type="tel" className="w-full border rounded-lg p-2" value={newOwner.phone} onChange={e => setNewOwner({...newOwner, phone: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                Enregistrer le copropriétaire
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owners;
