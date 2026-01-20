
import React from 'react';

interface AssetDetailsProps {
  onBack: () => void;
  onSwap?: () => void;
}

const AssetDetailsReplacement: React.FC<AssetDetailsProps> = ({ onBack, onSwap }) => {
  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom duration-500 overflow-y-auto pb-40">
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

      {/* Recommendation Section */}
      <div className="px-4 mb-8">
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
          </div>
          <div className="p-4">
             <p className="text-xs text-slate-400 bg-black/20 p-3 rounded-lg leading-relaxed">
              <strong className="text-primary">Por que trocar?</strong> O XPML11 possui portfólio de shoppings premium com vacância zero, oferecendo maior segurança e potencial de valorização.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-[24px] left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button 
          onClick={onSwap}
          className="w-full bg-primary hover:bg-green-400 text-background-dark text-lg font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span className="material-symbols-outlined">swap_horiz</span>
          Trocar por XPML11
        </button>
      </div>
    </div>
  );
};

export default AssetDetailsReplacement;
