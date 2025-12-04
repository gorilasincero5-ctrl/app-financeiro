import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

export const AddTransaction: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'income' ? 'income' : 'expense';
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'income' | 'expense'>(initialType);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // Reset category if type changes and current category is not valid for new type
  useEffect(() => {
    if (selectedCategory && selectedCategory.type !== 'both' && selectedCategory.type !== type) {
        setSelectedCategory(null);
    }
  }, [type]);

  const handleSave = () => {
    if (!amount || !description) {
      alert("Por favor, preencha o valor e a descrição.");
      return;
    }
    if (!selectedCategory) {
        alert("Por favor, selecione uma categoria.");
        return;
    }
    // Here we would typically save to a backend or context
    alert(`${type === 'income' ? 'Receita' : 'Despesa'} de R$ ${amount} (${selectedCategory.name}) salva com sucesso!`);
    navigate(-1);
  };

  const filteredCategories = CATEGORIES.filter(c => c.type === type || c.type === 'both');

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center p-4 pb-2 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start text-zinc-900 dark:text-white">
            <Icon name="close" className="text-2xl" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight text-zinc-900 dark:text-white">
          Nova {type === 'income' ? 'Receita' : 'Despesa'}
        </h2>
        <div className="size-12"></div>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-6">
        {/* Amount Input */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Valor</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-zinc-400">R$</span>
                <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0,00"
                    autoFocus
                    className="w-full rounded-xl border-none bg-white dark:bg-zinc-800 p-6 pl-12 text-4xl font-bold text-zinc-900 dark:text-white placeholder:text-zinc-300 focus:ring-2 focus:ring-primary shadow-sm outline-none"
                />
            </div>
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Descrição</label>
            <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: Supermercado, Salário"
                className="w-full rounded-xl border-none bg-white dark:bg-zinc-800 p-4 text-lg font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-primary shadow-sm outline-none"
            />
        </div>

        {/* Type Toggle */}
        <div className="flex rounded-xl bg-zinc-200 dark:bg-zinc-800 p-1">
            <button 
                onClick={() => setType('expense')}
                className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${type === 'expense' ? 'bg-white dark:bg-zinc-700 text-red-500 shadow-sm' : 'text-zinc-500'}`}
            >
                Despesa
            </button>
            <button 
                onClick={() => setType('income')}
                className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${type === 'income' ? 'bg-white dark:bg-zinc-700 text-primary shadow-sm' : 'text-zinc-500'}`}
            >
                Receita
            </button>
        </div>

        {/* Category Selector */}
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Categoria</label>
            <div 
                onClick={() => setIsCategoryOpen(true)}
                className="flex items-center justify-between rounded-xl bg-white dark:bg-zinc-800 p-4 shadow-sm cursor-pointer active:opacity-80 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {selectedCategory ? (
                        <>
                            <div className={`flex size-10 items-center justify-center rounded-full ${selectedCategory.colorClass} ${selectedCategory.textClass}`}>
                                <Icon name={selectedCategory.icon} />
                            </div>
                            <span className="font-bold text-zinc-900 dark:text-white text-lg">{selectedCategory.name}</span>
                        </>
                    ) : (
                         <>
                            <div className="flex size-10 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500">
                                <Icon name="category" />
                            </div>
                            <span className="font-medium text-zinc-500 dark:text-zinc-400">Selecionar Categoria</span>
                        </>
                    )}
                </div>
                <Icon name="expand_more" className="text-zinc-400" />
            </div>
        </div>
      </main>

      {/* Save Button */}
      <div className="p-4 sticky bottom-0 bg-background-light dark:bg-background-dark">
        <button 
            onClick={handleSave}
            className={`w-full rounded-xl py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-[0.98] ${type === 'expense' ? 'bg-red-500 shadow-red-500/30' : 'bg-primary text-background-dark shadow-primary/30'}`}
        >
            Salvar
        </button>
      </div>

      {/* Categories Bottom Sheet */}
      {isCategoryOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div 
                className="w-full max-w-lg bg-background-light dark:bg-zinc-900 rounded-t-3xl p-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-300 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                  <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Selecione uma Categoria</h3>
                      <button 
                        onClick={() => setIsCategoryOpen(false)}
                        className="p-2 bg-zinc-200 dark:bg-zinc-800 rounded-full"
                      >
                          <Icon name="close" className="text-zinc-600 dark:text-zinc-400" />
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pb-safe">
                      {filteredCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setIsCategoryOpen(false);
                            }}
                            className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-white dark:bg-zinc-800 border border-transparent active:border-primary/50 active:bg-zinc-50 dark:active:bg-zinc-700 transition-all shadow-sm"
                          >
                              <div className={`flex size-12 items-center justify-center rounded-full ${cat.colorClass} ${cat.textClass}`}>
                                  <Icon name={cat.icon} className="text-2xl" />
                              </div>
                              <span className="font-medium text-zinc-900 dark:text-white text-sm">{cat.name}</span>
                          </button>
                      ))}
                  </div>
              </div>
              <div className="absolute inset-0 -z-10" onClick={() => setIsCategoryOpen(false)}></div>
          </div>
      )}
    </div>
  );
};