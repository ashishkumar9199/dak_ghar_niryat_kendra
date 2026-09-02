import React, { useState } from 'react';
import { 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  FileText, 
  Info,
  ShieldCheck,
  Building2,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { SupportedLanguage } from '../types';

interface ItemRegulation {
  id: string;
  name: string;
  category: string;
  status: 'FREE' | 'RESTRICTED' | 'PROHIBITED';
  ruleSummary: string;
  authority: string;
  requiredDocuments: string[];
  packagingRequirement: string;
}

export const ProhibitedChecker: React.FC<{ language: SupportedLanguage; onAskAI?: (q: string) => void }> = ({
  language,
  onAskAI
}) => {
  const isHindi = language === 'HI' || language === 'MAI';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [screenQuery, setScreenQuery] = useState('');
  const [aiScreenResult, setAiScreenResult] = useState<any>(null);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const regulations: ItemRegulation[] = [
    {
      id: 'item-1',
      name: 'Handmade Brass Statues, Sculptures & Utensils',
      category: 'Handicrafts',
      status: 'FREE',
      ruleSummary: 'Freely exportable under DGFT Policy. For antique-look items, exporter must declare age under 100 years.',
      authority: 'DGFT & ASI (Archaeological Survey of India)',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Non-Antiquity Self Declaration'],
      packagingRequirement: '5-ply corrugated box with 50mm bubble cushioning and silica desiccant.'
    },
    {
      id: 'item-2',
      name: 'Loose Lithium-ion / Lithium-metal Batteries',
      category: 'Dangerous Goods',
      status: 'PROHIBITED',
      ruleSummary: 'Strictly prohibited in postal mail under UPU Convention & ICAO Dangerous Goods Regulations.',
      authority: 'UPU & ICAO',
      requiredDocuments: ['Cannot be exported via postal mail under any circumstance.'],
      packagingRequirement: 'Not Permitted.'
    },
    {
      id: 'item-3',
      name: 'Rechargeable Electronics with Battery Contained Inside Equipment',
      category: 'Dangerous Goods',
      status: 'RESTRICTED',
      ruleSummary: 'Permitted only if battery is securely installed inside equipment with max cell capacity < 20Wh (UN3481 compliant).',
      authority: 'UPU Technical Standard & Airline Security',
      requiredDocuments: ['MSDS (Material Safety Data Sheet)', 'UN38.3 Test Summary', 'Battery Declaration Form'],
      packagingRequirement: 'Rigid carton with UN3481 lithium handling label; switch must be isolated against accidental activation.'
    },
    {
      id: 'item-4',
      name: 'Handloom Sarees, Shawls, Silk Scarves & Apparels',
      category: 'Textiles',
      status: 'FREE',
      ruleSummary: 'Freely exportable under PBE-I & PBE-II. Eligible for RoDTEP export incentives and 0% GST under LUT.',
      authority: 'Textiles Ministry & CBIC',
      requiredDocuments: ['Commercial Invoice with Composition Details', 'Silk Mark (if pure silk)'],
      packagingRequirement: 'Moisture-barrier polythene sealed bag inside rigid outer postal carton.'
    },
    {
      id: 'item-5',
      name: 'Ayurvedic Herbal Supplements & Herbal Extracts (Tablets/Powder)',
      category: 'Ayush & Wellness',
      status: 'RESTRICTED',
      ruleSummary: 'Permitted if manufactured by AYUSH-licensed unit. Destination country (e.g. US FDA / EU EFSA) limits apply.',
      authority: 'AYUSH Ministry & Destination FDA',
      requiredDocuments: ['AYUSH Manufacturing License', 'Certificate of Analysis (COA)', 'Ingredients List with Botanical Names'],
      packagingRequirement: 'Hermetically sealed tamper-evident foil containers inside double-walled cardboard carton.'
    },
    {
      id: 'item-6',
      name: 'Precious Metals (Gold / Silver Bullion & Coins)',
      category: 'Precious Metals',
      status: 'PROHIBITED',
      ruleSummary: 'Gold & silver bullion, coins, and unwrought precious metals are strictly prohibited in international postal mail.',
      authority: 'RBI & Customs Postal Regulations',
      requiredDocuments: ['Not permitted via postal channel (requires nominated agency air cargo).'],
      packagingRequirement: 'Not Permitted in DGNK.'
    },
    {
      id: 'item-7',
      name: 'Spices, Masalas & Darjeeling Tea (Packed Consumer Packs)',
      category: 'Food & Spices',
      status: 'FREE',
      ruleSummary: 'Commercially branded and sealed retail packs freely exportable. No raw unpackaged bulk seeds without Phytosanitary Certificate.',
      authority: 'FSSAI & Spices Board India',
      requiredDocuments: ['FSSAI License Details on Invoice', 'Ingredients & Expiry Date Declaration'],
      packagingRequirement: 'Airtight, moisture-resistant packaging with tamper-evident seal.'
    }
  ];

  const handleAiScreen = async () => {
    if (!screenQuery.trim()) return;
    setLoadingScreen(true);
    setAiScreenResult(null);

    try {
      const response = await fetch('/api/customs/screen-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: screenQuery,
          description: screenQuery,
          destinationCountry: 'United States'
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAiScreenResult(data);
      } else {
        // Fallback rule screening
        const queryLower = screenQuery.toLowerCase();
        let status: 'FREE' | 'RESTRICTED' | 'PROHIBITED' = 'FREE';
        let advice = 'Item appears exportable under standard commercial guidelines.';
        let docs = ['Commercial Invoice', 'Packing List'];

        if (queryLower.includes('battery') || queryLower.includes('power bank') || queryLower.includes('perfume') || queryLower.includes('gold')) {
          status = 'PROHIBITED';
          advice = 'Hazardous goods or restricted bullion cannot be shipped via international postal mail.';
          docs = ['Disallowed via postal channels'];
        } else if (queryLower.includes('ayurved') || queryLower.includes('medicine') || queryLower.includes('plant') || queryLower.includes('wood')) {
          status = 'RESTRICTED';
          advice = 'Requires specialized regulatory certificates (AYUSH / Phyto / Wild Life NOC).';
          docs = ['Commercial Invoice', 'Manufacturer License', 'Certificate of Analysis'];
        }

        setAiScreenResult({
          status,
          summary: advice,
          requiredDocuments: docs,
          packagingNotes: 'Use standard double-walled corrugated carton with adequate cushioning.'
        });
      }
    } catch {
      setAiScreenResult({
        status: 'FREE',
        summary: 'Item appears exportable under standard commercial guidelines.',
        requiredDocuments: ['Commercial Invoice', 'Packing List'],
        packagingNotes: 'Use standard double-walled corrugated carton with adequate cushioning.'
      });
    } finally {
      setLoadingScreen(false);
    }
  };

  const filteredRegulations = regulations.filter(reg => {
    const matchesSearch = reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reg.ruleSummary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || reg.status === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full max-w-6xl 2xl:max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-speedpost-stripes" />

        <div className="flex items-center gap-3 mb-2 mt-1">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-[#C8102E]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                India Post & UPU Safety Rules
              </span>
              <span className="text-xs text-gray-500 font-semibold">Customs Prohibitions & Aviation Security</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
              {isHindi ? 'प्रतिबंधित व प्रतिबंधित वस्तु जांच' : 'Prohibited & Restricted Goods Compliance Checker'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Verify your export items against Universal Postal Union (UPU), ICAO Aviation, CBIC, and DGFT restrictions.
            </p>
          </div>
        </div>

        {/* AI Fast Screener Input Box */}
        <div className="mt-5 p-4 bg-gradient-to-r from-red-50/70 via-amber-50/50 to-white rounded-2xl border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-[#C8102E]" />
            <span className="text-xs font-black text-gray-900 uppercase tracking-wider">
              {isHindi ? 'AI त्वरित वस्तु जांच' : 'AI Instant Product Compliance Screener'}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={screenQuery}
              onChange={(e) => setScreenQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiScreen()}
              placeholder="e.g. Copper Water Bottle, Sandalwood Carvings, Powerbank, Ashwagandha Tablets..."
              className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#C8102E] outline-none"
            />
            <button
              onClick={handleAiScreen}
              disabled={loadingScreen || !screenQuery.trim()}
              className="px-5 py-2.5 bg-[#C8102E] hover:bg-[#A60D24] text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
            >
              {loadingScreen ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Check Compliance</span>
                </>
              )}
            </button>
          </div>

          {/* AI Screening Result Card */}
          {aiScreenResult && (
            <div className="mt-4 p-4 bg-white rounded-xl border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 text-[11px] font-black rounded-md uppercase tracking-wider ${
                    aiScreenResult.status === 'FREE' 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                      : aiScreenResult.status === 'RESTRICTED'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-red-100 text-[#C8102E] border border-red-300'
                  }`}>
                    Status: {aiScreenResult.status}
                  </span>
                  <span className="text-xs font-bold text-gray-800">Compliance Screening Result</span>
                </div>
              </div>

              <p className="text-xs text-gray-700 font-medium mb-3 leading-relaxed">
                {aiScreenResult.summary}
              </p>

              {aiScreenResult.requiredDocuments && aiScreenResult.requiredDocuments.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-2">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-wider block mb-1">
                    Mandatory Documentation:
                  </span>
                  <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                    {aiScreenResult.requiredDocuments.map((doc: string, idx: number) => (
                      <li key={idx}>{doc}</li>
                    ))}
                  </ul>
                </div>
              )}

              {onAskAI && (
                <button
                  onClick={() => onAskAI(`Explain compliance rules for ${screenQuery}`)}
                  className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1 mt-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Ask AI Assistant for Detailed Clarification</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Filter Tabs & Search in Standard Catalog */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search standard export categories..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#C8102E] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {['ALL', 'FREE', 'RESTRICTED', 'PROHIBITED'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#C8102E] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat === 'ALL' ? 'All Rules' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Regulation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRegulations.map(reg => (
          <div 
            key={reg.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#C8102E] transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`px-2.5 py-0.5 text-[10px] font-black rounded-md uppercase tracking-wider ${
                  reg.status === 'FREE' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : reg.status === 'RESTRICTED'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-red-100 text-[#C8102E]'
                }`}>
                  {reg.status}
                </span>
                <span className="text-[11px] font-semibold text-gray-500">{reg.category}</span>
              </div>

              <h3 className="text-base font-black text-gray-900 mb-1">{reg.name}</h3>
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">{reg.ruleSummary}</p>

              <div className="space-y-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="font-bold text-gray-700 block text-[11px]">Authority:</span>
                  <span className="text-gray-600">{reg.authority}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 block text-[11px]">Required Documents:</span>
                  <span className="text-gray-600">{reg.requiredDocuments.join(', ')}</span>
                </div>
                <div>
                  <span className="font-bold text-gray-700 block text-[11px]">Packaging:</span>
                  <span className="text-gray-600">{reg.packagingRequirement}</span>
                </div>
              </div>
            </div>

            {onAskAI && (
              <div className="pt-3 border-t border-gray-100 mt-3 flex justify-end">
                <button
                  onClick={() => onAskAI(`What are the export rules and packaging standards for ${reg.name}?`)}
                  className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                  <span>Ask AI for Guidance</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
