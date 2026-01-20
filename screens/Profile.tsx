
import React, { useState, useRef } from 'react';

type ProfileView = 'menu' | 'personal_data' | 'brokers' | 'ai_settings';

interface Broker {
  id: string;
  name: string;
  status: 'Ativa' | 'Inativa';
}

interface ProfileProps {
  userData: any;
  setUserData: (data: any) => void;
  brokers: Broker[];
  setBrokers: React.Dispatch<React.SetStateAction<Broker[]>>;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onLogout?: () => void;
  onSave?: () => void;
  onConnectBroker?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ 
  userData, 
  setUserData, 
  brokers, 
  setBrokers, 
  isDarkMode, 
  setIsDarkMode,
  onLogout,
  onSave,
  onConnectBroker
}) => {
  const [currentView, setCurrentView] = useState<ProfileView>('menu');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeBrokerMenu, setActiveBrokerMenu] = useState<string | null>(null);
  const [editingBrokerId, setEditingBrokerId] = useState<string | null>(null);
  const [tempBrokerName, setTempBrokerName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [editName, setEditName] = useState(userData.name);
  const [editEmail, setEditEmail] = useState(userData.email);
  const [editPhone, setEditPhone] = useState(userData.phone || '');

  const handleSaveData = () => {
    setUserData({ ...userData, name: editName, email: editEmail, phone: editPhone });
    onSave?.();
    setCurrentView('menu');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result as string });
        onSave?.();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectKey = async () => {
    try {
      if (typeof (window as any).aistudio?.openSelectKey === 'function') {
        await (window as any).aistudio.openSelectKey();
      } else {
        window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleConnectNewBroker = () => {
    const newBroker: Broker = {
      id: Date.now().toString(),
      name: 'Nova Corretora',
      status: 'Ativa'
    };
    setBrokers([...brokers, newBroker]);
    onConnectBroker?.();
  };

  const handleDeleteBroker = (id: string) => {
    setBrokers(brokers.filter(b => b.id !== id));
    setActiveBrokerMenu(null);
  };

  const handleStartEditBroker = (broker: Broker) => {
    setEditingBrokerId(broker.id);
    setTempBrokerName(broker.name);
    setActiveBrokerMenu(null);
  };

  const handleSaveBrokerName = (id: string) => {
    setBrokers(brokers.map(b => b.id === id ? { ...b, name: tempBrokerName } : b));
    setEditingBrokerId(null);
  };

  if (currentView === 'ai_settings') {
    return (
      <div className="flex flex-col w-full h-full animate-in slide-in-from-right duration-300 bg-background-light dark:bg-background-dark">
        <header className="flex items-center p-4 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => setCurrentView('menu')} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/5">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="ml-2 font-bold text-lg text-slate-900 dark:text-white">Configurações de IA</h2>
        </header>
        <div className="p-6 flex flex-col gap-6">
          <div className="p-6 bg-primary/5 rounded-3xl border border-primary/20 text-center">
            <div className="size-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">key</span>
            </div>
            <h3 className="text-slate-900 dark:text-white font-black text-xl mb-2">Sua Própria IA</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Para maior precisão e liberdade, conecte sua Chave API do Google Gemini.
            </p>
            <button 
              onClick={handleSelectKey}
              className="w-full h-14 bg-primary text-background-dark font-black rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">settings_input_component</span>
              CONFIGURAR CHAVE API
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'personal_data') {
    return (
      <div className="flex flex-col w-full h-full animate-in slide-in-from-right duration-300 bg-background-light dark:bg-background-dark">
        <header className="flex items-center p-4 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => setCurrentView('menu')} className="size-10 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="ml-2 font-bold text-lg text-slate-900 dark:text-white">Dados Pessoais</h2>
        </header>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Nome</label>
            <input 
              type="text" 
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">E-mail</label>
            <input 
              type="email" 
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Telefone</label>
            <input 
              type="text" 
              placeholder="(00) 00000-0000"
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary"
              value={editPhone}
              onChange={(e) => setEditPhone(e.target.value)}
            />
          </div>
          <button 
            onClick={handleSaveData}
            className="w-full h-14 bg-primary text-background-dark font-black rounded-2xl shadow-lg mt-4 active:scale-95 transition-all"
          >
            SALVAR ALTERAÇÕES
          </button>
        </div>
      </div>
    );
  }

  if (currentView === 'brokers') {
    return (
      <div className="flex flex-col w-full h-full animate-in slide-in-from-right duration-300 bg-background-light dark:bg-background-dark relative" onClick={() => { setActiveBrokerMenu(null); if(!editingBrokerId) setEditingBrokerId(null); }}>
        <header className="flex items-center p-4 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => setCurrentView('menu')} className="size-10 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="ml-2 font-bold text-lg text-slate-900 dark:text-white">Corretoras</h2>
        </header>
        <div className="p-4 flex flex-col gap-3 pb-32">
          {brokers.map(broker => (
            <div key={broker.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 relative group min-h-[76px]">
              <div className="flex items-center gap-4 flex-1">
                <div className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 shrink-0">
                  <span className="material-symbols-outlined">account_balance</span>
                </div>
                
                {editingBrokerId === broker.id ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input 
                      autoFocus
                      type="text" 
                      className="flex-1 h-9 px-3 bg-slate-50 dark:bg-white/5 border border-primary/30 rounded-lg text-sm font-bold text-slate-900 dark:text-white focus:ring-1 focus:ring-primary outline-none"
                      value={tempBrokerName}
                      onChange={(e) => setTempBrokerName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveBrokerName(broker.id)}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white leading-none">{broker.name}</span>
                    <span className="text-[9px] font-black text-primary uppercase mt-1 tracking-wider">{broker.status}</span>
                  </div>
                )}
              </div>

              <div className="relative flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {editingBrokerId === broker.id ? (
                  <>
                    <button 
                      onClick={() => handleSaveBrokerName(broker.id)}
                      className="size-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">check</span>
                    </button>
                    <button 
                      onClick={() => setEditingBrokerId(null)}
                      className="size-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setActiveBrokerMenu(activeBrokerMenu === broker.id ? null : broker.id)}
                      className="size-10 flex items-center justify-center rounded-full hover:bg-slate-50 dark:hover:bg-white/5 text-slate-400 transition-colors"
                    >
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>

                    {activeBrokerMenu === broker.id && (
                      <div className="absolute right-0 top-11 w-36 bg-white dark:bg-surface-dark-highlight border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-[60] flex flex-col p-1.5 animate-in fade-in zoom-in duration-200">
                        <button 
                          onClick={() => handleStartEditBroker(broker)}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 text-[11px] font-bold text-slate-700 dark:text-white transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">edit</span>
                          Editar
                        </button>
                        <div className="h-px bg-slate-100 dark:bg-white/5 my-1"></div>
                        <button 
                          onClick={() => handleDeleteBroker(broker.id)}
                          className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-[11px] font-bold text-red-500 transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">delete</span>
                          Excluir
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleConnectNewBroker}
            className="w-full h-15 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center gap-2 text-slate-400 font-bold hover:text-primary hover:border-primary transition-all active:scale-95 bg-slate-50/30 dark:bg-white/2 mt-2"
          >
            <span className="material-symbols-outlined">add</span>
            CONECTAR NOVA CONTA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in duration-500 overflow-y-auto pb-32 bg-background-light dark:bg-background-dark">
      <header className="flex flex-col items-center pt-10 pb-6 px-6 bg-gradient-to-b from-primary/10 to-transparent">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="size-28 rounded-full border-4 border-primary/20 p-1 relative cursor-pointer group"
        >
          <div 
            className="size-full rounded-full bg-cover bg-center shadow-2xl transition-transform group-hover:scale-95" 
            style={{ backgroundImage: `url("${userData.avatar}")` }}
          ></div>
          <div className="absolute inset-1 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-2xl">add_a_photo</span>
          </div>
          <div className="absolute bottom-1 right-1 size-8 bg-primary rounded-full border-4 border-background-light dark:border-background-dark flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-background-dark text-lg font-bold">edit</span>
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-black text-slate-900 dark:text-white tracking-tight">{userData.name}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{userData.email}</p>
        {userData.phone && <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-widest">{userData.phone}</p>}
      </header>

      <main className="px-4 space-y-4">
        <div className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
          <button onClick={() => setCurrentView('personal_data')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">person</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Dados Pessoais</span>
            </div>
            <span className="material-symbols-outlined text-slate-400">chevron_right</span>
          </button>
          
          <button onClick={() => setCurrentView('ai_settings')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Configurações de IA</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-black text-primary bg-primary/10 px-2 py-0.5 rounded uppercase">Ativo</span>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </div>
          </button>

          <button onClick={() => setCurrentView('brokers')} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">account_balance</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Minhas Corretoras</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{brokers.length}</span>
              <span className="material-symbols-outlined text-slate-400">chevron_right</span>
            </div>
          </button>
        </div>

        <div className="bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">{isDarkMode ? 'dark_mode' : 'light_mode'}</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Modo Escuro</span>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${isDarkMode ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
          
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-slate-400">notifications</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Notificações</span>
            </div>
            <button onClick={() => setNotificationsEnabled(!notificationsEnabled)} className={`w-12 h-6 rounded-full transition-colors relative ${notificationsEnabled ? 'bg-primary' : 'bg-slate-300'}`}>
              <div className={`absolute top-1 size-4 bg-white rounded-full transition-all ${notificationsEnabled ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>

        <button 
          onClick={onLogout} 
          className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black text-sm bg-red-500/5 hover:bg-red-500/10 rounded-2xl transition-all border border-red-500/20 active:scale-95 mt-4"
        >
          <span className="material-symbols-outlined">logout</span> 
          SAIR DA CONTA
        </button>
      </main>
    </div>
  );
};

export default Profile;
