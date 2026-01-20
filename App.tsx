
import React, { useState, useEffect } from 'react';
import { Screen } from './types';
import Login from './screens/Login';
import Register from './screens/Register';
import PortfolioOverview from './screens/PortfolioOverview';
import Wallet from './screens/Wallet';
import AddAsset from './screens/AddAsset';
import ImpactAnalysis from './screens/ImpactAnalysis';
import Profile from './screens/Profile';
import AssetDetailsReplacement from './screens/AssetDetailsReplacement';
import AssetDetailsMaintain from './screens/AssetDetailsMaintain';
import AssetDetailsActive from './screens/AssetDetailsActive';
import ActionPlan from './screens/ActionPlan';
import RiskAnalysis from './screens/RiskAnalysis';
import IdealPortfolio from './screens/IdealPortfolio';
import MonthlyReport from './screens/MonthlyReport';
import BottomNav from './components/BottomNav';
import Toast from './components/Toast';

import { supabase } from './services/supabase';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [isPortfolioRebalanced, setIsPortfolioRebalanced] = useState(false);
  const [isVGHFSwapped, setIsVGHFSwapped] = useState(false);
  const [hasSeenNotifications, setHasSeenNotifications] = useState(false);
  const [userAssets, setUserAssets] = useState<any[]>([]);
  const [userData, setUserData] = useState({
    name: 'João Silva',
    email: 'contato@sigame.tu',
    phone: '(11) 98765-4321',
    profile: 'Moderado',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNJrddoPaemoH1SgEcwWdxXdtUB3L7YOQ9MVljzpYhOcZIDgKmz70IGFnKpqy2lq4d1NYb3g7ALkrrmDnWuS45OA0w5P_xWxllgJ8PPdNDfL8te-T-tRrdorSxmUU8D2dX4IiGZ1vECUz0q-5lg1BwlOyrjEX0smN38XWUXQSjJWS32ou1d9ete2IYvGfK1dTcy8yjhtbsI8D75xPuDpi9MSajEnm7YW39dnK2M8GZ07qHJF14FwB2ZdtXbeQTcqGjqTV7ZDV39AE'
  });

  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);
  const [selectedTicker, setSelectedTicker] = useState<string>('');
  const [brokers, setBrokers] = useState<any[]>([
    { id: '1', name: 'XP Investimentos', status: 'Ativa' },
    { id: '2', name: 'BTG Pactual', status: 'Ativa' }
  ]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Verificar sessão atual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
      if (session) {
        setUserData(prev => ({ ...prev, email: session.user.email || prev.email }));
        if (currentScreen === Screen.LOGIN) setCurrentScreen(Screen.OVERVIEW);
      }
    });

    // Escutar mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setUserData(prev => ({ ...prev, email: session.user.email || prev.email }));
      } else {
        setCurrentScreen(Screen.LOGIN);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sincroniza o modo escuro com a tag HTML raiz
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = () => {
    // A mudança de estado é tratada pelo onAuthStateChange
    setCurrentScreen(Screen.OVERVIEW);
    showToast(`Bem-vindo de volta!`, 'info');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast('Sessão encerrada com segurança.', 'info');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleAddAsset = (asset: any, quantity: number, price: number) => {
    const newAsset = {
      ...asset,
      quantity,
      avgPrice: price,
      status: 'Adicionado',
      yield: '0.00%',
      id: Date.now().toString()
    };
    setUserAssets([...userAssets, newAsset]);
    setCurrentScreen(Screen.WALLET);
    showToast(`${asset.ticker} adicionado à sua carteira!`);
  };

  const handleAssetClick = (ticker: string) => {
    setSelectedTicker(ticker);
    if (ticker === 'VGHF11') {
      navigateTo(Screen.ASSET_DETAILS_REPLACEMENT);
    } else if (ticker === 'VGIR11') {
      navigateTo(Screen.ASSET_DETAILS_MAINTAIN);
    } else {
      navigateTo(Screen.ASSET_DETAILS_ACTIVE);
    }
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      if (currentScreen === Screen.REGISTER) {
        return <Register onRegister={handleLogin} onBackToLogin={() => navigateTo(Screen.LOGIN)} />;
      }
      return <Login onLogin={handleLogin} onRegisterClick={() => navigateTo(Screen.REGISTER)} />;
    }

    switch (currentScreen) {
      case Screen.OVERVIEW:
        return (
          <PortfolioOverview
            onNavigateToAnalysis={() => navigateTo(Screen.ANALYSIS)}
            onNavigateToAsset={handleAssetClick}
            onNavigateToReport={() => navigateTo(Screen.MONTHLY_REPORT)}
            isPortfolioRebalanced={isPortfolioRebalanced}
            isVGHFSwapped={isVGHFSwapped}
            userName={userData.name}
            userAvatar={userData.avatar}
            hasSeenNotifications={hasSeenNotifications}
            onSeeNotifications={() => setHasSeenNotifications(true)}
          />
        );
      case Screen.WALLET:
        return (
          <Wallet
            onItemClick={handleAssetClick}
            onAddClick={() => navigateTo(Screen.ADD_ASSET)}
            isPortfolioRebalanced={isPortfolioRebalanced}
            isVGHFSwapped={isVGHFSwapped}
            userAssets={userAssets}
          />
        );
      case Screen.ANALYSIS:
        return (
          <ImpactAnalysis
            onBack={() => navigateTo(Screen.OVERVIEW)}
            onOptimize={() => navigateTo(Screen.ACTION_PLAN)}
            isOptimized={isPortfolioRebalanced}
            userAssets={userAssets.length > 0 ? userAssets : [
              { ticker: 'HGLG11', type: 'Logística', quantity: 100, avgPrice: 160.00 },
              { ticker: 'VGHF11', type: 'Hedge Fund', quantity: 500, avgPrice: 10.50 }
            ]}
            userProfile={userData.profile}
          />
        );
      case Screen.PROFILE:
        return (
          <Profile
            userData={userData}
            setUserData={setUserData}
            brokers={brokers}
            setBrokers={setBrokers}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            onLogout={handleLogout}
            onSave={() => showToast('Perfil atualizado!')}
            onConnectBroker={() => showToast('Corretora conectada!')}
          />
        );
      case Screen.ADD_ASSET:
        return <AddAsset onBack={() => navigateTo(Screen.WALLET)} onAdd={handleAddAsset} />;
      case Screen.ASSET_DETAILS_REPLACEMENT:
        return <AssetDetailsReplacement onBack={() => navigateTo(Screen.WALLET)} onSwap={() => { setSelectedTicker('XPML11'); navigateTo(Screen.IDEAL_PORTFOLIO); }} />;
      case Screen.ASSET_DETAILS_MAINTAIN:
        return <AssetDetailsMaintain ticker={selectedTicker} onBack={() => navigateTo(Screen.WALLET)} />;
      case Screen.ASSET_DETAILS_ACTIVE:
        return <AssetDetailsActive ticker={selectedTicker} onBack={() => navigateTo(Screen.WALLET)} />;
      case Screen.ACTION_PLAN:
        return <ActionPlan onBack={() => navigateTo(Screen.ANALYSIS)} onExecute={() => navigateTo(Screen.IDEAL_PORTFOLIO)} />;
      case Screen.IDEAL_PORTFOLIO:
        return (
          <IdealPortfolio
            onBack={() => navigateTo(Screen.OVERVIEW)}
            onApply={() => {
              if (selectedTicker === 'XPML11') setIsVGHFSwapped(true);
              else setIsPortfolioRebalanced(true);
              navigateTo(Screen.OVERVIEW);
              showToast('Estratégia aplicada!', 'success');
            }}
            isRebalanceFlow={selectedTicker !== 'XPML11'}
          />
        );
      case Screen.RISK_ANALYSIS:
        return <RiskAnalysis onBack={() => navigateTo(Screen.OVERVIEW)} onAddAsset={() => navigateTo(Screen.ADD_ASSET)} />;
      case Screen.MONTHLY_REPORT:
        return <MonthlyReport onBack={() => navigateTo(Screen.OVERVIEW)} onDownload={() => showToast('Relatório baixado com sucesso!', 'success')} />;
      default:
        return <PortfolioOverview onNavigateToAnalysis={() => navigateTo(Screen.ANALYSIS)} />;
    }
  };

  const showBottomNav = isAuthenticated && [
    Screen.OVERVIEW, Screen.WALLET, Screen.ANALYSIS, Screen.PROFILE
  ].includes(currentScreen);

  return (
    <div className={`w-full h-screen max-w-md mx-auto relative flex flex-col overflow-hidden transition-colors duration-300 ${isDarkMode ? 'dark bg-background-dark' : 'bg-background-light'}`}>
      {toast && <Toast message={toast.message} type={toast.type} />}
      <div className="flex-1 overflow-hidden relative">
        {renderScreen()}
      </div>
      {showBottomNav && (
        <BottomNav activeScreen={currentScreen} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;
