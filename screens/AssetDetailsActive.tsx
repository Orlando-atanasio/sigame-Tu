
import React, { useState, useMemo } from 'react';
import { generateSmoothPath, generateMockHistory } from '../utils/chartUtils';

interface AssetDetailsProps {
  ticker: string;
  onBack: () => void;
}

type Period = '1M' | '6M' | '1Y';

const AssetDetailsActive: React.FC<AssetDetailsProps> = ({ ticker, onBack }) => {
  const [showFullAnalysis, setShowFullAnalysis] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [period, setPeriod] = useState<Period>('1M');

  // Gerar dados dinâmicos baseados no período selecionado
  const chartData = useMemo(() => {
    const points = period === '1M' ? 20 : period === '6M' ? 40 : 60;
    const trend = ticker === 'XPML11' ? 0.2 : 0.05; // Simulando tendências diferentes
    return generateMockHistory(points, 100, trend, 5);
  }, [period, ticker]);

  const handleExecute = () => {
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onBack();
    }, 1500);
  };

  const dynamicPath = useMemo(() => generateSmoothPath(chartData, 478, 150), [chartData]);

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto pb-32 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl text-slate-900 dark:text-white">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-white">{ticker || 'Ativo'}</h1>
            <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Análise Dinâmica de Mercado</span>
          </div>
          <button className="flex items-center justify-center w-10 h-10 rounded-full text-yellow-400">
            <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-6 pt-4">
        <section className="px-5 flex flex-col items-center justify-center gap-1">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cotação Atual</span>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">R$ 112,40</h2>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-primary text-sm font-bold">arrow_upward</span>
              <span className="text-primary font-bold text-sm">0.85%</span>
            </div>
          </div>
        </section>

        {/* Dynamic Chart Section */}
        <section className="flex flex-col gap-4 px-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Performance Gerada pela IA</h3>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-surface-dark rounded-lg p-1 border border-gray-200 dark:border-white/5">
              {(['1M', '6M', '1Y'] as Period[]).map((p) => (
                <button 
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-md text-xs transition-all duration-300 ${
                    period === p ? 'font-bold bg-primary text-background-dark shadow-sm' : 'font-medium text-gray-400'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-[180px] w-full bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5 p-4 pt-8 overflow-hidden">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 478 150">
              <defs>
                <linearGradient id="chartGradientActive" x1="0" x2="0" y1="0" y2="1">
                  <stop stopColor="#11d473" stopOpacity="0.25"></stop>
                  <stop offset="1" stopColor="#11d473" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <path 
                className="transition-all duration-700 ease-in-out"
                d={dynamicPath + " L 478,150 L 0,150 Z"} 
                fill="url(#chartGradientActive)"
              ></path>
              <path 
                className="transition-all duration-700 ease-in-out"
                d={dynamicPath} 
                stroke="#11d473" 
                strokeLinecap="round" 
                strokeWidth="3"
              ></path>
            </svg>
          </div>
        </section>

        <section className="px-4 pb-12">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Análise da Tese</h3>
          </div>
          <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              O gráfico acima é gerado dinamicamente processando as tendências de mercado para o {ticker}. A curva reflete o comportamento de volatilidade esperado para o perfil selecionado.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AssetDetailsActive;
