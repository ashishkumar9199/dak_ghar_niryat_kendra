import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  ShieldCheck, 
  X, 
  Minimize2, 
  Maximize2, 
  Bot, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  FileCheck,
  AlertTriangle,
  Globe2,
  Scale,
  Package,
  Layers,
  MessageSquare
} from 'lucide-react';
import { ChatMessage, ExporterProfile, GroundedSource, SupportedLanguage } from '../types';
import { DnkLogo } from './DnkLogo';

interface FloatingAIChatWidgetProps {
  profile: ExporterProfile;
  language: SupportedLanguage;
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenRagInspector: () => void;
}

export const FloatingAIChatWidget: React.FC<FloatingAIChatWidgetProps> = ({
  profile,
  language,
  currentTab,
  onNavigate,
  onOpenRagInspector
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasNewBadge, setHasNewBadge] = useState(true);
  const isHindi = language === 'HI' || language === 'MAI';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-float-msg',
      sender: 'assistant',
      text: isHindi
        ? `🙏 नमस्ते! मैं डाक घर निर्यात केंद्र (DNK) AI चैटबॉट हूँ।\n\nमैं भारतीय डाक SOP, CBIC सीमा शुल्क, DGFT FTP 2023 और UPU नियमों पर प्रशिक्षित हूँ। PBE, दरें, पैकेजिंग या देश नियमों पर कभी भी पूछें!`
        : `🙏 Hello! I am the DNK AI Chatbot & Postal Appraiser.\n\nTrained on official India Post SOPs, CBIC customs circulars & DGFT FTP 2023. How can I assist your shipment today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGrounded: true,
      groundedSources: [
        {
          title: 'India Post DGNK SOP & CBIC 14/2018',
          sourceDoc: 'DoP Circular 27-02/2021-BD&MD / CBIC Notfn 48/2018',
          circularRef: 'DGNK SOP v2.1',
          authority: 'Department of Posts & CBIC',
          similarityScore: 0.98,
          matchedKeywords: ['dgnk', 'pbe', 'customs']
        }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'pbe' | 'prohibited' | 'destinations' | 'tax'>('pbe');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized, loading]);

  // Voice speech-to-text setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = isHindi ? 'hi-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputQuery(transcript);
        }
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [isHindi]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error('Speech recognition error:', e);
      }
    }
  };

  const handleSpeakText = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_\[\]()]/g, ' ').substring(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = isHindi ? 'hi-IN' : 'en-IN';
    utterance.rate = 1.0;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
    }

    const userMessageId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputQuery('');
    setLoading(true);

    const conversationHistory = updated.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      text: m.text
    }));

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          history: conversationHistory,
          userProfile: {
            businessType: profile.businessCategory,
            productCategory: profile.businessCategory,
            hasIEC: profile.hasIEC,
            hasGST: profile.hasGST,
            destinationCountry: 'International'
          }
        })
      });

      if (!response.ok) throw new Error('Chat API response failed');
      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        groundedSources: data.groundedSources,
        isAiGrounded: data.isAiGrounded
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Widget chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: `As per official India Post DGNK SOP & CBIC Circular 14/2018, export consignments up to ₹10 Lakhs are processed via Electronic Postal Bill of Export (PBE-I/PBE-II).\n\nFor personalized query clearance, dial the India Post Exporter Desk: 1800-266-6868.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const quickPrompts = {
    pbe: [
      'What is the difference between PBE-I and PBE-II?',
      'When is Form CN23 required instead of CN22 (300 SDR rule)?',
      'Is an IEC code required for personal gifts under ₹5 Lakh?'
    ],
    prohibited: [
      'Can I export electronics with lithium batteries by post?',
      'What certificates are needed for Ayurvedic herbal products?',
      'Are wooden handicrafts allowed to USA/Europe?'
    ],
    destinations: [
      'How does the US CBP $800 Section 321 exemption work?',
      'What is EU IOSS VAT scheme for parcels under €150?',
      'What are Australia biosecurity rules for organic crafts?'
    ],
    tax: [
      'How to export with 0% GST using Form RFD-11 LUT?',
      'Why is an AD Code required for RBI EDPMS remittance?',
      'Can I claim RoDTEP on DGNK e-commerce parcels?'
    ]
  };

  // If user is currently on the full-page assistant tab and widget is open, we can still show floating or let them toggle
  return (
    <div className="fixed bottom-20 md:bottom-6 right-3 sm:right-6 z-50 flex flex-col items-end pointer-events-none select-none">
      
      {/* Floating Chat Popup Window */}
      {isOpen && !isMinimized && (
        <div className="pointer-events-auto mb-3 w-[360px] sm:w-[410px] max-w-[calc(100vw-1.5rem)] h-[520px] sm:h-[580px] max-h-[calc(100vh-7.5rem)] bg-white rounded-3xl shadow-2xl border border-red-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Widget Header: India Post Red */}
          <div className="bg-[#D42426] text-white p-3.5 sm:p-4 flex items-center justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-2xs overflow-hidden p-0.5">
                <DnkLogo variant="emblem" size="xs" isHindi={isHindi} language={language} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-black text-xs sm:text-sm tracking-tight">DNK AI Chatbot</h3>
                  <span className="bg-[#FFC107] text-[#D42426] text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase">
                    Official
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-200 font-medium">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Trained on India Post & CBIC Rules</span>
                </div>
              </div>
            </div>

            {/* Header Controls: Expand to full tab, Minimize, Close */}
            <div className="flex items-center gap-1 relative z-10">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onNavigate('assistant');
                }}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                title="Expand to Full Assistant View"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                title="Minimize"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors cursor-pointer"
                title="Close Chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#FFC107] opacity-20 rounded-full pointer-events-none" />
          </div>

          {/* Category Tabs Strip */}
          <div className="bg-gray-50 border-b border-gray-200 px-3 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar text-[10px] font-bold">
            <button
              onClick={() => setActiveCategory('pbe')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeCategory === 'pbe' ? 'bg-[#D42426] text-white shadow-2xs' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <FileCheck className="w-2.5 h-2.5" />
              <span>Customs & PBE</span>
            </button>
            <button
              onClick={() => setActiveCategory('prohibited')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeCategory === 'prohibited' ? 'bg-[#D42426] text-white shadow-2xs' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <AlertTriangle className="w-2.5 h-2.5" />
              <span>Prohibited</span>
            </button>
            <button
              onClick={() => setActiveCategory('destinations')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeCategory === 'destinations' ? 'bg-[#D42426] text-white shadow-2xs' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Globe2 className="w-2.5 h-2.5" />
              <span>USA/EU</span>
            </button>
            <button
              onClick={() => setActiveCategory('tax')}
              className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                activeCategory === 'tax' ? 'bg-[#D42426] text-white shadow-2xs' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <Scale className="w-2.5 h-2.5" />
              <span>GST & LUT</span>
            </button>
          </div>

          {/* Quick Questions Accordion */}
          <div className="bg-amber-50/70 border-b border-amber-200/60 p-2 text-xs flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts[activeCategory].map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendMessage(prompt)}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 bg-white border border-amber-200 hover:border-amber-400 text-gray-800 text-[11px] font-medium rounded-full shadow-2xs hover:bg-amber-100 transition-colors cursor-pointer"
              >
                💡 {prompt}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-[#FAFAFA] text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = isSpeakingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#D42426] flex items-center justify-center shrink-0 mt-0.5 shadow-2xs overflow-hidden p-0.5">
                      <DnkLogo variant="emblem" size="xs" isHindi={isHindi} language={language} />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3 ${
                    isUser 
                      ? 'bg-white text-gray-800 rounded-tr-none border border-gray-200 shadow-2xs' 
                      : 'bg-[#F4F7FB] text-gray-800 rounded-tl-none border border-blue-100 shadow-2xs'
                  }`}>
                    <div className="flex items-center justify-between gap-2 mb-1 text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>{isUser ? 'Exporter' : 'DNK Appraiser'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="whitespace-pre-line leading-relaxed text-gray-800">
                      {msg.text.replace(/\*\*/g, '')}
                    </p>

                    {/* Official Citations */}
                    {!isUser && msg.groundedSources && msg.groundedSources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-blue-200/60 text-[10px]">
                        <div className="flex items-center gap-1 text-blue-700 font-bold mb-1">
                          <BookOpen className="w-2.5 h-2.5" />
                          <span>Official Reference:</span>
                        </div>
                        <div className="bg-white p-1.5 rounded-lg border border-blue-100 text-gray-600 font-medium">
                          <span className="font-bold text-[#D42426]">{msg.groundedSources[0].circularRef}</span> • {msg.groundedSources[0].authority}
                        </div>
                      </div>
                    )}

                    {/* Quick message tool actions */}
                    <div className="mt-2 pt-1 border-t border-gray-200/40 flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-2 text-gray-500">
                        <button
                          onClick={() => copyText(msg.text, msg.id)}
                          className="hover:text-gray-900 transition-colors flex items-center gap-0.5 cursor-pointer"
                          title="Copy text"
                        >
                          {copiedId === msg.id ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        {!isUser && (
                          <button
                            onClick={() => handleSpeakText(msg.text, msg.id)}
                            className="hover:text-gray-900 transition-colors flex items-center gap-0.5 cursor-pointer"
                            title="Read audio"
                          >
                            {isSpeaking ? <VolumeX className="w-3 h-3 text-[#D42426]" /> : <Volume2 className="w-3 h-3" />}
                            <span>{isSpeaking ? 'Stop' : 'Audio'}</span>
                          </button>
                        )}
                      </div>

                      {!isUser && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onNavigate('wizard');
                          }}
                          className="text-[#D42426] font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                        >
                          <span>Open Wizard</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-full bg-[#FFC107] text-[#D42426] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-2xs">
                      {profile.businessName ? profile.businessName[0].toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex gap-2 items-center text-xs text-blue-700 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span className="font-semibold text-[11px]">Consulting CBIC & India Post Rules...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Box */}
          <div className="p-2.5 sm:p-3 bg-white border-t border-gray-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    isListening
                      ? "Listening..."
                      : isHindi
                        ? "PBE, सीमा शुल्क या छूट के नियम पूछें..."
                        : "Ask about PBE, customs rules, tariffs..."
                  }
                  className={`w-full h-9 bg-gray-100 border-none rounded-xl pl-3 pr-8 text-xs font-medium focus:ring-2 focus:ring-[#D42426] transition-all outline-none ${
                    isListening ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />

                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`absolute right-2 top-2 p-0.5 rounded transition-colors cursor-pointer ${
                    isListening ? 'text-red-600 animate-pulse' : 'text-gray-400 hover:text-gray-700'
                  }`}
                  title="Voice Input"
                >
                  {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="h-9 px-3.5 bg-[#D42426] hover:bg-[#B71C1E] disabled:opacity-50 text-white rounded-xl flex items-center justify-center font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[9px] text-gray-400 mt-1.5 px-1">
              <span>Grounded in CBIC 14/2018 & UPU</span>
              <button
                onClick={onOpenRagInspector}
                className="text-blue-600 hover:underline font-semibold flex items-center gap-0.5"
              >
                <Layers className="w-2.5 h-2.5" />
                <span>Inspect RAG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Pill state */}
      {isOpen && isMinimized && (
        <div className="pointer-events-auto mb-3 bg-[#D42426] text-white px-3.5 py-2 rounded-2xl shadow-xl border border-amber-300 flex items-center gap-2 cursor-pointer hover:bg-[#B71C1E] transition-all animate-in fade-in duration-150"
          onClick={() => setIsMinimized(false)}
        >
          <div className="w-6 h-6 rounded-full bg-[#FFC107] flex items-center justify-center overflow-hidden p-0.5">
            <DnkLogo variant="emblem" size="xs" isHindi={isHindi} language={language} />
          </div>
          <div className="text-left">
            <div className="text-xs font-black leading-tight">DNK AI Chatbot</div>
            <div className="text-[9px] text-amber-200 font-medium">Click to resume conversation</div>
          </div>
          <ChevronDown className="w-4 h-4 ml-1 transform rotate-180" />
        </div>
      )}

      {/* Bottom-Right Floating Action Button (FAB) */}
      <div className="pointer-events-auto relative group">
        
        {/* Subtle greeting teaser chip (when closed) */}
        {!isOpen && (
          <div 
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setHasNewBadge(false);
            }}
            className="absolute bottom-1.5 right-16 sm:right-18 whitespace-nowrap bg-white text-gray-900 px-3.5 py-2 rounded-2xl shadow-lg border border-red-200 flex items-center gap-2 hover:border-[#D42426] transition-all cursor-pointer opacity-0 pointer-events-none translate-x-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0 duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
            <div className="text-left">
              <span className="text-[11px] font-black text-[#D42426] block leading-tight">
                {isHindi ? 'DNK AI से पूछें' : 'Ask DNK AI Chatbot'}
              </span>
              <span className="text-[9px] text-gray-500 block">
                {isHindi ? 'PBE, दरें व सीमा शुल्क नियम' : 'Postal Appraiser & Rules Guide'}
              </span>
            </div>
            <span className="text-xs">✨</span>
          </div>
        )}

        {/* Main Launcher Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setIsMinimized(false);
            setHasNewBadge(false);
          }}
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 cursor-pointer relative ${
            isOpen
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gradient-to-tr from-[#B71C1E] via-[#D42426] to-[#E53935] text-white ring-4 ring-[#FFC107]/40'
          }`}
          title={isOpen ? "Close DNK AI Chatbot" : "Open DNK AI Chatbot"}
          aria-label="Toggle DNK AI Chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <DnkLogo variant="emblem" size="md" isHindi={isHindi} language={language} className="p-1 animate-pulse" />
              
              {/* Unread / Online badge */}
              {hasNewBadge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC107] text-[#D42426] text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-bounce">
                  1
                </span>
              )}
            </>
          )}
        </button>
      </div>

    </div>
  );
};
