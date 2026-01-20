
import React, { useState, useMemo } from 'react';

interface RegisterProps {
  onRegister: () => void;
  onBackToLogin: () => void;
}

import { supabase } from '../services/supabase';

const Register: React.FC<RegisterProps> = ({ onRegister, onBackToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordStrength = useMemo(() => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[!@#$%^&*]/.test(password)) strength += 1;
    return Math.min(strength, 5);
  }, [password]);

  const strengthColor = [
    'bg-slate-200 dark:bg-white/10',
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-primary/60',
    'bg-primary'
  ][passwordStrength];

  const strengthText = [
    '', 'Muito Fraca', 'Fraca', 'Média', 'Boa', 'Senha Forte'
  ][passwordStrength];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (passwordStrength < 3) {
      setError('Sua senha é muito insegura. Adicione números ou símbolos.');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          }
        }
      });

      if (error) throw error;

      onRegister();
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background-light dark:bg-background-dark animate-in slide-in-from-right duration-500 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 size-80 bg-primary/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 flex flex-col flex-1 px-8 pt-12 pb-12 overflow-y-auto no-scrollbar">
        <button
          onClick={onBackToLogin}
          className="size-12 flex items-center justify-center rounded-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 text-slate-400 mb-8 active:scale-90 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">Crie sua Conta</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-3 leading-relaxed">
            Tenha um mentor de IA exclusivo para cuidar do seu patrimônio.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 animate-in shake">
            <span className="material-symbols-outlined text-red-500 text-sm">error</span>
            <p className="text-xs font-bold text-red-500 leading-tight">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-[0.1em]">Nome Completo</label>
            <input
              required
              type="text"
              placeholder="Como quer ser chamado?"
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-[0.1em]">E-mail</label>
            <input
              required
              type="email"
              placeholder="seu@email.com"
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-[0.1em]">Defina uma Senha</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {password && (
              <div className="px-1 mt-2 animate-in fade-in duration-300">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Segurança</span>
                  <span className={`text-[10px] font-black uppercase ${passwordStrength >= 4 ? 'text-primary' : 'text-slate-500'}`}>{strengthText}</span>
                </div>
                <div className="flex gap-1.5 h-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className={`flex-1 rounded-full transition-all duration-700 ease-out ${s <= passwordStrength ? strengthColor : 'bg-slate-100 dark:bg-white/5'}`}></div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 ml-1 tracking-[0.1em]">Confirme sua Senha</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              className="w-full h-14 px-5 bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-2xl text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-8 w-full h-16 bg-primary text-background-dark font-black rounded-2xl shadow-2xl shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70 text-lg"
          >
            {isLoading ? <div className="size-6 border-4 border-background-dark/20 border-t-background-dark rounded-full animate-spin"></div> : "CONCLUIR CADASTRO"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium px-4">
          Ao clicar em concluir, você aceita nossos Termos de Uso e Política de IA Responsável.
        </p>
      </div>
    </div>
  );
};

export default Register;
