import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  XCircle, 
  Sparkles, 
  FileText, 
  Info,
  ShieldCheck,
  Building2,
  ExternalLink
} from 'lucide-react';

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

export const ProhibitedChecker: React.FC<{ language: 'EN' | 'HI'; onAskAI?: (q: string) => void }> = ({
  language,
  onAskAI
}) => {
  const isHindi = language === 'HI';

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
      name: 'Antiquities and Artifacts older than 100 years',
      category: 'Antiquities',
      status: 'PROHIBITED',
      ruleSummary: 'Export of antiquities by private individuals without ASI permit is illegal under Antiquities and Art Treasures Act 1972.',
      authority: 'Archaeological Survey of India (ASI)',
      requiredDocuments: ['ASI Non-Antiquity Certificate (NOC) mandatory for replicas.'],
      packagingRequirement: 'Sealed crate inspected by ASI Nodal Officer.'
    },
    {
      id: 'item-5',
      name: 'Ayurvedic Herbal Supplements & Herbal Teas',
      category: 'Ayurveda',
      status: 'RESTRICTED',
      ruleSummary: 'Permitted provided herbs are non-CITES species and manufactured in AYUSH GMP certified facility.',
      authority: 'Ministry of AYUSH & Wildlife Crime Control Bureau (WCCB)',
      requiredDocuments: ['AYUSH Manufacturing License', 'Certificate of Analysis (COA)', 'Non-CITES Plant Species Declaration'],
      packagingRequirement: 'Hermetically sealed tamper-evident foil packaging inside sturdy box.'
    },
    {
      id: 'item-6',
      name: 'Natural Sandalwood & Red Sanders Carvings / Logs',
      category: 'Forest Produce',
      status: 'PROHIBITED',
      ruleSummary: 'Strictly prohibited under CITES Appendix II & DGFT Wildlife regulations without special DGFT quota license.',
      authority: 'DGFT & Ministry of Environment, Forest & Climate Change',
      requiredDocuments: ['Special DGFT Export License (Restricted Category)'],
      packagingRequirement: 'Not Permitted for standard postal mail.'
    },
    {
      id: 'item-7',
      name: 'Handloom Silk / Cotton Apparel & Fabric',
      category: 'Textiles',
      status: 'FREE',
      ruleSummary: '100% freely exportable with RoDTEP rebate benefits up to 4.3%.',
      authority: 'Textiles Committee & DGFT',
      requiredDocuments: ['Commercial Invoice', 'Packing List', 'Fiber Content Declaration'],
      packagingRequirement: 'Waterproof polyethylene inner liner (50 microns) inside cardboard box.'
    },
    {
      id: 'item-8',
      name: 'Handcrafted Incense Sticks (Agarbatti) & Dhoop',
      category: 'Fragrance',
      status: 'FREE',
      ruleSummary: 'Freely exportable if base composition is non-explosive and non-flammable.',
      authority: 'DGFT',
      requiredDocuments: ['Commercial Invoice', 'MSDS Non-Hazardous Certificate'],
      packagingRequirement: 'Moisture-resistant inner seal with outer rigid packaging.'
    },
    {
      id: 'item-9',
      name: 'High Alcohol Content Perfumes & Essential Oils (Flashpoint < 60°C)',
      category: 'Dangerous Goods',
      status: 'PROHIBITED',
      ruleSummary: 'Class 3 Flammable Liquid prohibited on passenger aircraft airmail.',
      authority: 'ICAO Dangerous Goods',
      requiredDocuments: ['Prohibited in postal airmail.'],
      packagingRequirement: 'Not Permitted.'
    },
    {
      id: 'item-10',
      name: 'Packaged Organic Spices (Turmeric, Cardamom, Pepper)',
      category: 'Food',
      status: 'RESTRICTED',
      ruleSummary: 'Permitted in retail sealed packs. Export to USA requires mandatory FDA Prior Notice (PN).',
      authority: 'Spices Board of India & US FDA',
      requiredDocuments: ['FSSAI License', 'Spices Board RCMC', 'US FDA Prior Notice (for USA)'],
      packagingRequirement: 'Multi-layer food-grade vacuum sealed pouch.'
    }
  ];

  const handleScreenItem = async () => {
    if (!screenQuery.trim()) return;
    setLoadingScreen(true);
    try {
      const res = await fetch('/api/customs/screen-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemName: screenQuery, destinationCountry: 'USA' })
      });
      const data = await res.json();
      setAiScreenResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingScreen(false);
    }
  };

  const filteredItems = regulations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.ruleSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900">
              {isHindi ? 'प्रतिबंधित एवं अनुमत निर्यात वस्तुएं' : 'Prohibited & Restricted Items Guide'}
            </h2>
            <p className="text-xs text-stone-500">
              Official compliance directory according to UPU Dangerous Goods, Indian Customs, and DGFT Trade Policy 2023.
            </p>
          </div>
        </div>

        {/* Live AI Item Screener Box */}
        <div className="mt-6 pt-4 border-t border-stone-200 bg-amber-50/50 p-4 rounded-xl border border-amber-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Instant AI Product Screener</span>
            </span>
            <span className="text-[10px] text-amber-800 font-medium">
              Checks against CITES, ICAO, AYUSH & ASI rules
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={screenQuery}
              onChange={(e) => setScreenQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleScreenItem()}
              placeholder="Enter any product (e.g., 'Wooden Sheesham box', 'Ayurvedic chyawanprash', 'Power bank', 'Silver necklace')"
              className="flex-1 px-3.5 py-2.5 bg-white border border-amber-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
            />
            <button
              onClick={handleScreenItem}
              disabled={loadingScreen || !screenQuery.trim()}
              className="px-5 py-2.5 bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
            >
              {loadingScreen ? 'Screening...' : 'Screen Item'}
            </button>
          </div>

          {aiScreenResult && (
            <div className={`mt-3 p-3.5 rounded-lg border text-xs ${
              aiScreenResult.status === 'FREE'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : aiScreenResult.status === 'RESTRICTED'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-red-50 border-red-300 text-red-950'
            }`}>
              <div className="flex items-center justify-between font-bold mb-1">
                <span className="flex items-center gap-1.5">
                  {aiScreenResult.status === 'FREE' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {aiScreenResult.status === 'RESTRICTED' && <AlertCircle className="w-4 h-4 text-amber-600" />}
                  {aiScreenResult.status === 'PROHIBITED' && <XCircle className="w-4 h-4 text-red-600" />}
                  <span>Status: {aiScreenResult.status}</span>
                </span>
                {onAskAI && (
                  <button
                    onClick={() => onAskAI(`What are the detailed DGNK compliance requirements to export ${screenQuery}?`)}
                    className="text-[11px] font-bold text-purple-800 underline"
                  >
                    Ask AI for Full NOC Procedure →
                  </button>
                )}
              </div>
              <p>{aiScreenResult.message}</p>
              <div className="mt-1 font-semibold text-[11px]">
                Recommended Action: {aiScreenResult.action}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Database Search & Filter */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search items, materials, or rules..."
              className="w-full pl-9 pr-4 py-2 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-600 focus:outline-hidden"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
            {['ALL', 'Handicrafts', 'Dangerous Goods', 'Antiquities', 'Ayurveda', 'Food', 'Textiles'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-xl border-2 transition-all ${
                item.status === 'FREE'
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : item.status === 'RESTRICTED'
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-red-200 bg-red-50/20'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm">{item.name}</h3>
                </div>

                <span className={`px-2 py-0.5 rounded text-[11px] font-bold shrink-0 flex items-center gap-1 ${
                  item.status === 'FREE'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : item.status === 'RESTRICTED'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}>
                  {item.status === 'FREE' && <CheckCircle2 className="w-3 h-3" />}
                  {item.status === 'RESTRICTED' && <AlertCircle className="w-3 h-3" />}
                  {item.status === 'PROHIBITED' && <XCircle className="w-3 h-3" />}
                  <span>{item.status}</span>
                </span>
              </div>

              <p className="text-xs text-stone-700 mb-3 leading-relaxed">
                {item.ruleSummary}
              </p>

              <div className="space-y-2 pt-2 border-t border-stone-200/60 text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block mb-0.5">Required Compliance Documents:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.requiredDocuments.map((doc, di) => (
                      <span key={di} className="bg-white border border-stone-200 text-stone-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block mb-0.5">Postal Packaging Norm:</span>
                  <span className="text-stone-600 text-[11px]">{item.packagingRequirement}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
