
import React, { useState } from 'react';

interface PortfolioOverviewProps {
  onNavigateToAnalysis?: () => void;
  onNavigateToAsset?: (ticker: string) => void;
  onNavigateToReport?: () => void;
  isPortfolioRebalanced?: boolean;
  isVGHFSwapped?: boolean;
  userName?: string;
  userAvatar?: string;
  hasSeenNotifications?: boolean;
  onSeeNotifications?: () => void;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({ 
  onNavigateToAnalysis, 
  onNavigateToAsset, 
  onNavigateToReport,
  isPortfolioRebalanced, 
  isVGHFSwapped,
  userName = 'Investidor',
  userAvatar,
  hasSeenNotifications,
  onSeeNotifications
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const isFullyOptimized = isPortfolioRebalanced && isVGHFSwapped;

  const healthScore = isFullyOptimized ? 98 : (isPortfolioRebalanced || isVGHFSwapped ? 82 : 64);
  const logPercent = isPortfolioRebalanced ? 35 : 40;
  const papPercent = 30;
  
  const logDash = `${logPercent} 100`;
  const papDash = `${papPercent} 100`;
  const papOffset = -logPercent;

  const handleOpenNotifications = () => {
    setShowNotifications(true);
    onSeeNotifications?.();
  };
  
  return (
    <div className="flex flex-col w-full h-full pb-24 relative overflow-y-auto no-scrollbar bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
      {/* Notifications Drawer */}
      {showNotifications && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-16">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowNotifications(false)}></div>
          <div className="relative w-full max-sm bg-white dark:bg-surface-dark rounded-3xl p-5 shadow-2xl border border-white/5 animate-in slide-in-from-top duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Notificações</h3>
              <button onClick={() => setShowNotifications(false)} className="text-slate-400 p-2">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {!isFullyOptimized ? (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3">
                  <span className="material-symbols-outlined text-red-500">warning</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Diagnóstico Gemini</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Ativos identificados com risco estrutural.</p>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl flex gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">Protocolo Concluído</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sua carteira está no patamar ideal de rendimento.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center p-4 pt-10 justify-between sticky top-0 z-10 bg-background-light dark:bg-background-dark transition-all">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-primary shadow-sm" 
              style={{ backgroundImage: `url("${userAvatar}")` }}
            ></div>
          </div>
          <div>
            <h2 className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-0.5">Olá, {userName.split(' ')[0]}</h2>
            <h1 className="text-slate-900 dark:text-white text-xl font-extrabold leading-none tracking-tight">SigaMe-Tu</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-slate-400 uppercase">Saúde</span>
             <span className={`text-sm font-black ${healthScore > 90 ? 'text-primary' : 'text-yellow-500'}`}>{healthScore}%</span>
          </div>
          <button 
            onClick={handleOpenNotifications}
            className="flex items-center justify-center size-10 rounded-full bg-white dark:bg-surface-dark text-slate-400 hover:text-primary transition-all shadow-sm border border-gray-100 dark:border-white/5 relative active:scale-95"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>notifications</span>
            {(!isFullyOptimized && !hasSeenNotifications) && (
              <span className="absolute top-2.5 right-2.5 size-2.5 bg-red-500 rounded-full border-2 border-white dark:border-surface-dark animate-pulse"></span>
            )}
          </button>
        </div>
      </header>

      {/* Patrimônio */}
      <section className="px-4 py-2">
        <div className="relative overflow-hidden rounded-3xl bg-surface-dark border border-white/5 p-7 shadow-xl group">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary/10 blur-3xl opacity-20"></div>
          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest opacity-80">Patrimônio Consolidado</p>
            </div>
            <p className="text-white tracking-tight text-4xl font-black">
              {isFullyOptimized ? 'R$ 148.210,50' : (isPortfolioRebalanced || isVGHFSwapped ? 'R$ 146.435,20' : 'R$ 145.230,00')}
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1 bg-primary/20 px-2.5 py-1 rounded-full text-primary text-[10px] font-black uppercase">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                <span>{isFullyOptimized ? '+4,8%' : (isPortfolioRebalanced ? '+3,1%' : '+2,4%')}</span>
              </div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Acumulado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Atalho para Relatório */}
      <section className="px-4 py-4">
        <button 
          onClick={onNavigateToReport}
          className="w-full p-6 bg-white dark:bg-surface-dark rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-3xl">analytics</span>
            </div>
            <div className="text-left">
              <h3 className="text-slate-900 dark:text-white font-bold leading-tight">Relatório Completo</h3>
              <p className="text-slate-500 text-xs">Análise de dividendos e Alpha.</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400">chevron_right</span>
        </button>
      </section>

      {/* Alocação por Setor */}
      <section className="px-4 py-2 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">Alocação Estratégica</h3>
          <button onClick={onNavigateToAnalysis} className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Analisar</button>
        </div>
        <div className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-slate-200 dark:border-white/5 shadow-sm transition-all duration-500">
          <div className="flex items-center gap-8">
            <div className="relative size-32 shrink-0">
              <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                <circle className="text-slate-100 dark:text-slate-800" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                <circle className="text-primary transition-all duration-700 ease-in-out" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={logDash} strokeDashoffset="0"></circle>
                <circle className="text-slate-400 transition-all duration-700 ease-in-out" cx="18" cy="18" r="15.9155" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray={papDash} strokeDashoffset={papOffset}></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[14px] font-black text-slate-900 dark:text-white">{logPercent + papPercent}%</span>
                <span className="text-[8px] font-black text-slate-400 uppercase">FIIs</span>
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-primary"></div> Logística
                  </span>
                  <span className="text-slate-900 dark:text-white">{logPercent}%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${logPercent}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400 flex items-center gap-2">
                    <div className="size-2 rounded-full bg-slate-400"></div> Papel
                  </span>
                  <span className="text-slate-900 dark:text-white">{papPercent}%</span>
                </div>
                <div className="w-full h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 transition-all duration-700" style={{ width: `${papPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights do Gemini - SCROLL HORIZONTAL PREMIUM */}
      <section className="py-4 pb-6">
        <div className="px-4 mb-3">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">Insights do Gemini</h3>
        </div>
        
        {isFullyOptimized ? (
          <div className="mx-4 bg-white dark:bg-surface-dark rounded-3xl p-7 border border-slate-200 dark:border-white/5 shadow-sm text-center">
            <span className="material-symbols-outlined text-primary text-5xl mb-3 animate-bounce">verified_user</span>
            <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">Parabéns! Sua carteira está alinhada com as melhores práticas de mercado.</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-4 px-4 pb-6 no-scrollbar snap-x snap-mandatory">
            {!isVGHFSwapped && (
              <div 
                onClick={() => onNavigateToAsset?.('VGHF11')} 
                className="min-w-[85%] snap-center bg-white dark:bg-surface-dark rounded-3xl p-5 border-l-8 border-red-500 shadow-xl cursor-pointer active:scale-95 transition-transform relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <span className="material-symbols-outlined text-7xl">warning</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="bg-red-500/10 text-red-500 text-[10px] font-black uppercase px-2 py-1 rounded">Troca Urgente</span>
                  <span className="material-symbols-outlined text-red-500 text-xl">error</span>
                </div>
                <h4 className="text-slate-900 dark:text-white font-black text-2xl mt-3 tracking-tight">VGHF11</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                  Sinal de alerta nos dividendos projetados para o próximo semestre. Recomendamos substituição imediata.
                </p>
                <div className="mt-4 flex items-center text-primary text-xs font-black uppercase gap-1">
                  Ver Alternativa <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            )}
            {!isPortfolioRebalanced && (
              <div 
                onClick={onNavigateToAnalysis} 
                className="min-w-[85%] snap-center bg-white dark:bg-surface-dark rounded-3xl p-5 border-l-8 border-primary shadow-xl cursor-pointer active:scale-95 transition-transform relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-2 opacity-5">
                  <span className="material-symbols-outlined text-7xl">psychology</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-2 py-1 rounded">Estratégia IA</span>
                  <span className="material-symbols-outlined text-primary text-xl">bolt</span>
                </div>
                <h4 className="text-slate-900 dark:text-white font-black text-2xl mt-3 tracking-tight">Diagnóstico Geral</h4>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                  Aplique o rebalanceamento completo para maximizar seu yield mensal em até 1.05%.
                </p>
                <div className="mt-4 flex items-center text-primary text-xs font-black uppercase gap-1">
                  Otimizar Agora <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            )}
            
            {/* Terceiro Card para garantir o scroll visual */}
            <div 
              onClick={() => onNavigateToAsset?.('HGLG11')} 
              className="min-w-[85%] snap-center bg-white dark:bg-surface-dark rounded-3xl p-5 border-l-8 border-slate-400 shadow-xl cursor-pointer active:scale-95 transition-transform"
            >
              <div className="flex justify-between items-start">
                <span className="bg-slate-100 dark:bg-white/10 text-slate-500 text-[10px] font-black uppercase px-2 py-1 rounded">Análise de Risco</span>
                <span className="material-symbols-outlined text-slate-400 text-xl">info</span>
              </div>
              <h4 className="text-slate-900 dark:text-white font-black text-2xl mt-3 tracking-tight">HGLG11</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 leading-relaxed">
                Ativo de alta qualidade, mas com preço acima do VP. Monitore novos aportes.
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default PortfolioOverview;
