import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu,
  X,
  Package, 
  Sparkles, 
  Calculator, 
  MapPin, 
  Search, 
  BookOpen, 
  Building2, 
  PhoneCall, 
  Layers,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Globe,
  FileCheck,
  Truck,
  HelpCircle,
  Award,
  ExternalLink,
  Zap,
  Info,
  Wallet,
  Upload,
  Radio,
  FileSpreadsheet,
  ChevronDown,
  Check
} from 'lucide-react';
import { ExporterProfile, SupportedLanguage } from '../types';
import { NoticeTicker } from './NoticeTicker';
import { DnkLogo } from './DnkLogo';
import { SUPPORTED_LANGUAGES, translations } from '../utils/translations';

interface NavbarProps {
  currentTab?: string;
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  setActiveTab?: (tab: string) => void;
  language: SupportedLanguage;
  setLanguage?: (lang: SupportedLanguage) => void;
  onToggleLanguage?: () => void;
  profile: ExporterProfile;
  onOpenProfile: () => void;
  onOpenRagInspector: () => void;
  onOpenWallet?: () => void;
  onOpenBulkUpload?: () => void;
}

interface PageItem {
  id: string;
  titles: Record<SupportedLanguage, string>;
  descs: Record<SupportedLanguage, string>;
  badge?: string;
  badgeColor?: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  category: 'core' | 'tools' | 'resources';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  activeTab,
  onNavigate,
  setActiveTab,
  language,
  setLanguage,
  onToggleLanguage,
  profile,
  onOpenProfile,
  onOpenRagInspector,
  onOpenWallet,
  onOpenBulkUpload,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [fontSizeClass, setFontSizeClass] = useState<'normal' | 'large' | 'small'>('normal');
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[language] || translations.EN;
  const isHindi = language === 'HI' || language === 'MAI';
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const active = currentTab || activeTab || 'dashboard';

  const handleNav = (tab: string) => {
    if (onNavigate) onNavigate(tab);
    else if (setActiveTab) setActiveTab(tab);
    setIsMenuOpen(false);
  };

