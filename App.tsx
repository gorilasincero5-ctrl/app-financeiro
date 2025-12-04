import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Home } from './pages/Home';
import { Expenses } from './pages/Expenses';
import { Calendar } from './pages/Calendar';
import { Settings } from './pages/Settings';
import { Salary } from './pages/Salary';
import { Budgets } from './pages/Budgets';
import { Goals } from './pages/Goals';
import { Reports } from './pages/Reports';
import { AddTransaction } from './pages/AddTransaction';

const LayoutWithNav: React.FC = () => {
  const location = useLocation();
  
  // Show bottom nav on main hub pages
  const showNav = ['/', '/calendar', '/settings'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-zinc-900 dark:text-white">
      <div className="flex-1">
        <Outlet />
      </div>
      {showNav && <BottomNav />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LayoutWithNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add" element={<AddTransaction />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;