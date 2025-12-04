import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { SavingsGoal } from '../types';

export const Goals: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'active' | 'completed'>('active');

  // Extended mocked data to test filters
  const goals: SavingsGoal[] = [
    { id: '1', title: 'Viagem para a Praia', timeLeft: 'Faltam 3 meses', currentAmount: 1500, targetAmount: 3000, status: 'active' },
    { id: '2', title: 'Novo Celular', timeLeft: 'Faltam 8 meses', currentAmount: 4000, targetAmount: 5000, status: 'active' },
    { id: '3', title: 'Reserva de Emergência', timeLeft: 'Em andamento', currentAmount: 2500, targetAmount: 10000, status: 'active' },
    { id: '4', title: 'Notebook Novo', timeLeft: 'Concluído em Maio', currentAmount: 6000, targetAmount: 6000, status: 'completed' },
  ];

  const filteredGoals = goals.filter(g => g.status === filter);

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 p-4 pb-2 backdrop-blur-sm dark:bg-background-dark/95">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center">
          <Icon name="arrow_back_ios_new" className="text-zinc-800 dark:text-zinc-200 text-xl" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight text-zinc-900 dark:text-white">Metas de Economia</h1>
        <div className="flex w-12 items-center justify-end">
          <button 
            onClick={() => alert("Funcionalidade: Adicionar nova meta")}
            className="flex h-12 cursor-pointer items-center justify-center bg-transparent p-0 text-zinc-800 dark:text-white"
          >
            <Icon name="add_circle" className="text-2xl" />
          </button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        {/* Filter */}
        <div className="px-4 py-3">
          <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-zinc-200/50 p-1 dark:bg-zinc-800/50">
            <button 
              onClick={() => setFilter('active')}
              className={`flex h-full grow items-center justify-center rounded-md text-sm font-medium transition-all ${filter === 'active' ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-700/50'}`}
            >
              Ativas
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`flex h-full grow items-center justify-center rounded-md text-sm font-medium transition-all ${filter === 'completed' ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-700/50'}`}
            >
              Concluídas
            </button>
          </div>
        </div>

        {/* Goals List */}
        <div className="flex flex-col gap-4 p-4 pt-1 pb-24">
          {filteredGoals.length === 0 && (
            <div className="py-10 text-center text-zinc-500">
                Nenhuma meta {filter === 'active' ? 'ativa' : 'concluída'} encontrada.
            </div>
          )}
          {filteredGoals.map(goal => {
            const percentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            return (
              <div key={goal.id} className="flex flex-col items-stretch justify-start rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-900/50 border border-transparent dark:border-zinc-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-lg font-bold leading-tight text-zinc-900 dark:text-white">{goal.title}</p>
                    <p className="text-sm font-normal leading-normal text-zinc-500 dark:text-zinc-400">{goal.timeLeft}</p>
                  </div>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                    <Icon name="more_horiz" />
                  </button>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                    <div className="h-2 rounded-full bg-primary" style={{ width: `${percentage}%` }}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <p className="font-medium text-zinc-800 dark:text-zinc-200">
                      <span className="font-bold text-primary">R$ {goal.currentAmount.toLocaleString('pt-BR')}</span> de R$ {goal.targetAmount.toLocaleString('pt-BR')}
                    </p>
                    <p className="font-semibold text-zinc-600 dark:text-zinc-300">{percentage}%</p>
                  </div>
                </div>
                {goal.status === 'active' && (
                  <div className="mt-4 flex items-center justify-end">
                    <button 
                        onClick={() => alert(`Adicionar fundos à meta: ${goal.title}`)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary/20 px-4 py-2 text-sm font-bold text-primary active:bg-primary/30 transition-colors"
                    >
                      <Icon name="add" className="text-lg" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <div className="fixed bottom-6 right-6 z-10">
        <button 
            onClick={() => alert("Funcionalidade: Adicionar nova meta")}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg active:scale-95 transition-transform"
        >
          <Icon name="add" className="text-2xl" />
        </button>
      </div>
    </div>
  );
};