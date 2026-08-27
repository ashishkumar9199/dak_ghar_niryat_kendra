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
  Award,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Download,
  Search,
  Filter,
  ChevronRight,
  AlertTriangle,
  ArrowUpRight,
  Calculator,
  MapPin,
  FileCheck,
  Building,
  Scale,
  Globe2,
  Package
} from 'lucide-react';
import { ChatMessage, ExporterProfile, GroundedSource, SupportedLanguage, KnowledgeChunk } from '../types';
import { DnkLogo } from './DnkLogo';

interface AIAssistantProps {
  profile: ExporterProfile;
  language: SupportedLanguage;
  onOpenRagInspector: () => void;
  onNavigateToWizard?: () => void;
  onNavigateToCalculator?: () => void;
  onNavigateToLocator?: () => void;
  onNavigateToProhibited?: () => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  profile,
  language,
  onOpenRagInspector,
  onNavigateToWizard,
  onNavigateToCalculator,
  onNavigateToLocator,
  onNavigateToProhibited
}) => {
  const isHindi = language === 'HI' || language === 'MAI';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: isHindi
        ? `🙏 नमस्ते! मैं डाक घर निर्यात केंद्र (DNK) का आधिकारिक AI चैटबॉट व वर्चुअल पोस्टल अप्रैज़र हूँ।\n\nमैं भारतीय डाक (India Post SOP), सीमा शुल्क (CBIC Circular 14/2018), विदेश व्यापार नीति (DGFT FTP 2023) और UPU अंतरराष्ट्रीय नियमों पर पूरी तरह प्रशिक्षित हूँ।\n\nआप मुझसे किसी भी विषय पर पूछ सकते हैं:\n• पोस्टल बिल ऑफ एक्सपोर्ट (PBE-I / PBE-II) और सीमा शुल्क फॉर्म (CN22/CN23)\n• प्रतिबंधित व खतरनाक वस्तुएं (लिथियम बैटरी, इत्र, आयुर्वेद, लकड़ी के उत्पाद)\n• देश-विशिष्ट नियम (USA $800 Section 321, EU IOSS, UK VAT, UAE, Australia)\n• GST LUT (RFD-11), AD Code और RoDTEP प्रोत्साहन\n• पैकेजिंग मानक और UPU S10 बारकोड`
        : `🙏 Welcome to the official Dak Ghar Niryat Kendra (DNK) AI Chatbot & Virtual Postal Appraiser.\n\nI am trained on verified India Post SOPs, CBIC Customs Circulars, DGFT Foreign Trade Policy 2023, and Universal Postal Union (UPU) guidelines.\n\nHow can I assist your cross-border export today? You can ask me about:\n• Electronic PBE Filing & Customs Forms (PBE-I vs PBE-II, CN22 vs CN23)\n• Prohibited & Restricted Items (Lithium batteries, perfumes, ayurvedic herbs, wooden art)\n• Destination Country Protocols (USA Section 321 $800, EU IOSS €150, UK £135 VAT, Australia biosecurity)\n• GST LUT Zero-Tax Export, AD Code & RoDTEP Benefits\n• India Post Packaging Standards & UPU S10 Barcodes`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGrounded: true,
      groundedSources: [
        {
          title: 'India Post DGNK Standard Operating Procedure (SOP)',
          sourceDoc: 'DoP Circular No. 27-02/2021-BD&MD / DGNK v2.1',
          circularRef: 'India Post DGNK v2.1',
          authority: 'Department of Posts, Ministry of Communications',
          similarityScore: 0.99,
          matchedKeywords: ['dgnk', 'sop', 'postal export', 'msme']
        },
        {
          title: 'Postal Export (Electronic Declaration & Processing) Regulations 2018',
          sourceDoc: 'CBIC Notfn. No. 48/2018-Customs (N.T.) & Circular 14/2018',
          circularRef: 'CBIC Notfn 48/2018-Customs (N.T.)',
          authority: 'Central Board of Indirect Taxes and Customs (CBIC)',
          similarityScore: 0.96,
          matchedKeywords: ['pbe', 'cbic', 'customs', 'fpo']
        }
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<GroundedSource | null>(null);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showDocLibraryModal, setShowDocLibraryModal] = useState(false);
  const [docCategoryFilter, setDocCategoryFilter] = useState<string>('ALL');
  const [docSearchQuery, setDocSearchQuery] = useState<string>('');
  const [officialDocs, setOfficialDocs] = useState<KnowledgeChunk[]>([]);
  const [activePromptCategory, setActivePromptCategory] = useState<string>('pbe');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Load official documents for the official documents browser
  useEffect(() => {
    fetch('/api/knowledge-base')
      .then(res => res.json())
      .then(data => {
        if (data && data.chunks) {
          setOfficialDocs(data.chunks);
        }
      })
      .catch(err => console.error('Failed to load official docs:', err));
  }, []);

  // Web Speech API Voice Recognition setup
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

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [isHindi]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Please type your question.');
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
        console.error('Speech recognition start error:', e);
      }
    }
  };

  const handleSpeakText = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting symbols for clean audio reading
    const cleanText = text.replace(/[*#`_\[\]()]/g, ' ').substring(0, 500);
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

    // Stop speaking if playing
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

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputQuery('');
    setLoading(true);

    // Prepare multi-turn history payload
    const conversationHistory = newMessages.slice(-6).map(m => ({
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

      if (!response.ok) {
        throw new Error('Failed to get response from DNK Chatbot service.');
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
        text: `We could not complete the query with the live AI engine. Please check your network or refer to the official document library below.\n\n*Official India Post Export Nodal Desk: 1800-266-6868*`,
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

  const handleDownloadTranscript = () => {
    const transcriptText = messages.map(m => {
      const role = m.sender === 'user' ? 'EXPORTER' : 'DNK CHATBOT';
      return `[${m.timestamp}] ${role}:\n${m.text}\n${m.groundedSources ? `Sources: ${m.groundedSources.map(s => s.circularRef).join(', ')}\n` : ''}\n-----------------------------------\n`;
    }).join('\n');

    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DNK_Chatbot_Consultation_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const promptCategories = [
    {
      id: 'pbe',
      name: 'Customs & PBE',
      icon: FileCheck,
      prompts: [
        {
          label: 'PBE-I vs PBE-II Difference',
          query: 'When should an exporter use Form PBE-I (e-commerce) versus Form PBE-II (commercial) under CBIC 14/2018?'
        },
        {
          label: 'CN22 vs CN23 Customs Label',
          query: 'What is the 300 SDR rule deciding between Form CN22 and Form CN23 for international postal parcels?'
        },
        {
          label: 'IEC Code & ₹5 Lakh Exemption',
          query: 'Is an IEC Code mandatory for artisans exporting gifts under ₹5 lakh under DGFT FTP 2023 Para 2.07?'
        }
      ]
    },
    {
      id: 'prohibited',
      name: 'Restrictions & Safety',
      icon: AlertTriangle,
      prompts: [
        {
          label: 'Lithium Battery Rules',
          query: 'Can I send electronics with rechargeable lithium batteries via Speed Post International?'
        },
        {
          label: 'Ayurvedic Products & Tea',
          query: 'What certificates are required to export Ayurvedic herbal formulations and spices to USA and Europe?'
        },
        {
          label: 'Wooden Handicrafts & ASI',
          query: 'What are the rules for wooden art and Non-Antiquity certificates from Archaeological Survey of India (ASI)?'
        }
      ]
    },
    {
      id: 'destinations',
      name: 'Country Protocols',
      icon: Globe2,
      prompts: [
        {
          label: 'USA Section 321 ($800)',
          query: 'How does US CBP Section 321 allow duty-free postal import up to USD $800, and what is US FDA Prior Notice?'
        },
        {
          label: 'EU IOSS (€150 VAT)',
          query: 'How does the EU Import One-Stop Shop (IOSS) work for parcels up to €150 and why is a 6-digit HS code mandatory?'
        },
        {
          label: 'Australia Biosecurity',
          query: 'What are the strict Australian DAFF biosecurity rules for wooden artifacts, spices, and organic crafts?'
        }
      ]
    },
    {
      id: 'tax_financial',
      name: 'Tax, LUT & Incentives',
      icon: Scale,
      prompts: [
        {
          label: 'GST LUT (RFD-11) 0% IGST',
          query: 'How does Form GST RFD-11 Letter of Undertaking (LUT) allow zero-rated export without paying upfront IGST?'
        },
        {
          label: 'AD Code & EDPMS',
          query: 'Why is an Authorized Dealer (AD) Code mandatory for foreign currency payment reconciliation under RBI EDPMS?'
        },
        {
          label: 'RoDTEP & Duty Drawback',
          query: 'Can postal e-commerce exporters claim RoDTEP and Duty Drawback under Chapter 9 of FTP 2023?'
        }
      ]
    },
    {
      id: 'packaging',
      name: 'Packaging & S10',
      icon: Package,
      prompts: [
        {
          label: 'UPU S10 Barcode Standard',
          query: 'Explain the 13-character UPU S10 postal barcode structure (e.g. EE123456789IN for EMS and CP for Air Parcel).'
        },
        {
          label: 'Box Ply & Cushioning Rules',
          query: 'What are India Post packaging guidelines regarding 3-ply/5-ply corrugated cartons and bubble wrap for overseas mail?'
        },
        {
          label: 'Lost Parcel Compensation',
          query: 'What is the compensation limit for lost or damaged international EMS and Air Parcels under UPU SDR rules?'
        }
      ]
    }
  ];

  const activeCategoryObj = promptCategories.find(c => c.id === activePromptCategory) || promptCategories[0];

  // Filter official docs for browser modal
  const filteredDocs = officialDocs.filter(doc => {
    const matchesCategory = docCategoryFilter === 'ALL' || doc.category === docCategoryFilter;
    const matchesSearch = !docSearchQuery || 
      doc.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.circularRef.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.content.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
      doc.keywords.some(k => k.toLowerCase().includes(docSearchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-4 sm:py-6 lg:py-8">
      
      {/* Header Banner: Official DNK AI Chatbot Identity */}
      <div className="bg-[#D42426] rounded-2xl sm:rounded-3xl text-white p-4 sm:p-6 lg:p-7 mb-4 sm:mb-6 shadow-lg relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-[#FFC107] text-[#D42426] font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              Official India Post AI Chatbot
            </span>
            <span className="text-white/95 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Trained on India Post SOP, CBIC & DGFT Rules
            </span>
            <span className="text-amber-200 text-[11px] sm:text-xs font-medium hidden sm:inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              100% Grounded RAG
            </span>
          </div>
          
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
            {isHindi ? 'DNK AI चैटबॉट व पोस्टल अप्रैज़र' : 'DNK AI Chatbot & Virtual Postal Appraiser'}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1.5 leading-relaxed">
            {isHindi
              ? 'भारतीय डाक SOP, सीमा शुल्क परिपत्र (CBIC) और विदेश व्यापार नीति (DGFT) पर प्रशिक्षित आधिकारिक सहायक। निर्यात नियम, PBE, दरें व प्रतिबंध तुरंत जानें।'
              : 'Official conversational assistant trained on India Post SOPs, CBIC customs circulars, DGFT Foreign Trade Policy 2023, and UPU regulations.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 relative z-10 flex-wrap">
          <button
            onClick={() => setShowDocLibraryModal(true)}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white text-[#D42426] hover:bg-amber-50 text-xs font-black transition-all shadow-sm cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#D42426]" />
            <span>Official Rules Library ({officialDocs.length})</span>
          </button>

          <button
            onClick={onOpenRagInspector}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white/15 hover:bg-white/25 text-white text-xs font-black border border-white/30 transition-all shadow-sm cursor-pointer"
            title="Inspect RAG Vector Retrieval & Similarity Scores"
          >
            <Layers className="w-4 h-4 text-[#FFC107]" />
            <span className="hidden sm:inline">Inspect Vectors</span>
          </button>
        </div>

        {/* Decorative background shape */}
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#FFC107] opacity-20 rounded-full pointer-events-none" />
      </div>

      {/* Main Grid: Left Context & Prompts + Right Live Chatbot */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Left Column: Context, Category Switcher & Prompts */}
        <div className="lg:col-span-1 space-y-4">
          
          {/* Active Profile Context Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#D42426]" />
                <span>Exporter Context</span>
              </h3>
              <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <span className="text-gray-400 block font-medium">Business:</span>
                <span className="font-bold text-gray-800">{profile.businessName || 'Artisan Exporter'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Category:</span>
                <span className="font-semibold text-gray-800">{profile.businessCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">IEC Code:</span>
                <span className={`font-semibold ${profile.hasIEC ? 'text-green-700' : 'text-amber-700'}`}>
                  {profile.hasIEC ? (profile.iecCode || 'Registered') : 'Gift Exemption (FTP Para 2.07)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GST LUT:</span>
                <span className={`font-semibold ${profile.hasLUT ? 'text-green-700' : 'text-gray-600'}`}>
                  {profile.hasLUT ? 'RFD-11 Active (0% IGST)' : 'Standard'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Chatbot personalizes customs guidance to your profile.</span>
            </div>
          </div>

          {/* Prompt Categories Tab Selector */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-5 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D42426]" />
              <span>Explore Topics</span>
            </h3>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {promptCategories.map(cat => {
                const CatIcon = cat.icon;
                const isActive = activePromptCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActivePromptCategory(cat.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-[#D42426] text-white shadow-2xs' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <CatIcon className="w-3 h-3" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Prompt Buttons for Selected Category */}
            <div className="space-y-2">
              {activeCategoryObj.prompts.map((sq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(sq.query)}
                  disabled={loading}
                  className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-100 text-xs text-gray-800 transition-all font-medium group cursor-pointer"
                >
                  <div className="font-bold text-gray-900 group-hover:text-[#D42426] mb-0.5 flex items-center justify-between">
                    <span>{sq.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-[#D42426] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-[11px] text-gray-500 line-clamp-1">
                    {sq.query}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Direct Postal Tools */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/60 border border-amber-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-xs text-gray-800 shadow-2xs">
            <div className="flex items-center gap-2 font-bold mb-2 text-[#990B20]">
              <Award className="w-4 h-4 text-[#D42426]" />
              <span>Official Regulatory Accuracy</span>
            </div>
            <p className="text-[11px] text-gray-700 leading-relaxed mb-3">
              Answers are bound directly to CBIC Notifications, India Post SOPs, and UPU rules. Zero hallucinations.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200/60">
              {onNavigateToWizard && (
                <button
                  onClick={onNavigateToWizard}
                  className="p-2 rounded-xl bg-white border border-amber-300 text-[#D42426] font-bold text-[11px] hover:bg-amber-100 flex items-center justify-center gap-1 transition-colors"
                >
                  <FileText className="w-3 h-3" />
                  <span>New PBE</span>
                </button>
              )}
              {onNavigateToCalculator && (
                <button
                  onClick={onNavigateToCalculator}
                  className="p-2 rounded-xl bg-white border border-amber-300 text-gray-800 font-bold text-[11px] hover:bg-amber-100 flex items-center justify-center gap-1 transition-colors"
                >
                  <Calculator className="w-3 h-3 text-amber-700" />
                  <span>Tariffs</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Area: Interactive Conversational Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-sm flex flex-col h-[560px] sm:h-[640px] lg:h-[720px] overflow-hidden">
          
          {/* Chat Window Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#D42426] rounded-full flex items-center justify-center shadow-sm shrink-0 overflow-hidden p-1">
                <DnkLogo variant="emblem" size="xs" isHindi={isHindi} language={language} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-black text-gray-900 leading-tight">DNK AI Chatbot</h4>
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.2 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                    Online
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-0.5">
                  India Post Department of Posts • CBIC & DGFT Rules Engine
                </p>
              </div>
            </div>

            {/* Header Utility Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownloadTranscript}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-xl hover:bg-gray-200/70 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                title="Download Conversation Transcript"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Save Chat</span>
              </button>

              <button
                onClick={() => setMessages([messages[0]])}
                className="p-2 text-gray-500 hover:text-[#D42426] rounded-xl hover:bg-red-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                title="Reset Conversation"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px]">Reset</span>
              </button>
            </div>
          </div>

          {/* Quick Category Chips for Mobile View */}
          <div className="lg:hidden px-3 py-2 bg-amber-50/70 border-b border-amber-200/80 overflow-x-auto flex gap-1.5 no-scrollbar select-none">
            {promptCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActivePromptCategory(cat.id);
                  if (cat.prompts[0]) handleSendMessage(cat.prompts[0].query);
                }}
                disabled={loading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-amber-200 text-[11px] font-bold text-gray-700 hover:bg-amber-100 hover:text-[#C8102E] transition-colors shrink-0 shadow-2xs cursor-pointer"
              >
                ✨ {cat.name}
              </button>
            ))}
          </div>

          {/* Messages Scrollable Container */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSpeaking = isSpeakingId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Bot Avatar */}
                  {!isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#D42426] flex items-center justify-center shrink-0 shadow-sm mt-1 overflow-hidden p-1">
                      <DnkLogo variant="emblem" size="xs" isHindi={isHindi} language={language} />
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div className={`max-w-2xl rounded-2xl ${
                    isUser 
                      ? 'bg-white p-4 rounded-tr-none border border-gray-200 shadow-sm text-gray-800' 
                      : 'bg-[#F4F7FB] p-5 rounded-tl-none border border-blue-100 text-gray-800 shadow-xs'
                  }`}>
                    
                    {/* Message Sub-header */}
                    <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-gray-200/40">
                      <span className={`text-[11px] font-black uppercase tracking-wider ${isUser ? 'text-[#D42426]' : 'text-blue-700'}`}>
                        {isUser ? 'You (Exporter)' : 'DNK Official AI Bot'}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Message Body Content */}
                    <div className="text-sm leading-relaxed whitespace-pre-line text-gray-800 font-normal">
                      {msg.text.replace(/\*\*/g, '')}
                    </div>

                    {/* Official Document Sources (RAG Grounding Citations) */}
                    {!isUser && msg.groundedSources && msg.groundedSources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-blue-200/70">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                            <BookOpen className="w-3 h-3 text-blue-600" />
                            <span>Grounded in Official Guidelines:</span>
                          </div>
                          <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                            Verified Source
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.groundedSources.map((src, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => setSelectedSource(src)}
                              className="text-left p-2.5 rounded-xl bg-white border border-blue-200/80 hover:border-blue-500 hover:shadow-xs transition-all text-xs group cursor-pointer"
                            >
                              <div className="font-bold text-gray-900 group-hover:text-blue-700 line-clamp-1">
                                {src.title}
                              </div>
                              <div className="text-[10px] text-[#D42426] font-mono mt-0.5 line-clamp-1 font-semibold">
                                {src.circularRef}
                              </div>
                              <div className="flex items-center justify-between mt-1 text-[10px] text-gray-500">
                                <span className="truncate max-w-[140px]">{src.authority}</span>
                                <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md shrink-0">
                                  {(src.similarityScore * 100).toFixed(0)}% match
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Message Actions Bar (Copy, TTS Audio Speak, Shortcut to Wizard) */}
                    <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-gray-200/50">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => copyText(msg.text, msg.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
                          title="Copy Answer"
                        >
                          {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        {!isUser && (
                          <button
                            onClick={() => handleSpeakText(msg.text, msg.id)}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isSpeaking ? 'text-[#D42426] font-bold' : 'text-gray-500 hover:text-gray-900'
                            }`}
                            title={isSpeaking ? 'Stop Reading' : 'Listen via Audio'}
                          >
                            {isSpeaking ? <VolumeX className="w-3.5 h-3.5 animate-pulse" /> : <Volume2 className="w-3.5 h-3.5" />}
                            <span>{isSpeaking ? 'Stop' : 'Read'}</span>
                          </button>
                        )}
                      </div>

                      {!isUser && onNavigateToWizard && (
                        <button
                          onClick={onNavigateToWizard}
                          className="text-xs font-bold text-[#D42426] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Apply to PBE</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Exporter Avatar */}
                  {isUser && (
                    <div className="w-8 h-8 rounded-full bg-[#FFC107] border-2 border-white flex items-center justify-center text-[#D42426] font-bold text-xs shadow-sm mt-1 shrink-0">
                      {profile.businessName ? profile.businessName.substring(0, 2).toUpperCase() : 'EX'}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Live Loading Indicator */}
            {loading && (
              <div className="flex gap-3 items-start">
                <div className="w-8 h-8 rounded-full bg-[#D42426] text-[#FFC107] flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-1">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="bg-[#F4F7FB] p-4 rounded-2xl rounded-tl-none border border-blue-100 max-w-md shadow-2xs">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-800 mb-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span>
                    <span>Retrieving official circulars & synthesizing answer...</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2 bg-blue-200/70 rounded animate-pulse w-52" />
                    <div className="h-2 bg-blue-200/70 rounded animate-pulse w-64" />
                    <div className="h-2 bg-blue-200/70 rounded animate-pulse w-36" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Form */}
          <div className="p-3 sm:p-4 border-t border-gray-100 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="relative flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder={
                    isListening
                      ? "Listening to voice input..."
                      : isHindi
                        ? "PBE, सीमा शुल्क, पैकेजिंग या छूट के नियमों के बारे में पूछें..."
                        : "Ask about PBE filing, customs rules, prohibited goods, packaging, USA/EU rules..."
                  }
                  className={`w-full h-12 bg-gray-100 border-none rounded-2xl pl-4 pr-12 text-sm font-medium focus:ring-2 focus:ring-[#D42426] transition-all outline-none ${
                    isListening ? 'ring-2 ring-red-500 bg-red-50' : ''
                  }`}
                />

                {/* Voice Input Mic Button */}
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`absolute right-3 top-2.5 p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isListening 
                      ? 'bg-red-600 text-white animate-pulse' 
                      : 'text-gray-400 hover:text-gray-700 hover:bg-gray-200'
                  }`}
                  title={isListening ? 'Stop listening' : 'Voice input (Speech to Text)'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                className="h-12 px-5 bg-[#D42426] hover:bg-[#B71C1E] disabled:opacity-50 text-white rounded-2xl flex items-center justify-center gap-1.5 font-bold text-sm shadow-md transition-colors cursor-pointer shrink-0"
              >
                <span>Send</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-gray-500 mt-2 px-1 flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                <span>Grounded: India Post SOP • CBIC 14/2018 • DGFT FTP 2023 • UPU S10</span>
              </div>
              
              <button
                type="button"
                onClick={() => setShowDocLibraryModal(true)}
                className="text-[#D42426] hover:underline font-bold flex items-center gap-1"
              >
                <BookOpen className="w-3 h-3" />
                <span>Browse All Official Documents</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Official Documents & Rules Library Modal */}
      {showDocLibraryModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-full p-4 sm:p-6 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-100 text-[#D42426] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-base sm:text-lg">
                    Official India Post, Customs & DGFT Regulatory Library
                  </h3>
                  <p className="text-xs text-gray-500">
                    Governing circulars, standard operating procedures (SOPs), and gazette notifications
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowDocLibraryModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="py-3 flex flex-col sm:flex-row gap-2 border-b border-gray-100">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                  placeholder="Search rules, circular numbers, keywords (e.g. PBE, 48/2018, IEC, 300 SDR)..."
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:ring-2 focus:ring-[#D42426]"
                />
              </div>

              <select
                value={docCategoryFilter}
                onChange={(e) => setDocCategoryFilter(e.target.value)}
                className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-none"
              >
                <option value="ALL">All Categories ({officialDocs.length})</option>
                <option value="dgnk_sop">India Post DGNK SOP</option>
                <option value="customs_cbic">CBIC Customs & PBE</option>
                <option value="dgft_ftp">DGFT Foreign Trade Policy</option>
                <option value="packaging_upu">UPU Standards & Packaging</option>
                <option value="country_rules">Country Guidelines</option>
                <option value="prohibited_items">Prohibited & Restricted</option>
                <option value="tax_financial">GST LUT & Finance</option>
                <option value="statutory_acts">Statutory Acts</option>
              </select>
            </div>

            {/* Document Cards List */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-1">
              {filteredDocs.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-xs">
                  No official documents match your search filter.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-red-300 transition-all text-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <h4 className="font-black text-gray-900 text-sm">{doc.title}</h4>
                      <span className="text-[10px] font-mono font-bold text-[#D42426] bg-red-50 px-2 py-0.5 rounded-md border border-red-100 w-fit">
                        {doc.circularRef}
                      </span>
                    </div>

                    <div className="text-gray-500 text-[11px] mb-2">
                      <span className="font-semibold text-gray-700">Authority:</span> {doc.authority} • <span className="font-semibold text-gray-700">Source:</span> {doc.sourceDoc}
                    </div>

                    <p className="text-gray-700 leading-relaxed whitespace-pre-line bg-white p-3 rounded-xl border border-gray-100">
                      {doc.content}
                    </p>

                    {doc.summaryBulletPoints && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {doc.summaryBulletPoints.map((pt, pIdx) => (
                          <span key={pIdx} className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md">
                            ✓ {pt}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 pt-2 border-t border-gray-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-1 flex-wrap">
                        {doc.keywords.slice(0, 5).map((kw, kIdx) => (
                          <span key={kIdx} className="bg-gray-200 text-gray-700 text-[9px] font-semibold px-1.5 py-0.2 rounded">
                            #{kw}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setShowDocLibraryModal(false);
                          handleSendMessage(`Explain the official rules for: ${doc.title}`);
                        }}
                        className="text-[#D42426] font-bold text-xs hover:underline flex items-center gap-1"
                      >
                        <span>Ask Chatbot about this</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-[11px] text-gray-500">
                Source: Department of Posts, Ministry of Communications & CBIC
              </span>
              <button
                onClick={() => setShowDocLibraryModal(false)}
                className="px-5 py-2 bg-[#D42426] hover:bg-[#B71C1E] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Close Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Citation Preview Modal */}
      {selectedSource && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
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
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-bold cursor-pointer"
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
                className="px-5 py-2.5 bg-[#D42426] hover:bg-[#B71C1E] text-white rounded-xl text-xs font-bold transition-colors shadow-sm cursor-pointer"
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
