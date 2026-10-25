
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  OWNERS = 'OWNERS',
  FINANCES = 'FINANCES',
  MAINTENANCE = 'MAINTENANCE',
  DOCUMENTS = 'DOCUMENTS',
  AI_ASSISTANT = 'AI_ASSISTANT'
}

export interface Owner {
  id: string;
  name: string;
  lotNumber: string;
  phone: string;
  email: string;
  balance: number;
}

export interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'PENDING' | 'COMPLETED';
}

export interface MaintenanceIssue {
  id: string;
  title: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
