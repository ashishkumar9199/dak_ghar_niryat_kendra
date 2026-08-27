import React from 'react';
import { 
  Building2, 
  Package, 
  Search, 
  Sparkles, 
  Menu,
  Calculator,
  Wallet
} from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';

interface MobileBottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  language: SupportedLanguage;
  onOpenMenu: () => void;
  onOpenWallet?: () => void;
  walletBalance?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onNavigate,
  language,
  onOpenMenu,
  onOpenWallet,
  walletBalance = 18450
}) => {
  const isHindi = language === 'HI' || language === 'MAI';
  const t = translations[language] || translations.EN;

  const navItems = [
    {
      id: 'dashboard',
      label: isHindi ? 'होम' : 'Home',
      icon: Building2,
      badge: null
    },
    {
      id: 'wizard',
      label: isHindi ? 'PBE नया' : 'New PBE',
      icon: Package,
      badge: 'CBIC'
    },
    {
      id: 'tracker',
      label: isHindi ? 'ट्रैकिंग' : 'Track',
      icon: Search,
      badge: null
    },
    {
      id: 'assistant',
      label: isHindi ? 'AI सहायक' : 'AI Advisor',
      icon: Sparkles,
      badge: 'RAG'
    }
  ];

  return (
    <div 
      id="mobile-bottom-nav" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.07)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 items-center px-1 py-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
                isActive 
                  ? 'text-[#C8102E]' 
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {/* Active Indicator Top Bar */}
              {isActive && (
                <span className="absolute -top-1 w-7 h-1 bg-[#C8102E] rounded-full shadow-xs" />
              )}

              <div className="relative flex items-center justify-center w-7 h-7">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className={`absolute -top-1 -right-2 text-[8px] font-black px-1 rounded-full uppercase leading-tight ${
                    item.id === 'assistant' 
                      ? 'bg-[#FFC107] text-[#990B20]' 
                      : 'bg-[#C8102E] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight leading-tight mt-0.5 truncate max-w-[62px] ${
                isActive ? 'font-black text-[#C8102E]' : 'font-bold'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 5th Action: Mega Menu Drawer Trigger */}
        <button
          onClick={onOpenMenu}
          className="relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl text-gray-600 hover:text-gray-900 transition-all cursor-pointer select-none active:scale-95 group"
          title="Open All Services Menu"
        >
          <div className="w-7 h-7 rounded-lg bg-gray-100 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
            <Menu className="w-4 h-4 text-gray-700 group-hover:text-[#C8102E]" />
          </div>
          <span className="text-[10px] font-bold text-gray-600 tracking-tight leading-tight mt-0.5">
            {isHindi ? 'मेन्यू' : 'Menu'}
          </span>
        </button>
      </div>
    </div>
  );
};
