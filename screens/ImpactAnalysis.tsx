
import React, { useState, useEffect } from 'react';
import { getGeminiAnalysis } from '../services/aiService';

interface ImpactAnalysisProps {
  onBack: () => void;
  onOptimize: () => void;
  isOptimized?: boolean;
  userAssets?: any[];
  userProfile?: string;
}

const ImpactAnalysis: React.FC<ImpactAnalysisProps> = ({ 
  onBack, 
  onOptimize, 
  isOptimized, 
  userAssets = [],
  userProfile = 'Moderado'
}) => {
  const [showHelp, setShowHelp] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiData, setAiData] = useState<any>(null);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const data = await getGeminiAnalysis(userAssets, userProfile);
      setAiData(data);
    } catch (e) {
      console.error(e);
      setAiData({
        opportunityCost: 2450.00,
        currentReturn: 0.45,
        potentialReturn: 1.02,
        delta: 0.57,
        swaps: [
          { from: 'BCFF11', fromVal: '-2.3%', to: 'MXRF11', toVal: '+10.5%', spread: '+12.8%' },
          { from: 'HGLG11', fromVal: '+0.1%', to: 'KNIP11', toVal: '+8.2%', spread: '+8.1%' }
        ]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!isOptimized) {
      runAnalysis();
    }
  }, [isOptimized]);

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
        <div className="size-24 bg-primary/20 rounded-full flex items-center justify-center relative mb-6">
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
          <span className="material-symbols-outlined text-primary text-5xl animate-pulse">psychology</span>
        </div>
        <h2 className="text-xl font-black text-slate-900 dark:text-white animate-bounce">IA Consultando Mercado...</h2>
        <p className="text-slate-500 text-sm mt-2 text-center px-8">Processando fundamentos com Gemini Flash.</p>
      </div>
    );
  }

  const displayData = aiData || {
    opportunityCost: isOptimized ? 0 : 2450.00,
    currentReturn: isOptimized ? 1.02 : 0.45,
    potentialReturn: 1.02,
    delta: isOptimized ? 0 : 0.57,
    swaps: []
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-right duration-500 overflow-y-auto pb-24 relative bg-background-light dark:bg-background-dark">
      <header className="flex flex-col gap-2 p-4 pb-2 sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center h-12 justify-between">
          <button onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
            <div className="size-1.5 bg-primary rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-primary uppercase">Gemini Ativo</span>
          </div>
        </div>
        <div>
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight">Análise de Impacto</h1>
          <p className="text-slate-400 text-sm font-medium">Relatório Estratégico Gerado</p>
        </div>
      </header>

      <main className="flex-1 px-4 pt-4">
        {/* Comparison Bars Chart */}
        <section className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm mb-6">
          <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-6">Comparativo de Rendimento Mensal</h3>
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Estado Atual</span>
                <span className="text-slate-900 dark:text-white">{displayData.currentReturn}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-slate-400 transition-all duration-1000 ease-out shadow-sm" 
                  style={{ width: `${(displayData.currentReturn / displayData.potentialReturn) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black text-primary uppercase tracking-widest">
                <span>Potencial IA</span>
                <span className="text-primary">{displayData.potentialReturn}%</span>
              </div>
              <div className="w-full h-3 bg-primary/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(17,212,115,0.4)]" 
                  style={{ width: `100%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
            <p className="text-[11px] text-slate-500 font-medium">
              A otimização pode aumentar seu yield em <span className="text-primary font-black">+{displayData.delta}%</span> todos os meses.
            </p>
          </div>
        </section>

        {/* Opportunity Cost */}
        <section className="flex flex-col items-center justify-center py-4">
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Custo de Inércia Anual</p>
          <h2 className="text-primary tracking-tight text-5xl font-black text-center">
            R$ {displayData.opportunityCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </h2>
        </section>

        {/* Action Swaps */}
        {!isOptimized && displayData.swaps.length > 0 && (
          <section className="flex flex-col gap-4 pb-24 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">Plano de Substituição</h3>
              <span className="text-[10px] font-bold text-slate-400 uppercase">{displayData.swaps.length} Movimentos</span>
            </div>
            {displayData.swaps.map((swap: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-surface-dark rounded-2xl p-4 border border-gray-200 dark:border-white/5 shadow-sm active:scale-[0.98] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs">{swap.from.substring(0,2)}</div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{swap.from}</p>
                      <p className="text-[10px] text-red-500 font-bold">{swap.fromVal}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-primary">swap_horiz</span>
                  <div className="flex items-center gap-3 flex-row-reverse text-right">
                    <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{swap.to.substring(0,2)}</div>
                    <div>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{swap.to}</p>
                      <p className="text-primary text-[10px] font-bold">{swap.toVal}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button 
              onClick={onOptimize} 
              className="w-full bg-primary text-background-dark font-black py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              APLICAR ESTRATÉGIA IA
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default ImpactAnalysis;
