import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Transaction } from '../types';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      title: 'Supermercado',
      subtitle: 'Compra do mês',
      amount: -450.70,
      date: 'Hoje',
      type: 'expense',
      categoryIcon: 'shopping_cart',
      categoryColorClass: 'text-red-400 bg-red-500/20',
    },
    {
      id: '2',
      title: 'Salário',
      subtitle: 'Adiantamento',
      amount: 2500.00,
      date: 'Ontem',
      type: 'income',
      categoryIcon: 'attach_money',
      categoryColorClass: 'text-primary bg-primary/20',
    },
    {
      id: '3',
      title: 'Transporte',
      subtitle: 'Recarga Bilhete',
      amount: -50.00,
      date: '2 dias atrás',
      type: 'expense',
      categoryIcon: 'directions_bus',
      categoryColorClass: 'text-blue-400 bg-blue-500/20',
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Top Header */}
      <div className="flex flex-col gap-2 bg-transparent p-4 pb-2">
        <div className="flex h-12 items-center justify-between">
          <div className="flex size-12 shrink-0 items-center justify-start text-primary">
            <Icon name="account_balance_wallet" className="text-3xl" />
          </div>
          <div className="flex w-12 items-center justify-end">
            <button onClick={() => navigate('/settings')} className="flex h-12 items-center justify-center rounded-lg bg-transparent p-0">
              <Icon name="account_circle" className="text-white text-3xl" />
            </button>
          </div>
        </div>
        <p className="tracking-light text-[28px] font-bold leading-tight text-white">Olá, Usuário</p>
      </div>

      {/* Balance */}
      <div className="px-4 pt-4">
        <p className="text-sm font-normal leading-normal text-white/60">Saldo Disponível</p>
        <h1 className="tracking-light text-[32px] font-bold leading-tight text-primary">R$ 4.570,50</h1>
      </div>

      {/* Cards Scroll */}
      <div className="flex flex-col gap-4">
        {/* Next Bill */}
        <div className="px-4 pt-4">
            <div 
              onClick={() => navigate('/expenses')}
              className="flex items-center justify-between gap-4 rounded-xl bg-white/5 p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)] cursor-pointer active:bg-white/10 transition-colors"
            >
            <div className="flex flex-col gap-1 flex-1">
                <p className="text-base font-bold leading-tight text-white">Próximo Vencimento</p>
                <p className="text-sm font-normal leading-normal text-white/60">Conta de Luz - Vence em 3 dias</p>
                <p className="text-lg font-bold leading-normal text-red-400">R$ 185,90</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-400/20 text-red-400">
                <Icon name="receipt_long" />
            </div>
            </div>
        </div>

        {/* Savings Goal Teaser */}
        <div 
          onClick={() => navigate('/goals')}
          className="flex flex-col gap-3 px-4 py-2 cursor-pointer active:scale-[0.98] transition-transform"
        >
            <div className="rounded-xl bg-white/5 p-4">
                <div className="flex items-baseline justify-between gap-6 mb-3">
                    <p className="text-base font-medium leading-normal text-white">Meta de Economia Mensal</p>
                    <p className="text-sm font-bold leading-normal text-primary">65%</p>
                </div>
                <div className="h-2 rounded-full bg-primary/20 mb-2">
                    <div className="h-2 rounded-full bg-primary" style={{ width: '65%' }}></div>
                </div>
                <p className="text-sm font-normal leading-normal text-white/60">R$ 650 de R$ 1.000</p>
            </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 pt-6 pb-2 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white">Atividade Recente</h2>
        <button onClick={() => navigate('/expenses')} className="text-sm text-primary font-medium">Ver tudo</button>
      </div>

      <div className="flex flex-col px-4 gap-3 pb-32">
        {recentTransactions.map((t) => (
          <div key={t.id} className="flex items-center gap-4 rounded-lg bg-white/5 p-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${t.categoryColorClass}`}>
              <Icon name={t.categoryIcon} />
            </div>
            <div className="flex-grow">
              <p className="font-bold text-white">{t.title}</p>
              <p className="text-sm text-white/60">{t.subtitle}</p>
            </div>
            <div className="text-right">
              <p className={`font-bold ${t.type === 'expense' ? 'text-red-400' : 'text-primary'}`}>
                {t.type === 'expense' ? '- ' : '+ '}
                R$ {Math.abs(t.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-white/60">{t.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions FABs */}
      <div className="fixed bottom-24 left-0 right-0 z-10 px-4 pointer-events-none">
        <div className="mx-auto max-w-lg pointer-events-auto">
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => navigate('/add?type=expense')}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-red-400/20 text-red-400 backdrop-blur-md shadow-lg active:scale-95 transition-transform hover:bg-red-400/30"
            >
              <Icon name="remove" />
              <span className="font-bold">Despesa</span>
            </button>
            <button 
              onClick={() => navigate('/add?type=income')}
              className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-background-dark shadow-lg active:scale-95 transition-transform hover:bg-primary/90"
            >
              <Icon name="add" />
              <span className="font-bold">Receita</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};