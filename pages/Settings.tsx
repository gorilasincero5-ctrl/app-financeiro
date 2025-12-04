import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const [biometrics, setBiometrics] = useState(false);

  const MenuItem = ({ icon, label, onClick, rightElement, isDanger }: any) => (
     <div onClick={onClick} className="flex items-center gap-4 px-4 min-h-14 justify-between cursor-pointer active:bg-zinc-50 dark:active:bg-zinc-800/40 transition-colors hover:bg-zinc-50 dark:hover:bg-white/5">
        <div className="flex items-center gap-4">
            <div className={`${isDanger ? 'text-red-500 bg-red-500/20' : 'text-primary bg-primary/20'} flex items-center justify-center rounded-lg shrink-0 size-10`}>
                <Icon name={icon} />
            </div>
            <div className="flex flex-col">
                <p className={`${isDanger ? 'text-red-500 dark:text-red-400' : 'text-gray-900 dark:text-white'} text-base font-normal leading-normal truncate`}>{label}</p>
                {/* Optional Subtext could go here */}
            </div>
        </div>
        <div className="shrink-0">
            {rightElement || <Icon name="chevron_right" className="text-gray-400 dark:text-gray-500" />}
        </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate('/')} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center">
            <Icon name="arrow_back_ios_new" className="text-xl" />
        </button>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center">Configurações</h1>
        <div className="size-10"></div>
      </header>
      
      <main className="flex-1 flex-col px-4 pb-24">
        {/* Profile */}
        <div className="p-4 mb-6">
            <div className="flex items-center justify-start gap-4 rounded-xl bg-white dark:bg-gray-800/20 p-4 shadow-sm">
                <div 
                  className="w-16 h-16 bg-center bg-no-repeat aspect-square bg-cover rounded-full" 
                  style={{ backgroundImage: 'url("https://ui-avatars.com/api/?name=Usuario&background=13ec6d&color=fff&size=128")' }}
                ></div>
                <div className="flex flex-col gap-1 flex-1">
                    <p className="text-gray-900 dark:text-white text-base font-bold leading-tight">Nome do Usuário</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">usuario@email.com</p>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-8">
            <section>
                <h2 className="text-gray-600 dark:text-gray-400 text-sm font-bold px-4 pb-2 pt-4 uppercase">Conta</h2>
                <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800/20 shadow-sm">
                    <MenuItem icon="person" label="Editar Perfil" onClick={() => alert("Editar Perfil: Não implementado.")} />
                    <div className="border-t border-zinc-100 dark:border-zinc-800/50"></div>
                    <MenuItem icon="notifications" label="Notificações" onClick={() => alert("Notificações: Não implementado.")} />
                    <div className="border-t border-zinc-100 dark:border-zinc-800/50"></div>
                     <MenuItem icon="request_quote" label="Simular Salário" onClick={() => navigate('/salary')} />
                </div>
            </section>

             <section>
                <h2 className="text-gray-600 dark:text-gray-400 text-sm font-bold px-4 pb-2 pt-4 uppercase">Segurança</h2>
                <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800/20 shadow-sm">
                    <MenuItem 
                        onClick={() => setBiometrics(!biometrics)}
                        icon="fingerprint" 
                        label="Ativar PIN/Biometria" 
                        rightElement={
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${biometrics ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${biometrics ? 'translate-x-6' : 'translate-x-1'}`}></span>
                            </div>
                        }
                    />
                    <div className="border-t border-zinc-100 dark:border-zinc-800/50"></div>
                    <MenuItem icon="lock" label="Alterar Senha" onClick={() => alert("Alterar Senha: Não implementado.")} />
                </div>
            </section>

             <section>
                <h2 className="text-gray-600 dark:text-gray-400 text-sm font-bold px-4 pb-2 pt-4 uppercase">Relatórios</h2>
                 <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800/20 shadow-sm">
                     <MenuItem icon="bar_chart" label="Ver Relatórios Completos" onClick={() => navigate('/reports')} />
                 </div>
            </section>

             <section>
                <h2 className="text-gray-600 dark:text-gray-400 text-sm font-bold px-4 pb-2 pt-4 uppercase">Dados</h2>
                <div className="flex flex-col overflow-hidden rounded-xl bg-white dark:bg-gray-800/20 shadow-sm">
                    <MenuItem icon="delete_forever" label="Zerar Conta" isDanger onClick={() => confirm("Tem certeza? Isso apagará tudo.") && alert("Conta zerada.")} />
                     <p className="text-gray-500 dark:text-gray-400 text-sm font-normal pl-16 pb-4 pr-4">Esta ação é permanente e irá apagar todos os seus dados financeiros.</p>
                </div>
            </section>
        </div>
      </main>
    </div>
  );
};