
import React, { useState } from 'react';
import { generateSmoothPath } from '../utils/chartUtils';

interface MonthlyReportProps {
  onBack: () => void;
  onDownload?: () => void;
}

const MonthlyReport: React.FC<MonthlyReportProps> = ({ onBack, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Dados simulados de performance
  const portfolioData = [95, 98, 105, 115, 112, 125, 145];
  const cdiData = [95, 96, 97, 98, 99, 100, 101];
  
  const pathPortfolio = generateSmoothPath(portfolioData, 350, 120);
  const pathCdi = generateSmoothPath(cdiData, 350, 120);

  const dividends = [
    { month: 'Jan', val: 450 },
    { month: 'Fev', val: 520 },
    { month: 'Mar', val: 480 },
    { month: 'Abr', val: 610 },
    { month: 'Mai', val: 750 },
    { month: 'Jun', val: 890 },
  ];

  const handleDownloadAction = () => {
    setIsDownloading(true);
    // Simula geração e download do arquivo por 2 segundos
    setTimeout(() => {
      setIsDownloading(false);
      if (onDownload) onDownload();
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-right duration-500 overflow-y-auto pb-24 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 justify-between border-b border-gray-200 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">Relatório Mensal</h2>
        <button 
          onClick={handleDownloadAction}
          disabled={isDownloading}
          className="flex size-10 items-center justify-center rounded-full text-primary disabled:opacity-50 transition-all active:scale-90"
        >
          {isDownloading ? (
            <div className="size-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined">download</span>
          )}
        </button>
      </header>

      <main className="px-4 py-6 flex flex-col gap-6">
        {/* Alpha Section */}
        <section className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-8 shadow-xl shadow-primary/20 text-background-dark relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Impacto da Mentoria IA</p>
          <h1 className="text-4xl font-black tracking-tighter mb-4">R$ 12.840,32</h1>
          <div className="flex items-center gap-3">
            <div className="bg-background-dark/10 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
              <span className="text-xs font-black uppercase">Alpha de +8.4%</span>
            </div>
            <p className="text-[10px] font-bold max-w-[140px] leading-tight opacity-80">Rendimento extra gerado pelas otimizações sugeridas.</p>
          </div>
        </section>

        {/* Comparison Chart */}
        <section className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Performance Histórica</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold text-slate-500">Sua Carteira</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2 rounded-full bg-slate-400"></div>
                <span className="text-[10px] font-bold text-slate-500">CDI</span>
              </div>
            </div>
          </div>
          
          <div className="relative h-40 w-full mb-4">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 350 120">
              {/* CDI Line */}
              <path d={pathCdi} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4,4" className="opacity-50" />
              {/* Portfolio Line */}
              <path d={pathPortfolio} fill="none" stroke="#11d473" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span>Jan</span>
            <span>Mar</span>
            <span>Jun</span>
            <span>Hoje</span>
          </div>
        </section>

        {/* Dividends Bar Chart */}
        <section className="bg-white dark:bg-surface-dark rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Proventos Recebidos</h3>
          <div className="flex items-end justify-between gap-2 h-32 px-2">
            {dividends.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full h-full flex items-end">
                  <div 
                    className="w-full bg-primary/20 group-hover:bg-primary/40 transition-all rounded-t-lg" 
                    style={{ height: `${(d.val / 890) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute bottom-0 w-full bg-primary rounded-t-lg transition-all duration-700 delay-100" 
                    style={{ height: `${(d.val / 890) * 60}%` }}
                  ></div>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase">Total do Semestre</p>
              <p className="text-lg font-black text-slate-900 dark:text-white">R$ 3.720,00</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-primary uppercase">Média Mensal</p>
              <p className="text-lg font-black text-primary">R$ 620,00</p>
            </div>
          </div>
        </section>

        {/* Final Insight */}
        <div className="p-6 bg-surface-dark-highlight rounded-3xl border border-white/5 flex gap-4 items-start">
          <span className="material-symbols-outlined text-primary text-3xl shrink-0">insights</span>
          <div>
            <h4 className="text-white font-bold text-sm mb-1">Dica do Gemini para Julho</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sua exposição ao setor imobiliário está trazendo um retorno 12% superior ao CDI. Considere reinvestir os dividendos em ativos de Logística para manter o Alpha.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MonthlyReport;
