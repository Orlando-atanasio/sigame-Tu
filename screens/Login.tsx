
import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: () => void;
  onRegisterClick: () => void;
}



import { supabase } from '../services/supabase';

const Login: React.FC<LoginProps> = ({ onLogin, onRegisterClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [socialStep, setSocialStep] = useState<'idle' | 'connecting' | 'validating' | 'success'>('idle');

  useEffect(() => {
    const savedEmail = localStorage.getItem('sigametu_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    if (rememberEmail) {
      localStorage.setItem('sigametu_remembered_email', email);
    } else {
      localStorage.removeItem('sigametu_remembered_email');
    }

    onLogin();
  } catch (err: any) {
    console.error("Login Error:", err);
    setError(err.message || 'Erro ao fazer login.');
  } finally {
    setIsLoading(false);
  }
};

const handleStartGoogle = () => {
  setError(null);
  setShowGooglePicker(true);
};

const handleSelectAccount = (accountName: string) => {
  setShowGooglePicker(false);
  setSocialStep('connecting');
  setTimeout(() => {
    setSocialStep('validating');
    setTimeout(() => {
      setSocialStep('success');
      setTimeout(() => {
        onLogin();
      }, 800);
    }, 1500);
  }, 1000);
};

const isAnyLoading = isLoading || socialStep !== 'idle';

return (
  <div className="flex flex-col w-full h-full bg-background-light dark:bg-background-dark animate-in fade-in duration-700 relative overflow-hidden">
    {/* Background Sutil */}
    <div className="absolute -top-20 -left-20 size-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

    {showGooglePicker && (
      <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 animate-in fade-in duration-300">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowGooglePicker(false)}></div>
        <div className="relative w-full max-w-sm bg-white dark:bg-surface-dark rounded-t-[2rem] rounded-b-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-500">
          <div className="w-12 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full mx-auto mb-6"></div>
          <div className="flex items-center gap-3 mb-6">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="size-6" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Escolha sua conta</h3>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => handleSelectAccount('João Silva')} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left group">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-background-dark font-black text-sm group-active:scale-90 transition-transform">JS</div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">João Silva</p>
                <p className="text-xs text-slate-500">joao.silva@gmail.com</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="relative z-10 flex flex-col flex-1 px-8 pt-10 pb-4 overflow-y-auto no-scrollbar">
      {/* Header - Recalibrado para equilíbrio óptico */}
      <div className="flex flex-col items-center mb-8">
        <div className="size-16 bg-primary rounded-[1.4rem] shadow-xl shadow-primary/25 flex items-center justify-center mb-5 transform transition-transform active:scale-95">
          <span className="material-symbols-outlined text-background-dark text-3xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>radar</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">SigaMe-Tu</h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold text-[10px] mt-2 text-center uppercase tracking-[0.2em] opacity-80 leading-tight">
          Gestão Estratégica de Patrimônio
        </p>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-in shake">
          <span className="material-symbols-outlined text-red-500 text-xl">error</span>
          <p className="text-xs font-bold text-red-500 leading-tight">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-widest">Seu E-mail</label>
          <input
            required
            disabled={isAnyLoading}
            type="email"
            placeholder="exemplo@email.com"
            className="w-full h-13 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(null); }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-widest">Sua Senha</label>
          <div className="relative">
            <input
              required
              disabled={isAnyLoading}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full h-13 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm text-sm"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-xl hover:text-primary transition-colors"
            >
              {showPassword ? 'visibility_off' : 'visibility'}
            </button>
          </div>
        </div>

        {/* CHECKBOX RESTAURADO AQUI */}
        <div className="flex items-center gap-2 px-1 -mt-1">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              className="peer hidden"
              checked={rememberEmail}
              onChange={(e) => setRememberEmail(e.target.checked)}
            />
            <div className={`size-5 rounded-lg border-2 transition-all flex items-center justify-center ${rememberEmail ? 'bg-primary border-primary' : 'border-slate-300 dark:border-white/10 group-hover:border-primary/50'}`}>
              {rememberEmail && <span className="material-symbols-outlined text-background-dark text-[14px] font-black">check</span>}
            </div>
            <span className="ml-3 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-primary transition-colors select-none">Lembrar login</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isAnyLoading}
          className="w-full h-15 bg-primary text-background-dark font-black rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 text-base tracking-tight mt-2"
        >
          {isLoading ? (
            <div className="size-6 border-3 border-background-dark/20 border-t-background-dark rounded-full animate-spin"></div>
          ) : (
            <>ENTRAR AGORA <span className="material-symbols-outlined font-bold text-xl">arrow_forward</span></>
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-10 mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5"></div>
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">Ou acesse com</span>
          <div className="flex-1 h-px bg-slate-200 dark:bg-white/5"></div>
        </div>

        <button
          type="button"
          onClick={handleStartGoogle}
          disabled={isAnyLoading}
          className="flex items-center justify-center gap-4 w-full h-15 rounded-2xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 shadow-sm hover:border-primary/30 transition-all active:scale-[0.98] group"
        >
          {socialStep === 'idle' ? (
            <>
              <div className="bg-white p-1 rounded-md shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="size-5" />
              </div>
              <span className="text-sm font-black text-slate-700 dark:text-slate-200 tracking-tight">Google Account</span>
            </>
          ) : (
            <div className="size-5 border-2 border-slate-300 border-t-primary rounded-full animate-spin"></div>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto text-center pt-8 pb-4">
        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold">
          Novo por aqui? <button onClick={onRegisterClick} className="text-primary font-black hover:underline underline-offset-4 ml-1">Criar conta agora</button>
        </p>
      </div>
    </div>
  </div>
);
};

export default Login;
