
import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  const bgColor = {
    success: 'bg-primary text-background-dark',
    error: 'bg-red-500 text-white',
    info: 'bg-slate-800 text-white'
  }[type];

  const icon = {
    success: 'check_circle',
    error: 'error',
    info: 'info'
  }[type];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[1000] animate-in slide-in-from-top duration-300">
      <div className={`${bgColor} px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[280px]`}>
        <span className="material-symbols-outlined text-xl">{icon}</span>
        <span className="text-sm font-black uppercase tracking-tight">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
