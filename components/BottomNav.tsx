
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-white/5 pb-6 pt-3 px-6 flex justify-between items-center z-50">
      <button 
        onClick={() => onNavigate(Screen.OVERVIEW)}
        className={`flex flex-col items-center gap-1 group transition-colors ${activeScreen === Screen.OVERVIEW ? 'text-primary' : 'text-slate-400'}`}
      >
        <div className="relative p-1">
          <span 
            className="material-symbols-outlined group-hover:scale-110 transition-transform" 
            style={{ fontVariationSettings: activeScreen === Screen.OVERVIEW ? "'FILL' 1" : "'FILL' 0" }}
          >
            dashboard
          </span>
        </div>
        <span className="text-[10px] font-bold">Visão Geral</span>
      </button>

      <button 
        onClick={() => onNavigate(Screen.WALLET)}
        className={`flex flex-col items-center gap-1 group transition-colors ${activeScreen === Screen.WALLET ? 'text-primary' : 'text-slate-400'}`}
      >
        <div className="relative p-1">
          <span 
            className="material-symbols-outlined group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: activeScreen === Screen.WALLET ? "'FILL' 1" : "'FILL' 0" }}
          >
            account_balance_wallet
          </span>
        </div>
        <span className="text-[10px] font-medium">Carteira</span>
      </button>

      <div className="relative -top-5">
        <button 
          onClick={() => onNavigate(Screen.ADD_ASSET)}
          className="size-14 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
        </button>
      </div>

      <button 
        onClick={() => onNavigate(Screen.ANALYSIS)}
        className={`flex flex-col items-center gap-1 group transition-colors ${activeScreen === Screen.ANALYSIS ? 'text-primary' : 'text-slate-400'}`}
      >
        <div className="relative p-1">
          <span 
            className="material-symbols-outlined group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: activeScreen === Screen.ANALYSIS ? "'FILL' 1" : "'FILL' 0" }}
          >
            analytics
          </span>
        </div>
        <span className="text-[10px] font-medium">Análise</span>
      </button>

      <button 
        onClick={() => onNavigate(Screen.PROFILE)}
        className={`flex flex-col items-center gap-1 group transition-colors ${activeScreen === Screen.PROFILE ? 'text-primary' : 'text-slate-400'}`}
      >
        <div className="relative p-1">
          <span 
            className="material-symbols-outlined group-hover:scale-110 transition-transform"
            style={{ fontVariationSettings: activeScreen === Screen.PROFILE ? "'FILL' 1" : "'FILL' 0" }}
          >
            person
          </span>
        </div>
        <span className="text-[10px] font-medium">Perfil</span>
      </button>
    </nav>
  );
};

export default BottomNav;
