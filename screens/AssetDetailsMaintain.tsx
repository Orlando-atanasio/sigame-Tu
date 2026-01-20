
import React, { useState } from 'react';

interface AssetDetailsProps {
  ticker: string;
  onBack: () => void;
}

type Period = '1M' | '6M' | '1A';

const AssetDetailsMaintain: React.FC<AssetDetailsProps> = ({ ticker, onBack }) => {
  const [period, setPeriod] = useState<Period>('6M');

  const chartPaths: Record<Period, string> = {
    '1M': "M0 40 Q 10 38, 20 42 T 40 40 T 60 45 T 80 43 T 100 44",
    '6M': "M0 40 Q 10 38, 20 30 T 40 35 T 60 20 T 80 25 T 100 15",
    '1A': "M0 45 Q 25 40, 50 35 T 75 25 T 100 10"
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto pb-32 bg-background-light dark:bg-background-dark">
      {/* TopAppBar */}
      <header className="sticky top-0 z-20 flex items-center justify-between p-4 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-[#111814] dark:text-white" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center text-[#111814] dark:text-white">{ticker || 'VGIR11'}</h2>
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-[#111814] dark:text-white" style={{ fontSize: '24px' }}>ios_share</span>
        </button>
      </header>

      {/* Price Section */}
      <div className="flex flex-col items-center pt-2 pb-6 px-4">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cotação Atual</span>
        </div>
        <h1 className="text-[40px] font-extrabold leading-tight tracking-tight text-[#111814] dark:text-white mt-1">R$ 9,85</h1>
        <div className="flex items-center gap-1 mt-1 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20">
          <span className="material-symbols-outlined text-primary text-sm font-bold">arrow_upward</span>
          <span className="text-primary text-sm font-bold">0,12% (Hoje)</span>
        </div>
      </div>

      {/* Recommendation Card (Caution) */}
      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="h-1 w-full bg-amber-400"></div>
          <div className="p-5 flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Recomendação</span>
                <h3 className="text-xl font-bold text-[#111814] dark:text-white">Manter com Cautela</h3>
              </div>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-400/10 text-amber-500">
                <span className="material-symbols-outlined">warning</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Apesar do bom histórico de dividendos, o cenário atual de juros exige atenção à vacância do portfólio. Mantenha posição, mas evite novos aportes.
            </p>
            <div className="mt-2 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center gap-3">
              <div 
                className="h-10 w-10 rounded-lg bg-cover bg-center border border-gray-100 dark:border-white/10" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLK5O8NvTJVm9mmejUuzSnYQtGZUDBjc24HiYwkRgc610iuq4JfL5sIykMKGqh7keu4tchv9-Gz6tPjVeDxMeMCv-p9i965OxFY9qnH0q3s-wLE087e74RQRBH-KlrOJeFhNRQvE9Guw7ihMo-XxXdSV4KV53cHfIe6vkSazCybIgxZG5lSgfB5Hyzg8qYhYYv4qwEWkmze3VgMwplo2MMr0i31WZhYA-N5vMtt1TPlNWmK56pGpOMif9p4q65m6-MZ8MamspcUfQ")' }}
              ></div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-gray-400">Setor</span>
                <span className="text-sm font-semibold text-[#111814] dark:text-white">Papel & Crédito</span>
              </div>
              <div className="ml-auto flex flex-col items-end">
                <span className="text-xs text-gray-500 dark:text-gray-400">Score</span>
                <span className="text-sm font-bold text-amber-500">72/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-4 mb-8">
        <div className="flex justify-between items-center mb-3 px-1">
          <h3 className="text-base font-bold text-[#111814] dark:text-white">Desempenho</h3>
          <div className="flex gap-2 bg-slate-100 dark:bg-surface-dark p-1 rounded-lg border border-gray-200 dark:border-gray-800">
            {(['1M', '6M', '1A'] as Period[]).map((p) => (
              <button 
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs font-bold px-3 py-1 rounded transition-all duration-300 ${
                  period === p 
                  ? 'bg-primary text-background-dark shadow-sm' 
                  : 'text-gray-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-48 w-full rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-gray-800 p-4 shadow-sm overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10 pointer-events-none">
            {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-gray-500"></div>)}
          </div>
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
            <defs>
              <linearGradient id="chartGradientMaintain" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#11d473" stopOpacity="0.2"></stop>
                <stop offset="100%" stopColor="#11d473" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path 
              className="transition-all duration-700 ease-in-out"
              d={chartPaths[period] + " V 50 H 0 Z"} 
              fill="url(#chartGradientMaintain)"
            ></path>
            <path 
              className="transition-all duration-700 ease-in-out"
              d={chartPaths[period]} 
              fill="none" 
              stroke="#11d473" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2"
            ></path>
          </svg>
          <div className="absolute bottom-[30%] right-[10%] w-3 h-3 bg-primary rounded-full border-2 border-white dark:border-surface-dark shadow-lg transition-all duration-700"></div>
        </div>
      </div>

      {/* Indicators */}
      <div className="px-4 mb-6">
        <h3 className="text-base font-bold text-[#111814] dark:text-white mb-3 px-1">Indicadores Fundamentais</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-1 shadow-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">DY (12m)</span>
            <p className="text-xl font-bold text-[#111814] dark:text-white">13,5%</p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-1 shadow-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">P/VP</span>
            <div className="flex items-baseline gap-2">
              <p className="text-xl font-bold text-[#111814] dark:text-white">0,98</p>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Bom</span>
            </div>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-1 shadow-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">Últ. Rendimento</span>
            <p className="text-xl font-bold text-[#111814] dark:text-white">R$ 0,11</p>
          </div>
          <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 flex flex-col gap-1 shadow-sm">
            <span className="text-xs text-gray-500 dark:text-gray-400">Liquidez Diária</span>
            <p className="text-xl font-bold text-[#111814] dark:text-white">4.2M</p>
          </div>
        </div>
      </div>

      {/* Analysis */}
      <div className="px-4 mb-8">
        <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <h3 className="text-base font-bold text-[#111814] dark:text-white mb-3">Tese de Investimento</h3>
          <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            O <strong>VGIR11</strong> é um fundo indexado ao CDI, o que historicamente oferece proteção contra volatilidade de juros. No entanto, o spread de crédito atual está comprimido em relação à média histórica.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
            <span className="text-xs text-gray-400">Atualizado: 24/10/2023</span>
            <button className="text-primary text-sm font-bold flex items-center gap-1">
              Ler relatório <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailsMaintain;
