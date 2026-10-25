
import React from 'react';
import { LayoutDashboard, Users, Wallet, Wrench, FileText, Bot } from 'lucide-react';
import { AppView } from './types';

export const NAVIGATION_ITEMS = [
  { id: AppView.DASHBOARD, label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
  { id: AppView.OWNERS, label: 'Copropriétaires', icon: <Users size={20} /> },
  { id: AppView.FINANCES, label: 'Finances', icon: <Wallet size={20} /> },
  { id: AppView.MAINTENANCE, label: 'Maintenance', icon: <Wrench size={20} /> },
  { id: AppView.DOCUMENTS, label: 'Documents', icon: <FileText size={20} /> },
  { id: AppView.AI_ASSISTANT, label: 'Assistant IA', icon: <Bot size={20} /> },
];

export const MOCK_OWNERS = [
  { id: '1', name: 'Ahmed El Mansouri', lotNumber: 'Appt 101', phone: '06 12 34 56 78', email: 'ahmed@email.com', balance: -2500 },
  { id: '2', name: 'Fatima Zahra', lotNumber: 'Appt 102', phone: '06 87 65 43 21', email: 'fatima@email.com', balance: 0 },
  { id: '3', name: 'Karim Bennani', lotNumber: 'Appt 201', phone: '06 11 22 33 44', email: 'karim@email.com', balance: 500 },
  { id: '4', name: 'Youssef Alami', lotNumber: 'Appt 202', phone: '06 55 44 33 22', email: 'youssef@email.com', balance: -1200 },
];

export const MOCK_TRANSACTIONS = [
  { id: '1', type: 'INCOME', category: 'Charges', amount: 300, date: '2024-05-01', description: 'Cotisation Appt 102', status: 'COMPLETED' },
  { id: '2', type: 'EXPENSE', category: 'Maintenance', amount: 1500, date: '2024-05-05', description: 'Réparation Ascenseur', status: 'COMPLETED' },
  { id: '3', type: 'EXPENSE', category: 'Nettoyage', amount: 2000, date: '2024-05-10', description: 'Société de nettoyage', status: 'PENDING' },
  { id: '4', type: 'INCOME', category: 'Charges', amount: 300, date: '2024-05-12', description: 'Cotisation Appt 201', status: 'COMPLETED' },
];

export const MOCK_MAINTENANCE = [
  { id: '1', title: 'Fuite tuyauterie sous-sol', status: 'OPEN', priority: 'HIGH', date: '2024-05-15' },
  { id: '2', title: 'Remplacement ampoules hall', status: 'IN_PROGRESS', priority: 'LOW', date: '2024-05-14' },
  { id: '3', title: 'Peinture porte entrée', status: 'CLOSED', priority: 'MEDIUM', date: '2024-05-10' },
];
