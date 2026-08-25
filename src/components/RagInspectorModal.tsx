import React, { useState } from 'react';
import { X, Sparkles, Database, Layers, CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';

interface RagInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChunkInspection {
  id: string;
  title: string;
  category: string;
  authority: string;
  circularRef: string;
  similarityScore: number;
  matchedKeywords: string[];
  excerpt: string;
}

export const RagInspectorModal: React.FC<RagInspectorModalProps> = ({ isOpen, onClose }) => {
  const [testQuery, setTestQuery] = useState('What documents do I need to export brass handicrafts to USA through DGNK?');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    query: string;
    processedTokens: string[];
    totalKnowledgeChunks: number;
    retrievedChunks: ChunkInspection[];
    generatedContextSize: number;
    timestamp: string;
  } | null>(null);

  const runInspection = async (queryToRun: string) => {
    setLoading(true);
    try {
      const res = await fetch('/api/assistant/rag-inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryToRun }),
      });
      const data = await res.json();
      setResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && !results) {
      runInspection(testQuery);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sampleQueries = [
    'What documents do I need to export brass handicrafts to USA?',
    'Can I send Ayurvedic supplements without IEC code?',
    'Difference between CN22 and CN23 customs declaration',
    'Are lithium ion batteries permitted via EMS Speed Post?',
    'How does IOSS VAT work for EU e-commerce exports?',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-800 border border-purple-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">RAG Architecture & Grounding Inspector</h2>
                <span className="text-[11px] font-bold bg-purple-700 text-purple-200 px-2 py-0.5 rounded-full">
                  Domain Adaptation
                </span>
              </div>
              <p className="text-xs text-purple-200">
                Official Knowledge Extraction → Semantic Vector Search → Grounded LLM Context
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-purple-300 hover:text-white hover:bg-purple-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Query input and sample pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1.5">
              Test Export Regulatory Query:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && runInspection(testQuery)}
                placeholder="Ask any export compliance, customs, or tariff question..."
                className="flex-1 px-3.5 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-600 font-medium"
              />
              <button
                onClick={() => runInspection(testQuery)}
                disabled={loading}
                className="px-5 py-2.5 bg-purple-700 text-white rounded-lg font-bold text-sm hover:bg-purple-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Retrieving...' : 'Run Vector Search'}
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-xs text-stone-500 font-medium py-1">Quick Test Cases:</span>
              {sampleQueries.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTestQuery(sq);
                    runInspection(sq);
                  }}
                  className="text-xs bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200 px-2 py-0.5 rounded-md transition-colors text-left"
                >
                  {sq}
                </button>
              ))}
            </div>
          </div>

          {/* RAG Workflow Pipeline Diagram */}
          <div className="bg-stone-50 border border-stone-200 rounded-lg p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-700" />
              <span>RAG End-to-End Processing Stages</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-1.5 font-bold text-xs">
                  1
                </div>
                <div className="text-xs font-bold text-stone-900">Query Normalization</div>
                <div className="text-[11px] text-stone-500 mt-1">Tokenization & Stop-word stripping</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mx-auto mb-1.5 font-bold text-xs">
                  2
                </div>
                <div className="text-xs font-bold text-stone-900">Vector Similarity</div>
                <div className="text-[11px] text-stone-500 mt-1">Cosine dot-product over 12 DGNK SOP chunks</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-1.5 font-bold text-xs">
                  3
                </div>
                <div className="text-xs font-bold text-stone-900">Top-K Chunk Rank</div>
                <div className="text-[11px] text-stone-500 mt-1">Extract verified CBIC / DGFT excerpts</div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-2xs">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-1.5 font-bold text-xs">
                  4
                </div>
                <div className="text-xs font-bold text-stone-900">Grounded Synthesis</div>
                <div className="text-[11px] text-stone-500 mt-1">Gemini generates answer with exact citations</div>
              </div>
            </div>
          </div>

          {/* Results section */}
          {results && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-600 bg-stone-100 px-3 py-2 rounded-md">
                <div>
                  <span className="font-semibold">Processed Tokens:</span>{' '}
                  <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200 text-purple-900">
                    {results.processedTokens.join(', ') || 'none'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Knowledge Chunks Scanned:</span>{' '}
                  <span className="font-bold text-stone-900">{results.totalKnowledgeChunks} documents</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4 text-purple-700" />
                  <span>Retrieved Grounding Documents (Top Matches)</span>
                </h4>

                <div className="space-y-3">
                  {results.retrievedChunks.map((chunk, idx) => (
                    <div
                      key={chunk.id}
                      className="p-4 rounded-lg border border-purple-200 bg-purple-50/40 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-md bg-purple-700 text-white flex items-center justify-center font-bold text-xs">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-bold text-sm text-stone-900">{chunk.title}</div>
                            <div className="text-xs text-purple-900 font-medium">{chunk.circularRef}</div>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            {(chunk.similarityScore * 100).toFixed(1)}% Match
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-stone-700 bg-white p-3 rounded-md border border-stone-200 font-mono mb-2">
                        {chunk.excerpt}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-500">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Authority: <strong className="text-stone-700">{chunk.authority}</strong></span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Matched Keywords:</span>
                          {chunk.matchedKeywords.map((kw, ki) => (
                            <span key={ki} className="bg-stone-200 text-stone-800 px-1.5 py-0.2 rounded text-[10px]">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Answers generated by the AI assistant are verified against these exact official documents.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-800 text-white rounded-md font-bold hover:bg-stone-900 transition-colors"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
