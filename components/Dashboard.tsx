
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, Clock } from 'lucide-react';

const data = [
  { name: 'Jan', income: 12000, expense: 8000 },
  { name: 'Feb', income: 15000, expense: 9500 },
  { name: 'Mar', income: 11000, expense: 12000 },
  { name: 'Apr', income: 18000, expense: 7000 },
  { name: 'May', income: 14000, expense: 9000 },
];

const pieData = [
  { name: 'Maintenance', value: 400 },
  { name: 'Nettoyage', value: 300 },
  { name: 'Sécurité', value: 300 },
  { name: 'Electricité', value: 200 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <header>
        <h2 className="text-2xl font-bold text-gray-800">Tableau de Bord</h2>
        <p className="text-gray-500">Aperçu global de votre copropriété</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Solde Total', value: '45,200 MAD', icon: <Wallet className="text-blue-500" />, trend: '+2.5%' },
          { label: 'Recettes (Mois)', value: '14,000 MAD', icon: <TrendingUp className="text-emerald-500" />, trend: '+12%' },
          { label: 'Dépenses (Mois)', value: '9,000 MAD', icon: <TrendingDown className="text-rose-500" />, trend: '-5%' },
          { label: 'Impayés', value: '12,400 MAD', icon: <Clock className="text-amber-500" />, trend: '+1%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
            <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Flux de trésorerie (MAD)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="income" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Recettes" />
                <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} name="Dépenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="text-lg font-semibold mb-6">Répartition Dépenses</h3>
          <div className="h-[300px] flex flex-col items-center">
            <ResponsiveContainer width="100%" height="200">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2 w-full">
              {pieData.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value} MAD</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
