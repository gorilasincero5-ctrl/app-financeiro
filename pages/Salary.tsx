import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Salary: React.FC = () => {
  const navigate = useNavigate();
  const [gross, setGross] = useState(3500);
  const [advance, setAdvance] = useState(false);
  const [thirteenth, setThirteenth] = useState(false);

  // Simple estimations
  const inss = gross * 0.11; // Approx
  const irpf = (gross - inss) * 0.075; // Approx
  const net = gross - inss - irpf;

  const handleSave = () => {
    alert("Salário atualizado com sucesso!");
    navigate(-1);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex size-12 shrink-0 items-center justify-start text-zinc-900 dark:text-white">
            <Icon name="arrow_back" className="text-2xl" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold leading-tight text-zinc-900 dark:text-white">Salário Mensal</h2>
        <div className="size-12"></div>
      </header>

      <div className="flex flex-1 flex-col p-4 pt-0">
        <h1 className="text-zinc-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-left pb-3 pt-5">Qual o seu salário bruto mensal?</h1>
        
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
                <input 
                    type="number"
                    value={gross}
                    onChange={(e) => setGross(Number(e.target.value))}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-zinc-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#28392f] focus:border-primary/80 h-16 placeholder:text-zinc-400 dark:placeholder:text-[#9db9a8] p-4 text-2xl font-bold leading-normal shadow-sm"
                />
            </label>
        </div>

        <h3 className="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-8">Configurações</h3>
        
        <div className="flex flex-col gap-px overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800/50 shadow-sm">
            <div className="flex items-center gap-4 bg-background-light dark:bg-[#1a2c22] px-4 min-h-16 justify-between">
                <div className="flex items-center gap-4">
                    <div className="text-white flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-[#28392f] shrink-0 size-10">
                        <Icon name="request_quote" className="text-zinc-600 dark:text-primary" />
                    </div>
                    <p className="text-zinc-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">Receber adiantamento (vale)?</p>
                </div>
                <div className="shrink-0">
                     <button 
                        onClick={() => setAdvance(!advance)}
                        className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${advance ? 'bg-primary justify-end' : 'bg-zinc-300 dark:bg-[#28392f] justify-start'}`}
                     >
                        <div className="h-[27px] w-[27px] rounded-full bg-white shadow-sm mx-0.5"></div>
                    </button>
                </div>
            </div>
            
            <div className="flex flex-col gap-0 bg-background-light dark:bg-[#1a2c22] px-4 py-3">
                 <div className="flex min-h-14 items-center gap-4 justify-between">
                    <div className="flex items-center gap-4">
                        <div className="text-white flex items-center justify-center rounded-lg bg-zinc-200 dark:bg-[#28392f] shrink-0 size-10">
                            <Icon name="cake" className="text-zinc-600 dark:text-primary" />
                        </div>
                        <p className="text-zinc-900 dark:text-white text-base font-medium leading-normal flex-1 truncate">Incluir 13º no planejamento?</p>
                    </div>
                    <div className="shrink-0">
                        <button 
                            onClick={() => setThirteenth(!thirteenth)}
                            className={`relative flex h-[31px] w-[51px] cursor-pointer items-center rounded-full border-none p-0.5 transition-colors ${thirteenth ? 'bg-primary justify-end' : 'bg-zinc-300 dark:bg-[#28392f] justify-start'}`}
                        >
                            <div className="h-[27px] w-[27px] rounded-full bg-white shadow-sm mx-0.5"></div>
                        </button>
                    </div>
                </div>
                <div className="pl-14 pt-3 flex flex-col gap-3">
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Forma de recebimento</p>
                    <div className="grid grid-cols-2 gap-2 text-center">
                        <button className="rounded-lg bg-primary/20 dark:bg-primary/30 p-2 text-sm font-semibold text-primary dark:text-primary transition-colors">Parcela única</button>
                        <button className="rounded-lg bg-transparent p-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">2 parcelas</button>
                    </div>
                </div>
            </div>
        </div>

        <h3 className="text-zinc-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2 pt-10">Simulação Rápida</h3>
        
        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1a2c22] p-4 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-600 dark:text-zinc-400 text-base font-normal">Desconto INSS (estimado)</p>
                    <Icon name="help_outline" className="text-zinc-400 dark:text-zinc-500 text-sm" />
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 text-base font-medium">- R$ {inss.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="text-zinc-600 dark:text-zinc-400 text-base font-normal">Desconto IRPF (estimado)</p>
                    <Icon name="help_outline" className="text-zinc-400 dark:text-zinc-500 text-sm" />
                </div>
                <p className="text-zinc-800 dark:text-zinc-200 text-base font-medium">- R$ {irpf.toFixed(2)}</p>
            </div>
            <hr className="border-t border-zinc-200 dark:border-zinc-700/50 my-2"/>
            <div className="flex items-center justify-between">
                <p className="text-zinc-900 dark:text-white text-base font-bold">Salário Líquido (estimado)</p>
                <p className="text-primary text-base font-bold">R$ {net.toFixed(2)}</p>
            </div>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 px-2 pt-2">Esta é uma simulação. Os valores podem variar.</p>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent p-4 pt-2">
        <button onClick={handleSave} className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-4 text-center text-base font-bold text-zinc-900 transition-colors hover:bg-primary/90 shadow-lg active:scale-[0.98]">Salvar Salário</button>
      </div>
    </div>
  );
};