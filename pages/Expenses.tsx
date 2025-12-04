import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Transaction } from '../types';
import { VoiceAssistant } from '../components/VoiceAssistant';

export const Expenses: React.FC = () => {
  const navigate = useNavigate();
  const [showVoice, setShowVoice] = useState(false);
  
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const [monthIdx, setMonthIdx] = useState(5); // Start at June
  const currentMonth = months[monthIdx];

  const prevMonth = () => setMonthIdx((prev) => (prev - 1 + 12) % 12);
  const nextMonth = () => setMonthIdx((prev) => (prev + 1) % 12);

  const expenses: Transaction[] = [
    {
      id: '1', title: 'Almoço', subtitle: '15 de Junho', amount: 25.00, date: '', type: 'expense',
      categoryIcon: 'restaurant', categoryColorClass: 'bg-emerald-500/20 text-emerald-500', isRecurring: true
    },
    {
      id: '2', title: 'Café Padaria', subtitle: '15 de Junho', amount: 7.00, date: '', type: 'expense',
      categoryIcon: 'local_cafe', categoryColorClass: 'bg-amber-500/20 text-amber-500'
    },
    {
      id: '3', title: 'Transporte', subtitle: '05 de Junho', amount: 150.00, date: '', type: 'expense',
      categoryIcon: 'directions_bus', categoryColorClass: 'bg-indigo-500/20 text-indigo-500', isRecurring: true
    },
    {
      id: '4', title: 'Supermercado', subtitle: '03 de Junho', amount: 488.50, date: '', type: 'expense',
      categoryIcon: 'shopping_cart', categoryColorClass: 'bg-rose-500/20 text-rose-500'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-background-light/95 px-4 backdrop-blur-sm dark:bg-background-dark/95 border-b border-transparent dark:border-zinc-800/50">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start">
          <Icon name="arrow_back_ios_new" className="text-zinc-900 dark:text-zinc-100 text-xl" />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold text-zinc-900 dark:text-white">Minhas Despesas</h1>
        <button onClick={() => navigate('/budgets')} className="flex size-12 shrink-0 items-center justify-end">
           <Icon name="pie_chart" className="text-zinc-900 dark:text-white text-xl" />
        </button>
      </header>

      <main className="flex-1 px-4 pb-28">
        {/* Summary Card */}
        <section className="mt-4">
          <div className="flex flex-col items-stretch justify-start rounded-xl bg-zinc-100 p-5 dark:bg-zinc-800/50">
            <p className="text-sm font-normal leading-normal text-zinc-600 dark:text-zinc-400">Total Gasto em {currentMonth}</p>
            <p className="text-3xl font-bold leading-tight tracking-tighter text-zinc-900 dark:text-white mt-1">R$ 1.250,00</p>
            <div className="mt-2 flex items-end justify-between">
              <div className="flex flex-col">
                <p className="text-sm font-normal leading-normal text-zinc-600 dark:text-zinc-400">Balanço do mês</p>
                <p className="text-sm font-bold leading-normal text-green-600 dark:text-green-400">+5% em relação a Maio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Month Selector */}
        <section className="mt-6">
          <div className="flex items-center justify-between gap-3 overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={prevMonth}
              className="flex h-10 flex-1 items-center justify-center gap-x-2 rounded-full bg-zinc-200/80 px-4 text-zinc-600 active:bg-zinc-300 dark:bg-zinc-800/80 dark:text-zinc-400 dark:active:bg-zinc-700 transition-colors"
            >
              <Icon name="chevron_left" />
            </button>
            <button className="flex h-10 flex-[3] shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary/20 px-4">
              <p className="text-sm font-bold leading-normal text-primary">{currentMonth}</p>
              <Icon name="expand_more" className="text-primary" />
            </button>
            <button 
              onClick={nextMonth}
              className="flex h-10 flex-1 items-center justify-center gap-x-2 rounded-full bg-zinc-200/80 px-4 text-zinc-600 active:bg-zinc-300 dark:bg-zinc-800/80 dark:text-zinc-400 dark:active:bg-zinc-700 transition-colors"
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </section>

        {/* List */}
        <section className="mt-6 space-y-3">
          {expenses.map(expense => (
            <div key={expense.id} className="flex min-h-[72px] items-center gap-4 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-900/50">
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-lg ${expense.categoryColorClass}`}>
                    <Icon name={expense.categoryIcon} />
                </div>
                <div className="flex-1">
                    <p className="text-base font-bold leading-normal text-zinc-900 dark:text-white">{expense.title}</p>
                    <p className="text-sm font-medium leading-normal text-zinc-500 dark:text-zinc-400">{expense.subtitle}</p>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                    <p className="text-base font-bold text-zinc-900 dark:text-white">R$ {expense.amount.toFixed(2).replace('.', ',')}</p>
                    {expense.isRecurring && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 font-medium">
                            <Icon name="autorenew" className="text-[14px]" />
                            <span>Recorrente</span>
                        </div>
                    )}
                </div>
            </div>
          ))}
        </section>
      </main>

       {/* FAB Microphone */}
      <div className="fixed bottom-24 right-6 z-10">
        <button 
          onClick={() => setShowVoice(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background-dark shadow-lg shadow-primary/30 active:scale-95 transition-transform"
        >
          <Icon name="mic" className="text-[32px] fill-1" />
        </button>
      </div>

      {/* Voice Assistant Overlay */}
      {showVoice && <VoiceAssistant onClose={() => setShowVoice(false)} />}
    </div>
  );
};