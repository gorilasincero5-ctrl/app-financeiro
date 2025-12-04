import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const [monthIdx, setMonthIdx] = useState(9); // Outubro
  const [selectedDay, setSelectedDay] = useState(17);
  
  const currentMonth = months[monthIdx];
  const year = 2024;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 2; // Mock offset

  const prevMonth = () => setMonthIdx((prev) => (prev - 1 + 12) % 12);
  const nextMonth = () => setMonthIdx((prev) => (prev + 1) % 12);

  const renderDay = (day: number) => {
    // Mock events based on image
    const hasIncome = day === 5 || day === 20;
    const hasExpense = day === 10 || day === 15;
    const isToday = day === 17 && currentMonth === 'Outubro'; // Static today logic for demo
    const isSelected = day === selectedDay;
    const hasTwoDots = day === 10;

    let buttonClass = "h-12 w-full text-sm font-medium relative group outline-none";
    let textClass = "flex size-full items-center justify-center rounded-full transition-all duration-200";
    
    if (isSelected) {
       textClass += " bg-primary text-background-dark font-bold scale-110 shadow-sm";
    } else {
       textClass += " text-zinc-700 dark:text-zinc-300 group-hover:bg-zinc-100 dark:group-hover:bg-white/5 active:scale-95";
    }

    return (
      <button key={day} onClick={() => setSelectedDay(day)} className={buttonClass}>
        <div className={textClass}>
          {day}
          <div className="absolute bottom-2 flex gap-1">
             {hasIncome && <div className={`size-1.5 rounded-full ${isSelected ? 'bg-background-dark' : 'bg-green-500'}`}></div>}
             {hasExpense && <div className={`size-1.5 rounded-full ${isSelected ? 'bg-background-dark' : 'bg-red-500'}`}></div>}
             {hasTwoDots && <div className="size-1.5 rounded-full bg-red-500"></div>}
             {isToday && !hasIncome && !hasExpense && <div className="size-1.5 rounded-full bg-yellow-500"></div>}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 w-full bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
            <Icon name="arrow_back_ios_new" className="text-xl" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold tracking-tight text-zinc-800 dark:text-white transition-all">{currentMonth} {year}</h1>
          <div className="flex items-center gap-2">
            <button onClick={prevMonth} className="flex size-10 items-center justify-center text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                <Icon name="chevron_left" className="text-2xl" />
            </button>
            <button onClick={nextMonth} className="flex size-10 items-center justify-center text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">
                <Icon name="chevron_right" className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-4 pb-28">
        {/* Calendar Grid */}
        <div className="w-full max-w-md self-center">
          <div className="grid grid-cols-7 text-center mb-2">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
              <p key={i} className="flex h-8 w-full items-center justify-center text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">{d}</p>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {Array.from({ length: startOffset }).map((_, i) => <div key={`empty-${i}`} className="h-12 w-full"></div>)}
            {days.map(day => renderDay(day))}
          </div>
        </div>

        {/* Selected Day Details Mock */}
        <div className="mt-8 flex flex-col gap-4">
            <h3 className="font-bold text-zinc-900 dark:text-white px-1">Resumo do dia {selectedDay}</h3>
            <div className="flex flex-wrap gap-4">
            <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Receitas</p>
                <p className="text-2xl font-bold tracking-tight text-green-500 dark:text-green-400">R$ {selectedDay === 5 ? '3.000,00' : '0,00'}</p>
            </div>
            <div className="flex min-w-[140px] flex-1 flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50 shadow-sm">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Despesas</p>
                <p className="text-2xl font-bold tracking-tight text-red-500 dark:text-red-400">R$ {selectedDay === 10 ? '450,50' : '0,00'}</p>
            </div>
            </div>
        </div>
      </main>

      <div className="fixed bottom-24 right-5 z-20">
        <button 
          onClick={() => navigate('/add?type=expense')}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-background-dark shadow-lg active:scale-95 transition-transform"
        >
          <Icon name="add" className="text-4xl" />
        </button>
      </div>
    </div>
  );
};