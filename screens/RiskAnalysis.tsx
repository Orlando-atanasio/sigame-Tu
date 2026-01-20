
import React, { useState } from 'react';

interface RiskAnalysisProps {
  onBack: () => void;
  onAddAsset: () => void;
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ onBack, onAddAsset }) => {
  const [sliderVal, setSliderVal] = useState(60); // 0.80 to 1.05 range simulation

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased flex flex-col min-h-screen pb-24 overflow-x-hidden animate-in fade-in slide-in-from-right duration-500 overflow-y-auto">
      {/* Top App Bar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b dark:border-white/5 border-gray-200">
        <button 
          onClick={onBack}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back_ios_new</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Análise de Risco</h2>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full max-w-md mx-auto">
        {/* Headline */}
        <div className="flex flex-col px-4 pt-6 pb-2">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] font-extrabold leading-[1.1] text-left">
            Timing <span className="text-primary">vs.</span><br/>Fundamentos
          </h1>
          <p className="mt-2 text-gray-600 dark:text-[#9db9ab] text-sm font-medium leading-relaxed">
            Entenda a diferença crucial entre pagar caro em algo bom e comprar algo estruturalmente ruim.
          </p>
        </div>

        {/* Concepts Grid */}
        <div className="grid grid-cols-2 gap-3 p-4">
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-dark p-4 shadow-sm">
            <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <span className="material-symbols-outlined">history</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Timing Ruim</h2>
              <p className="text-gray-500 dark:text-[#9db9ab] text-xs font-normal leading-normal">
                Bom ativo comprado no topo histórico. O fundamento é bom, o preço não.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-dark p-4 shadow-sm">
            <div className="size-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400">
              <span className="material-symbols-outlined">domain_disabled</span>
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Ativo Ruim</h2>
              <p className="text-gray-500 dark:text-[#9db9ab] text-xs font-normal leading-normal">
                Imóveis vagos, calotes ou má gestão. Barato que sai caro.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-white/5 mx-4 my-2"></div>

        {/* Case Study Header */}
        <div className="px-4 py-3 flex items-center justify-between">
          <h2 className="text-slate-900 dark:text-white text-[20px] font-bold leading-tight tracking-[-0.015em]">
            Estudo de Caso: <span className="text-primary">TRXF11</span>
          </h2>
          <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">HÍBRIDO</span>
        </div>

        {/* Case Study Stats */}
        <div className="flex flex-wrap gap-3 px-4 pb-2">
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-dark relative overflow-hidden">
            <div className="absolute -right-4 -top-4 size-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
            <p className="text-gray-500 dark:text-[#9db9ab] text-xs font-medium uppercase tracking-wider">Cotação Atual</p>
            <div className="flex items-end gap-2">
              <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-none">R$ 108,50</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>
              <p className="text-red-500 text-sm font-medium leading-none">-1.2%</p>
            </div>
          </div>
          <div className="flex min-w-[140px] flex-1 flex-col gap-1 rounded-xl p-4 border border-gray-200 dark:border-white/5 bg-white dark:bg-surface-dark relative overflow-hidden">
            <div className="absolute -right-4 -top-4 size-16 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl"></div>
            <p className="text-gray-500 dark:text-[#9db9ab] text-xs font-medium uppercase tracking-wider">P/VP Atual</p>
            <div className="flex items-end gap-2">
              <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-none">0,98</p>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
              <p className="text-primary text-sm font-medium leading-none">Desconto</p>
            </div>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="px-4 pb-6 pt-2">
          <div className="w-full h-40 rounded-xl bg-surface-dark border border-white/5 relative overflow-hidden p-4 flex flex-col justify-between transition-colors duration-200">
            <div className="flex justify-between items-center z-10">
              <span className="text-[10px] text-[#9db9ab] font-bold uppercase">Histórico de Preço vs. VP</span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full">12 Meses</span>
            </div>
            <div className="absolute inset-0 flex items-end px-4 pb-4 pt-10">
              <div className="w-full h-full opacity-20 bg-gradient-to-t from-primary/40 to-transparent absolute bottom-0 left-0"></div>
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path d="M0,20 Q25,18 50,19 T100,18" fill="none" stroke="#9db9ab" strokeDasharray="2,1" strokeWidth="0.5"></path>
                <path d="M0,25 Q15,10 30,22 T60,15 T85,28 T100,22" fill="none" stroke="#11d473" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path>
                <circle cx="100" cy="22" fill="#11d473" r="2" stroke="#1c2721" strokeWidth="1"></circle>
              </svg>
            </div>
            <div className="flex justify-between z-10 mt-auto pt-2 border-t border-white/5">
              <span className="text-[10px] text-[#9db9ab]">R$ 102,00</span>
              <span className="text-[10px] text-[#9db9ab]">R$ 115,00</span>
            </div>
          </div>
          <p className="text-xs text-[#9db9ab] mt-2 text-center">
            O preço (verde) abaixo do VP (tracejado) indica <span className="text-white font-bold">bom timing</span> de entrada.
          </p>
        </div>

        {/* Strategy Section */}
        <div className="px-4 pb-6">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-4">Estratégias de Proteção</h3>
          <div className="flex gap-4 mb-4">
            <div className="w-10 flex flex-col items-center">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-xl">savings</span>
              </div>
              <div className="w-0.5 h-full bg-gray-200 dark:bg-white/5 my-2 rounded-full"></div>
            </div>
            <div className="pb-2">
              <h4 className="text-slate-900 dark:text-white font-bold text-base">Faça DCA (Preço Médio)</h4>
              <p className="text-gray-500 dark:text-[#9db9ab] text-sm leading-relaxed mt-1">
                Divida seu aporte em compras mensais. Isso suaviza a volatilidade e evita comprar tudo no topo.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-10 flex flex-col items-center">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-xl">tune</span>
              </div>
            </div>
            <div className="w-full">
              <h4 className="text-slate-900 dark:text-white font-bold text-base mb-1">Simular P/VP de Entrada</h4>
              <p className="text-gray-500 dark:text-[#9db9ab] text-xs mb-3">Arraste para ver o nível de risco.</p>
              <div className="relative w-full h-10 flex items-center group">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sliderVal}
                  onChange={(e) => setSliderVal(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-surface-dark rounded-full appearance-none cursor-pointer accent-primary" 
                />
                <div className="absolute -top-1 right-0 text-[10px] font-bold text-yellow-500">1.05 (Caro)</div>
                <div className="absolute -top-1 left-0 text-[10px] font-bold text-primary">0.80 (Barato)</div>
              </div>
              <div className="mt-2 p-3 bg-white dark:bg-surface-dark rounded-lg border border-gray-200 dark:border-white/5 flex items-start gap-2 shadow-sm">
                <span className="material-symbols-outlined text-yellow-500 text-lg mt-0.5">warning</span>
                <p className="text-xs text-slate-700 dark:text-white">
                   Com P/VP simulado em <strong>{(0.80 + (sliderVal / 100) * 0.25).toFixed(2)}</strong>, você está {sliderVal > 70 ? 'pagando ágio alto' : 'em zona de segurança'}.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4 pb-8">
          <button 
            onClick={onAddAsset}
            className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-background-dark font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add_chart</span>
            Adicionar TRXF11 à Carteira
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;
