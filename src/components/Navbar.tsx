import React, { useState, useEffect } from 'react';
import { 
  Menu,
  X,
  Package, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Search, 
  BookOpen, 
  Building2, 
  PhoneCall, 
  Layers,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Globe,
  FileCheck,
  Truck,
  HelpCircle,
  Award,
  ExternalLink,
  Zap,
  Info,
  Wallet,
  Upload,
  Radio,
  FileSpreadsheet
} from 'lucide-react';
import { ExporterProfile } from '../types';
import { NoticeTicker } from './NoticeTicker';

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
  onOpenWallet?: () => void;
  onOpenBulkUpload?: () => void;
}

interface PageItem {
  id: string;
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  category: 'core' | 'tools' | 'resources';
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
  onOpenWallet,
  onOpenBulkUpload,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [fontSizeClass, setFontSizeClass] = useState<'normal' | 'large' | 'small'>('normal');

  const active = currentTab || activeTab || 'dashboard';

  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else if (setActiveTab) setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleToggleLang = () => {
    if (onToggleLanguage) {
      onToggleLanguage();
    } else if (setLanguage) {
      setLanguage(language === 'EN' ? 'HI' : 'EN');
    }
  };

  const isHindi = language === 'HI';
  const walletAmount = profile.walletBalance ?? 18450;

