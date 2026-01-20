
import React, { useState } from 'react';

interface IdealPortfolioProps {
  onBack: () => void;
  onApply: () => void;
  isRebalanceFlow?: boolean;
}

const IdealPortfolio: React.FC<IdealPortfolioProps> = ({ onBack, onApply, isRebalanceFlow }) => {
  const [status, setStatus] = useState<'viewing' | 'applying' | 'success'>('viewing');

  const handleApplyAction = () => {
    setStatus('applying');
    // Simulando protocolo de troca via IA
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        onApply();
      }, 2000);
    }, 2500);
  };

  const rebalanceAssets = [
    { ticker: 'MXRF11', type: 'Papel • Otimizado', icon: 'description', weight: '20%', status: 'Adicionar', isNew: true },
    { ticker: 'KNIP11', type: 'Papel • IPCA+', icon: 'verified_user', weight: '18%', status: 'Adicionar', isNew: true },
    { ticker: 'KNRI11', type: 'Híbrido • Tijolo', icon: 'apartment', weight: '15%', status: 'Manter' },
    { ticker: 'HGRE11', type: 'Lajes • Triple A', icon: 'corporate_fare', weight: '10%', status: 'Aumentar' },
  ];

  const riskSwapAssets = [
    { ticker: 'XPML11', type: 'Shopping • Tijolo', icon: 'storefront', weight: '25%', status: 'Substituir', isNew: true },
    { ticker: 'HGRE11', type: 'Lajes • Triple A', icon: 'corporate_fare', weight: '20%', status: 'Manter' },
    { ticker: 'KNRI11', type: 'Híbrido • Tijolo', icon: 'apartment', weight: '15%', status: 'Manter' },
  ];

  const assets = isRebalanceFlow ? rebalanceAssets : riskSwapAssets;

  if (status === 'applying') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-background-dark animate-in fade-in duration-500">
        <div className="relative size-40 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-5xl animate-pulse">sync_alt</span>
          </div>
        </div>
        <h2 className="text-white text-2xl font-black mb-2">Executando Trocas</h2>
        <p className="text-slate-400 text-sm text-center px-12">O SigaMe-Tu está recalibrando sua carteira com base no diagnóstico do Gemini.</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full bg-primary animate-in zoom-in duration-500">
        <div className="size-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-2xl">
          <span className="material-symbols-outlined text-primary text-5xl font-black">check</span>
        </div>
        <h2 className="text-background-dark text-3xl font-black mb-2">Sucesso!</h2>
        <p className="text-background-dark/70 font-bold text-center px-12">Sua carteira foi otimizada com sucesso.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-right duration-500 overflow-y-auto pb-40">
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5">
        <button onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight flex-1 text-center">Carteira Ideal</h2>
        <div className="w-10"></div>
      </div>

      <div className="px-4 pt-6 pb-2 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
          <span className="material-symbols-outlined text-primary text-xl">auto_fix_high</span>
          <span className="text-primary font-bold">Otimização Pronta</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-3xl font-extrabold leading-tight">
          {isRebalanceFlow ? 'Sua Nova Estratégia' : 'Ajuste de Risco'}
        </h2>
        <p className="text-slate-500 dark:text-gray-400 mt-2">
          {isRebalanceFlow ? (
            <>Trocas confirmadas: <br/><span className="text-primary font-bold">BCFF11 → MXRF11</span> e <span className="text-primary font-bold">HGLG11 → KNIP11</span></>
          ) : (
            <>Substituição de ativo de risco: <br/><span className="text-primary font-bold">VGHF11 → XPML11</span></>
          )}
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 mt-6">
        {assets.map((asset, idx) => (
          <div key={idx} className={`relative overflow-hidden flex items-center justify-between p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border ${asset.isNew ? 'border-primary/40 ring-1 ring-primary/20' : 'border-gray-100 dark:border-white/5'}`}>
            <div className="flex items-center gap-4 z-10">
              <div className={`size-12 rounded-full flex items-center justify-center shrink-0 border ${asset.isNew ? 'bg-primary/20 text-primary border-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-500 border-transparent'}`}>
                <span className="material-symbols-outlined">{asset.icon}</span>
              </div>
              <div className="flex flex-col">
                <h4 className="text-slate-900 dark:text-white font-bold text-lg">{asset.ticker}</h4>
                <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">{asset.type}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 z-10">
              <p className="text-slate-900 dark:text-white font-bold text-xl">{asset.weight}</p>
              <div className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${asset.status === 'Adicionar' || asset.status === 'Substituir' ? 'bg-primary text-background-dark' : 'bg-slate-200 dark:bg-white/10'}`}>
                {asset.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-[88px] left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button 
          onClick={handleApplyAction}
          className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>Confirmar Protocolo de Troca</span>
          <span className="material-symbols-outlined">rocket_launch</span>
        </button>
      </div>
    </div>
  );
};

export default IdealPortfolio;
