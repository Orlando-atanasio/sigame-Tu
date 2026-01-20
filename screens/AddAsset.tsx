
import React, { useState, useMemo, useEffect } from 'react';

interface AssetOption {
  ticker: string;
  name: string;
  type: string;
  category: 'Ação' | 'FII' | 'ETF';
  imageUrl?: string;
  isAiRecommended?: boolean;
}

const MARKET_ASSETS: AssetOption[] = [
  { ticker: 'XPML11', name: 'XP Malls FII', type: 'FII - Shopping', category: 'FII', isAiRecommended: true, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEd1OYIy17cSDs2WOJ40BoQ1MJKMkuiMLd6exrvVF-R_Opbi_acjBGLpSzHDfAmFd57sfaZB-MvSKhNDf8y0dKHmAXJyHIlCyUdmlWe-Kvps53eT57O8TmX6gIyeb3udvm9HQX5MDaSj7br-1sDcBjRy27rQWrgkAXGpeCRFhLIS1x1OMt5kJJkUoftVNUu7eYaS1lEHbun1EiME6DmnD7NDtTwEa3e6q8ampH0qJqduSkaJtdY4GQCtybZ5pjjGf9t7m7zASfPbU' },
  { ticker: 'MXRF11', name: 'Maxi Renda', type: 'FII - Papel', category: 'FII', isAiRecommended: true, imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSmrHybyuFjt5ftfDYmQ5L0hklYke_UIajFpknIb8T_Ai1akSPeuv8S9jW-9p8pOjnsx6L2qMfyo4PTVD4G24vPlgMsYrnVIytCvskIzXP7vXX6X_uGa7FThbnnwTp0BSP6sFoq5Zcu2QgwuHbI58dP4_cKYmQD51Db2zRHoIzHugcH7Gexqnw4iGMwtbsUjrYwdIhfBLedlbZTDluAityOXO4XzLZr7AKaA5NagiV-Dhcd78QvS4Qxt6yLM64MTvzRynCnQ41KRc' },
  { ticker: 'PETR4', name: 'Petrobras PN', type: 'Petróleo & Gás', category: 'Ação' },
  { ticker: 'VALE3', name: 'Vale ON', type: 'Mineração', category: 'Ação' },
  { ticker: 'ITUB4', name: 'Itaú Unibanco', type: 'Setor Bancário', category: 'Ação' },
  { ticker: 'BBDC4', name: 'Bradesco PN', type: 'Setor Bancário', category: 'Ação' },
  { ticker: 'HGLG11', name: 'CSHG Logística', type: 'FII - Logística', category: 'FII' },
  { ticker: 'KNRI11', name: 'Kinea Renda', type: 'FII - Híbrido', category: 'FII' },
  { ticker: 'VISC11', name: 'Vinci Shopping', type: 'FII - Shopping', category: 'FII' },
  { ticker: 'WEGE3', name: 'Weg ON', type: 'Bens de Capital', category: 'Ação' },
];

interface AddAssetProps {
  onBack: () => void;
  onAdd: (asset: AssetOption, quantity: number, price: number) => void;
}

const AddAsset: React.FC<AddAssetProps> = ({ onBack, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<AssetOption | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [priceStr, setPriceStr] = useState<string>('');
  const [recentTickers, setRecentTickers] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('sigametu_recent_search');
    if (saved) setRecentTickers(JSON.parse(saved));
  }, []);

  const saveToRecent = (ticker: string) => {
    const updated = [ticker, ...recentTickers.filter(t => t !== ticker)].slice(0, 3);
    setRecentTickers(updated);
    localStorage.setItem('sigametu_recent_search', JSON.stringify(updated));
  };

  // Máscara de Moeda (R$)
  const formatCurrency = (val: string) => {
    const cleanValue = val.replace(/\D/g, "");
    if (!cleanValue) return "";
    const numericValue = parseInt(cleanValue) / 100;
    return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceStr(formatCurrency(e.target.value));
  };

  const numericPrice = useMemo(() => {
    const clean = priceStr.replace(/[R$\s.]/g, "").replace(",", ".");
    return parseFloat(clean) || 0;
  }, [priceStr]);

  const filteredAssets = useMemo(() => {
    if (!searchTerm) return [];
    return MARKET_ASSETS.filter(a => 
      a.ticker.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a, b) => (a.isAiRecommended ? -1 : 1));
  }, [searchTerm]);

  const handleSelectAsset = (asset: AssetOption) => {
    setSelectedAsset(asset);
    saveToRecent(asset.ticker);
  };

  const handleConfirm = () => {
    if (selectedAsset && quantity && numericPrice) {
      onAdd(selectedAsset, parseFloat(quantity), numericPrice);
    }
  };

  return (
    <div className="flex flex-col w-full h-full animate-in fade-in slide-in-from-bottom duration-500 overflow-hidden bg-background-light dark:bg-background-dark">
      <header className="flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 justify-between border-b border-gray-200 dark:border-white/5">
        <button onClick={onBack} className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
          <span className="material-symbols-outlined text-slate-900 dark:text-white">close</span>
        </button>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold">Novo Ativo</h2>
        <div className="size-10"></div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {!selectedAsset ? (
          <div className="px-4 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Busca Avançada</h1>
              <p className="text-slate-500 text-sm">Digite o ticker ou nome do ativo da B3.</p>
            </div>

            <div className="relative mb-8">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
              <input 
                autoFocus
                type="text" 
                placeholder="Ex: PETR4, MXRF11..." 
                className="w-full h-14 pl-12 pr-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {!searchTerm && recentTickers.length > 0 && (
              <div className="mb-8 animate-in fade-in duration-500">
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Buscados Recentemente</h3>
                <div className="flex flex-wrap gap-2">
                  {recentTickers.map(t => (
                    <button key={t} onClick={() => setSearchTerm(t)} className="px-4 py-2 bg-white dark:bg-surface-dark border border-gray-100 dark:border-white/5 rounded-full text-sm font-bold text-slate-700 dark:text-slate-300 active:scale-95 transition-all">
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {filteredAssets.map((asset) => (
                <button 
                  key={asset.ticker}
                  onClick={() => handleSelectAsset(asset)}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-white/5 hover:border-primary transition-all text-left shadow-sm active:scale-[0.99] group"
                >
                  <div className="size-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-primary border border-gray-200 dark:border-white/10 overflow-hidden shrink-0">
                    {asset.imageUrl ? <img src={asset.imageUrl} className="size-full object-cover" /> : asset.ticker.substring(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-slate-900 dark:text-white font-bold">{asset.ticker}</h4>
                      {asset.isAiRecommended && (
                        <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                      )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[10px] uppercase font-bold">{asset.name}</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="text-[10px] font-black uppercase text-slate-400">{asset.category}</span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
                  </div>
                </button>
              ))}
              
              {searchTerm && filteredAssets.length === 0 && (
                <button 
                  onClick={() => handleSelectAsset({ ticker: searchTerm.toUpperCase(), name: 'Ativo Customizado', type: 'Manual', category: 'Ação' })}
                  className="p-8 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-3xl flex flex-col items-center gap-3 text-slate-400 hover:text-primary hover:border-primary transition-all bg-slate-50/50 dark:bg-transparent"
                >
                  <span className="material-symbols-outlined text-4xl">add_circle</span>
                  <p className="text-sm font-black uppercase tracking-tight">Adicionar "{searchTerm.toUpperCase()}" Manualmente</p>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="px-4 py-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center gap-4 p-6 bg-white dark:bg-surface-dark rounded-[2.5rem] border border-gray-100 dark:border-white/5 mb-8 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
              <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-2xl border border-primary/20 shrink-0">
                {selectedAsset.ticker.substring(0, 2)}
              </div>
              <div className="flex-1">
                <h3 className="text-slate-900 dark:text-white text-3xl font-black leading-none">{selectedAsset.ticker}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">{selectedAsset.name}</p>
              </div>
              <button onClick={() => setSelectedAsset(null)} className="size-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 active:scale-90 transition-all">
                <span className="material-symbols-outlined">edit</span>
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Quantidade de Cotas</label>
                <input 
                  type="number" 
                  placeholder="0"
                  className="w-full h-16 px-6 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white text-2xl font-black focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">Preço Médio Pago</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="R$ 0,00"
                    className="w-full h-16 px-6 bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white text-2xl font-black focus:ring-4 focus:ring-primary/20 outline-none transition-all shadow-sm"
                    value={priceStr}
                    onChange={handlePriceChange}
                  />
                  {numericPrice > 0 && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in zoom-in">
                      <span className="material-symbols-outlined text-primary">verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">info</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Sua carteira será reanalisada pela IA assim que este ativo for adicionado. 
                <span className="text-primary font-bold"> Yield médio projetado em +0.12%.</span>
              </p>
            </div>

            <button 
              disabled={!quantity || !numericPrice}
              onClick={handleConfirm}
              className="w-full mt-8 bg-primary disabled:opacity-40 text-background-dark font-black text-lg py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              CONFIRMAR ADIÇÃO <span className="material-symbols-outlined">add_chart</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAsset;
