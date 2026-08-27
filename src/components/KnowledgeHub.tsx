import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Download, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  CheckCircle2,
  Building2,
  HelpCircle,
  Award
} from 'lucide-react';
import { DGNK_KNOWLEDGE_BASE } from '../../server/knowledgeBase';
import { SupportedLanguage } from '../types';

export const KnowledgeHub: React.FC<{ language: SupportedLanguage; onOpenRagInspector: () => void; onAskAI: (q: string) => void }> = ({
  language,
  onOpenRagInspector,
  onAskAI
}) => {
  const isHindi = language === 'HI' || language === 'MAI';

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const categories = ['ALL', 'Standard Operating Procedure (SOP)', 'Customs Circulars & Notifications', 'Foreign Trade Policy (DGFT)', 'Packaging & Restrictions'];

  const filteredDocs = DGNK_KNOWLEDGE_BASE.filter(doc => {
    return selectedCategory === 'ALL' || doc.category === selectedCategory;
  });

  return (
    <div className="w-full max-w-6xl 2xl:max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-speedpost-stripes" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-red-100 text-[#C8102E] flex items-center justify-center font-bold shadow-2xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                  Official Repository
                </span>
                <span className="text-xs text-gray-500 font-semibold">Grounded in CBIC & DGFT Law</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
                {isHindi ? 'DGNK आधिकारिक नियामक ज्ञान केंद्र' : 'DGNK Official Regulatory & SOP Repository'}
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Verified source documents powering India Post DGNK AI compliance and automated PBE validation.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRagInspector}
            className="px-4 py-2.5 bg-[#C8102E] hover:bg-[#A60D24] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-xs"
          >
            <Layers className="w-4 h-4 text-[#FFC107]" />
            <span>Open RAG Vector Inspector</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-gray-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#C8102E] text-white shadow-2xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc, idx) => (
          <div 
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:border-[#C8102E] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="inline-block px-2.5 py-0.5 bg-amber-100 text-[#8B6E00] font-black text-[10px] rounded-md uppercase tracking-wider">
                  {doc.category.replace('_', ' ')}
                </span>
                <span className="text-[10px] font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded truncate max-w-[200px]">
                  {doc.circularRef || doc.authority}
                </span>
              </div>

              <h3 className="text-base font-black text-gray-900 mb-1 leading-snug">
                {doc.title}
              </h3>
              <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-3">
                {doc.content}
              </p>

              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-1 mb-3">
                <span className="text-[10px] font-black text-[#C8102E] uppercase tracking-wider block">Source Authority:</span>
                <p className="text-xs text-gray-700 font-medium">{doc.authority}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <button
                onClick={() => onAskAI(`Explain key requirements of ${doc.title}`)}
                className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Ask AI to Explain</span>
              </button>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Read Full SOP</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-7 shadow-xl border border-gray-200">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="px-2.5 py-0.5 bg-red-100 text-[#C8102E] text-[10px] font-black rounded-md uppercase tracking-wider inline-block mb-1">
                  {selectedDoc.category.replace('_', ' ')}
                </span>
                <h3 className="text-xl font-black text-gray-900">{selectedDoc.title}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">Authority: {selectedDoc.authority} • Ref: {selectedDoc.circularRef || 'DGNK SOP'}</p>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="prose prose-sm text-gray-700 space-y-3 border-t border-b border-gray-100 py-4">
              <p className="font-medium text-xs leading-relaxed">{selectedDoc.content}</p>
            </div>

            <div className="flex items-center justify-between gap-3 mt-4 pt-2">
              <button
                onClick={() => {
                  const title = selectedDoc.title;
                  setSelectedDoc(null);
                  onAskAI(`Explain compliance specifics for ${title}`);
                }}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-xl text-xs font-bold hover:bg-[#A60D24] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#FFC107]" />
                <span>Ask AI Assistant About This</span>
              </button>

              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
