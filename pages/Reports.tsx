import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const Reports: React.FC = () => {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('Este Mês');

  const data = [
    { name: 'Gastos', amount: period === 'Este Mês' ? 2150 : period === 'Mês Passado' ? 1800 : 25000, color: '#ff9500' },
    { name: 'Orçamento', amount: period === 'Este Mês' ? 2500 : period === 'Mês Passado' ? 2500 : 30000, color: '#007aff' },
  ];

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
       <header className="sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start text-zinc-900 dark:text-zinc-100">
            <Icon name="arrow_back_ios_new" className="text-xl" />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold leading-tight text-zinc-900 dark:text-zinc-100">Relatórios</h1>
          <div className="size-12 shrink-0"></div>
        </div>
      </header>

      <main className="flex flex-col gap-6 px-4 py-3 pb-28">
         {/* Period Selector */}
        <div className="flex">
            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50 p-1">
                {['Este Mês', 'Mês Passado', 'Este Ano'].map((p) => (
                    <button 
                        key={p} 
                        onClick={() => setPeriod(p)}
                        className={`flex h-full grow items-center justify-center rounded-md px-2 text-sm font-medium leading-normal transition-all ${period === p ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white' : 'text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-700/50'}`}
                    >
                        <span className="truncate">{p}</span>
                    </button>
                ))}
            </div>
        </div>

        {/* Charts Card */}
        <div className="flex flex-col gap-4 rounded-xl bg-white dark:bg-zinc-900 p-4 shadow-sm">
            <p className="text-base font-semibold leading-normal text-zinc-900 dark:text-white">Gastos vs. Orçamento</p>
            
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#71717a', fontSize: 12 }} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#18181b', borderRadius: '8px', border: 'none' }} itemStyle={{ color: '#fff' }} />
                        <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={60} animationDuration={500}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-expense"></div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Gastos</p>
                    </div>
                    <p className="font-semibold text-zinc-900 dark:text-white">R$ {data[0].amount.toLocaleString()}</p>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-budget"></div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Orçamento</p>
                    </div>
                    <p className="font-semibold text-zinc-900 dark:text-white">R$ {data[1].amount.toLocaleString()}</p>
                </div>
            </div>
        </div>

        {/* Top Expenses */}
        <div className="flex flex-col gap-3">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Top 3 Maiores Gastos</h3>
            <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
                {[
                    { name: 'Alimentação', val: 850, pct: '68%', icon: 'restaurant' },
                    { name: 'Transporte', val: 520, pct: '45%', icon: 'directions_car' },
                    { name: 'Moradia', val: 400, pct: '30%', icon: 'home' }
                ].map((item, i, arr) => (
                    <div key={item.name} className="">
                        <div className="flex min-h-[72px] items-center gap-4 px-4 py-2">
                             <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                <Icon name={item.icon} />
                            </div>
                            <div className="flex flex-1 flex-col justify-center">
                                <p className="text-base font-medium text-zinc-900 dark:text-white">{item.name}</p>
                                <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">R$ {item.val},00</p>
                            </div>
                             <div className="flex items-center gap-3">
                                <div className="w-16 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700 h-1.5">
                                    <div className="h-full rounded-full bg-expense" style={{ width: item.pct }}></div>
                                </div>
                            </div>
                        </div>
                        {i < arr.length - 1 && <div className="mx-4 border-t border-zinc-200 dark:border-zinc-800"></div>}
                    </div>
                ))}
            </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-background-light/95 p-4 pb-6 backdrop-blur-sm dark:bg-background-dark/95 z-10">
        <button 
            onClick={() => alert("Relatório CSV baixado com sucesso!")}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-primary px-5 text-base font-bold text-background-dark shadow-lg active:scale-[0.98] transition-transform"
        >
            <Icon name="download" />
            Exportar Relatório (CSV)
        </button>
      </div>
    </div>
  );
};