import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from './Icon';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex flex-1 flex-col items-center justify-end gap-1 ${
      isActive ? 'text-primary' : 'text-zinc-500 dark:text-zinc-400'
    } cursor-pointer hover:opacity-80 transition-opacity`;
  };

  return (
    <footer className="sticky bottom-0 z-20 w-full border-t border-zinc-200 bg-background-light/95 pt-2 pb-5 backdrop-blur-sm dark:border-zinc-800 dark:bg-background-dark/95">
      <div className="flex px-2">
        <div onClick={() => navigate('/')} className={getLinkClass('/')}>
          <Icon name="home" filled={location.pathname === '/'} />
          <p className={`text-xs ${location.pathname === '/' ? 'font-bold' : 'font-medium'}`}>Início</p>
        </div>
        <div onClick={() => navigate('/expenses')} className={getLinkClass('/expenses')}>
          <Icon name="receipt_long" filled={location.pathname === '/expenses'} />
          <p className={`text-xs ${location.pathname === '/expenses' ? 'font-bold' : 'font-medium'}`}>Transações</p>
        </div>
        <div onClick={() => navigate('/calendar')} className={getLinkClass('/calendar')}>
          <Icon name="calendar_month" filled={location.pathname === '/calendar'} />
          <p className={`text-xs ${location.pathname === '/calendar' ? 'font-bold' : 'font-medium'}`}>Calendário</p>
        </div>
        <div onClick={() => navigate('/settings')} className={getLinkClass('/settings')}>
          <Icon name="person" filled={location.pathname === '/settings'} />
          <p className={`text-xs ${location.pathname === '/settings' ? 'font-bold' : 'font-medium'}`}>Perfil</p>
        </div>
      </div>
    </footer>
  );
};