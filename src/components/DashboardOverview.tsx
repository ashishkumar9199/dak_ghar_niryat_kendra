import React, { useState } from 'react';
import { 
  Package, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  FileCheck, 
  ArrowUpRight, 
  AlertTriangle, 
  Plus 
} from 'lucide-react';
import { ExporterProfile, SupportedLanguage } from '../types';
import { DnkLogo } from './DnkLogo';
import { translations } from '../utils/translations';

interface DashboardOverviewProps {
  profile: ExporterProfile;
  language: SupportedLanguage;
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
  onOpenRagInspector: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  profile,
  language,
  onNavigate,
  onOpenProfile,
  onOpenRagInspector
}) => {
  const isHindi = language === 'HI' || language === 'MAI';
  const t = translations[language] || translations.EN;
  const [quickTrackId, setQuickTrackId] = useState('');

  const recentParcels = [
    {
      articleId: 'EE928410294IN',
      countryCode: 'US',
      countryColor: 'bg-blue-100 text-blue-700 border-blue-200',
      product: 'Handicraft Set (Wood & Brass)',
      dest: 'New York, USA',
      service: 'Speed Post International (EMS)',
      status: 'In Flight Transit',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      date: 'PBE-IV #88234'
    },
    {
      articleId: 'IN482019385IN',
      countryCode: 'GB',
      countryColor: 'bg-red-100 text-[#C8102E] border-red-200',
      product: 'Silk Scarf (Assam Eri Handloom)',
      dest: 'London, United Kingdom',
      service: 'Tracked Packet Service (ITPS)',
      status: 'FPO Customs Cleared',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200',
      date: 'PBE-III #88241'
    },
    {
      articleId: 'CP710928374IN',
      countryCode: 'AU',
      countryColor: 'bg-amber-100 text-amber-800 border-amber-200',
      product: 'Organic Spices & Darjeeling Tea',
      dest: 'Sydney, Australia',
      service: 'International Air Parcel (CP72)',
      status: 'In Sorting Hub',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200',
      date: 'PBE-IV #88255'
    },
    {
      articleId: 'EE109284712IN',
      countryCode: 'DE',
      countryColor: 'bg-purple-100 text-purple-700 border-purple-200',
      product: 'Jaipur Blue Pottery Decor',
      dest: 'Berlin, Germany',
      service: 'Speed Post International (EMS)',
      status: 'Delivered',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      date: 'PBE-III #88267'
    }
  ];

  const handleQuickTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      onNavigate('tracker');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. Clean Top Header with Exporter Stats & Primary CTA */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Welcome and Exporter Badges */}
          <div className="flex items-start gap-4">
            <DnkLogo variant="badge" size="lg" language={language} isHindi={isHindi} className="hidden sm:inline-flex mt-1" />
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-[#C8102E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  India Post DGNK
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  IEC: {profile.iecCode || 'Active'}
                </span>
                <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                  LUT: 0% IGST (RFD-11)
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {isHindi 
                  ? `नमस्ते, ${profile.contactPerson || profile.businessName || 'निर्यातक'}!` 
                  : `Welcome, ${profile.contactPerson || profile.businessName || 'Exporter'}!`}
              </h1>
              <p className="text-gray-500 font-medium text-xs sm:text-sm mt-0.5">
                {isHindi
                  ? 'डाक घर निर्यात केंद्र (DNK) डैशबोर्ड • इलेक्ट्रॉनिक PBE, डाक दरें और पार्सल ट्रैकिंग।'
                  : 'Dak Ghar Niryat Kendra Dashboard • Create Postal Bills of Export, check tariffs, and track consignments.'}
              </p>
            </div>
          </div>

          {/* Quick Metrics + Primary Action Button */}
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
            <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-center min-w-[95px]">
              <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {isHindi ? 'सक्रिय पार्सल' : 'Active Parcels'}
              </span>
              <span className="text-lg sm:text-xl font-black text-[#C8102E]">12</span>
            </div>

            <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-center min-w-[110px]">
              <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {isHindi ? 'फ्रैंकिंग बैलेंस' : 'Wallet Balance'}
              </span>
              <span className="text-lg sm:text-xl font-black text-gray-900">₹{profile.walletBalance?.toLocaleString('en-IN') || '18,450'}</span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigate('wizard')}
              className="px-5 py-3.5 bg-[#C8102E] hover:bg-[#A30D25] text-white rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" strokeWidth={3} />
              <span>{isHindi ? 'नया PBE बनाएं' : 'New Export (PBE)'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Core 4-Action Quick Grid (Intuitive & User-Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Action 1: Create PBE */}
        <button
          id="card-generate-pbe"
          onClick={() => onNavigate('wizard')}
          className="group bg-white hover:bg-gradient-to-br hover:from-red-50/60 hover:to-white border-2 border-gray-200 hover:border-[#C8102E] rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-red-100 text-[#C8102E] group-hover:bg-[#C8102E] group-hover:text-white flex items-center justify-center font-black shadow-xs transition-all group-hover:scale-105">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-[#C8102E] bg-red-50 border border-red-200 px-2 py-0.5 rounded-full uppercase">
                CBIC 48/2018
              </span>
            </div>
            <h3 className="text-base font-black text-gray-900 group-hover:text-[#C8102E] transition-colors">
              {isHindi ? 'डिजिटल PBE बनाएं' : 'Generate PBE'}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
              {isHindi 
                ? 'PBE-III (ई-कॉमर्स), PBE-IV व CN23 कस्टम्स डिक्लेरेशन तैयार करें।' 
                : 'Create Postal Bill of Export (PBE-III/IV) with auto CN23 customs label.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#C8102E]">
            <span>{isHindi ? 'शुरू करें' : 'Start Booking'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Action 2: Postage & Currency */}
        <button
          id="card-view-tariff"
          onClick={() => onNavigate('calculator')}
          className="group bg-white hover:bg-gradient-to-br hover:from-amber-50/60 hover:to-white border-2 border-gray-200 hover:border-amber-500 rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-[#8B6E00] group-hover:bg-[#FFC107] group-hover:text-[#990B20] flex items-center justify-center font-black shadow-xs transition-all group-hover:scale-105">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-[#8B6E00] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase">
                CBIC FX Live
              </span>
            </div>
            <h3 className="text-base font-black text-gray-900 group-hover:text-[#8B6E00] transition-colors">
              {isHindi ? 'डाक दर व मुद्रा' : 'Tariff & Currency'}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
              {isHindi 
                ? 'Speed Post EMS, ITPS दरें और CBIC सीमा शुल्क विनिमय दरें निकालें।' 
                : 'Calculate live postage rates with official CBIC customs exchange rates.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#8B6E00]">
            <span>{isHindi ? 'दरें देखें' : 'View Rates'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Action 3: Track Shipment */}
        <button
          id="card-track-shipment"
          onClick={() => onNavigate('tracker')}
          className="group bg-white hover:bg-gradient-to-br hover:from-purple-50/60 hover:to-white border-2 border-gray-200 hover:border-purple-600 rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 group-hover:bg-purple-700 group-hover:text-white flex items-center justify-center font-black shadow-xs transition-all group-hover:scale-105">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full uppercase">
                ICES 1.5 FPO
              </span>
            </div>
            <h3 className="text-base font-black text-gray-900 group-hover:text-purple-700 transition-colors">
              {isHindi ? 'पार्सल ट्रैक करें' : 'Track Shipment'}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
              {isHindi 
                ? 'UPU S10 बारकोड व कस्टम्स Out-of-Charge स्थिति लाइव देखें।' 
                : 'Live tracking for UPU S10 articles with customs clearance status.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-purple-700">
            <span>{isHindi ? 'ट्रैक करें' : 'Track Now'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Action 4: AI Export Advisor */}
        <button
          id="card-ai-advisor"
          onClick={() => onNavigate('assistant')}
          className="group bg-white hover:bg-gradient-to-br hover:from-blue-50/60 hover:to-white border-2 border-gray-200 hover:border-blue-600 rounded-2xl p-5 text-left transition-all shadow-xs hover:shadow-md flex flex-col justify-between cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 group-hover:bg-blue-700 group-hover:text-white flex items-center justify-center font-black shadow-xs transition-all group-hover:scale-105">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full uppercase">
                Grounded AI
              </span>
            </div>
            <h3 className="text-base font-black text-gray-900 group-hover:text-blue-700 transition-colors">
              {isHindi ? 'AI निर्यात सलाहकार' : 'AI Export Advisor'}
            </h3>
            <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
              {isHindi 
                ? 'HS कोड, RoDTEP दरें व सीमा शुल्क नियमों पर तत्काल प्रमाणित सलाह।' 
                : 'Instant statutory answers on HS codes, RoDTEP benefits & DGFT rules.'}
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-blue-700">
            <span>{isHindi ? 'सलाह लें' : 'Ask AI'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

      </div>

      {/* 3. Main Dashboard Grid (Clean 2-Column Structure) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 Cols): Recent Consignments & Quick Track Bar */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Track Input Bar */}
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-800">
                  {isHindi ? 'त्वरित पार्सल ट्रैकिंग' : 'Quick Article Lookup'}
                </h4>
                <p className="text-[11px] text-gray-500 font-medium">
                  {isHindi ? '13-अंकीय UPU S10 बारकोड दर्ज करें' : 'Enter 13-digit barcode (e.g., EE928410294IN)'}
                </p>
              </div>
            </div>

            <form onSubmit={handleQuickTrackSubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={quickTrackId}
                onChange={(e) => setQuickTrackId(e.target.value)}
                placeholder="EE928410294IN"
                className="w-full sm:w-48 px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-800 uppercase focus:ring-2 focus:ring-[#C8102E] outline-none"
              />
              <button
                type="submit"
                onClick={() => onNavigate('tracker')}
                className="px-4 py-2 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold transition-colors shrink-0 cursor-pointer"
              >
                {isHindi ? 'ट्रैक' : 'Track'}
              </button>
            </form>
          </div>

          {/* Recent Export Consignments List Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C8102E]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">
                  {isHindi ? 'हाल के निर्यात पार्सल' : 'Recent Export Consignments'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('tracker')}
                className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>{isHindi ? 'सभी देखें' : 'View All Shipments'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentParcels.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50/80 hover:bg-gray-100/80 transition-colors rounded-2xl border border-gray-200 gap-3"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 ${item.countryColor} rounded-xl border flex items-center justify-center font-black text-xs shrink-0 shadow-2xs`}>
                      {item.countryCode}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm leading-tight">{item.product}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        <span className="font-mono font-semibold text-gray-700">{item.articleId}</span> • {item.dest} • <span className="text-gray-400 font-medium">{item.date}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-auto shrink-0">
                    <span className={`px-3 py-1 ${item.statusColor} border text-[11px] font-bold rounded-full inline-block`}>
                      {item.status}
                    </span>
                    <button
                      onClick={() => onNavigate('tracker')}
                      className="text-xs font-bold text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 px-3 py-1 rounded-xl transition-colors cursor-pointer"
                    >
                      {isHindi ? 'ट्रैक' : 'Track'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Readiness & Essential Utilities */}
        <div className="space-y-6">
          
          {/* Exporter Readiness Summary Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-800">
                  {isHindi ? 'निर्यात तत्परता' : 'Export Readiness'}
                </h3>
              </div>
              <button
                onClick={onOpenProfile}
                className="text-xs text-[#C8102E] hover:underline font-bold cursor-pointer"
              >
                {isHindi ? 'प्रोफ़ाइल' : 'Manage'}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>DGNK Portal Registration</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>IEC Registration (DGFT)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {profile.iecCode || '0518029481'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GST Letter of Undertaking (LUT)</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-black">
                  0% IGST
                </span>
              </div>
            </div>
          </div>

          {/* Quick Exporter Utilities (Compact Links) */}
          <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-gray-500 mb-3">
              {isHindi ? 'उपयोगी लिंक्स व केंद्र' : 'Exporter Utilities'}
            </h4>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('locator')}
                className="w-full p-3 rounded-xl hover:bg-gray-50 border border-gray-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-800 block group-hover:text-emerald-700 transition-colors">
                      {isHindi ? 'निकटतम DGNK केंद्र' : 'Find Nearest DGNK Post Office'}
                    </span>
                    <span className="text-[10px] text-gray-500">1000+ linked HPO counters</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigate('prohibited')}
                className="w-full p-3 rounded-xl hover:bg-gray-50 border border-gray-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-800 block group-hover:text-amber-800 transition-colors">
                      {isHindi ? 'प्रतिबंधित वस्तुएं जांचें' : 'Prohibited Goods Screener'}
                    </span>
                    <span className="text-[10px] text-gray-500">CITES, liquids & dangerous goods</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-800 group-hover:translate-x-0.5 transition-all" />
              </button>

              <button
                onClick={() => onNavigate('knowledge')}
                className="w-full p-3 rounded-xl hover:bg-gray-50 border border-gray-200 text-left transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-800 block group-hover:text-purple-700 transition-colors">
                      {isHindi ? 'सर्कुलर व SOP हब' : 'CBIC Circulars & SOP Hub'}
                    </span>
                    <span className="text-[10px] text-gray-500">Notification 48/2018 & FTP 2023</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

