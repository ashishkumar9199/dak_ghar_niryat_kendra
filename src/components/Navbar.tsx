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
  Info
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
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');

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
      titleEn: 'Dashboard Overview',
      titleHi: 'डैशबोर्ड व मुख्य पृष्ठ',
      descEn: 'Consignment analytics, RoDTEP incentives & live export pipeline',
      descHi: 'पार्सल सांख्यिकी, RoDTEP प्रोत्साहन और सक्रिय निर्यात स्थिति',
      badge: 'Main',
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
      titleEn: 'Create Postal Bill of Export (PBE)',
      titleHi: 'नया निर्यात पार्सल (PBE-I / PBE-II)',
      descEn: 'Generate digital PBE-I/II, CN23/CP72 forms with automated commercial franking',
      descHi: 'डिजिटल PBE और CN23 कस्टम्स डिक्लेरेशन जनरेटर व बारकोड फ्रैंकिंग',
      badge: 'Fast e-PBE',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Package,
      color: 'text-emerald-700',
      bgLight: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200',
      category: 'core'
    },
    {
      id: 'calculator',
      titleEn: 'International Postage Tariff Calculator',
      titleHi: 'अंतरराष्ट्रीय डाक दर कैलकुलेटर',
      descEn: 'Official Speed Post EMS, Tracked Packet (ITPS) and Air Parcel rates to 219+ countries',
      descHi: 'स्पीड पोस्ट ईएमएस, आईटीपीएस और एयर पार्सल की सटीक वजन आधारित डाक दरें',
      badge: '219+ Countries',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: Calculator,
      color: 'text-blue-700',
      bgLight: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200',
      category: 'tools'
    },
    {
      id: 'tracker',
      titleEn: 'UPU S10 Consignment Tracker',
      titleHi: 'पार्सल व कन्साइनमेंट ट्रैकिंग',
      descEn: 'Real-time lifecycle tracking across DGNK booking, FPO EDI customs, and global delivery',
      descHi: 'डीजीएनके बुकिंग से लेकर फॉरेन पोस्ट ऑफिस (FPO) कस्टम्स व डिलीवरी ट्रैकिंग',
      badge: 'Live EDI',
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
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#B30C26] via-[#C8102E] to-[#990B20] text-white shadow-lg flex-shrink-0 border-b border-red-950/40">
        {/* Tiranga Tricolor Top Indicator Band */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] shadow-xs" />

        {/* Main Top Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: 3-Line Menu Button + Brand & India Post Emblem */}
          <div className="flex items-center gap-2 sm:gap-3.5">
            
            {/* Attractive 3-Line Hamburger Menu Button */}
            <button
              id="btn-three-line-menu"
              onClick={() => setIsMenuOpen(true)}
              className="group relative flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 transition-all shadow-xs cursor-pointer"
              title={isHindi ? 'सभी पृष्ठ व सेवाएं (मेन्यू)' : 'All Pages & Services (Menu)'}
              aria-label="Open Navigation Menu"
            >
              {/* Animated 3-line icon */}
              <div className="w-5 h-5 flex flex-col justify-center gap-1 shrink-0">
                <span className="h-0.5 w-5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-3.5 bg-white rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-4.5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-white hidden md:inline-block">
                {isHindi ? 'मेन्यू' : 'Menu'}
              </span>
            </button>

            {/* Brand Logo & India Post Seal */}
            <div 
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none" 
              onClick={() => handleNav('dashboard')}
              id="brand-logo"
            >
              {/* India Post Iconic Wing Seal in Gold */}
              <div className="w-10 sm:w-11 h-10 sm:h-11 bg-gradient-to-br from-[#FFE082] via-[#FFC107] to-[#FFA000] rounded-xl flex flex-col items-center justify-center font-black text-[#C8102E] shadow-md group-hover:scale-105 transition-transform shrink-0 border-2 border-white/60">
                <span className="text-xs sm:text-sm font-black tracking-tighter leading-none text-[#A60D24]">डाक</span>
                <span className="text-[8px] sm:text-[9px] font-black tracking-widest text-[#735A00] leading-none uppercase">POST</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight group-hover:text-amber-200 transition-colors">
                    {isHindi ? 'भारतीय डाक' : 'India Post'}
                  </span>
                  <span className="text-[9px] sm:text-[10px] bg-white/20 text-amber-200 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider hidden sm:inline-block border border-white/20">
                    {isHindi ? 'भारत सरकार' : 'Govt. of India'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[#FFD54F] font-black text-xs sm:text-sm tracking-wide drop-shadow-xs">
                    {isHindi ? 'डाक घर निर्यात केंद्र' : 'Dak Ghar Niryat Kendra'}
                  </span>
                  <span className="bg-[#FFC107] text-[#C8102E] text-[9px] sm:text-[10px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider shadow-2xs">
                    DGNK
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNav('dashboard')}
              className={`text-xs xl:text-sm font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'dashboard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'डैशबोर्ड' : 'Dashboard'}</span>
            </button>
            
            <button
              onClick={() => handleNav('assistant')}
              className={`text-xs xl:text-sm font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'assistant' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#FFD54F]" />
              <span>{isHindi ? 'AI सहायक' : 'AI Assistant'}</span>
              <span className="bg-[#FFC107] text-[#C8102E] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                RAG
              </span>
            </button>

            <button
              onClick={() => handleNav('wizard')}
              className={`text-xs xl:text-sm font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'wizard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'नया PBE' : 'New PBE'}</span>
            </button>

            <button
              onClick={() => handleNav('calculator')}
              className={`text-xs xl:text-sm font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'calculator' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'डाक दरें' : 'Tariff'}</span>
            </button>

            <button
              onClick={() => handleNav('tracker')}
              className={`text-xs xl:text-sm font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'tracker' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-4 h-4 text-amber-300" />
              <span>{isHindi ? 'ट्रैकिंग' : 'Track'}</span>
            </button>
          </nav>

          {/* Right Action Controls & User Avatar */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Toll Free Helpline Badge */}
            <div className="hidden 2xl:flex items-center gap-1.5 text-xs text-white/90 bg-black/20 px-3 py-1.5 rounded-xl border border-white/15">
              <PhoneCall className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Toll-Free:</span>
              <span className="font-mono font-bold text-white">1800-266-6868</span>
            </div>

            {/* RAG Inspector Button */}
            <button
              id="btn-rag-inspector"
              onClick={onOpenRagInspector}
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-all shadow-xs"
              title="Inspect RAG Vector Embeddings & Grounded Citations"
            >
              <Layers className="w-3.5 h-3.5 text-[#FFC107]" />
              <span className="hidden xl:inline">RAG Inspector</span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={handleToggleLang}
              className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-black/25 hover:bg-black/35 border border-white/20 text-xs font-black text-white transition-colors flex items-center gap-1"
              title="Toggle Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'EN' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* User Profile Avatar / RK Badge */}
            <button
              id="btn-exporter-profile"
              onClick={onOpenProfile}
              className="flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFC107] to-[#FFE082] border-2 border-white flex items-center justify-center text-[#C8102E] font-black text-xs shadow-sm group-hover:scale-105 transition-transform">
                {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'RK'}
              </div>
              <div className="hidden md:block">
                <div className="text-xs font-black text-white truncate max-w-[110px] leading-tight">
                  {profile.businessName || 'Exporter Profile'}
                </div>
                <div className="text-[10px] text-amber-200 font-bold leading-tight">
                  {profile.iecCode ? `IEC: ${profile.iecCode}` : 'MSME Setup'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* THREE-LINE MEGA MENU DRAWER WITH ALL PAGES & TOOLS */}
      {/* ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-start animate-in fade-in duration-200">
          
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Slide-in Drawer Container */}
          <div className="relative w-full max-w-xl bg-[#F8F9FA] shadow-2xl flex flex-col h-full z-10 border-r border-gray-200 overflow-hidden transform transition-transform duration-300 ease-out">
            
            {/* Drawer Top Header with Tricolor Accent */}
            <div className="bg-[#C8102E] text-white p-5 sm:p-6 shrink-0 relative shadow-md">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-speedpost-stripes" />

              <div className="flex items-center justify-between gap-3 mt-1">
                
                {/* Brand inside Drawer */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#FFC107] rounded-xl flex flex-col items-center justify-center font-black text-[#C8102E] shadow-sm border border-white/40">
                    <span className="text-xs font-black leading-none">डाक</span>
                    <span className="text-[8px] font-black tracking-widest text-[#8B6E00] leading-none uppercase">POST</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-base sm:text-lg font-black text-white leading-tight">
                        {isHindi ? 'DGNK पोर्टल सेवाएं' : 'DGNK Portal Navigation'}
                      </h2>
                      <span className="bg-[#FFC107] text-[#C8102E] text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        All Pages
                      </span>
                    </div>
                    <p className="text-xs text-amber-200 font-semibold mt-0.5">
                      {isHindi ? 'डाक घर निर्यात केंद्र • भारतीय डाक' : 'Dak Ghar Niryat Kendra • India Post'}
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  id="btn-close-menu-drawer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer border border-white/20"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Instant Search Bar Inside Menu Drawer */}
              <div className="mt-4 relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder={isHindi ? 'पोर्टल पृष्ठ व सेवाएं खोजें...' : 'Search pages, tools, or regulations...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white text-gray-900 placeholder:text-gray-400 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#FFC107] shadow-inner"
                  autoFocus
                />
                {menuSearch && (
                  <button
                    onClick={() => setMenuSearch('')}
                    className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600 font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Drawer Body - Scrollable list of all pages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              
              {/* Category Quick Tags */}
              <div className="flex items-center justify-between text-xs font-black text-gray-500 uppercase tracking-wider px-1">
                <span>{isHindi ? 'सभी उपलब्ध पृष्ठ व मॉड्यूल' : 'All Portal Modules & Pages'} ({filteredPages.length})</span>
                <span className="text-[10px] text-gray-400 font-normal">Click to navigate</span>
              </div>

              {/* Grid of Page Tiles */}
              <div className="space-y-2.5">
                {filteredPages.map((page) => {
                  const Icon = page.icon;
                  const isActive = active === page.id;

                  return (
                    <button
                      key={page.id}
                      onClick={() => handleNav(page.id)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 group relative ${
                        isActive
                          ? 'bg-white border-[#C8102E] ring-2 ring-[#C8102E]/20 shadow-md'
                          : `${page.bgLight} bg-white shadow-2xs hover:shadow-md hover:border-[#C8102E]/50`
                      }`}
                    >
                      {/* Icon */}
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform group-hover:scale-105 ${
                        isActive ? 'bg-[#C8102E] text-white' : 'bg-gray-100 group-hover:bg-[#C8102E] group-hover:text-white text-gray-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <h3 className={`text-sm font-black transition-colors ${
                            isActive ? 'text-[#C8102E]' : 'text-gray-900 group-hover:text-[#C8102E]'
                          }`}>
                            {isHindi ? page.titleHi : page.titleEn}
                          </h3>
                          {page.badge && (
                            <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${page.badgeColor}`}>
                              {page.badge}
                            </span>
                          )}
                          {isActive && (
                            <span className="bg-[#C8102E] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                              Current
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                          {isHindi ? page.descHi : page.descEn}
                        </p>
                      </div>

                      {/* Right Arrow */}
                      <div className="self-center shrink-0 text-gray-400 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </button>
                  );
                })}

                {filteredPages.length === 0 && (
                  <div className="p-8 text-center bg-white rounded-2xl border border-gray-200">
                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-700">No matching pages found</p>
                    <p className="text-xs text-gray-500 mt-1">Try searching for "PBE", "tariff", "tracker", "customs", or "prohibited".</p>
                  </div>
                )}
              </div>

              {/* Exporter Quick Controls inside Drawer */}
              <div className="pt-2">
                <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-gray-700 uppercase tracking-wider">
                      {isHindi ? 'त्वरित खाता व सत्यापन सेटिंग्स' : 'Exporter Account & Utilities'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenProfile();
                      }}
                      className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-colors flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FFC107] text-[#C8102E] flex items-center justify-center font-black text-xs">
                        {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'RK'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-gray-900 truncate">Exporter Profile</p>
                        <p className="text-[10px] text-gray-500">IEC & GST Details</p>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenRagInspector();
                      }}
                      className="p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-left transition-colors flex items-center gap-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 text-[#C8102E] flex items-center justify-center font-bold">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-gray-900 truncate">RAG Inspector</p>
                        <p className="text-[10px] text-gray-500">Vector Grounding</p>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-600">
                    <span className="flex items-center gap-1 font-medium">
                      <PhoneCall className="w-3.5 h-3.5 text-[#C8102E]" />
                      Helpdesk: <strong>1800-266-6868</strong>
                    </span>
                    <button
                      onClick={handleToggleLang}
                      className="text-[#C8102E] font-bold hover:underline"
                    >
                      {language === 'EN' ? 'हिन्दी में बदलें' : 'Switch to English'}
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-white border-t border-gray-200 shrink-0 flex items-center justify-between text-xs text-gray-500">
              <span className="font-semibold">Department of Posts • Ministry of Communications</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                EDI Live
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
