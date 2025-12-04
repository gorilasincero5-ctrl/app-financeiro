import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { BudgetCategory } from '../types';

export const Budgets: React.FC = () => {
  const navigate = useNavigate();

  const categories: BudgetCategory[] = [
    { id: '1', name: 'Moradia', spent: 1250, limit: 1500, icon: 'home', colorClass: 'bg-primary' },
    { id: '2', name: 'Transporte', spent: 150, limit: 300, icon: 'directions_car', colorClass: 'bg-primary' },
    { id: '3', name: 'Alimentação', spent: 850, limit: 800, icon: 'restaurant', colorClass: 'bg-red-500' }, // Over budget
    { id: '4', name: 'Lazer', spent: 100, limit: 400, icon: 'sports_esports', colorClass: 'bg-primary' },
    { id: '5', name: 'Saúde', spent: 320, limit: 500, icon: 'health_and_safety', colorClass: 'bg-primary' },
    { id: '6', name: 'Educação', spent: 0, limit: 200, icon: 'school', colorClass: 'bg-primary' },
  ];

  const getProgress = (spent: number, limit: number) => Math.min((spent / limit) * 100, 100);

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 px-4 py-3 backdrop-blur-sm">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-start">
            <Icon name="arrow_back_ios_new" className="text-zinc-800 dark:text-zinc-200 text-xl" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-zinc-900 dark:text-white">Categorias e Orçamento</h1>
        <div className="flex size-10 items-center justify-end">
            <button 
              onClick={() => alert("Funcionalidade: Adicionar nova categoria de orçamento")}
              className="flex items-center justify-center rounded-full bg-primary p-2 text-background-dark shadow-md active:scale-95 transition-transform"
            >
                <Icon name="add" className="text-xl" />
            </button>
        </div>
      </header>

      <main className="flex-1 space-y-3 p-4">
        {categories.map(cat => (
          <div 
            key={cat.id} 
            onClick={() => alert(`Detalhes do orçamento: ${cat.name}`)}
            className="flex items-center gap-4 rounded-xl bg-white p-3 shadow-sm dark:bg-white/5 cursor-pointer active:bg-zinc-50 dark:active:bg-white/10 transition-colors"
          >
            <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${cat.colorClass === 'bg-red-500' ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'}`}>
                <Icon name={cat.icon} />
            </div>
            <div className="flex-1">
                <div className="flex items-baseline justify-between">
                    <p className="text-base font-bold text-zinc-900 dark:text-white">{cat.name}</p>
                    <p className={`text-xs font-medium ${cat.spent > cat.limit ? 'text-red-500' : 'text-zinc-500 dark:text-zinc-400'}`}>
                        R$ {cat.spent} / R$ {cat.limit}
                    </p>
                </div>
                <div className="mt-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 h-1.5">
                    <div 
                        className={`h-full rounded-full ${cat.colorClass}`} 
                        style={{ width: `${getProgress(cat.spent, cat.limit)}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex size-8 shrink-0 items-center justify-center">
                <Icon name="chevron_right" className="text-zinc-400 dark:text-zinc-500" />
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};