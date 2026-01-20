
import React, { useState, useMemo } from 'react';

type FilterType = 'Todos' | 'Aumentar' | 'Cautela' | 'Substituir' | 'Adicionado';

interface PortfolioItem {
  id: string;
  ticker: string;
  type: string;
  typeShort: string;
  yield: string;
  status: 'Aumentar' | 'Cautela' | 'Substituir' | 'Manter' | 'Adicionado';
  description: string;
  imageUrl: string;
  colorClass: string;
  quantity?: number;
  avgPrice?: number;
}

interface WalletProps {
  onItemClick?: (ticker: string) => void;
  onAddClick?: () => void;
  isPortfolioRebalanced?: boolean;
  isVGHFSwapped?: boolean;
  userAssets?: PortfolioItem[];
}

const Wallet: React.FC<WalletProps> = ({ onItemClick, onAddClick, isPortfolioRebalanced, isVGHFSwapped, userAssets = [] }) => {
  const items = useMemo((): PortfolioItem[] => {
    // Se o usuário não tem nada e não houve rebalanceamento, retorna vazio para testar empty state
    // Mas para o demo, vamos assumir que ele começa com alguns se não houver userAssets
    if (userAssets.length === 0 && !isPortfolioRebalanced && !isVGHFSwapped) {
      return [];
    }

    let currentItems: PortfolioItem[] = [
      {
        id: '1', ticker: 'HGLG11', type: 'C.Logística', typeShort: 'LOG', yield: '+0.10%', status: 'Substituir',
        description: 'Troca estratégica', colorClass: 'bg-red-500',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKfKur07p_Swd9ptBwAHcXx0N40uektgbjJ2IzZBBs2k70PSRVcIUcmsOO7K3f0qzPGM6XfE2F3XoY9NZctc8-K7xSPojPe0Wk-9pvqg4pZkrKwqQ3MbJKkZDc4_y5Cc41dXAw-tbMCzCPe-X0VJnFdhe6bl_moKqsDw_Y8V2wdM319BAkUs6aXZDwLdpaXKtQX3N_sC-k8eHMKpcxeROLktmUukwOrLLK-0ixmr0KHb_CVVTCyMcmqpEY08apbSPVWQhktgmPEwQ'
      },
      {
        id: '5', ticker: 'VGHF11', type: 'Hedge Fund', typeShort: 'HED', yield: '-0.50%', status: 'Substituir',
        description: 'Ágio excessivo', colorClass: 'bg-red-500',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7OqSGvftK3E86qrxkytsGjap59Blr14P50w03UPM7rQrX_GMmanGxxyfPfqw-xLdwB8YwEN0gSAr90JJ5xBYUzG1pTnGsIri1kLFmvpxTAEzlLbu6NDg_dCRtO8954WZS94mt_IkFeiDRo2VVao8eU_AAdUB8X0cTgmncDPmwX6-kAMOhzFmqct5IXX9C9OyOznNztTG2L4oBZBJMH-HZpRttNsTpwmQR_Z1Nb21yGKDzh3uKe0qGcx99_4H18Ncnak2Fmasowyo'
      }
    ];

    if (isPortfolioRebalanced) {
      currentItems = currentItems.filter(item => item.ticker !== 'HGLG11');
      currentItems.push({
        id: '10', ticker: 'MXRF11', type: 'Papel', typeShort: 'PAP', yield: '+1.05%', status: 'Aumentar',
        description: 'Dividendo potencializado', colorClass: 'bg-primary',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSmrHybyuFjt5ftfDYmQ5L0hklYke_UIajFpknIb8T_Ai1akSPeuv8S9jW-9p8pOjnsx6L2qMfyo4PTVD4G24vPlgMsYrnVIytCvskIzXP7vXX6X_uGa7FThbnnwTp0BSP6sFoq5Zcu2QgwuHbI58dP4_cKYmQD51Db2zRHoIzHugcH7Gexqnw4iGMwtbsUjrYwdIhfBLedlbZTDluAityOXO4XzLZr7AKaA5NagiV-Dhcd78QvS4Qxt6yLM64MTvzRynCnQ41KRc'
      });
    }

    if (isVGHFSwapped) {
      currentItems = currentItems.filter(item => item.ticker !== 'VGHF11');
      currentItems.push({
        id: '12', ticker: 'XPML11', type: 'Shopping', typeShort: 'SHP', yield: '+1.15%', status: 'Aumentar',
        description: 'Foco em varejo premium', colorClass: 'bg-primary',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEd1OYIy17cSDs2WOJ40BoQ1MJKMkuiMLd6exrvVF-R_Opbi_acjBGLpSzHDfAmFd57sfaZB-MvSKhNDf8y0dKHmAXJyHIlCyUdmlWe-Kvps53eT57O8TmX6gIyeb3udvm9HQX5MDaSj7br-1sDcBjRy27rQWrgkAXGpeCRFhLIS1x1OMt5kJJkUoftVNUu7eYaS1lEHbun1EiME6DmnD7NDtTwEa3e6q8ampH0qJqduSkaJtdY4GQCtybZ5pjjGf9t7m7zASfPbU'
      });
    }

    return [...userAssets, ...currentItems];
  }, [isPortfolioRebalanced, isVGHFSwapped, userAssets]);

  const totalPatrimony = useMemo(() => {
    if (items.length === 0) return 0;
    const baseValue = 152340;
    const addedValue = userAssets.reduce((acc, curr) => acc + ((curr.quantity || 0) * (curr.avgPrice || 0)), 0);
    return baseValue + addedValue;
  }, [userAssets, items]);

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-right duration-500 bg-background-light dark:bg-background-dark">
      <header className="flex items-center px-4 pt-10 pb-4 justify-between sticky top-0 z-20 bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-white/5">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Minha Carteira</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">{items.length} ativos totais</p>
        </div>
        <button onClick={onAddClick} className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center animate-in zoom-in duration-500">
            <div className="size-32 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-6xl">account_balance_wallet</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Carteira Vazia</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-[240px] leading-relaxed mb-8">
              Você ainda não adicionou nenhum ativo. Comece agora para receber o diagnóstico do Gemini.
            </p>
            <button 
              onClick={onAddClick}
              className="px-8 py-4 bg-primary text-background-dark font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all"
            >
              ADICIONAR PRIMEIRO ATIVO
            </button>
          </div>
        ) : (
          <>
            {/* Total Patrimony Card */}
            <div className="my-6 p-6 rounded-3xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Patrimônio Consolidado</p>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                  R$ {totalPatrimony.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-[10px] font-black bg-primary/10 text-primary px-2 py-1 rounded-full uppercase">Rentabilidade 2.4%</span>
                </div>
              </div>
            </div>

            {/* Assets List */}
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={item.id} onClick={() => onItemClick?.(item.ticker)} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 shadow-sm hover:border-primary/40 active:scale-[0.98] transition-all cursor-pointer">
                  <div className="size-14 rounded-xl bg-center bg-cover bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-primary border border-gray-100 dark:border-white/5" style={{ backgroundImage: item.imageUrl ? `url("${item.imageUrl}")` : 'none' }}>
                    {!item.imageUrl && item.ticker.substring(0, 2)}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-black text-lg text-slate-900 dark:text-white leading-none">{item.ticker}</h4>
                        <p className="text-[10px] font-bold text-slate-500 uppercase mt-1">{item.type}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-black ${item.yield.startsWith('-') ? 'text-red-500' : 'text-primary'}`}>{item.yield}</p>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                        item.status === 'Substituir' ? 'bg-red-500/10 text-red-500' :
                        item.status === 'Aumentar' ? 'bg-primary/10 text-primary' :
                        item.status === 'Adicionado' ? 'bg-emerald-500/10 text-emerald-500' :
                        'bg-slate-100 dark:bg-white/10 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wallet;
