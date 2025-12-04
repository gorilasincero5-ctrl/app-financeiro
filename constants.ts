import { Category } from './types';

export const CATEGORIES: Category[] = [
  // Despesas (Expenses)
  { id: 'food', name: 'Alimentação', icon: 'restaurant', colorClass: 'bg-orange-500/20', textClass: 'text-orange-500', type: 'expense' },
  { id: 'housing', name: 'Moradia', icon: 'home', colorClass: 'bg-blue-500/20', textClass: 'text-blue-500', type: 'expense' },
  { id: 'transport', name: 'Transporte', icon: 'directions_car', colorClass: 'bg-emerald-500/20', textClass: 'text-emerald-500', type: 'expense' },
  { id: 'shopping', name: 'Compras', icon: 'shopping_bag', colorClass: 'bg-pink-500/20', textClass: 'text-pink-500', type: 'expense' },
  { id: 'leisure', name: 'Lazer', icon: 'sports_esports', colorClass: 'bg-purple-500/20', textClass: 'text-purple-500', type: 'expense' },
  { id: 'health', name: 'Saúde', icon: 'medical_services', colorClass: 'bg-red-500/20', textClass: 'text-red-500', type: 'expense' },
  { id: 'education', name: 'Educação', icon: 'school', colorClass: 'bg-indigo-500/20', textClass: 'text-indigo-500', type: 'expense' },
  { id: 'bills', name: 'Contas', icon: 'receipt_long', colorClass: 'bg-rose-500/20', textClass: 'text-rose-500', type: 'expense' },
  { id: 'pets', name: 'Pets', icon: 'pets', colorClass: 'bg-amber-500/20', textClass: 'text-amber-500', type: 'expense' },

  // Receitas (Income)
  { id: 'salary', name: 'Salário', icon: 'payments', colorClass: 'bg-primary/20', textClass: 'text-primary', type: 'income' },
  { id: 'investment', name: 'Investimentos', icon: 'trending_up', colorClass: 'bg-cyan-500/20', textClass: 'text-cyan-500', type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: 'work', colorClass: 'bg-yellow-500/20', textClass: 'text-yellow-500', type: 'income' },
  { id: 'gift', name: 'Presente', icon: 'card_giftcard', colorClass: 'bg-pink-400/20', textClass: 'text-pink-400', type: 'income' },

  // Ambos (Both)
  { id: 'others', name: 'Outros', icon: 'more_horiz', colorClass: 'bg-zinc-500/20', textClass: 'text-zinc-500', type: 'both' },
];