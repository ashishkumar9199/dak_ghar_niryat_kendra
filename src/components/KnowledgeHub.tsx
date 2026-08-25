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
  Building2
} from 'lucide-react';
import { DGNK_KNOWLEDGE_BASE } from '../../server/knowledgeBase';

export const KnowledgeHub: React.FC<{ language: 'EN' | 'HI'; onOpenRagInspector: () => void; onAskAI: (q: string) => void }> = ({
  language,
  onOpenRagInspector,
  onAskAI
}) => {
  const isHindi = language === 'HI';

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedDoc, setSelectedDoc] = useState<any>(null);

  const categories = ['ALL', 'Standard Operating Procedure (SOP)', 'Customs Circulars & Notifications', 'Foreign Trade Policy (DGFT)', 'Packaging & Restrictions'];

  const filteredDocs = DGNK_KNOWLEDGE_BASE.filter(doc => {
    return selectedCategory === 'ALL' || doc.category === selectedCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-stone-900">
                {isHindi ? 'DGNK आधिकारिक नियामक ज्ञान केंद्र' : 'DGNK Official Regulatory Knowledge Repository'}
              </h2>
              <p className="text-xs text-stone-500">
                Source of truth for DGNK SOPs, CBIC Circulars, and DGFT Foreign Trade Policy grounding our AI engine.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRagInspector}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto shrink-0 shadow-xs"
          >
            <Layers className="w-4 h-4 text-amber-300" />
            <span>Open Vector RAG Inspector</span>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-stone-200">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:border-purple-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {doc.category}
                </span>
                <span className="text-[11px] font-mono text-stone-500 font-semibold">
                  {doc.circularRef}
                </span>
              </div>

              <h3 className="font-bold text-stone-900 text-sm mb-1">{doc.title}</h3>
              <p className="text-xs text-stone-500 mb-3 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-stone-400" />
                <span>Authority: {doc.authority}</span>
              </p>

              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 text-xs text-stone-700 font-mono line-clamp-3 mb-3 leading-relaxed">
                {doc.content}
              </div>

              <div className="flex flex-wrap gap-1 mb-2">
                {doc.keywords.slice(0, 5).map((kw: string, ki: number) => (
                  <span key={ki} className="bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded text-[10px]">
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedDoc(doc)}
                className="text-xs font-bold text-purple-800 hover:text-purple-900 flex items-center gap-1"
              >
                <span>Read Full SOP Text</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onAskAI(`Explain the details of ${doc.title} (${doc.circularRef}) for an artisan exporter.`)}
                className="text-xs font-semibold text-red-700 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI on this</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Reader Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  {selectedDoc.category}
                </span>
                <h3 className="font-bold text-stone-900 text-base mt-1">{selectedDoc.title}</h3>
                <div className="text-xs text-purple-900 font-mono mt-0.5">{selectedDoc.circularRef}</div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="text-stone-400 hover:text-stone-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                <span className="text-stone-500 font-semibold block mb-0.5">Issuing Authority:</span>
                <span className="font-bold text-stone-900">{selectedDoc.authority}</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-stone-800 whitespace-pre-line leading-relaxed font-sans">
                {selectedDoc.content}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between pt-3 border-t border-stone-200">
              <span className="text-[11px] text-stone-500">Official India Post Digital Export Architecture</span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
