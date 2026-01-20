
import React from 'react';

interface AssetDetailsProps {
  onBack: () => void;
}

const AssetDetails: React.FC<AssetDetailsProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* TopAppBar */}
      <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 justify-between border-b border-gray-200 dark:border-white/5">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">VGHF11</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Valora Hedge Fund</span>
        </div>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-white">more_vert</span>
        </button>
      </div>

      {/* Price Header */}
      <div className="flex flex-col items-center pt-6 pb-4 text-center">
        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Cotação Atual</span>
        <h1 className="text-slate-900 dark:text-white tracking-tighter text-[40px] font-bold leading-none mt-1">R$ 9,20</h1>
        <div className="flex items-center gap-1 mt-2 bg-red-500/10 px-3 py-1 rounded-full">
          <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>
          <p className="text-red-500 text-sm font-bold leading-none">1.5% hoje</p>
        </div>
      </div>

      {/* Alert Card */}
      <div className="px-4 mb-6">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30 p-5 shadow-lg">
          <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 size-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white text-base font-bold mb-1">Substituição Urgente</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Aumento expressivo na vacância e redução nos dividendos projetados para o próximo semestre.
              </p>
              <div className="mt-3 flex gap-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-500/10 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px]">trending_down</span>
                  Alta Volatilidade
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 bg-orange-500/10 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-[14px]">money_off</span>
                  Yield Baixo
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Position Stats */}
      <div className="px-4 mb-6">
        <h3 className="text-white text-sm font-semibold mb-3 px-1 opacity-80">Sua Posição</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface-dark rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Preço Médio</span>
            <span className="text-white font-bold">R$ 10,50</span>
          </div>
          <div className="bg-surface-dark rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1">Total Inv.</span>
            <span className="text-white font-bold">R$ 5.250</span>
          </div>
          <div className="bg-red-500/5 rounded-xl p-3 flex flex-col items-center justify-center text-center border border-red-500/30">
            <span className="text-[10px] uppercase tracking-wider text-red-500/80 font-bold mb-1">Resultado</span>
            <span className="text-red-500 font-bold">-12.3%</span>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="px-4 mb-8">
        <div className="flex items-center justify-between mb-2 px-1">
          <h3 className="text-white text-sm font-semibold opacity-80">Performance 12 Meses</h3>
          <span className="text-red-500 font-bold text-sm">-15.4%</span>
        </div>
        <div className="bg-surface-dark rounded-xl p-4 border border-white/5 shadow-sm">
          <div className="h-[120px] w-full relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 350 100">
              <defs>
                <linearGradient id="chartGradientDetails" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2"></stop>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="350" y1="25" y2="25"></line>
              <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="350" y1="50" y2="50"></line>
              <line stroke="rgba(255,255,255,0.05)" strokeWidth="1" x1="0" x2="350" y1="75" y2="75"></line>
              <path d="M0 30 C 50 20, 100 40, 150 50 C 200 60, 250 55, 300 80 L 350 90" fill="none" stroke="#ef4444" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
              <path d="M0 30 C 50 20, 100 40, 150 50 C 200 60, 250 55, 300 80 L 350 90 V 100 H 0 Z" fill="url(#chartGradientDetails)"></path>
            </svg>
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-500 font-medium px-1">
            <span>1 Ano atrás</span>
            <span>Hoje</span>
          </div>
        </div>
      </div>

      {/* Recommendation Section */}
      <div className="px-4 mb-24">
        <h3 className="text-white text-base font-bold mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">verified</span>
          Alternativa Recomendada
        </h3>
        <div className="bg-surface-dark rounded-xl border border-primary/20 overflow-hidden relative">
          <div className="bg-primary/10 p-4 flex justify-between items-center border-b border-primary/10">
            <div className="flex items-center gap-3">
              <div 
                className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDEd1OYIy17cSDs2WOJ40BoQ1MJKMkuiMLd6exrvVF-R_Opbi_acjBGLpSzHDfAmFd57sfaZB-MvSKhNDf8y0dKHmAXJyHIlCyUdmlWe-Kvps53eT57O8TmX6gIyeb3udvm9HQX5MDaSj7br-1sDcBjRy27rQWrgkAXGpeCRFhLIS1x1OMt5kJJkUoftVNUu7eYaS1lEHbun1EiME6DmnD7NDtTwEa3e6q8ampH0qJqduSkaJtdY4GQCtybZ5pjjGf9t7m7zASfPbU')", backgroundSize: 'cover' }}
              ></div>
              <div>
                <h4 className="text-white font-bold text-lg leading-none">XPML11</h4>
                <span className="text-primary text-xs font-bold uppercase tracking-wide">Compra Forte</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-white font-bold">R$ 115,40</span>
              <span className="text-primary text-xs font-bold">+0.8% hoje</span>
            </div>
          </div>
          <div className="p-4 grid grid-cols-3 gap-y-6 text-center">
            <div className="col-span-1 text-left text-xs text-slate-500 font-medium self-end pb-1">Indicador</div>
            <div className="col-span-1 text-xs text-slate-500 font-medium self-end pb-1">VGHF11</div>
            <div className="col-span-1 text-xs text-primary font-bold self-end pb-1">XPML11</div>
            <div className="col-span-1 text-left text-sm text-slate-300 font-medium border-b border-white/5 pb-2">Div. Yield</div>
            <div className="col-span-1 text-sm text-slate-400 border-b border-white/5 pb-2">9.2%</div>
            <div className="col-span-1 text-sm text-primary font-bold border-b border-white/5 pb-2">11.8%</div>
            <div className="col-span-1 text-left text-sm text-slate-300 font-medium border-b border-white/5 pb-2">P/VP</div>
            <div className="col-span-1 text-sm text-red-500 border-b border-white/5 pb-2">0.85</div>
            <div className="col-span-1 text-sm text-primary font-bold border-b border-white/5 pb-2">0.98</div>
            <div className="col-span-1 text-left text-sm text-slate-300 font-medium">Liquidez</div>
            <div className="col-span-1 text-sm text-slate-400">Média</div>
            <div className="col-span-1 text-sm text-primary font-bold">Alta</div>
          </div>
          <div className="px-4 pb-4">
            <p className="text-xs text-slate-400 bg-black/20 p-3 rounded-lg leading-relaxed">
              <strong className="text-primary">Por que trocar?</strong> O XPML11 possui portfólio de shoppings premium com vacância zero, oferecendo maior segurança e potencial de valorização comparado ao risco atual do VGHF11.
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Action Button Area */}
      <div className="fixed bottom-[88px] left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button className="w-full bg-primary hover:bg-green-400 text-background-dark text-lg font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(17,212,115,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined font-bold">swap_horiz</span>
          Trocar por XPML11
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