  const handleSelectLang = (code: SupportedLanguage) => {
    if (setLanguage) {
      setLanguage(code);
    }
    setIsLangDropdownOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const walletAmount = profile.walletBalance ?? 18450;

  // Accessibility font resizing handler
  const handleFontSizeChange = (size: 'small' | 'normal' | 'large') => {
    setFontSizeClass(size);
    if (size === 'large') {
      document.documentElement.style.fontSize = '17px';
    } else if (size === 'small') {
      document.documentElement.style.fontSize = '14px';
    } else {
      document.documentElement.style.fontSize = '15px';
    }
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLangDropdownOpen) setIsLangDropdownOpen(false);
        if (isMenuOpen) setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isLangDropdownOpen]);

  // Lock body scroll when mega drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // All pages of the website catalogued for the 3-line menu drawer
  const allPages: PageItem[] = [
    {
      id: 'dashboard',
      titles: {
        EN: 'DNK Customer Dashboard',
        HI: 'DNK ग्राहक डैशबोर्ड व मुख्य पृष्ठ',
        KN: 'DNK ಗ್ರಾಹಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
        TA: 'DNK வாடிக்கையாளர் டாஷ்போர்டு',
        ML: 'DNK കസ്റ്റമർ ഡാഷ്‌ബോർഡ്',
        PA: 'DNK ਗਾਹਕ ਡੈਸ਼ਬੋਰਡ',
        TE: 'DNK కస్టమర్ డాష్‌బోర్డ్',
        GU: 'DNK ગ્રાહક ડેશબોર્ડ',
        MAI: 'DNK ग्राहक डैशबोर्ड आ मुख्य पृष्ठ',
        FR: 'Tableau de bord client DNK'
      },
      descs: {
        EN: 'Consignment analytics, RoDTEP incentives & live export pipeline',
        HI: 'पार्सल सांख्यिकी, RoDTEP प्रोत्साहन और सक्रिय निर्यात स्थिति',
        KN: 'ಪಾರ್ಸಲ್ ಅಂಕಿಅಂಶಗಳು ಮತ್ತು ಸಕ್ರಿಯ ರಫ್ತು ಸ್ಥಿತಿ',
        TA: 'பார்சல் புள்ளிவிவரங்கள் & நேரலை ஏற்றுமதி நிலை',
        ML: 'പാർസൽ വിശകലനങ്ങളും സജീവ കയറ്റുമതി നിലയും',
        PA: 'ਪਾਰਸਲ ਵਿਸ਼ਲੇਸ਼ਣ ਅਤੇ ਲਾਈਵ ਨਿਰਯਾਤ ਸਥਿਤੀ',
        TE: 'పార్శిల్ విశ్లేషణలు మరియు ప్రత్యక్ష ఎగుమతి స్థితి',
        GU: 'પાર્સલ વિશ્લેષણ અને લાઈવ નિકાસ સ્થિતિ',
        MAI: 'पार्सल सांख्यिकी आ सक्रिय निर्यात स्थिति',
        FR: 'Analyses des envois, incitations RoDTEP et suivi des exportations'
      },
      badge: 'Main Portal',
      badgeColor: 'bg-red-100 text-[#C8102E]',
      icon: Building2,
      color: 'text-[#C8102E]',
      bgLight: 'bg-red-50 hover:bg-red-100/80 border-red-200',
      category: 'core'
    },
    {
      id: 'assistant',
      titles: {
        EN: 'AI Customs Compliance Assistant',
        HI: 'AI निर्यात व सीमा शुल्क सहायक',
        KN: 'AI ಕಸ್ಟಮ್ಸ್ ಅನುಸರಣೆ ಸಹಾಯಕ',
        TA: 'AI சுங்க இணக்க உதவியாளர்',
        ML: 'AI കസ്റ്റംസ് കംപ്ലയൻസ് അസിസ്റ്റന്റ്',
        PA: 'AI ਕਸਟਮਜ਼ ਪਾਲਣਾ ਸਹਾਇਕ',
        TE: 'AI కస్టమ్స్ సమ్మతి సహాయకుడు',
        GU: 'AI કસ્ટમ્સ પાલન સહાયક',
        MAI: 'AI निर्यात आ सीमा शुल्क सहायक',
        FR: 'Assistant IA conformité douanière'
      },
      descs: {
        EN: '100% verified regulatory advice grounded in CBIC, DGFT FTP 2023 & UPU laws',
        HI: 'CBIC 14/2018, DGFT और UPU नियमों पर सत्यापित सटीक कानूनी सहायता',
        KN: 'CBIC, DGFT ಮತ್ತು UPU ನಿಯಮಗಳ ಆಧಾರದ ಮೇಲೆ ಪರಿಶೀಲಿಸಿದ ಕಾನೂನು ಸಲಹೆ',
        TA: 'CBIC, DGFT மற்றும் UPU விதிகளின் அடிப்படையில் சரிபார்க்கப்பட்ட சட்ட ஆலோசனை',
        ML: 'CBIC, DGFT, UPU നിയമങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള പരിശോധിച്ചുറപ്പിച്ച നിയമോപദേശം',
        PA: 'CBIC, DGFT ਅਤੇ UPU ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਪ੍ਰਮਾਣਿਤ ਕਾਨੂੰਨੀ ਸਲਾਹ',
        TE: 'CBIC, DGFT మరియు UPU నిబంధనల ఆధారంగా ధృవీకరించిన న్యాయ సలహా',
        GU: 'CBIC, DGFT અને UPU નિયમો પર આધારિત પ્રમાણિત કાનૂની સલાહ',
        MAI: 'CBIC, DGFT आ UPU नियम पर आधारित प्रमाणित कानूनी सहायता',
        FR: 'Conseils réglementaires 100% vérifiés basés sur les lois CBIC, DGFT et UPU'
      },
      badge: 'RAG Grounded',
      badgeColor: 'bg-[#FFC107] text-[#8B6E00]',
      icon: Sparkles,
      color: 'text-[#C8102E]',
      bgLight: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200',
      category: 'core'
    },
    {
      id: 'wizard',
      titles: {
        EN: 'Digital Postal Bill of Export (PBE-III & PBE-IV)',
        HI: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट विज़ार्ड',
        KN: 'ಡಿಜಿಟಲ್ ಪೋಸ್ಟಲ್ ಬಿಲ್ ಆಫ್ ಎಕ್ಸ್‌ಪೋರ್ಟ್ (PBE)',
        TA: 'டிஜிட்டல் அஞ்சல் ஏற்றுமதி பில் (PBE)',
        ML: 'ഡിജിറ്റൽ പോസ്റ്റൽ ബിൽ ഓഫ് എക്സ്പോർട്ട് (PBE)',
        PA: 'ਡਿਜੀਟਲ ਪੋਸਟਲ ਬਿੱਲ ਆਫ਼ ਐਕਸਪੋਰਟ (PBE)',
        TE: 'డిజిటల్ పోస్టల్ బిల్ ఆఫ్ ఎక్స్‌పోర్ట్ (PBE)',
        GU: 'ડિજિટલ પોસ્ટલ બિલ ઓફ એક્સપોર્ટ (PBE)',
        MAI: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट विज़ार्ड',
        FR: 'Bordereau d\'exportation postale numérique (PBE)'
      },
      descs: {
        EN: 'Auto-generates PBE-III (e-Commerce), PBE-IV (Commercial), CN23 & S10 franking barcode',
        HI: 'PBE-III (ई-कॉमर्स), PBE-IV (वाणिज्यिक), CN23 कस्टम्स और S10 बारकोड जनरेटर',
        KN: 'PBE-III (ಇ-ಕಾಮರ್ಸ್), PBE-IV ಮತ್ತು CN23 ಕಸ್ಟಮ್ಸ್ ಘೋಷಣೆ ತಯಾರಿಕೆ',
        TA: 'PBE-III (இ-காமர்ஸ்), PBE-IV மற்றும் CN23 சுங்க அறிவிப்பு தயாரிப்பு',
        ML: 'PBE-III (ഇ-കൊമേഴ്സ്), PBE-IV, CN23 കസ്റ്റംസ് ഡിക്ലറേഷൻ തയ്യാറാക്കൽ',
        PA: 'PBE-III (ਈ-ਕਾਮਰਸ), PBE-IV ਅਤੇ CN23 ਕਸਟਮ ਡਿਕਲੇਰੇਸ਼ਨ ਜਨਰੇਟਰ',
        TE: 'PBE-III (ఇ-కామర్స్), PBE-IV మరియు CN23 కస్టమ్స్ డిక్లరేషన్ తయారీ',
        GU: 'PBE-III (ઈ-કોમર્સ), PBE-IV અને CN23 કસ્ટમ્સ ઘોષણા જનરેટર',
        MAI: 'PBE-III (ई-कॉमर्स), PBE-IV (वाणिज्यिक) आ CN23 जनरेटर',
        FR: 'Génération automatique PBE-III, PBE-IV, étiquettes CN23 et codes-barres S10'
      },
      badge: 'CBIC 48/2018',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Package,
      color: 'text-emerald-700',
      bgLight: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200',
      category: 'core'
    },
    {
      id: 'calculator',
      titles: {
        EN: 'Postal Tariff & RoDTEP Rate Estimator',
        HI: 'डाक दरें व RoDTEP गणना कैलकुलेटर',
        KN: 'ಅಂಚೆ ದರಗಳು & RoDTEP ಕ್ಯಾಲ್ಕುಲೇಟರ್',
        TA: 'அஞ்சல் கட்டணம் & RoDTEP கால்குலேட்டர்',
        ML: 'തപാൽ നിരക്കുകളും RoDTEP കാൽക്കുലേറ്ററും',
        PA: 'ਡਾਕ ਦਰਾਂ ਅਤੇ RoDTEP ਕੈਲਕੁਲੇਟਰ',
        TE: 'తపాలా ఛార్జీలు & RoDTEP కాలిక్యులేటర్',
        GU: 'ટપાલ દરો અને RoDTEP કેલ્ક્યુલેટર',
        MAI: 'डाक दर आ RoDTEP कैलकुलेटर',
        FR: 'Frais de port & estimateur RoDTEP'
      },
      descs: {
        EN: 'Compare EMS, ITPS & Air Parcel rates across 219+ UPU countries with export incentives',
        HI: '219+ देशों के लिए स्पीड पोस्ट, ITPS और एयर पार्सल की आधिकारिक डाक दरें',
        KN: '219+ ದೇಶಗಳಿಗೆ Speed Post, ITPS ಮತ್ತು Air Parcel ದರಗಳನ್ನು ಹೋಲಿಸಿ',
        TA: '219+ நாடுகளுக்கு Speed Post, ITPS மற்றும் Air Parcel கட்டணங்களை ஒப்பிடுக',
        ML: '219+ രാജ്യങ്ങളിലേക്ക് Speed Post, ITPS, Air Parcel നിരക്കുകൾ താരതമ്യം ചെയ്യുക',
        PA: '219+ ਦੇਸ਼ਾਂ ਲਈ EMS, ITPS ਅਤੇ Air Parcel ਦਰਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ',
        TE: '219+ దేశాలకు EMS, ITPS మరియు Air Parcel ఛార్జీలను సరిపోల్చండి',
        GU: '219+ દેશો માટે EMS, ITPS અને Air Parcel દરોની સરખામણી કરો',
        MAI: '219+ देशक हेतु स्पीड पोस्ट, ITPS आ एयर पार्सलक डाक दर',
        FR: 'Comparez les tarifs EMS, ITPS et Colis Aérien vers 219+ pays UPU'
      },
      badge: '219+ Countries',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: Calculator,
      color: 'text-blue-700',
      bgLight: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200',
      category: 'tools'
    },
    {
      id: 'tracker',
      titles: {
        EN: 'Consignment Track & Trace (UPU S10 EDI)',
        HI: 'अंतरराष्ट्रीय पार्सल ट्रैकिंग व ट्रेस',
        KN: 'ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕ್ & ಟ್ರೇಸ್ (UPU S10)',
        TA: 'பார்சல் கண்காணிப்பு (UPU S10)',
        ML: 'പാർസൽ ട്രാക്ക് & ട്രെയ്സ് (UPU S10)',
        PA: 'ਪਾਰਸਲ ਟ੍ਰੈਕ ਅਤੇ ਟ੍ਰੇਸ (UPU S10)',
        TE: 'పార్శిల్ ట్రాక్ & ట్రేస్ (UPU S10)',
        GU: 'પાર્સલ ટ્રેક અને ટ્રેસ (UPU S10)',
        MAI: 'अंतरराष्ट्रीय पार्सल ट्रैकिंग व ट्रेस',
        FR: 'Suivi et traçabilité des envois (UPU S10)'
      },
      descs: {
        EN: 'Real-time Foreign Post Office (FPO) customs clearance & international dispatch tracker',
        HI: 'FPO कस्टम्स क्लीयरेंस और गंतव्य देश डिलीवरी की लाइव स्थिति',
        KN: 'FPO ಕಸ್ಟಮ್ಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಮತ್ತು ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿತರಣೆಯ ಲೈವ್ ಸ್ಥಿತಿ',
        TA: 'FPO சுங்க அனுமதி மற்றும் சர்வதேச விநியோகத்தின் நேரலை நிலை',
        ML: 'FPO കസ്റ്റംസ് ക്ലിയറൻസും അന്താരാഷ്ട്ര വിതരണ നിലയും തത്സമയം',
        PA: 'FPO ਕਸਟਮਜ਼ ਕਲੀਅਰੈਂਸ ਅਤੇ ਅੰਤਰਰਾਸ਼ਟਰੀ ਡਿਲੀਵਰੀ ਦੀ ਲਾਈਵ ਸਥਿਤੀ',
        TE: 'FPO కస్టమ్స్ క్లియరెన్స్ మరియు అంతర్జాతీయ డెలివరీ ప్రత్యక్ష స్థితి',
        GU: 'FPO કસ્ટમ્સ ક્લિયરન્સ અને આંતરરાષ્ટ્રીય ડિલિવરીની લાઈવ સ્થિતિ',
        MAI: 'FPO कस्टम्स क्लीयरेंस आ अंतरराष्ट्रीय डिलीवरीक लाइव स्थिति',
        FR: 'Dédouanement FPO en direct et statut d\'acheminement international'
      },
      badge: 'ICES Live',
      badgeColor: 'bg-purple-100 text-purple-800',
      icon: Search,
      color: 'text-purple-700',
      bgLight: 'bg-purple-50 hover:bg-purple-100/80 border-purple-200',
      category: 'tools'
    },
    {
      id: 'prohibited',
      titles: {
        EN: 'Prohibited & Restricted Goods Screener',
        HI: 'प्रतिबंधित व नियंत्रित वस्तु जांच',
        KN: 'ನಿಷೇಧಿತ ಮತ್ತು ನಿರ್ಬಂಧಿತ ಸರಕುಗಳ ಪರೀಕ್ಷಕ',
        TA: 'தடைசெய்யப்பட்ட & கட்டுப்படுத்தப்பட்ட பொருட்கள் சோதனை',
        ML: 'നിരോധിത & നിയന്ത്രിത സാധനങ്ങളുടെ പരിശോധന',
        PA: 'ਪਾਬੰਦੀਸ਼ੁਦਾ ਅਤੇ ਸੀਮਤ ਵਸਤਾਂ ਦੀ ਜਾਂਚ',
        TE: 'నిషేధిత & నియంత్రిత వస్తువుల తనిఖీ',
        GU: 'પ્રતિબંધિત અને નિયંત્રિત વસ્તુઓની ચકાસણી',
        MAI: 'प्रतिबंधित आ नियंत्रित वस्तु जांच',
        FR: 'Vérificateur d\'articles interdits et réglementés'
      },
      descs: {
        EN: 'AI & rule-based compliance check for dangerous goods, ICAO aviation & wildlife bans',
        HI: 'विमानन सुरक्षा, खतरनाक सामग्री (DG) और प्रतिबंधित वस्तुओं की त्वरित जांच',
        KN: 'ಅಪಾಯಕಾರಿ ವಸ್ತುಗಳು ಮತ್ತು ವನ್ಯಜೀವಿ ನಿಷೇಧಗಳಿಗಾಗಿ ಅನುಸರಣೆ ಪರಿಶೀಲನೆ',
        TA: 'அபாயகரமான பொருட்கள் மற்றும் வனவிலங்கு தடைகளுக்கான இணக்க சோதனை',
        ML: 'അപകടകരമായ വസ്തുക്കളും വന്യജീവി നിരോധനങ്ങളും പരിശോധിക്കുക',
        PA: 'ਖਤਰਨਾਕ ਸਮੱਗਰੀ ਅਤੇ ਜੰਗਲੀ ਜੀਵ ਪਾਬੰਦੀਆਂ ਦੀ ਤੁਰੰਤ ਜਾਂਚ',
        TE: 'ప్రమాదకరమైన వస్తువులు మరియు వన్యప్రాణుల నిషేధాల సమ్మతి తనిఖీ',
        GU: 'જોખમી સામગ્રી અને વન્યજીવ પ્રતિબંધો માટે પાલન ચકાસણી',
        MAI: 'खतरनाक सामग्री आ वन्यजीव प्रतिबंध केर त्वरित जांच',
        FR: 'Contrôle de conformité pour matières dangereuses et articles réglementés ICAO'
      },
      badge: 'Safety Check',
      badgeColor: 'bg-rose-100 text-rose-800',
      icon: ShieldCheck,
      color: 'text-rose-700',
      bgLight: 'bg-rose-50 hover:bg-rose-100/80 border-rose-200',
      category: 'tools'
    },
    {
      id: 'locator',
      titles: {
        EN: 'Find Nearest DGNK Post Office',
        HI: 'निकटतम DGNK डाकघर खोजें',
        KN: 'ಹತ್ತಿರದ DGNK ಅಂಚೆ ಕಚೇರಿ ಹುಡುಕಿ',
        TA: 'அருகிலுள்ள DGNK அஞ்சல் அலுவலகத்தைக் கண்டறியவும்',
        ML: 'ഏറ്റവും അടുത്തുള്ള DGNK പോസ്റ്റ് ഓഫീസ് കണ്ടെത്തുക',
        PA: 'ਨੇੜਲਾ DGNK ਡਾਕਘਰ ਲੱਭੋ',
        TE: 'సమీపంలోని DGNK పోస్ట్ ఆఫీస్ కనుగొనండి',
        GU: 'નજીકનું DGNK પોસ્ટ ઓફિસ શોધો',
        MAI: 'निकटतम DGNK डाकघर खोजू',
        FR: 'Trouver le bureau DGNK le plus proche'
      },
      descs: {
        EN: 'Locate 1,000+ authorized booking counters with linked Foreign Post Office (FPO) hubs',
        HI: '1000+ अधिकृत डाक घर निर्यात केंद्र और संबंधित फॉरेन पोस्ट ऑफिस की सूची',
        KN: '1,000+ ಅಧಿಕೃತ ಬುಕಿಂಗ್ ಕೌಂಟರ್‌ಗಳು ಮತ್ತು FPO ಕೇಂದ್ರಗಳನ್ನು ಹುಡುಕಿ',
        TA: '1,000+ அங்கீகரிக்கப்பட்ட முன்பதிவு மையங்கள் மற்றும் FPO மையங்கள்',
        ML: '1,000+ അംഗീകൃത ബുക്കിംഗ് കೌണ്ടറുകളും FPO കേന്ദ്രങ്ങളും കണ്ടെത്തുക',
        PA: '1,000+ ਅਧਿਕਾਰਤ ਬੁਕਿੰਗ ਕਾਊਂਟਰ ਅਤੇ FPO ਕੇਂਦਰ ਲੱਭੋ',
        TE: '1,000+ అధీకృత బుకింగ్ కౌంటర్లు మరియు FPO కేంద్రాలు',
        GU: '1,000+ અધિકૃત બુકિંગ કાઉન્ટર અને FPO કેન્દ્રો શોધો',
        MAI: '1000+ अधिकृत डाक घर निर्यात केंद्र केर सूची',
        FR: 'Localisez plus de 1000 guichets agréés reliés aux bureaux de poste internationaux (FPO)'
      },
      badge: '1000+ Centers',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: MapPin,
      color: 'text-amber-700',
      bgLight: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200',
      category: 'resources'
    },
    {
      id: 'knowledge',
      titles: {
        EN: 'Regulatory & SOP Knowledge Repository',
        HI: 'नियम, परिपत्र व SOP ज्ञान केंद्र',
        KN: 'ನಿಯಮಗಳು & SOP ಜ್ಞಾನ ಭಂಡಾರ',
        TA: 'விதிகள் & SOP அறிவு களஞ்சியம்',
        ML: 'നിയമങ്ങളും SOP വിജ്ഞാന ശേഖരവും',
        PA: 'ਨਿਯਮ ਅਤੇ SOP ਗਿਆਨ ਭੰਡਾਰ',
        TE: 'నిబంధనలు & SOP విజ్ఞాన భాండాగారం',
        GU: 'નિયમો અને SOP જ્ઞાન ભંડાર',
        MAI: 'नियम, परिपत्र आ SOP ज्ञान केंद्र',
        FR: 'Base de connaissances réglementaires et SOP'
      },
      descs: {
        EN: 'CBIC 14/2018, DGFT FTP 2023, RoDTEP schedules and Department of Posts circulars',
        HI: 'सीमा शुल्क अधिसूचनाएं, डीजीएफटी नीतियां और डाक विभाग के अधिकृत दस्तावेज',
        KN: 'ಕಸ್ಟಮ್ಸ್ ಅಧಿಸೂಚನೆಗಳು, DGFT ನೀತಿಗಳು ಮತ್ತು ಅಂಚೆ ಇಲಾಖೆಯ ಸುತ್ತೋಲೆಗಳು',
        TA: 'சுங்க அறிவிப்புகள், DGFT கொள்கைகள் மற்றும் அஞ்சல் துறை சுற்றறிக்கைகள்',
        ML: 'കസ്റ്റംസ് വിജ്ഞാപനങ്ങൾ, DGFT നയങ്ങൾ, തപാൽ വകുപ്പ് സർക്കുലറുകൾ',
        PA: 'ਕਸਟਮ ਨੋਟੀਫਿਕੇਸ਼ਨਾਂ, DGFT ਨੀਤੀਆਂ ਅਤੇ ਡਾਕ ਵਿਭਾਗ ਦੇ ਸਰਕੂਲਰ',
        TE: 'కస్టమ్స్ నోటిఫికేషన్లు, DGFT విధానాలు మరియు తపాలా శాఖ సర్క్యులర్లు',
        GU: 'કસ્ટમ્સ સૂચનાઓ, DGFT નીતિઓ અને ટપાલ વિભાગના પરિપત્રો',
        MAI: 'सीमा शुल्क अधिसूचना, डीजीएफटी नीति आ डाक विभागक दस्तावेज',
        FR: 'Circulaires CBIC 14/2018, DGFT FTP 2023, barèmes RoDTEP et documents officiels'
      },
      badge: 'Official SOPs',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      icon: BookOpen,
      color: 'text-indigo-700',
      bgLight: 'bg-indigo-50 hover:bg-indigo-100/80 border-indigo-200',
      category: 'resources'
    }
  ];

  const filteredPages = allPages.filter(p => {
    const q = menuSearch.toLowerCase().trim();
    if (!q) return true;
    const title = (p.titles[language] || p.titles.EN).toLowerCase();
    const desc = (p.descs[language] || p.descs.EN).toLowerCase();
    return title.includes(q) || desc.includes(q);
  });

  return (
    <>
      {/* Endless Moving Text Bar - Multi-Language Rolling Ticker */}
      <div 
        id="top-endless-moving-ticker" 
        className="bg-[#8B0B1D] text-white py-1 text-[11px] font-black uppercase tracking-widest border-b border-[#6E0816] overflow-hidden select-none relative z-30"
        title="Dak Ghar Niryat Kendra - India Post"
      >
        <div className="animate-endless-scroll flex items-center whitespace-nowrap">
          {/* Set 1 */}
          <div className="flex items-center gap-6 px-4 shrink-0">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
              <span className="tracking-[0.18em] text-[#FFC107] font-black">DAK GHAR NIRYAT KENDRA</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">डाक घर निर्यात केंद्र</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">டாக் கர் நிர்யாத் கேந்திரா</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">ഡാക് ഘർ നിർയാത് കേന്ദ്ര</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">ਡਾਕ ਘਰ ਨਿਰਯਾਤ ਕੇਂਦਰ</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">డాక్ ఘర్ నిర్యాత్ కేంద్ర</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">ડાક ઘર નિકાસ કેન્દ્ર</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">डाक घर निर्यात केंद्र (मैथिली)</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">CENTRE D'EXPORTATION POSTALE (FRANÇAIS)</span>
            <span className="text-white/40">•</span>
          </div>

          {/* Set 2 (Exact duplicate for seamless endless loop) */}
          <div className="flex items-center gap-6 px-4 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFC107] animate-pulse" />
              <span className="tracking-[0.18em] text-[#FFC107] font-black">DAK GHAR NIRYAT KENDRA</span>
            </span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">डाक घर निर्यात केंद्र</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">டாக் கர் நிர்யாத் கேந்திரா</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">ഡാക് ഘർ നിർയാത് കേന്ദ്ര</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">ਡਾਕ ਘਰ ਨਿਰਯਾਤ ਕੇਂਦਰ</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">డాక్ ఘర్ నిర్యాత్ కేంద్ర</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">ડાક ઘર નિકાસ કેન્દ્ર</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-amber-200">डाक घर निर्यात केंद्र (मैथिली)</span>
            <span className="text-white/40">•</span>
            <span className="tracking-wider text-white">CENTRE D'EXPORTATION POSTALE (FRANÇAIS)</span>
            <span className="text-white/40">•</span>
          </div>
        </div>
      </div>

      {/* 1. Official Government of India Top Accessibility Bar */}
      <div className="bg-[#212529] text-gray-200 text-[11px] font-medium py-1 px-3 sm:px-6 border-b border-gray-700 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Ministry & Govt Hierarchy */}
          <div className="flex items-center gap-2 overflow-hidden truncate">
            <span className="text-gray-300 hidden sm:inline">
              {t.ministryName}
            </span>
            <span className="text-gray-500 hidden sm:inline">|</span>
            <span className="text-amber-300 font-bold hidden md:inline">
              {t.deptName}
            </span>
          </div>

          {/* Accessibility Controls & Multi-Language Selector */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Skip to main content */}
            <a 
              href="#brand-logo" 
              className="text-gray-400 hover:text-white text-[10px] hidden lg:inline focus:underline"
            >
              {t.skipToMain}
            </a>

            {/* Font Size Adjusters */}
            <div className="flex items-center bg-gray-800 rounded px-1 py-0.5 border border-gray-700 text-[10px] font-bold">
              <button 
                onClick={() => handleFontSizeChange('small')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'small' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Decrease Font Size"
              >
                A-
              </button>
              <button 
                onClick={() => handleFontSizeChange('normal')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'normal' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Standard Font Size"
              >
                A
              </button>
              <button 
                onClick={() => handleFontSizeChange('large')}
                className={`px-1.5 hover:text-white transition-colors ${fontSizeClass === 'large' ? 'text-[#FFC107]' : 'text-gray-400'}`}
                title="Increase Font Size"
              >
                A+
              </button>
            </div>

            {/* 10-Language Selector Dropdown */}
            <div className="relative" ref={langDropdownRef}>
              <button
                id="btn-language-selector"
                onClick={() => setIsLangDropdownOpen(prev => !prev)}
                className="px-2.5 py-1 rounded bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-[11px] font-bold text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                title="Change Language / भाषा चुनें (10 Languages)"
                aria-expanded={isLangDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="font-extrabold">{currentLangObj.nativeName}</span>
                <span className="text-[9px] text-amber-200/80 font-mono hidden sm:inline">({currentLangObj.code})</span>
                <ChevronDown className={`w-3 h-3 text-amber-300 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {isLangDropdownOpen && (
                <div 
                  id="dropdown-language-options"
                  className="absolute right-0 top-full mt-1.5 w-60 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 py-2 overflow-hidden animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
                >
                  <div className="px-3 py-1.5 border-b border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Select Language (10)</span>
                    <span className="text-amber-400 font-black">भाषा चुनें</span>
                  </div>
                  
                  <div className="max-h-72 overflow-y-auto py-1 divide-y divide-gray-800/50">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.code === language;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleSelectLang(lang.code)}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between transition-colors text-xs ${
                            isSelected
                              ? 'bg-amber-400/20 text-amber-300 font-black'
                              : 'text-gray-200 hover:bg-gray-800 hover:text-white'
                          }`}
                        >
                          <div className="flex flex-col">
                            <span className="font-bold text-sm tracking-wide">
                              {lang.nativeName}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">
                              {lang.name} • <span className="font-mono text-gray-500">{lang.code}</span>
                            </span>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 2. Main India Post & DGNK Portal Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white shadow-lg flex-shrink-0 border-b border-red-950/40">
        
        {/* National Flag Tricolor Band */}
        <div className="h-1 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

        {/* Main Branding & Navigation Container */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          
          {/* Left: 3-Line Mega Menu Button + National Emblem & India Post Brand */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* 3-Line Mega Menu Button */}
            <button
              id="btn-three-line-menu"
              onClick={() => setIsMenuOpen(true)}
              className="group relative flex items-center gap-2 px-2.5 sm:px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 transition-all shadow-xs cursor-pointer"
              title={isHindi ? 'सभी सेवाएं (मेन्यू)' : 'All Services & Tools (Menu)'}
              aria-label="Open Navigation Menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center gap-1 shrink-0">
                <span className="h-0.5 w-5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-3.5 bg-white rounded-full group-hover:w-5 transition-all" />
                <span className="h-0.5 w-4.5 bg-[#FFC107] rounded-full group-hover:w-5 transition-all" />
              </div>
              <span className="text-xs font-black tracking-wide uppercase text-white hidden md:inline-block">
                Menu
              </span>
            </button>

            {/* Official DNK Brand Logo Lockup */}
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none" 
              onClick={() => handleNav('dashboard')}
              id="brand-logo"
            >
              {/* Ashoka Lion Emblem Badge */}
              <div className="hidden sm:flex flex-col items-center justify-center border-r border-white/20 pr-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border border-white/30 text-amber-200">
                  <Award className="w-4 h-4 text-[#FFC107]" />
                </div>
                <span className="text-[7px] font-black uppercase tracking-tighter text-amber-200 mt-0.5">
                  सत्यमेव जयते
                </span>
              </div>

              {/* Official DNK Logo */}
              <DnkLogo 
                variant="compact" 
                size="md" 
                language={language}
                isHindi={isHindi} 
              />
            </div>

          </div>

          {/* Center Navigation Shortcuts (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <button
              onClick={() => handleNav('dashboard')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'dashboard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.navDashboard}</span>
            </button>
            
            <button
              onClick={() => handleNav('assistant')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'assistant' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-amber-200 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD54F]" />
              <span>{t.navAssistant}</span>
              <span className="bg-[#FFC107] text-[#C8102E] text-[8px] font-black px-1 rounded-full uppercase">
                RAG
              </span>
            </button>

            <button
              onClick={() => handleNav('wizard')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'wizard' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.navWizard}</span>
            </button>

            <button
              onClick={() => handleNav('calculator')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'calculator' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.navTariff}</span>
            </button>

            <button
              onClick={() => handleNav('tracker')}
              className={`text-xs font-bold transition-all py-1.5 px-2.5 rounded-xl flex items-center gap-1.5 ${
                active === 'tracker' 
                  ? 'bg-white/20 text-white font-black shadow-2xs border border-white/30' 
                  : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.navTracker}</span>
            </button>
          </nav>

          {/* Right Action Controls: Prepaid Wallet, Bulk Upload, Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Bulk Upload Button */}
            {onOpenBulkUpload && (
              <button
                onClick={onOpenBulkUpload}
                className="hidden xl:flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/20 transition-all"
                title="Bulk Consignment Booking via CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>{t.navBulk}</span>
              </button>
            )}

            {/* Prepaid Franking Wallet Widget */}
            {onOpenWallet && (
              <button
                onClick={onOpenWallet}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/30 to-amber-600/40 hover:from-amber-500/40 hover:to-amber-600/50 border border-amber-300/40 text-white transition-all shadow-2xs group"
                title="Open DNK Prepaid Franking Wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-[#FFD54F] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="text-[9px] block text-amber-200 uppercase font-black leading-none">
                    {t.navWallet}
                  </span>
                  <span className="text-xs font-black text-white font-mono leading-tight">
                    ₹{walletAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </button>
            )}

            {/* Exporter KYC Profile Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-black/25 hover:bg-black/35 border border-white/20 transition-all text-left"
              title="Exporter Profile & KYC Settings"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FFC107] text-[#990B20] flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                {profile.businessName ? profile.businessName.charAt(0).toUpperCase() : 'E'}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-black text-white leading-none truncate max-w-[110px]">
                  {profile.businessName || 'Exporter'}
                </div>
                <div className="text-[10px] text-amber-200 font-bold leading-tight">
                  {profile.iecCode ? `IEC: ${profile.iecCode}` : 'MSME KYC'}
                </div>
              </div>
            </button>
          </div>

        </div>

        {/* 3. Official Rolling Flash News & CBIC Notice Ticker */}
        <NoticeTicker
          language={language}
          onNavigate={handleNav}
          onOpenRagInspector={onOpenRagInspector}
        />

      </header>

      {/* ========================================================================= */}
      {/* THREE-LINE MEGA MENU DRAWER WITH COMPLETE PORTAL CATALOG */}
      {/* ========================================================================= */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-start animate-in fade-in duration-200">
          
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mega Drawer Panel */}
          <div className="relative w-full max-w-md sm:max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-in slide-in-from-left duration-300 border-r border-gray-300">
            
            {/* Drawer Header with India Post Banner */}
            <div className="bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white p-5 sm:p-6 shrink-0 relative">
              <div className="flex items-center justify-between mb-3">
                <DnkLogo 
                  variant="full" 
                  size="md" 
                  language={language}
                  isHindi={isHindi} 
                />

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Exporter mini status banner in drawer */}
              <div className="bg-black/20 rounded-xl p-3 border border-white/15 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-200 font-bold block truncate max-w-[200px]">
                    {profile.businessName || 'Exporter Profile'}
                  </span>
                  <span className="text-[11px] text-white/80 font-mono">
                    IEC: {profile.iecCode || '0518029481'} | LUT Active
                  </span>
                </div>
                {onOpenWallet && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenWallet();
                    }}
                    className="px-2.5 py-1 bg-[#FFC107] hover:bg-[#FFA000] text-[#C8102E] font-black rounded-lg text-xs shadow-xs"
                  >
                    ₹{walletAmount.toLocaleString('en-IN')}
                  </button>
                )}
              </div>
            </div>

            {/* Search Filter Input in Menu */}
            <div className="p-3.5 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={t.search + '...'}
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#C8102E] focus:ring-1 focus:ring-[#C8102E]"
                />
              </div>
            </div>

            {/* Scrollable List of All Pages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Category 1: Core Portals */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Core Export Services
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'core').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    const pageTitle = page.titles[language] || page.titles.EN;
                    const pageDesc = page.descs[language] || page.descs.EN;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {pageTitle}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {pageDesc}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Tools & Calculators */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Customs Tools & Calculators
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'tools').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    const pageTitle = page.titles[language] || page.titles.EN;
                    const pageDesc = page.descs[language] || page.descs.EN;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {pageTitle}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {pageDesc}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 3: Resources & DGNK Centers */}
              <div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-2 px-1">
                  Centers & Regulations
                </span>
                <div className="space-y-2">
                  {filteredPages.filter(p => p.category === 'resources').map((page) => {
                    const Icon = page.icon;
                    const isCurrent = active === page.id;
                    const pageTitle = page.titles[language] || page.titles.EN;
                    const pageDesc = page.descs[language] || page.descs.EN;
                    return (
                      <div
                        key={page.id}
                        onClick={() => handleNav(page.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isCurrent 
                            ? 'bg-red-50/80 border-[#C8102E] shadow-xs' 
                            : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${page.bgLight}`}>
                          <Icon className={`w-5 h-5 ${page.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-black truncate ${isCurrent ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                              {pageTitle}
                            </h4>
                            {page.badge && (
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${page.badgeColor}`}>
                                {page.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mt-0.5">
                            {pageDesc}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 mt-2 ${isCurrent ? 'text-[#C8102E]' : 'text-gray-400'}`} />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Drawer Footer with Helpline & RAG quick access */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 shrink-0 space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#C8102E]" />
                  <span className="font-bold">MSME Helpline: 1800-266-6868</span>
                </div>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenRagInspector();
                  }}
                  className="text-[11px] font-bold text-[#C8102E] hover:underline"
                >
                  RAG Pipeline
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
