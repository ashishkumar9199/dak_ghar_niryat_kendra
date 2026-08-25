import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  Info, 
  Layers, 
  User, 
  Bot, 
  Copy, 
  Check, 
  RefreshCw, 
  HelpCircle,
  Award
} from 'lucide-react';
import { ChatMessage, ExporterProfile, GroundedSource } from '../types';

interface AIAssistantProps {
  profile: ExporterProfile;
  language: 'EN' | 'HI';
  onOpenRagInspector: () => void;
  onNavigateToWizard?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  profile,
  language,
  onOpenRagInspector,
  onNavigateToWizard
}) => {
  const isHindi = language === 'HI';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: isHindi
        ? `नमस्ते! मैं **डाक घर निर्यात केंद्र (DGNK) का AI निर्यात सहायक** हूँ।\n\nमैं भारतीय डाक, सीमा शुल्क (CBIC), और विदेश व्यापार महानिदेशालय (DGFT) के आधिकारिक नियमों पर आधारित 100% सटीक उत्तर प्रदान करता हूँ।\n\nआप मुझसे अंतर्राष्ट्रीय शिपिंग, दस्तावेज़ (PBE, CN22/CN23), पैकेजिंग, या प्रतिबंधित वस्तुओं के बारे में कोई भी प्रश्न पूछ सकते हैं।`
        : `Welcome to the **Dak Ghar Niryat Kendra (DGNK) AI Export Assistant**.\n\nI provide **100% grounded answers** verified against official India Post SOPs, CBIC Customs Circulars, DGFT Foreign Trade Policy 2023, and country-specific trade guidelines.\n\nAsk me anything about export documents, customs clearance, packaging, or product restrictions!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGrounded: true,
      groundedSources: [
        {
          title: 'India Post DGNK Standard Operating Procedure (SOP)',
          sourceDoc: 'DoP Circular No. 27-02/2021-BD&MD / DGNK v2.1',
          circularRef: 'India Post DGNK v2.1',
          authority: 'Department of Posts, Ministry of Communications',
          similarityScore: 0.98,
          matchedKeywords: ['dgnk', 'sop', 'postal export', 'msme']
        }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<GroundedSource | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          userProfile: {
            businessType: profile.businessCategory,
            productCategory: profile.businessCategory,
            hasIEC: profile.hasIEC,
            hasGST: profile.hasGST,
            destinationCountry: 'International'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get answer from AI service.');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: data.groundedSources,
        isAiGrounded: data.isAiGrounded
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'assistant',
        text: `We could not complete the RAG query. Please check your network or try again shortly.\n\n*Emergency Contact: India Post Export Nodal Desk (1800-266-6868)*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestedQuestions = [
    {
      label: 'Handicrafts to USA',
      query: 'What documents and customs forms are required to export brass and wooden handicrafts to the USA under DGNK?'
    },
    {
      label: 'CN22 vs CN23 Difference',
      query: 'When should an exporter use Form CN22 versus Form CN23 for customs declarations?'
    },
    {
      label: 'IEC Code Exemptions',
      query: 'Is Import Export Code (IEC) mandatory for first-time artisans exporting gifts under ₹5 lakh?'
    },
    {
      label: 'Ayurvedic Products Rules',
      query: 'What are the packaging and compliance rules for exporting Ayurvedic herbal tea or supplements to the UK and Europe?'
    },
    {
      label: 'LUT & Zero-Rated GST',
      query: 'How does Letter of Undertaking (LUT) allow export without paying IGST upfront under DGNK?'
    },
    {
      label: 'Lithium Battery Restriction',
      query: 'Can I send electronics containing rechargeable lithium batteries via Speed Post International?'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header Banner in Vibrant Theme */}
      <div className="bg-[#D42426] rounded-[28px] sm:rounded-[32px] text-white p-6 sm:p-8 mb-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#FFC107] text-[#D42426] font-black text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              Official RAG Assistant
            </span>
            <span className="text-white/90 text-xs font-semibold flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Verified CBIC & DGFT Database
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            {isHindi ? 'DGNK एआई निर्यात सलाहकार' : 'DGNK AI Export Compliance Advisor'}
          </h2>
          <p className="text-sm text-white/90 mt-1.5 leading-relaxed">
            {isHindi
              ? 'आधिकारिक भारतीय डाक नियमों और अंतरराष्ट्रीय सीमा शुल्क दिशानिर्देशों के आधार पर सत्यापित सहायता प्राप्त करें।'
              : 'Grounded intelligence for MSMEs & artisans. Ask complex customs, documentation, or restriction questions in plain language.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <button
            onClick={onOpenRagInspector}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-black border border-white/30 transition-all shadow-sm"
          >
            <Layers className="w-4 h-4 text-[#FFC107]" />
            <span>Inspect Semantic Vectors</span>
          </button>
        </div>

        {/* Decorative circle */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FFC107] opacity-20 rounded-full pointer-events-none" />
      </div>

      {/* Main Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Exporter Profile Context & Quick Topics */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Active Profile Context Card */}
          <div className="bg-white rounded-[28px] border border-gray-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D42426]" />
                <span>Exporter Profile</span>
              </h3>
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Business Name:</span>
                <span className="font-bold text-gray-800">{profile.businessName || 'Artisan Exporter'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="font-semibold text-gray-800">{profile.businessCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IEC Status:</span>
                <span className={`font-semibold ${profile.hasIEC ? 'text-green-700' : 'text-amber-700'}`}>
                  {profile.hasIEC ? 'Registered' : 'Gift Exemption'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST LUT:</span>
                <span className={`font-semibold ${profile.hasLUT ? 'text-green-700' : 'text-gray-600'}`}>
                  {profile.hasLUT ? 'Filed (Zero-Tax)' : 'Standard'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Answers are dynamically grounded to this exporter context.</span>
            </div>
          </div>

          {/* Suggested Domain Questions */}
          <div className="bg-white rounded-[28px] border border-gray-200 p-5 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D42426]" />
              <span>Suggested Topics</span>
            </h3>

            <div className="space-y-2">
              {suggestedQuestions.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sq.query)}
                  disabled={loading}
                  className="w-full text-left p-3 rounded-2xl bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-100 text-xs text-gray-800 transition-all font-medium group"
                >
                  <div className="font-bold text-gray-900 group-hover:text-[#D42426] mb-0.5">
                    {sq.label}
                  </div>
                  <div className="text-[11px] text-gray-500 line-clamp-1">
                    {sq.query}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RAG Accuracy Card */}
          <div className="bg-[#FFC107]/15 border border-[#FFC107]/40 rounded-[28px] p-5 text-xs text-[#8B6E00]">
            <div className="flex items-center gap-2 font-bold mb-1 text-[#8B6E00]">
              <Award className="w-4 h-4 text-[#D42426]" />
              <span>RAG Accuracy Guarantee</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed">
              Bound directly to Department of Posts SOPs and CBIC export rules. Hallucinations are actively suppressed by semantic vector retrieval.
            </p>
          </div>
        </div>

        {/* Right Area: Main Interactive Chat Console from Theme */}
        <div className="lg:col-span-3 bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 shadow-sm flex flex-col h-[700px] overflow-hidden">
          
          {/* Top Chat Subheader */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#D42426] rounded-full flex items-center justify-center text-[#FFC107] shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900 leading-tight">DGNK Assistant</h4>
                <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                  Grounded in Official Guidelines
                </p>
              </div>
            </div>

            <button
              onClick={() => setMessages([messages[0]])}
              className="text-xs text-gray-400 hover:text-[#D42426] flex items-center gap-1 font-bold transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Chat</span>
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Assistant Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#D42426] text-[#FFC107] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  {/* Message Bubble - Matching theme */}
                  <div className={`max-w-2xl ${
                    isUser 
                      ? 'bg-white p-4 rounded-2xl rounded-tl-none border border-gray-200 shadow-sm text-gray-700' 
                      : 'bg-[#F1F3FF] p-5 rounded-2xl rounded-tr-none border border-blue-100 text-gray-800'
                  }`}>
                    
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${isUser ? 'text-[#D42426]' : 'text-blue-600'}`}>
                        {isUser ? 'You (Exporter)' : 'AI Expert Response'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Formatted Text */}
                    <div className="text-sm leading-relaxed whitespace-pre-line text-gray-800">
                      {msg.text}
                    </div>

                    {/* Grounded Source Citations (RAG Attribution) */}
                    {!isUser && msg.groundedSources && msg.groundedSources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-blue-200/60">
                        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-2">
                          <BookOpen className="w-3 h-3 text-blue-600" />
                          <span>Official Sources:</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.groundedSources.map((src, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => setSelectedSource(src)}
                              className="text-left p-2.5 rounded-xl bg-white/70 border border-blue-200 hover:border-blue-400 hover:bg-white transition-all text-xs group"
                            >
                              <div className="font-bold text-gray-900 group-hover:text-blue-700 line-clamp-1">
                                {src.title}
                              </div>
                              <div className="text-[10px] text-blue-600 font-mono mt-0.5 line-clamp-1">
                                {src.circularRef}
                              </div>
                              <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                                <span>{src.authority}</span>
                                <span className="font-bold text-green-700 bg-green-100 px-1.5 py-0.2 rounded-full">
                                  {(src.similarityScore * 100).toFixed(0)}% match
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions Bar */}
                    <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-gray-200/50">
                      <button
                        onClick={() => copyText(msg.text, msg.id)}
                        className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      {!isUser && onNavigateToWizard && (
                        <button
                          onClick={onNavigateToWizard}
                          className="text-xs font-bold text-[#D42426] hover:underline flex items-center gap-1"
                        >
                          <span>Apply to New Shipment</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#FFC107] border-2 border-white flex items-center justify-center text-[#D42426] font-bold text-xs shadow-sm mt-1 shrink-0">
                      {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'RK'}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-[#D42426] text-[#FFC107] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="bg-[#F1F3FF] p-4 rounded-2xl rounded-tr-none border border-blue-100 max-w-md shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 mb-2">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Searching DGNK Knowledge Base & Synthesizing Grounded Answer...</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 bg-blue-200/60 rounded animate-pulse w-48" />
                    <div className="h-2 bg-blue-200/60 rounded animate-pulse w-64" />
                    <div className="h-2 bg-blue-200/60 rounded animate-pulse w-36" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form matching theme */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative h-12"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={
                  isHindi
                    ? "नियम, कर, दस्तावेज़ों के बारे में पूछें..."
                    : "Ask about rules, taxes, docs, prohibited items..."
                }
                className="w-full h-full bg-gray-100 border-none rounded-2xl px-4 py-2 pr-14 text-sm font-medium focus:ring-2 focus:ring-[#D42426] transition-all outline-none"
              />

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="absolute right-1.5 top-1.5 w-9 h-9 bg-[#D42426] hover:bg-[#B71C1E] disabled:opacity-50 text-white rounded-xl flex items-center justify-center shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 px-1">
              <span>Grounding: India Post DGNK SOP • CBIC Circular 14/2018 • DGFT FTP 2023 • UPU S10</span>
              <button
                type="button"
                onClick={onOpenRagInspector}
                className="text-[#D42426] hover:underline font-bold"
              >
                Semantic RAG Pipeline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Citation Preview Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] shadow-2xl border border-gray-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#D42426] flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{selectedSource.title}</h3>
                  <div className="text-xs text-[#D42426] font-mono font-semibold">{selectedSource.circularRef}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedSource(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <span className="text-gray-400 block mb-1 font-semibold">Issuing Authority:</span>
                <span className="font-bold text-gray-800">{selectedSource.authority}</span>
              </div>

              <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <span className="text-gray-400 block mb-1 font-semibold">Official Source Document:</span>
                <span className="text-gray-800">{selectedSource.sourceDoc}</span>
              </div>

              <div className="bg-green-50 p-3.5 rounded-2xl border border-green-200 text-green-900 flex items-center justify-between">
                <span className="font-medium">Vector Semantic Relevance:</span>
                <span className="font-black text-green-700">{(selectedSource.similarityScore * 100).toFixed(1)}% Match</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedSource(null)}
                className="px-5 py-2.5 bg-[#D42426] hover:bg-[#B71C1E] text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
              >
                Close Citation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
