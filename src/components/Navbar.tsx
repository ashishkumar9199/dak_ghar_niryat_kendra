import React from 'react';
import { 
  Package, 
  Sparkles, 
  Calculator, 
  MapPin, 
  ShieldAlert, 
  Search, 
  BookOpen, 
  Building2, 
  PhoneCall, 
  UserCheck 
} from 'lucide-react';
import { ExporterProfile } from '../types';

interface NavbarProps {
  currentTab?: string;
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  setActiveTab?: (tab: string) => void;
  language: 'EN' | 'HI';
  setLanguage?: (lang: 'EN' | 'HI') => void;
  onToggleLanguage?: () => void;
  profile: ExporterProfile;
  onOpenProfile: () => void;
  onOpenRagInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onNavigate,
  setActiveTab,
  language,
  setLanguage,
  onToggleLanguage,
  profile,
  onOpenProfile,
  onOpenRagInspector,
}) => {
  const active = currentTab || activeTab || 'dashboard';
  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else if (setActiveTab) setActiveTab(tab);
  };

  const handleToggleLang = () => {
    if (onToggleLanguage) {
      onToggleLanguage();
    } else if (setLanguage) {
      setLanguage(language === 'EN' ? 'HI' : 'EN');
    }
  };

  const isHindi = language === 'HI';

  return (
    <header className="sticky top-0 z-40 bg-[#D42426] text-white shadow-md flex-shrink-0">
      {/* Tricolor top indicator band */}
      <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Main Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => handleNav('dashboard')}
          id="brand-logo"
        >
          <div className="w-10 h-10 bg-[#FFC107] rounded-xl flex items-center justify-center font-black text-[#D42426] text-lg shadow-sm group-hover:scale-105 transition-transform shrink-0">
            IP
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black text-lg leading-none tracking-tight">
              {isHindi ? 'डाक घर' : 'DAK GHAR'}
            </span>
            <span className="text-[#FFC107] text-[11px] font-bold tracking-widest uppercase mt-0.5">
              {isHindi ? 'निर्यात केंद्र (DGNK)' : 'Niryat Kendra'}
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => handleNav('dashboard')}
            className={`text-sm font-bold transition-colors pb-1 ${
              active === 'dashboard' 
                ? 'text-white border-b-2 border-[#FFC107]' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            {isHindi ? 'डैशबोर्ड' : 'Dashboard'}
          </button>
          
          <button
            onClick={() => handleNav('assistant')}
            className={`text-sm font-bold transition-colors pb-1 flex items-center gap-1.5 ${
              active === 'assistant' 
                ? 'text-white border-b-2 border-[#FFC107]' 
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>{isHindi ? 'AI निर्यात सहायक' : 'AI Assistant'}</span>
            <span className="bg-[#FFC107] text-[#D42426] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
              RAG
            </span>
          </button>

          <button
            onClick={() => handleNav('wizard')}
            className={`text-sm font-bold transition-colors pb-1 ${
              active === 'wizard' 
                ? 'text-white border-b-2 border-[#FFC107]' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            {isHindi ? 'नया पार्सल' : 'New Shipment'}
          </button>

          <button
            onClick={() => handleNav('calculator')}
            className={`text-sm font-bold transition-colors pb-1 ${
              active === 'calculator' 
                ? 'text-white border-b-2 border-[#FFC107]' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            {isHindi ? 'दर कैलकुलेटर' : 'Tariff'}
          </button>

          <button
            onClick={() => handleNav('tracker')}
            className={`text-sm font-bold transition-colors pb-1 ${
              active === 'tracker' 
                ? 'text-white border-b-2 border-[#FFC107]' 
                : 'text-white/80 hover:text-white'
            }`}
          >
            {isHindi ? 'ट्रैकिंग' : 'Tracking'}
          </button>

          {/* System Active status pill from design */}
          <div className="ml-2 px-3.5 py-1.5 bg-white/10 rounded-full border border-white/20 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-xs font-semibold">System Active</span>
          </div>
        </nav>

        {/* Right Action Controls & User Avatar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* RAG Inspector Button */}
          <button
            id="btn-rag-inspector"
            onClick={onOpenRagInspector}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all shadow-sm"
            title="Inspect RAG Vector Embeddings & Grounded Citations"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>RAG Inspector</span>
          </button>

          {/* Language Toggle */}
          <button
            onClick={handleToggleLang}
            className="px-2.5 py-1.5 rounded-xl bg-black/20 hover:bg-black/30 border border-white/20 text-xs font-bold text-white transition-colors"
          >
            {language === 'EN' ? 'हिन्दी' : 'English'}
          </button>

          {/* User Profile Avatar / RK Badge */}
          <button
            id="btn-exporter-profile"
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFC107] border-2 border-white flex items-center justify-center text-[#D42426] font-black text-xs shadow-sm">
              {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'RK'}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-black text-white truncate max-w-[120px] leading-tight">
                {profile.businessName || 'Exporter Profile'}
              </div>
              <div className="text-[10px] text-amber-200 font-semibold leading-tight">
                {profile.iecCode ? `IEC: ${profile.iecCode}` : 'MSME Setup'}
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Secondary Mobile & Quick Sub-Navigation Bar */}
      <div className="bg-[#B71C1E] text-white text-xs font-bold border-t border-red-800 overflow-x-auto scrollbar-none py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
          <button
            onClick={() => handleNav('dashboard')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'dashboard' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{isHindi ? 'डैशबोर्ड' : 'Dashboard'}</span>
          </button>

          <button
            onClick={() => handleNav('assistant')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'assistant' ? 'bg-[#FFC107] text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? 'AI सहायक' : 'AI Assistant'}</span>
          </button>

          <button
            onClick={() => handleNav('wizard')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'wizard' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>{isHindi ? 'नया शिपमेंट (PBE)' : 'Create PBE'}</span>
          </button>

          <button
            onClick={() => handleNav('calculator')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'calculator' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isHindi ? 'डाक दरें' : 'Rates'}</span>
          </button>

          <button
            onClick={() => handleNav('prohibited')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'prohibited' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isHindi ? 'प्रतिबंधित वस्तुएं' : 'Prohibited Goods'}</span>
          </button>

          <button
            onClick={() => handleNav('locator')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'locator' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>{isHindi ? 'DGNK केंद्र' : 'DGNK Centers'}</span>
          </button>

          <button
            onClick={() => handleNav('tracker')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'tracker' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isHindi ? 'ट्रैकिंग' : 'Tracker'}</span>
          </button>

          <button
            onClick={() => handleNav('knowledge')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              active === 'knowledge' ? 'bg-white text-[#D42426] shadow-xs' : 'hover:bg-red-800 text-white/90'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isHindi ? 'नियम व परिपत्र' : 'Rules & SOPs'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

