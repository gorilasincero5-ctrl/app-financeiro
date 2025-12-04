export interface Transaction {
  id: string;
  title: string;
  subtitle?: string;
  amount: number;
  date: string; // ISO date string
  type: 'expense' | 'income';
  categoryIcon: string;
  categoryColorClass: string;
  isRecurring?: boolean;
}

export interface BudgetCategory {
  id: string;
  name: string;
  spent: number;
  limit: number;
  icon: string;
  colorClass: string; // e.g., 'bg-primary', 'bg-red-500'
}

export interface SavingsGoal {
  id: string;
  title: string;
  timeLeft: string;
  currentAmount: number;
  targetAmount: number;
  status: 'active' | 'completed';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  colorClass: string; // Background color class
  textClass: string; // Text color class
  type: 'expense' | 'income' | 'both';
}
