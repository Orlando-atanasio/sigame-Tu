
import React from 'react';

interface ActionPlanProps {
  onBack?: () => void;
  onExploreRisk?: () => void;
  onExecute?: () => void;
}

const ActionPlan: React.FC<ActionPlanProps> = ({ onBack, onExploreRisk, onExecute }) => {
  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-right duration-500 overflow-y-auto pb-40">
      {/* TopAppBar */}
      <div className="sticky top-0 z-20 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5 transition-colors duration-200">
        <button 
          onClick={onBack}
          className="text-gray-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Plano de Ação</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex size-12 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-900 dark:text-white">
            <span className="material-symbols-outlined text-2xl">more_vert</span>
          </button>
        </div>
      </div>

      {/* Summary Hero Section */}
      <div className="px-4 py-6">
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-6 shadow-sm border border-gray-200 dark:border-white/5 transition-colors duration-200">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-gray-500 dark:text-[#9db9ab] text-sm font-medium leading-normal mb-1">Potencial de Otimização</p>
            <h2 className="text-gray-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center">R$ 15.230,00</h2>
            <div className="mt-4 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>+0.53% Yield mensal projetado</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4">
        {/* Phase 1: Liquidação */}
        <div className="relative pb-8">
          <div className="absolute left-[19px] top-10 h-full w-[2px] bg-gray-200 dark:bg-white/10"></div>
          <div className="flex items-start gap-4">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 ring-4 ring-background-light dark:ring-background-dark">
              <span className="material-symbols-outlined text-xl">remove_shopping_cart</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight">Liquidação</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4">
                Ativos identificados para troca imediata.
              </p>

              {/* BCFF11 */}
              <div className="mb-3 flex flex-col rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-700 dark:text-white">BCFF</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">BTG Fundo de Fundo</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">BCFF11 • FOF</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-500">Venda Total</p>
                    <p className="text-xs text-gray-500">Spread: +12.8%</p>
                  </div>
                </div>
              </div>

              {/* HGLG11 */}
              <div className="mb-3 flex flex-col rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/5 text-xs font-bold text-gray-700 dark:text-white">HGLG</div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">CSHG Logística</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">HGLG11 • Logística</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-red-500">Realocação</p>
                    <p className="text-xs text-gray-500">Spread: +8.1%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2: Aquisição */}
        <div className="relative">
          <div className="flex items-start gap-4">
            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary ring-4 ring-background-light dark:ring-background-dark">
              <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="text-gray-900 dark:text-white text-xl font-bold leading-tight">Aquisição</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal mt-1 mb-4">
                Ativos sugeridos para maximizar o yield.
              </p>

              <div className="flex flex-col gap-2">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 flex justify-between items-center">
                   <span className="text-sm font-bold">MXRF11</span>
                   <span className="text-xs font-medium text-primary">Yield: 1.05%</span>
                </div>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20 flex justify-between items-center">
                   <span className="text-sm font-bold">KNIP11</span>
                   <span className="text-xs font-medium text-primary">Yield: 0.95%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="fixed bottom-[88px] left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button 
          onClick={onExecute}
          className="w-full bg-slate-900 dark:bg-white text-white dark:text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          Visualizar Carteira Ideal
          <span className="material-symbols-outlined">auto_fix_high</span>
        </button>
      </div>
    </div>
  );
};

export default ActionPlan;