  // Accessibility font resizing handler
  const handleFontSizeChange = (size: 'small' | 'normal' | 'large') => {
    setFontSizeClass(size);
    if (size === 'large') {
      document.documentElement.style.fontSize = '17px';
    } else if (size === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else {
      document.documentElement.style.fontSize = '15px';
    }
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when mega drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // All pages of the website catalogued for the 3-line menu drawer
  const allPages: PageItem[] = [
    {
      id: 'dashboard',
      titleEn: 'DNK Customer Dashboard',
      titleHi: 'DNK ग्राहक डैशबोर्ड व मुख्य पृष्ठ',
      descEn: 'Consignment analytics, RoDTEP incentives & live export pipeline',
      descHi: 'पार्सल सांख्यिकी, RoDTEP प्रोत्साहन और सक्रिय निर्यात स्थिति',
      badge: 'Main Portal',
      badgeColor: 'bg-red-100 text-[#C8102E]',
      icon: Building2,
      color: 'text-[#C8102E]',
      bgLight: 'bg-red-50 hover:bg-red-100/80 border-red-200',
      category: 'core'
    },
    {
      id: 'assistant',
      titleEn: 'AI Customs Compliance Assistant',
      titleHi: 'AI निर्यात व सीमा शुल्क सहायक',
      descEn: '100% verified regulatory advice grounded in CBIC, DGFT FTP 2023 & UPU laws',
      descHi: 'CBIC 14/2018, DGFT और UPU नियमों पर सत्यापित सटीक कानूनी सहायता',
      badge: 'RAG Grounded',
      badgeColor: 'bg-[#FFC107] text-[#8B6E00]',
      icon: Sparkles,
      color: 'text-[#C8102E]',
      bgLight: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200',
      category: 'core'
    },
    {
      id: 'wizard',
      titleEn: 'Digital Postal Bill of Export (PBE-III & PBE-IV)',
      titleHi: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट विज़ार्ड',
      descEn: 'Auto-generates PBE-III (e-Commerce), PBE-IV (Commercial), CN23 & S10 franking barcode',
      descHi: 'PBE-III (ई-कॉमर्स), PBE-IV (वाणिज्यिक), CN23 कस्टम्स और S10 बारकोड जनरेटर',
      badge: 'CBIC 48/2018',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Package,
      color: 'text-emerald-700',
      bgLight: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200',
      category: 'core'
    },
    {
      id: 'calculator',
      titleEn: 'Postal Tariff & RoDTEP Rate Estimator',
      titleHi: 'डाक दरें व RoDTEP गणना कैलकुलेटर',
      descEn: 'Compare EMS, ITPS & Air Parcel rates across 219+ UPU countries with export incentives',
      descHi: '219+ देशों के लिए स्पीड पोस्ट, ITPS और एयर पार्सल की आधिकारिक डाक दरें',
      badge: '219+ Countries',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: Calculator,
      color: 'text-blue-700',
      bgLight: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200',
      category: 'tools'
    },
    {
      id: 'tracker',
      titleEn: 'Consignment Track & Trace (UPU S10 EDI)',
      titleHi: 'अंतरराष्ट्रीय पार्सल ट्रैकिंग व ट्रेस',
      descEn: 'Real-time Foreign Post Office (FPO) customs clearance & international dispatch tracker',
      descHi: 'FPO कस्टम्स क्लीयरेंस और गंतव्य देश डिलीवरी की लाइव स्थिति',
      badge: 'ICES Live',
      badgeColor: 'bg-purple-100 text-purple-800',
      icon: Search,
      color: 'text-purple-700',
      bgLight: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200',
      category: 'tools'
    },
    {
      id: 'prohibited',
      titleEn: 'Prohibited & Restricted Goods Screener',
      titleHi: 'प्रतिबंधित व नियंत्रित वस्तु जांच',
      descEn: 'AI & rule-based compliance check for dangerous goods, ICAO aviation & wildlife bans',
      descHi: 'विमानन सुरक्षा, खतरनाक सामग्री (DG) और प्रतिबंधित वस्तुओं की त्वरित जांच',
      badge: 'Safety Check',
      badgeColor: 'bg-rose-100 text-rose-800',
      icon: ShieldCheck,
      color: 'text-rose-700',
      bgLight: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200',
      category: 'tools'
    },
    {
      id: 'locator',
      titleEn: 'Find Nearest DGNK Post Office',
      titleHi: 'निकटतम DGNK डाकघर खोजें',
      descEn: 'Locate 1,000+ authorized booking counters with linked Foreign Post Office (FPO) hubs',
      descHi: '1000+ अधिकृत डाक घर निर्यात केंद्र और संबंधित फॉरेन पोस्ट ऑफिस की सूची',
      badge: '1000+ Centers',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: MapPin,
      color: 'text-amber-700',
      bgLight: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200',
      category: 'resources'
    },
    {
      id: 'knowledge',
      titleEn: 'Regulatory & SOP Knowledge Repository',
      titleHi: 'नियम, परिपत्र व SOP ज्ञान केंद्र',
      descEn: 'CBIC 14/2018, DGFT FTP 2023, RoDTEP schedules and Department of Posts circulars',
      descHi: 'सीमा शुल्क अधिसूचनाएं, डीजीएफटी नीतियां और डाक विभाग के अधिकृत दस्तावेज',
      badge: 'Official SOPs',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      icon: BookOpen,
      color: 'text-indigo-700',
      bgLight: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200',
      category: 'resources'
    }
  ];

  const filteredPages = allPages.filter(p => {
    const q = menuSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      p.titleEn.toLowerCase().includes(q) ||
      p.titleHi.toLowerCase().includes(q) ||
      p.descEn.toLowerCase().includes(q) ||
      p.descHi.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* 1. Official Government of India Top Accessibility Bar */}
      <div className="bg-[#212529] text-gray-200 text-[11px] font-medium py-1 px-3 sm:px-6 border-b border-gray-700 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Ministry & Govt Hierarchy */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="font-bold text-white uppercase tracking-wider">
              {isHindi ? 'भारत सरकार' : 'Government of India'}
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300 hidden sm:inline">
              {isHindi ? 'संचार मंत्रालय' : 'Ministry of Communications'}
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-amber-300 font-bold hidden md:inline">
              {isHindi ? 'डाक विभाग' : 'Department of Posts'}
            </span>
          </div>

          {/* Accessibility Controls & Language */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Skip to main content */}
            <a 
              href="#brand-logo" 
              className="text-gray-400 hover:text-white text-[10px] hidden lg:inline focus:underline"
            >
              {isHindi ? 'मुख्य सामग्री' : 'Skip to main content'}
            </a>

            {/* Font Size Adjusters */}
            <div className="flex items-center bg-gray-800 rounded px-1 py-0.5 border border-gray-700 text-[10px] font-bold">
              <button 
                onClick={() => handleFontSizeChange('small')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'small' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSizeChange('normal')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'normal' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Standard Font Size"
              >
                A
              </button>
              <button 
                onClick={() => handleFontSizeChange('large')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'large' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={handleToggleLang}
              className="px-2 py-0.5 rounded bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-[11px] font-black text-amber-300 transition-colors flex items-center gap-1"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3 h-3 text-amber-300" />
              <span>{language === 'EN' ? 'हिन्दी' : 'English'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. Main India Post & DGNK Portal Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white shadow-lg flex-shrink-0 border-b border-red-950/40">
        
        {/* National Flag Tricolor Band */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Main Branding & Navigation Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          
          {/* Left: 3-Line Mega Menu Button + National Emblem & India Post Brand */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* 3-Line Mega Menu Button */}
            <button
              id="btn-three-line-menu"
              onClick={() => setIsMenuOpen(true)}
              className="group relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 transition-all shadow-xs cursor-pointer"
              title={isHindi ? 'सभी सेवाएं (मेन्यू)' : 'All Services & Tools (Menu)'}
              aria-label="Open Navigation Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1 shrink-0">
                <span className="h-0.5 w-5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-3.5 bg-white rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-4.5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-white hidden md:inline-block">
                {isHindi ? 'मेन्यू' : 'Menu'}
              </span>
            </button>

            {/* State Emblem of India + India Post Gold Seal */}
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none" 
              onClick={() => handleNav('dashboard')}
              id="brand-logo"
            >
              {/* Ashoka Lion Emblem Badge */}
              <div className="hidden sm:flex flex-col items-center justify-center border-r border-white/20 pr-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/30 text-amber-200">
                  <Award className="w-4 h-4 text-[#FFC107]" />
                </div>
                <span className="text-[7px] font-black uppercase tracking-tighter text-amber-200 mt-0.5">
                  सत्यमेव जयते
                </span>
              </div>

              {/* India Post Iconic Wing Seal */}
              <div className="w-10 sm:w-11 h-10 sm:h-11 bg-gradient-to-br from-[#FFE082] via-[#FFC107] to-[#FFA000] rounded-xl flex flex-col items-center justify-center font-black text-[#C8102E] shadow-md group-hover:scale-105 transition-transform shrink-0 border-2 border-white/70">
                <span className="text-xs sm:text-sm font-black tracking-tighter leading-none text-[#A60D24]">डाक</span>
                <span className="text-[8px] sm:text-[9px] font-black tracking-widest text-[#735A00] leading-none uppercase">POST</span>
              </div>

              {/* Portal Title & Subtitle */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                    {isHindi ? 'भारतीय डाक' : 'India Post'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-white/20 text-amber-200 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider hidden sm:inline-block border border-white/20">
                    Govt. of India
                  </span>
                  <span className="hidden xl:inline-flex items-center gap-1 bg-emerald-950/60 text-emerald-300 text-[9px] font-black px-1.5 py-0.2 rounded border border-emerald-400/40 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ICES Live
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#FFD54F] font-black text-xs sm:text-sm tracking-wide drop-shadow-xs">
                    {isHindi ? 'डाक घर निर्यात केंद्र' : 'Dak Ghar Niryat Kendra'}
                  </span>
                  <span className="bg-[#FFC107] text-[#C8102E] text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider shadow-2xs">
                    DNK Portal
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Center Navigation Shortcuts (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <button
              onClick={() => handleNav('dashboard')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'dashboard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'डैशबोर्ड' : 'Dashboard'}</span>
            </button>
            
            <button
              onClick={() => handleNav('assistant')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'assistant' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD54F]" />
              <span>{isHindi ? 'AI सहायक' : 'AI Assistant'}</span>
              <span className="bg-[#FFC107] text-[#C8102E] text-[8px] font-black px-1 rounded-full uppercase">
                RAG
              </span>
            </button>

            <button
              onClick={() => handleNav('wizard')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'wizard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'नया PBE' : 'New PBE'}</span>
            </button>

            <button
              onClick={() => handleNav('calculator')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'calculator' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'डाक दरें' : 'Tariff'}</span>
            </button>

            <button
              onClick={() => handleNav('tracker')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'tracker' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span>{isHindi ? 'ट्रैकिंग' : 'Track'}</span>
            </button>
          </nav>

          {/* Right Action Controls: Prepaid Wallet, Bulk Upload, Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Bulk Upload Button */}
            {onOpenBulkUpload && (
              <button
                onClick={onOpenBulkUpload}
                className="hidden xl:flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/20 transition-all"
                title="Bulk Consignment Booking via CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Bulk Upload</span>
              </button>
            )}

            {/* Prepaid Franking Wallet Widget */}
            {onOpenWallet && (
              <button
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/30 to-amber-600/40 hover:from-amber-500/40 hover:to-amber-600/50 border border-amber-300/40 text-white transition-all shadow-2xs group"
                title="Open DNK Prepaid Franking Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-[#FFD54F] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="text-[9px] block text-amber-200 uppercase font-black leading-none">
                    {isHindi ? 'वॉलेट' : 'Wallet'}
                  </span>
                  <span className="text-xs font-black text-white font-mono leading-tight">
                    ₹{walletAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>
            )}

            {/* RAG Inspector Button */}
            <button
              id="btn-rag-inspector"
              onClick={onOpenRagInspector}
              className="hidden sm:flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-xs"
              title="Inspect RAG Architecture & Official Legal Sources"
            >
              <Layers className="w-3.5 h-3.5 text-[#FFC107]" />
              <span className="hidden 2xl:inline">RAG Inspector</span>
            </button>

            {/* Exporter Profile Avatar Button */}
            <button
              id="btn-exporter-profile"
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-left group"
              title="Exporter Profile & KYC Settings"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFC107] to-[#FFE082] border-2 border-white flex items-center justify-center text-[#C8102E] font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'DNK'}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-black text-white truncate max-w-[100px] leading-tight">
                  {profile.businessName || 'Exporter Profile'}
                </div>
                <div className="text-[10px] text-amber-200 font-bold leading-tight">
                  {profile.iecCode ? `IEC: ${profile.iecCode}` : 'MSME KYC'}
                </div>
              </div>
            </button>
          </div>

        </div>

        {/* 3. Official Rolling Flash News & CBIC Notice Ticker */}
        <NoticeTicker
          language={language}
          onNavigate={handleNav}
          onOpenRagInspector={onOpenRagInspector}
        />

      </header>

      {/* ========================================================================= */}
      {/* THREE-LINE MEGA MENU DRAWER WITH COMPLETE PORTAL CATALOG */}
      {/* ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-start animate-in fade-in duration-200">
          
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mega Drawer Panel */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300 border-r border-gray-300">
            
            {/* Drawer Header with India Post Banner */}
            <div className="bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white p-5 sm:p-6 shrink-0 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FFC107] text-[#C8102E] flex items-center justify-center font-black text-sm shadow-md">
                    DNK
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-amber-200 block">
                      {isHindi ? 'डाक विभाग • भारत सरकार' : 'Department of Posts • Govt. of India'}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                      {isHindi ? 'डाक घर निर्यात केंद्र मेन्यू' : 'DNK Services & Tools Menu'}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Exporter mini status banner in drawer */}
              <div className="bg-black/20 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-200 font-bold block truncate max-w-[200px]">
                    {profile.businessName || 'Exporter Profile'}
                  </span>
                  <span className="text-[11px] text-white/80 font-mono">
                    IEC: {profile.iecCode || '0518029481'} | LUT Active
                  </span>
                </div>
                {onOpenWallet && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenWallet();
                    }}
                    className="px-2.5 py-1 bg-[#FFC107] hover:bg-[#FFA000] text-[#C8102E] font-black rounded-lg text-xs shadow-xs"
                  >
                    ₹{walletAmount.toLocaleString('en-IN')}
                  </button>
                )}
              </div>
            </div>

            {/* Search Filter Input in Menu */}
            <div className="p-3.5 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={isHindi ? 'सेवा या साधन खोजें...' : 'Search DNK services, calculators & SOPs...'}
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                />
              </div>
            </div>

            {/* Scrollable List of All Pages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Category 1: Core Portals */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  {isHindi ? 'मुख्य सेवाएं' : 'Core Export Services'}
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'core').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {isHindi ? page.titleHi : page.titleEn}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {isHindi ? page.descHi : page.descEn}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Tools & Calculators */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  {isHindi ? 'कैलकुलेटर व टूल्स' : 'Customs Tools & Calculators'}
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'tools').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {isHindi ? page.titleHi : page.titleEn}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {isHindi ? page.descHi : page.descEn}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Resources & DGNK Centers */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  {isHindi ? 'केंद्र व संसाधन' : 'Centers & Regulations'}
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'resources').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {isHindi ? page.titleHi : page.titleEn}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {isHindi ? page.descHi : page.descEn}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Footer with Helpline & RAG quick access */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 shrink-0 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span className="font-bold">MSME Helpline: 1800-266-6868</span>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenRagInspector();
                  }}
                  className="text-[11px] font-bold text-[#C8102E] hover:underline"
                >
                  RAG Pipeline
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
