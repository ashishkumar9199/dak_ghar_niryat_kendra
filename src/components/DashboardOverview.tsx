import React from 'react';
import { 
  Package, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Globe2, 
  TrendingUp, 
  Building2, 
  Clock, 
  FileCheck,
  Plane,
  ArrowUpRight,
  Send,
  HelpCircle,
  Award,
  Layers,
  Stamp
} from 'lucide-react';
import { ExporterProfile } from '../types';
import { ExportChecklist } from './ExportChecklist';

interface DashboardOverviewProps {
  profile: ExporterProfile;
  language: 'EN' | 'HI';
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
  const isHindi = language === 'HI';

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
      date: 'PBE #DGNK-2024-88234'
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
      date: 'PBE #DGNK-2024-88241'
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
      date: 'PBE #DGNK-2024-88255'
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
      date: 'PBE #DGNK-2024-88267'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* India Post Official Portal Welcome Header with Tricolor Accent */}
      <div className="bg-white border border-gray-200 rounded-[24px] p-6 sm:p-7 shadow-xs relative overflow-hidden">
        {/* Subtle Speed Post stripe header accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-speedpost-stripes" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                India Post DGNK
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                Ministry of Communications • Govt. of India
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              {isHindi 
                ? `नमस्ते, ${profile.contactPerson || profile.businessName || 'रामेश'}!` 
                : `Welcome, ${profile.contactPerson || profile.businessName || 'Ramesh'}!`}
            </h1>
            <p className="text-gray-600 font-medium text-xs sm:text-sm mt-0.5">
              {isHindi
                ? 'डाक घर निर्यात केंद्र पोर्टल पर अपने अंतरराष्ट्रीय पार्सल व डिजिटल PBE का प्रबंधन करें।'
                : 'Manage your global parcel dispatches and digital Postal Bill of Export (PBE).'}
            </p>
          </div>

          {/* Quick Header Metric Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-center min-w-[105px]">
              <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {isHindi ? 'सक्रिय निर्यात' : 'Active Dispatches'}
              </span>
              <span className="text-xl font-black text-[#C8102E]">12</span>
            </div>

            <div className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-center min-w-[115px]">
              <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                {isHindi ? 'निर्यात मूल्य' : 'Export Value'}
              </span>
              <span className="text-xl font-black text-gray-900">₹42,500</span>
            </div>

            <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center min-w-[115px]">
              <span className="block text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                {isHindi ? 'RoDTEP रिफंड' : 'RoDTEP Incentive'}
              </span>
              <span className="text-xl font-black text-emerald-700">₹14,850</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2 Big Hero Cards: Postal Yellow & India Post Red */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Postal Gold Action Card - Create PBE */}
        <div 
          onClick={() => onNavigate('wizard')}
          className="bg-[#FFC107] p-6 sm:p-7 rounded-[28px] relative overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-all border border-[#E0A800]"
        >
          <div className="relative z-10">
            <span className="inline-block px-2.5 py-0.5 bg-[#C8102E] text-white font-black text-[10px] uppercase tracking-wider rounded-full mb-2 shadow-2xs">
              Fast Digital Postal Bill of Export
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#C8102E] mb-1 leading-tight">
              {isHindi ? 'नया पार्सल बनाएं (PBE)' : 'Create Export Parcel (PBE)'}
            </h2>
            <p className="text-[#8B6E00] font-bold text-xs sm:text-sm max-w-[260px] leading-relaxed">
              {isHindi
                ? 'अपने उत्पादों के लिए इलेक्ट्रॉनिक PBE-I / PBE-II और CN23 फॉर्म जनरेट करें।'
                : 'Generate electronic PBE-I / PBE-II and CN23 customs declaration with 1-click franking barcode.'}
            </p>
            <div className="mt-6 w-12 h-12 bg-[#C8102E] rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <ArrowRight className="w-6 h-6 text-white" strokeWidth={3} />
            </div>
          </div>
          {/* Decorative stamp circle motif */}
          <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/25 rounded-full rotate-12 transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
        </div>

        {/* India Post Red Hero Card - RAG AI Compliance Hub */}
        <div 
          onClick={() => onNavigate('assistant')}
          className="bg-[#C8102E] p-6 sm:p-7 rounded-[28px] relative overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-all text-white border border-red-800"
        >
          <div className="relative z-10">
            <span className="inline-block px-2.5 py-0.5 bg-[#FFC107] text-[#C8102E] font-black text-[10px] uppercase tracking-wider rounded-full mb-2 shadow-2xs">
              Grounded AI Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-1 leading-tight text-white">
              {isHindi ? 'AI निर्यात सलाहकार' : 'AI Customs Compliance Hub'}
            </h2>
            <p className="text-white/90 font-medium text-xs sm:text-sm max-w-[260px] leading-relaxed">
              {isHindi
                ? 'IEC, GST-LUT, सीमा शुल्क और डाक नियमों पर तत्काल सत्यापित सलाह।'
                : '100% verified answers on CBIC 14/2018, DGFT FTP 2023, and UPU postal regulations.'}
            </p>
            <div className="mt-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-[#C8102E]" strokeWidth={2.5} />
            </div>
          </div>
          {/* Decorative gold circle motif */}
          <div className="absolute bottom-[-40px] right-[-20px] w-48 h-48 bg-[#FFC107] opacity-20 rounded-full transition-transform duration-300 group-hover:scale-110 pointer-events-none" />
        </div>

      </div>

      {/* Export Preparation & Statutory Compliance Checklist */}
      <ExportChecklist
        profile={profile}
        language={language}
        onNavigate={onNavigate}
        onOpenProfile={onOpenProfile}
      />

      {/* Main Grid: Recent Export Orders & Right Compliance Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recent Orders & Quick Utilities */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Recent Export Orders List Card */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-6 shadow-xs flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-[#C8102E]" />
                <h3 className="text-xs font-black uppercase tracking-wider text-gray-700">
                  {isHindi ? 'हाल के निर्यात पार्सल' : 'Recent Export Consignments (DGNK)'}
                </h3>
              </div>
              <button
                onClick={() => onNavigate('tracker')}
                className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1"
              >
                <span>UPU S10 Live Tracker</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recentParcels.map((item, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100/70 transition-colors rounded-2xl border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 ${item.countryColor} rounded-xl border flex items-center justify-center font-black text-sm shrink-0 shadow-2xs`}>
                      {item.countryCode}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.product}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.date} • {item.dest} • <span className="font-mono font-semibold text-gray-700">{item.articleId}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-3 py-1 ${item.statusColor} border text-xs font-bold rounded-full inline-block`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Grid with Authentic India Post Services */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-6 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C8102E]" />
              <span>{isHindi ? 'त्वरित डाक व सीमा शुल्क सुविधाएं' : 'India Post DGNK Services'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => onNavigate('calculator')}
                className="p-4 rounded-2xl border border-gray-200 hover:border-[#C8102E] hover:bg-red-50/30 text-left transition-all group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-red-100 text-[#C8102E] flex items-center justify-center shrink-0 group-hover:bg-[#C8102E] group-hover:text-white transition-colors">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#C8102E]">
                    {isHindi ? 'डाक दर कैलकुलेटर' : 'Postage Tariff Calculator'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Speed Post EMS, ITPS & Air Parcel official rates.
                  </p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('prohibited')}
                className="p-4 rounded-2xl border border-gray-200 hover:border-amber-500 hover:bg-amber-50/30 text-left transition-all group flex items-start gap-3.5"
              >
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-amber-800">
                    {isHindi ? 'प्रतिबंधित वस्तुएं' : 'Prohibited Goods Checker'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Dangerous goods, CITES wildlife & restricted materials.
                  </p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('locator')}
                className="p-4 rounded-2xl border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50/30 text-left transition-all group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-800">
                    {isHindi ? 'DGNK केंद्र खोजें' : 'Find Nearest DGNK Post Office'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    1000+ booking counters with linked Foreign Post Offices.
                  </p>
                </div>
              </button>

              <button
                onClick={() => onNavigate('knowledge')}
                className="p-4 rounded-2xl border border-gray-200 hover:border-purple-600 hover:bg-purple-50/30 text-left transition-all group flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm group-hover:text-purple-800">
                    {isHindi ? 'नियम व SOP' : 'SOP & Circulars Hub'}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    CBIC 14/2018, DGFT FTP 2023 & UPU Convention.
                  </p>
                </div>
              </button>
            </div>
          </div>

        </div>

        {/* Right 1 Col: DGNK Assistant Quick Card & Exporter Readiness */}
        <div className="space-y-6">
          
          {/* DGNK Assistant Interactive Quick Card */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-6 shadow-xs flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C8102E] rounded-full flex items-center justify-center text-[#FFC107] shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900">DGNK Assistant</h4>
                <p className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-pulse"></span>
                  Grounded in Official Guidelines
                </p>
              </div>
            </div>

            {/* Interactive dialogue bubbles */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-3 border border-gray-100">
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-200 shadow-2xs">
                <p className="text-[11px] font-bold text-[#C8102E] mb-0.5 italic">You</p>
                <p className="text-xs text-gray-700">What documents do I need to export silk scarves to the UK?</p>
              </div>

              <div className="bg-[#F1F3FF] p-3.5 rounded-2xl rounded-tr-none border border-blue-100">
                <p className="text-[10px] font-bold text-blue-700 mb-1 uppercase tracking-widest">AI Expert Response</p>
                <p className="text-xs text-gray-800 leading-relaxed">
                  To export Silk Scarves to the UK under DGNK: <strong>1. PBE-II</strong> (e-Postal Bill), <strong>2. IEC</strong>, <strong>3. Commercial Invoice</strong>, <strong>4. Silk Mark Certificate</strong>.
                </p>
                <div className="bg-white/70 p-1.5 rounded-lg border border-blue-200 mt-2 text-[10px] text-gray-500">
                  <span className="font-bold text-blue-700">Sources:</span> DoP SOP v2.1 • DGFT FTP 2023
                </div>
              </div>
            </div>

            {/* Quick Action Input to jump to assistant */}
            <div className="relative h-11">
              <input
                type="text"
                placeholder="Ask about taxes, IEC, CN23..."
                onFocus={() => onNavigate('assistant')}
                onClick={() => onNavigate('assistant')}
                readOnly
                className="w-full h-full bg-gray-100 border border-gray-200 rounded-2xl px-4 pr-12 text-xs font-medium cursor-pointer focus:ring-2 focus:ring-[#C8102E] outline-none"
              />
              <button 
                onClick={() => onNavigate('assistant')}
                className="absolute right-1.5 top-1.5 w-8 h-8 bg-[#C8102E] hover:bg-[#A60D24] rounded-xl flex items-center justify-center text-white shadow-md transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Exporter Compliance Readiness */}
          <div className="bg-white border border-gray-200 rounded-[28px] p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Export Readiness</span>
              </h3>
              <button
                onClick={onOpenProfile}
                className="text-xs text-[#C8102E] hover:underline font-bold"
              >
                Edit Setup
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">DGNK Portal Registration</span>
                  <span className="text-stone-600 text-[11px]">Authorized for electronic PBE booking at all India Post counters.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">Import Export Code (IEC)</span>
                  <span className="text-stone-600 text-[11px]">
                    {profile.iecCode ? `Configured (${profile.iecCode})` : 'Para 2.07 Gift Exemption available up to ₹5 Lakhs.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-stone-900 block">GST Letter of Undertaking (LUT)</span>
                  <span className="text-stone-600 text-[11px]">
                    {profile.hasLUT ? 'RFD-11 Active (0% IGST upfront)' : 'File LUT for tax-free postal exports.'}
                  </span>
                </div>
              </div>
            </div>

            {/* RAG Inspector link */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">Verify RAG vectors</span>
              <button
                onClick={onOpenRagInspector}
                className="text-[#C8102E] font-bold hover:underline flex items-center gap-1"
              >
                <span>Inspector</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
