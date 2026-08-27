import { SupportedLanguage, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'EN', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'HI', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'KN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'TA', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'ML', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'PA', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'TE', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'GU', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'MAI', name: 'Maithili', nativeName: 'मैथिली', script: 'Tirhuta / Devanagari' },
  { code: 'FR', name: 'French', nativeName: 'Français', script: 'Latin' }
];

export const translations: Record<SupportedLanguage, Record<string, string>> = {
  EN: {
    // Brand & Top Header
    portalTitle: 'DAK GHAR NIRYAT KENDRA',
    portalSubTitle: 'Department of Posts • India Post',
    ministryName: 'Ministry of Communications',
    deptName: 'Department of Posts',
    skipToMain: 'Skip to main content',
    toggleLanguage: 'Change Language',
    quickLookup: 'Quick Article Lookup',
    enterBarcode: 'Enter 13-digit barcode (e.g., EE928410294IN)',
    track: 'Track',
    newExportPBE: 'New Export (PBE)',
    walletBalance: 'Wallet Balance',
    activeParcels: 'Active Parcels',
    welcome: 'Welcome',
    exporter: 'Exporter',
    tagline: 'Dak Ghar Niryat Kendra Dashboard • Create Postal Bills of Export, check tariffs, and track consignments.',
    
    // Endless Ticker
    tickerMain: 'DAK GHAR NIRYAT KENDRA',
    tickerDept: 'DEPARTMENT OF POSTS',
    tickerPbe: 'DIGITAL POSTAL BILL OF EXPORT (PBE)',
    tickerSub: 'CUSTOMS 48/2018 COMPLIANT EXPORTS VIA INDIA POST',

    // Quick Actions
    genPbeTitle: 'Generate PBE',
    genPbeDesc: 'Create Postal Bill of Export (PBE-III/IV) with auto CN23 customs label.',
    genPbeBtn: 'Start Booking',

    tariffTitle: 'Tariff & Currency',
    tariffDesc: 'Calculate live postage rates with official CBIC customs exchange rates.',
    tariffBtn: 'View Rates',

    trackTitle: 'Track Shipment',
    trackDesc: 'Live tracking for UPU S10 articles with customs clearance status.',
    trackBtn: 'Track Now',

    aiAdvisorTitle: 'DNK AI Chatbot',
    aiAdvisorDesc: 'India Post postal AI assistant trained on official SOPs, CBIC rules & DGFT guidelines.',
    aiAdvisorBtn: 'Chat with DNK Bot',

    // Dashboard sections
    recentConsignments: 'Recent Export Consignments',
    viewAllShipments: 'View All Shipments',
    exportReadiness: 'Export Readiness',
    manage: 'Manage',
    dnkRegistration: 'DGNK Portal Registration',
    active: 'Active',
    iecRegistration: 'IEC Registration (DGFT)',
    gstLut: 'GST Letter of Undertaking (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'Dashboard',
    navWizard: 'Generate PBE',
    navTariff: 'Tariff Calculator',
    navProhibited: 'Prohibited Goods',
    navLocator: 'Find DGNK',
    navTracker: 'Track Article',
    navKnowledge: 'SOP & Circulars',
    navAssistant: 'DNK Chatbot',
    navWallet: 'Wallet',
    navBulk: 'Bulk Upload',

    // Common
    search: 'Search',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    loading: 'Loading...',
    status: 'Status',
    date: 'Date',
    action: 'Action',
    details: 'Details',
    download: 'Download',
    print: 'Print'
  },

  HI: {
    // Brand & Top Header
    portalTitle: 'डाक घर निर्यात केंद्र',
    portalSubTitle: 'डाक विभाग • भारतीय डाक',
    ministryName: 'संचार मंत्रालय',
    deptName: 'डाक विभाग',
    skipToMain: 'मुख्य सामग्री पर जाएं',
    toggleLanguage: 'भाषा बदलें',
    quickLookup: 'त्वरित पार्सल ट्रैकिंग',
    enterBarcode: '13-अंकीय UPU S10 बारकोड दर्ज करें (उदा. EE928410294IN)',
    track: 'ट्रैक',
    newExportPBE: 'नया PBE बनाएं',
    walletBalance: 'फ्रैंकिंग बैलेंस',
    activeParcels: 'सक्रिय पार्सल',
    welcome: 'नमस्ते',
    exporter: 'निर्यातक',
    tagline: 'डाक घर निर्यात केंद्र (DNK) डैशबोर्ड • इलेक्ट्रॉनिक PBE, डाक दरें और पार्सल ट्रैकिंग।',

    // Endless Ticker
    tickerMain: 'डाक घर निर्यात केंद्र',
    tickerDept: 'डाक विभाग',
    tickerPbe: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट (PBE)',
    tickerSub: 'भारतीय डाक के माध्यम से सीमा शुल्क 48/2018 अनुरूप निर्यात',

    // Quick Actions
    genPbeTitle: 'डिजिटल PBE बनाएं',
    genPbeDesc: 'PBE-III (ई-कॉमर्स), PBE-IV व CN23 कस्टम्स डिक्लेरेशन तैयार करें।',
    genPbeBtn: 'शुरू करें',

    tariffTitle: 'डाक दर व मुद्रा',
    tariffDesc: 'Speed Post EMS, ITPS दरें और CBIC सीमा शुल्क विनिमय दरें निकालें।',
    tariffBtn: 'दरें देखें',

    trackTitle: 'पार्सल ट्रैक करें',
    trackDesc: 'UPU S10 बारकोड व कस्टम्स Out-of-Charge स्थिति लाइव देखें।',
    trackBtn: 'ट्रैक करें',

    aiAdvisorTitle: 'DNK AI चैटबॉट',
    aiAdvisorDesc: 'भारतीय डाक SOP, CBIC सीमा शुल्क व DGFT नियमों पर प्रशिक्षित आधिकारिक चैटबॉट।',
    aiAdvisorBtn: 'DNK चैटबॉट से पूछें',

    // Dashboard sections
    recentConsignments: 'हाल के निर्यात पार्सल',
    viewAllShipments: 'सभी देखें',
    exportReadiness: 'निर्यात तत्परता',
    manage: 'प्रबंधन',
    dnkRegistration: 'DGNK पोर्टल पंजीकरण',
    active: 'सक्रिय',
    iecRegistration: 'IEC पंजीकरण (DGFT)',
    gstLut: 'GST लेटर ऑफ अंडरटेकिंग (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'डैशबोर्ड',
    navWizard: 'PBE जनरेट करें',
    navTariff: 'डाक दर कैलकुलेटर',
    navProhibited: 'प्रतिबंधित वस्तुएं',
    navLocator: 'DGNK खोजें',
    navTracker: 'पार्सल ट्रैकिंग',
    navKnowledge: 'नियम व SOP',
    navAssistant: 'DNK चैटबॉट',
    navWallet: 'वॉलेट',
    navBulk: 'बल्क अपलोड',

    // Common
    search: 'खोजें',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सहेजें',
    close: 'बंद करें',
    back: 'पीछे',
    next: 'आगे',
    loading: 'लोड हो रहा है...',
    status: 'स्थिति',
    date: 'दिनांक',
    action: 'कार्य',
    details: 'विवरण',
    download: 'डाउनलोड',
    print: 'प्रिंट'
  },

  KN: {
    // Kannada (ಕನ್ನಡ)
    portalTitle: 'ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ',
    portalSubTitle: 'ಅಂಚೆ ಇಲಾಖೆ • ಇಂಡಿಯಾ ಪೋಸ್ಟ್',
    ministryName: 'ಸಂವಹನ ಸಚಿವಾಲಯ',
    deptName: 'ಅಂಚೆ ಇಲಾಖೆ',
    skipToMain: 'ಮುಖ್ಯ ವಿಷಯಕ್ಕೆ ಹೋಗಿ',
    toggleLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    quickLookup: 'ತ್ವರಿತ ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    enterBarcode: '13-ಅಂಕಿಯ UPU S10 ಬಾರ್‌ಕೋಡ್ ನಮೂದಿಸಿ (ಉದಾ: EE928410294IN)',
    track: 'ಟ್ರ್ಯಾಕ್',
    newExportPBE: 'ಹೊಸ PBE ರಚಿಸಿ',
    walletBalance: 'ವ್ಯಾಲೆಟ್ ಬ್ಯಾಲೆನ್ಸ್',
    activeParcels: 'ಸಕ್ರಿಯ ಪಾರ್ಸಲ್‌ಗಳು',
    welcome: 'ಸ್ವಾಗತ',
    exporter: 'ರಫ್ತುದಾರ',
    tagline: 'ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ (DNK) ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ • ಎಲೆಕ್ಟ್ರಾನಿಕ್ PBE, ಅಂಚೆ ದರಗಳು ಮತ್ತು ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕಿಂಗ್.',

    // Endless Ticker
    tickerMain: 'ಡಾಕ್ ಘರ್ ನಿರ್ಯಾತ್ ಕೇಂದ್ರ (DNK)',
    tickerDept: 'ಅಂಚೆ ಇಲಾಖೆ',
    tickerPbe: 'ಡಿಜಿಟಲ್ ಪೋಸ್ಟಲ್ ಬಿಲ್ ಆಫ್ ಎಕ್ಸ್‌ಪೋರ್ಟ್ (PBE)',
    tickerSub: 'ಭಾರತೀಯ ಅಂಚೆ ಮೂಲಕ ಕಸ್ಟಮ್ಸ್ ನಿಯಮಾನುಸಾರ ರಫ್ತು',

    // Quick Actions
    genPbeTitle: 'ಡಿಜಿಟಲ್ PBE ರಚಿಸಿ',
    genPbeDesc: 'PBE-III (ಇ-ಕಾಮರ್ಸ್), PBE-IV ಮತ್ತು CN23 ಕಸ್ಟಮ್ಸ್ ಘೋಷಣೆ ತಯಾರಿಸಿ.',
    genPbeBtn: 'ಪ್ರಾರಂಭಿಸಿ',

    tariffTitle: 'ಅಂಚೆ ದರ ಮತ್ತು ಕರೆನ್ಸಿ',
    tariffDesc: 'Speed Post EMS, ITPS ದರಗಳು ಮತ್ತು CBIC ವಿನಿಮಯ ದರಗಳನ್ನು ಲೆಕ್ಕಹಾಕಿ.',
    tariffBtn: 'ದರಗಳನ್ನು ವೀಕ್ಷಿಸಿ',

    trackTitle: 'ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    trackDesc: 'UPU S10 ಬಾರ್‌ಕೋಡ್ ಮತ್ತು ಕಸ್ಟಮ್ಸ್ ಕ್ಲಿಯರೆನ್ಸ್ ಲೈವ್ ಸ್ಥಿತಿ ವೀಕ್ಷಿಸಿ.',
    trackBtn: 'ಈಗ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',

    aiAdvisorTitle: 'AI ರಫ್ತು ಸಲಹೆಗಾರ',
    aiAdvisorDesc: 'HS ಕೋಡ್‌ಗಳು, RoDTEP ಪ್ರಯೋಜನಗಳು ಮತ್ತು DGFT ನಿಯಮಗಳ ಬಗ್ಗೆ ತ್ವರಿತ ಸಲಹೆ.',
    aiAdvisorBtn: 'AI ಕೇಳಿ',

    // Dashboard sections
    recentConsignments: 'ಇತ್ತೀಚಿನ ರಫ್ತು ಪಾರ್ಸಲ್‌ಗಳು',
    viewAllShipments: 'ಎಲ್ಲವನ್ನೂ ವೀಕ್ಷಿಸಿ',
    exportReadiness: 'ರಫ್ತು ಸನ್ನದ್ಧತೆ',
    manage: 'ನಿರ್ವಹಿಸಿ',
    dnkRegistration: 'DGNK ಪೋರ್ಟಲ್ ನೋಂದಣಿ',
    active: 'ಸಕ್ರಿಯ',
    iecRegistration: 'IEC ನೋಂದಣಿ (DGFT)',
    gstLut: 'GST ಲೆಟರ್ ಆಫ್ ಅಂಡರ್‌ಟೇಕಿಂಗ್ (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navWizard: 'PBE ಜನರೇಟ್ ಮಾಡಿ',
    navTariff: 'ದರ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    navProhibited: 'ನಿಷೇಧಿತ ವಸ್ತುಗಳು',
    navLocator: 'DGNK ಹುಡುಕಿ',
    navTracker: 'ಪಾರ್ಸಲ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    navKnowledge: 'SOP & ನಿಯಮಗಳು',
    navAssistant: 'AI ಸಲಹೆಗಾರ',
    navWallet: 'ವ್ಯಾಲೆಟ್',
    navBulk: 'ಬೃಹತ್ ಅಪ್‌ಲೋಡ್',

    // Common
    search: 'ಹುಡುಕಿ',
    submit: 'ಸಲ್ಲಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    save: 'ಉಳಿಸಿ',
    close: 'ಮುಚ್ಚಿ',
    back: 'ಹಿಂದೆ',
    next: 'ಮುಂದೆ',
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    status: 'ಸ್ಥಿತಿ',
    date: 'ದಿನಾಂಕ',
    action: 'ಕ್ರಮ',
    details: 'ವಿವರಗಳು',
    download: 'ಡೌನ್‌ಲೋಡ್',
    print: 'ಪ್ರಿಂಟ್'
  },

  TA: {
    // Tamil (தமிழ்)
    portalTitle: 'டாக் கர் நிர்யாத் கேந்திரா',
    portalSubTitle: 'அஞ்சல் துறை • இந்திய அஞ்சல்',
    ministryName: 'தகவல் தொடர்பு அமைச்சகம்',
    deptName: 'அஞ்சல் துறை',
    skipToMain: 'முக்கிய பகுதிக்கு செல்லவும்',
    toggleLanguage: 'மொழியை மாற்றவும்',
    quickLookup: 'விரைவு பார்சல் கண்காணிப்பு',
    enterBarcode: '13-இலக்க UPU S10 பார் குறியீட்டை உள்ளிடவும் (எ.கா: EE928410294IN)',
    track: 'கண்காணி',
    newExportPBE: 'புதிய PBE உருவாக்கு',
    walletBalance: 'வாலட் இருப்பு',
    activeParcels: 'செயலில் உள்ள பார்சல்கள்',
    welcome: 'வணக்கம்',
    exporter: 'ஏற்றுமதியாளர்',
    tagline: 'டாக் கர் நிர்யாத் கேந்திரா (DNK) டாஷ்போர்டு • மின்னணு PBE, அஞ்சல் கட்டணங்கள் & பார்சல் கண்காணிப்பு.',

    // Endless Ticker
    tickerMain: 'டாக் கர் நிர்யாத் கேந்திரா (DNK)',
    tickerDept: 'அஞ்சல் துறை',
    tickerPbe: 'டிஜிட்டல் அஞ்சல் ஏற்றுமதி பில் (PBE)',
    tickerSub: 'இந்திய அஞ்சல் மூலம் சுங்க ஒழுங்குமுறைக்கு உட்பட்ட ஏற்றுமதி',

    // Quick Actions
    genPbeTitle: 'டிஜிட்டல் PBE உருவாக்கு',
    genPbeDesc: 'PBE-III (இ-காமர்ஸ்), PBE-IV மற்றும் CN23 சுங்க அறிவிப்பை உருவாக்கவும்.',
    genPbeBtn: 'தொடங்குங்கள்',

    tariffTitle: 'அஞ்சல் கட்டணம் & நாணயம்',
    tariffDesc: 'Speed Post EMS, ITPS மற்றும் CBIC சுங்க மாற்று விகிதங்களைக் கணக்கிடுங்கள்.',
    tariffBtn: 'கட்டணம் பார்க்க',

    trackTitle: 'பார்சல் கண்காணிக்க',
    trackDesc: 'UPU S10 பார் குறியீடு மற்றும் சுங்க அனுமதி நிலையை நேரலையில் காண்க.',
    trackBtn: 'இப்போது கண்காணிக்க',

    aiAdvisorTitle: 'AI ஏற்றுமதி ஆலோசகர்',
    aiAdvisorDesc: 'HS குறியீடுகள், RoDTEP சலுகைகள் மற்றும் DGFT விதிகளுக்கு உடனடி தீர்வு.',
    aiAdvisorBtn: 'AI-யிடம் கேட்கவும்',

    // Dashboard sections
    recentConsignments: 'சமீபத்திய ஏற்றுமதி பார்சல்கள்',
    viewAllShipments: 'அனைத்தையும் காண்க',
    exportReadiness: 'ஏற்றுமதி தயார்நிலை',
    manage: 'நிர்வகி',
    dnkRegistration: 'DGNK போர்டல் பதிவு',
    active: 'செயலில்',
    iecRegistration: 'IEC பதிவு (DGFT)',
    gstLut: 'GST லெட்டர் ஆஃப் அண்டர்டேக்கிங் (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'டாஷ்போர்டு',
    navWizard: 'PBE உருவாக்கு',
    navTariff: 'கட்டணக் கால்குலேட்டர்',
    navProhibited: 'தடைசெய்யப்பட்டவை',
    navLocator: 'DGNK கண்டறி',
    navTracker: 'பார்சல் டிராக்கர்',
    navKnowledge: 'SOP & சுற்றறிக்கைகள்',
    navAssistant: 'AI ஆலோசகர்',
    navWallet: 'வாலட்',
    navBulk: 'மொத்த பதிவேற்றம்',

    // Common
    search: 'தேடுக',
    submit: 'சமர்ப்பி',
    cancel: 'ரத்து செய்',
    save: 'சேமி',
    close: 'மூடு',
    back: 'பின்செல்',
    next: 'அடுத்து',
    loading: 'ஏற்றுகிறது...',
    status: 'நிலை',
    date: 'தேதி',
    action: 'செயல்',
    details: 'விவரங்கள்',
    download: 'பதிவிறக்கு',
    print: 'அச்சிடு'
  },

  ML: {
    // Malayalam (മലയാളം)
    portalTitle: 'ഡാക് ഘർ നിർയാത് കേന്ദ്ര',
    portalSubTitle: 'തപാൽ വകുപ്പ് • ഇന്ത്യാ പോസ്റ്റ്',
    ministryName: 'വാർത്താവിനിമയ മന്ത്രാലയം',
    deptName: 'തപാൽ വകുപ്പ്',
    skipToMain: 'പ്രധാന ഉള്ളടക്കത്തിലേക്ക് പോകുക',
    toggleLanguage: 'ഭാഷ മാറ്റുക',
    quickLookup: 'ദ്രുത പാർസൽ ട്രാക്കിംഗ്',
    enterBarcode: '13-അക്ക UPU S10 ബാർകോഡ് നൽകുക (ഉദാ: EE928410294IN)',
    track: 'ട്രാക്ക് ചെയ്യുക',
    newExportPBE: 'പുതിയ PBE ഉണ്ടാക്കുക',
    walletBalance: 'വാലറ്റ് ബാലൻസ്',
    activeParcels: 'സജീവ പാർസലുകൾ',
    welcome: 'സ്വാഗതം',
    exporter: 'കയറ്റുമതിക്കാരൻ',
    tagline: 'ഡാക് ഘർ നിർയാത് കേന്ദ്ര (DNK) ഡാഷ്‌ബോർഡ് • ഇലക്ട്രോണിക് PBE, തപാൽ നിരക്കുകൾ, പാർസൽ ട്രാക്കിംഗ്.',

    // Endless Ticker
    tickerMain: 'ഡാക് ഘർ നിർയാത് കേന്ദ്ര (DNK)',
    tickerDept: 'തപാൽ വകുപ്പ്',
    tickerPbe: 'ഡിജിറ്റൽ പോസ്റ്റൽ ബിൽ ഓഫ് എക്സ്പോർട്ട് (PBE)',
    tickerSub: 'ഇന്ത്യാ പോസ്റ്റ് വഴിയുള്ള കസ്റ്റംസ് അനുസൃത കയറ്റുമതി',

    // Quick Actions
    genPbeTitle: 'ഡിജിറ്റൽ PBE ഉണ്ടാക്കുക',
    genPbeDesc: 'PBE-III (ഇ-കൊമേഴ്സ്), PBE-IV, CN23 കസ്റ്റംസ് ഡിക്ലറേഷൻ തയ്യാറാക്കുക.',
    genPbeBtn: 'തുടങ്ങുക',

    tariffTitle: 'തപാൽ നിരക്കും കറൻസിയും',
    tariffDesc: 'Speed Post EMS, ITPS നിരക്കുകളും ഔദ്യോഗിക CBIC എക്സ്ചേഞ്ച് നിരക്കുകളും കണക്കാക്കുക.',
    tariffBtn: 'നിരക്കുകൾ കാണുക',

    trackTitle: 'പാർസൽ ട്രാക്ക് ചെയ്യുക',
    trackDesc: 'UPU S10 ബാർകോഡും കസ്റ്റംസ് ക്ലിയറൻസ് സ്റ്റാറ്റസും തത്സമയം കാണുക.',
    trackBtn: 'ഇപ്പോൾ ട്രാക്ക് ചെയ്യുക',

    aiAdvisorTitle: 'AI എക്സ്പോർട്ട് ഉപദേശകൻ',
    aiAdvisorDesc: 'HS കോഡുകൾ, RoDTEP ആനുകൂല്യങ്ങൾ, DGFT നിയമങ്ങൾ എന്നിവയിൽ തൽക്ഷണ സഹായം.',
    aiAdvisorBtn: 'AI ചോദിക്കുക',

    // Dashboard sections
    recentConsignments: 'സമീപകാല കയറ്റുമതി പാർസലുകൾ',
    viewAllShipments: 'എല്ലാം കാണുക',
    exportReadiness: 'കയറ്റുമതി സന്നദ്ധത',
    manage: 'മാനേജ് ചെയ്യുക',
    dnkRegistration: 'DGNK പോർട്ടൽ രജിസ്ട്രേഷൻ',
    active: 'സജീവം',
    iecRegistration: 'IEC രജിസ്ട്രേഷൻ (DGFT)',
    gstLut: 'GST ലെറ്റർ ഓഫ് അണ്ടർടേക്കിംഗ് (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navWizard: 'PBE ഉണ്ടാക്കുക',
    navTariff: 'നിരക്ക് കാൽക്കുലേറ്റർ',
    navProhibited: 'നിരോധിത വസ്തുക്കൾ',
    navLocator: 'DGNK കണ്ടെത്തുക',
    navTracker: 'പാർസൽ ട്രാക്കിംഗ്',
    navKnowledge: 'SOP & സർക്കുലറുകൾ',
    navAssistant: 'AI ഉപദേശകൻ',
    navWallet: 'വാലറ്റ്',
    navBulk: 'ബൾക്ക് അപ്‌ലോഡ്',

    // Common
    search: 'തിരയുക',
    submit: 'സമർപ്പിക്കുക',
    cancel: 'റദ്ദാക്കുക',
    save: 'സേവ് ചെയ്യുക',
    close: 'അടയ്ക്കുക',
    back: 'പിന്നോട്ട്',
    next: 'അടുത്തത്',
    loading: 'ലോഡുചെയ്യുന്നു...',
    status: 'നില',
    date: 'തീയതി',
    action: 'നടപടി',
    details: 'വിശദാംശങ്ങൾ',
    download: 'ഡൗൺലോഡ്',
    print: 'പ്രിന്റ്'
  },

  PA: {
    // Punjabi (ਪੰਜਾਬੀ)
    portalTitle: 'ਡਾਕ ਘਰ ਨਿਰਯਾਤ ਕੇਂਦਰ',
    portalSubTitle: 'ਡਾਕ ਵਿਭਾਗ • ਭਾਰਤੀ ਡਾਕ',
    ministryName: 'ਸੰਚਾਰ ਮੰਤਰਾਲਾ',
    deptName: 'ਡਾਕ ਵਿਭਾਗ',
    skipToMain: 'ਮੁੱਖ ਸਮੱਗਰੀ ਤੇ ਜਾਓ',
    toggleLanguage: 'ਭਾਸ਼ਾ ਬਦਲੋ',
    quickLookup: 'ਤੁਰੰਤ ਪਾਰਸਲ ਟ੍ਰੈਕਿੰਗ',
    enterBarcode: '13-ਅੰਕਾਂ ਦਾ UPU S10 ਬਾਰਕੋਡ ਦਰਜ ਕਰੋ (ਜਿਵੇਂ: EE928410294IN)',
    track: 'ਟ੍ਰੈਕ ਕਰੋ',
    newExportPBE: 'ਨਵਾਂ PBE ਬਣਾਓ',
    walletBalance: 'ਵਾਲਿਟ ਬਕਾਇਆ',
    activeParcels: 'ਸਰਗਰਮ ਪਾਰਸਲ',
    welcome: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ',
    exporter: 'ਨਿਰਯਾਤਕ',
    tagline: 'ਡਾਕ ਘਰ ਨਿਰਯਾਤ ਕੇਂਦਰ (DNK) ਡੈਸ਼ਬੋਰਡ • ਇਲੈਕਟ੍ਰਾਨਿਕ PBE, ਡਾਕ ਦਰਾਂ ਅਤੇ ਪਾਰਸਲ ਟ੍ਰੈਕਿੰਗ।',

    // Endless Ticker
    tickerMain: 'ਡਾਕ ਘਰ ਨਿਰਯਾਤ ਕੇਂਦਰ (DNK)',
    tickerDept: 'ਡਾਕ ਵਿਭਾਗ',
    tickerPbe: 'ਡਿਜੀਟਲ ਪੋਸਟਲ ਬਿੱਲ ਆਫ਼ ਐਕਸਪੋਰਟ (PBE)',
    tickerSub: 'ਇੰਡੀਆ ਪੋਸਟ ਰਾਹੀਂ ਕਸਟਮ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਨਿਰਯਾਤ',

    // Quick Actions
    genPbeTitle: 'ਡਿਜੀਟਲ PBE ਬਣਾਓ',
    genPbeDesc: 'PBE-III (ਈ-ਕਾਮਰਸ), PBE-IV ਅਤੇ CN23 ਕਸਟਮ ਡਿਕਲੇਰੇਸ਼ਨ ਤਿਆਰ ਕਰੋ।',
    genPbeBtn: 'ਸ਼ੁਰੂ ਕਰੋ',

    tariffTitle: 'ਡਾਕ ਦਰਾਂ ਤੇ ਮੁਦਰਾ',
    tariffDesc: 'Speed Post EMS, ITPS ਦਰਾਂ ਅਤੇ ਸਰਕਾਰੀ CBIC ਐਕਸਚੇਂਜ ਦਰਾਂ ਦੀ ਗਣਨਾ ਕਰੋ।',
    tariffBtn: 'ਦਰਾਂ ਵੇਖੋ',

    trackTitle: 'ਪਾਰਸਲ ਟ੍ਰੈਕ ਕਰੋ',
    trackDesc: 'UPU S10 ਬਾਰਕੋਡ ਅਤੇ ਕਸਟਮਜ਼ ਕਲੀਅਰੈਂਸ ਸਥਿਤੀ ਲਾਈਵ ਵੇਖੋ।',
    trackBtn: 'ਹੁਣੇ ਟ੍ਰੈਕ ਕਰੋ',

    aiAdvisorTitle: 'AI ਨਿਰਯਾਤ ਸਲਾਹਕਾਰ',
    aiAdvisorDesc: 'HS ਕੋਡ, RoDTEP ਲਾਭ ਅਤੇ DGFT ਨਿਯਮਾਂ ਬਾਰੇ ਤੁਰੰਤ ਪ੍ਰਮਾਣਿਤ ਸਲਾਹ।',
    aiAdvisorBtn: 'AI ਤੋਂ ਪੁੱਛੋ',

    // Dashboard sections
    recentConsignments: 'ਹਾਲੀਆ ਨਿਰਯਾਤ ਪਾਰਸਲ',
    viewAllShipments: 'ਸਾਰੇ ਵੇਖੋ',
    exportReadiness: 'ਨਿਰਯਾਤ ਤਿਆਰੀ',
    manage: 'ਪ੍ਰਬੰਧ ਕਰੋ',
    dnkRegistration: 'DGNK ਪੋਰਟਲ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    active: 'ਸਰਗਰਮ',
    iecRegistration: 'IEC ਰਜਿਸਟ੍ਰੇਸ਼ਨ (DGFT)',
    gstLut: 'GST ਲੈਟਰ ਆਫ਼ ਅੰਡਰਟੇਕਿੰਗ (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'ਡੈਸ਼ਬੋਰਡ',
    navWizard: 'PBE ਬਣਾਓ',
    navTariff: 'ਟੈਰਿਫ ਕੈਲਕੁਲੇਟਰ',
    navProhibited: 'ਪਾਬੰਦੀਸ਼ੁਦਾ ਵਸਤਾਂ',
    navLocator: 'DGNK ਲੱਭੋ',
    navTracker: 'ਪਾਰਸਲ ਟ੍ਰੈਕਰ',
    navKnowledge: 'SOP ਅਤੇ ਸਰਕੂਲਰ',
    navAssistant: 'AI ਸਲਾਹਕਾਰ',
    navWallet: 'ਵਾਲਿਟ',
    navBulk: 'ਬਲਕ ਅੱਪਲੋਡ',

    // Common
    search: 'ਖੋਜੋ',
    submit: 'ਜਮ੍ਹਾਂ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    save: 'ਸੇਵ ਕਰੋ',
    close: 'ਬੰਦ ਕਰੋ',
    back: 'ਪਿੱਛੇ',
    next: 'ਅੱਗੇ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    status: 'ਸਥਿਤੀ',
    date: 'ਮਿਤੀ',
    action: 'ਕਾਰਵਾਈ',
    details: 'ਵੇਰਵੇ',
    download: 'ਡਾਊਨਲੋਡ',
    print: 'ਪ੍ਰਿੰਟ'
  },

  TE: {
    // Telugu (తెలుగు)
    portalTitle: 'డాక్ ఘర్ నిర్యాత్ కేంద్ర',
    portalSubTitle: 'తపాలా శాఖ • ఇండియా పోస్ట్',
    ministryName: 'కమ్యూనికేషన్ల మంత్రిత్వ శాఖ',
    deptName: 'తపాలా శాఖ',
    skipToMain: 'ప్రధాన అంశానికి వెళ్లండి',
    toggleLanguage: 'భాష మార్చండి',
    quickLookup: 'త్వరిత పార్శిల్ ట్రాకింగ్',
    enterBarcode: '13-అంకెల UPU S10 బార్‌కోడ్ నమోదు చేయండి (ఉదా: EE928410294IN)',
    track: 'ట్రాక్ చేయండి',
    newExportPBE: 'కొత్త PBE సృష్టించండి',
    walletBalance: 'వ్యాలెట్ నిల్వ',
    activeParcels: 'యాక్టివ్ పార్శిళ్లు',
    welcome: 'స్వాగతం',
    exporter: 'ఎగుమతిదారు',
    tagline: 'డాక్ ఘర్ నిర్యాత్ కేంద్ర (DNK) డాష్‌బోర్డ్ • ఎలక్ట్రానిక్ PBE, తపాలా ఛార్జీలు & పార్శిల్ ట్రాకింగ్.',

    // Endless Ticker
    tickerMain: 'డాక్ ఘర్ నిర్యాత్ కేంద్ర (DNK)',
    tickerDept: 'తపాలా శాఖ',
    tickerPbe: 'డిజిటల్ పోస్టల్ బిల్ ఆఫ్ ఎక్స్‌పోర్ట్ (PBE)',
    tickerSub: 'ఇండియా పోస్ట్ ద్వారా కస్టమ్స్ నిబంధనలకు అనుగుణంగా ఎగుమతులు',

    // Quick Actions
    genPbeTitle: 'డిజిటల్ PBE సృష్టించండి',
    genPbeDesc: 'PBE-III (ఇ-కామర్స్), PBE-IV మరియు CN23 కస్టమ్స్ డిక్లరేషన్ తయారు చేయండి.',
    genPbeBtn: 'ప్రారంభించండి',

    tariffTitle: 'తపాలా ఛార్జీలు & కరెన్సీ',
    tariffDesc: 'Speed Post EMS, ITPS ఛార్జీలు మరియు CBIC కస్టమ్స్ మారకపు విలువలను లెక్కించండి.',
    tariffBtn: 'ధరలు చూడండి',

    trackTitle: 'పార్శిల్ ట్రాక్ చేయండి',
    trackDesc: 'UPU S10 బార్‌కోడ్ మరియు కస్టమ్స్ క్లియరెన్స్ స్థితిని ప్రత్యక్షంగా వీక్షించండి.',
    trackBtn: 'ఇప్పుడే ట్రాక్ చేయండి',

    aiAdvisorTitle: 'AI ఎగుమతి సలహాదారు',
    aiAdvisorDesc: 'HS కోడ్‌లు, RoDTEP ప్రయోజనాలు & DGFT నిబంధనలపై తక్షణ ధృవీకరించిన సలహా.',
    aiAdvisorBtn: 'AI ని అడగండి',

    // Dashboard sections
    recentConsignments: 'ఇటీవలి ఎగుమతి పార్శిళ్లు',
    viewAllShipments: 'అన్నీ చూడండి',
    exportReadiness: 'ఎగుమతి సంసిద్ధత',
    manage: 'నిర్వహించండి',
    dnkRegistration: 'DGNK పోర్టల్ నమోదు',
    active: 'యాక్టివ్',
    iecRegistration: 'IEC నమోదు (DGFT)',
    gstLut: 'GST లెటర్ ఆఫ్ అండర్‌టేకింగ్ (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'డాష్‌బోర్డ్',
    navWizard: 'PBE సృష్టించండి',
    navTariff: 'టారిఫ్ కాలిక్యులేటర్',
    navProhibited: 'నిషేధిత వస్తువులు',
    navLocator: 'DGNK కనుగొనండి',
    navTracker: 'పార్శిల్ ట్రాకింగ్',
    navKnowledge: 'SOP & సర్క్యులర్లు',
    navAssistant: 'AI సలహాదారు',
    navWallet: 'వ్యాలెట్',
    navBulk: 'బల్క్ అప్‌లోడ్',

    // Common
    search: 'వెతకండి',
    submit: 'సమర్పించండి',
    cancel: 'రద్దు చేయండి',
    save: 'సేవ్ చేయండి',
    close: 'మూసివేయండి',
    back: 'వెనుకకు',
    next: 'తరువాత',
    loading: 'లోడ్ అవుతోంది...',
    status: 'స్థితి',
    date: 'తేదీ',
    action: 'చర్య',
    details: 'వివరాలు',
    download: 'డౌన్‌లోడ్',
    print: 'ప్రింట్'
  },

  GU: {
    // Gujarati (ગુજરાતી)
    portalTitle: 'ડાક ઘર નિકાસ કેન્દ્ર',
    portalSubTitle: 'ટપાલ વિભાગ • ઇન્ડિયા પોસ્ટ',
    ministryName: 'સંચાર મંત્રાલય',
    deptName: 'ટપાલ વિભાગ',
    skipToMain: 'મુખ્ય સામગ્રી પર જાઓ',
    toggleLanguage: 'ભાષા બદલો',
    quickLookup: 'ઝડપી પાર્સલ ટ્રેકિંગ',
    enterBarcode: '13-અંકનો UPU S10 બારકોડ દાખલ કરો (દા.ત. EE928410294IN)',
    track: 'ટ્રેક કરો',
    newExportPBE: 'નવું PBE બનાવો',
    walletBalance: 'વોલેટ બેલેન્સ',
    activeParcels: 'સક્રિય પાર્સલ',
    welcome: 'નમસ્તે',
    exporter: 'નિકાસકાર',
    tagline: 'ડાક ઘર નિકાસ કેન્દ્ર (DNK) ડેશબોર્ડ • ઇલેક્ટ્રોનિક PBE, ટપાલ દરો અને પાર્સલ ટ્રેકિંગ.',

    // Endless Ticker
    tickerMain: 'ડાક ઘર નિકાસ કેન્દ્ર (DNK)',
    tickerDept: 'ટપાલ વિભાગ',
    tickerPbe: 'ડિજિટલ પોસ્ટલ બિલ ઓફ એક્સપોર્ટ (PBE)',
    tickerSub: 'ઇન્ડિયા પોસ્ટ દ્વારા કસ્ટમ્સ નિયમો અનુસાર નિકાસ',

    // Quick Actions
    genPbeTitle: 'ડિજિટલ PBE બનાવો',
    genPbeDesc: 'PBE-III (ઈ-કોમર્સ), PBE-IV અને CN23 કસ્ટમ્સ ઘોષણા તૈયાર કરો.',
    genPbeBtn: 'શરૂ કરો',

    tariffTitle: 'ટપાલ દર અને ચલણ',
    tariffDesc: 'Speed Post EMS, ITPS દરો અને અધિકૃત CBIC વિનિમય દરો ગણો.',
    tariffBtn: 'દરો જુઓ',

    trackTitle: 'પાર્સલ ટ્રેક કરો',
    trackDesc: 'UPU S10 બારકોડ અને કસ્ટમ્સ ક્લિયરન્સ સ્થિતિ લાઈવ જુઓ.',
    trackBtn: 'હમણાં ટ્રેક કરો',

    aiAdvisorTitle: 'AI નિકાસ સલાહકાર',
    aiAdvisorDesc: 'HS કોડ, RoDTEP લાભો અને DGFT નિયમો પર ત્વરિત પ્રમાણિત સલાહ.',
    aiAdvisorBtn: 'AI ને પૂછો',

    // Dashboard sections
    recentConsignments: 'તાજેતરના નિકાસ પાર્સલ',
    viewAllShipments: 'બધા જુઓ',
    exportReadiness: 'નિકાસ સજ્જતા',
    manage: 'સંચાલન',
    dnkRegistration: 'DGNK પોર્ટલ નોંધણી',
    active: 'સક્રિય',
    iecRegistration: 'IEC નોંધણી (DGFT)',
    gstLut: 'GST લેટર ઓફ અંડરટેકિંગ (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'ડેશબોર્ડ',
    navWizard: 'PBE બનાવો',
    navTariff: 'ટેરિફ કેલ્ક્યુલેટર',
    navProhibited: 'પ્રતિબંધિત વસ્તુઓ',
    navLocator: 'DGNK શોધો',
    navTracker: 'પાર્સલ ટ્રેકર',
    navKnowledge: 'SOP અને પરિપત્રો',
    navAssistant: 'AI સલાહકાર',
    navWallet: 'વોલેટ',
    navBulk: 'બલ્ક અપલોડ',

    // Common
    search: 'શોધો',
    submit: 'સબમિટ કરો',
    cancel: 'રદ કરો',
    save: 'સાચવો',
    close: 'બંધ કરો',
    back: 'પાછળ',
    next: 'આગળ',
    loading: 'લોડ થઈ રહ્યું છે...',
    status: 'સ્થિતિ',
    date: 'તારીખ',
    action: 'ક્રિયા',
    details: 'વિગતો',
    download: 'ડાઉનલોડ',
    print: 'પ્રિન્ટ'
  },

  MAI: {
    // Maithili (मैथिली)
    portalTitle: 'डाक घर निर्यात केंद्र',
    portalSubTitle: 'डाक विभाग • भारतीय डाक',
    ministryName: 'संचार मंत्रालय',
    deptName: 'डाक विभाग',
    skipToMain: 'मुख्य सामग्री पर जाऊ',
    toggleLanguage: 'भाषा बदलू',
    quickLookup: 'त्वरित पार्सल ट्रैकिंग',
    enterBarcode: '13-अंकक UPU S10 बारकोड दर्ज करू (उदा: EE928410294IN)',
    track: 'ट्रैक करू',
    newExportPBE: 'नव PBE बनाउ',
    walletBalance: 'फ्रैंकिंग बैलेंस',
    activeParcels: 'सक्रिय पार्सल',
    welcome: 'प्रणाम',
    exporter: 'निर्यातक',
    tagline: 'डाक घर निर्यात केंद्र (DNK) डैशबोर्ड • इलेक्ट्रॉनिक PBE, डाक दर आ पार्सल ट्रैकिंग।',

    // Endless Ticker
    tickerMain: 'डाक घर निर्यात केंद्र (DNK)',
    tickerDept: 'डाक विभाग',
    tickerPbe: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट (PBE)',
    tickerSub: 'भारतीय डाकक माध्यम सं सीमा शुल्क 48/2018 अनुरूप निर्यात',

    // Quick Actions
    genPbeTitle: 'डिजिटल PBE बनाउ',
    genPbeDesc: 'PBE-III (ई-कॉमर्स), PBE-IV आ CN23 सीमा शुल्क घोषणा तैयार करू।',
    genPbeBtn: 'शुरू करू',

    tariffTitle: 'डाक दर आ मुद्रा',
    tariffDesc: 'Speed Post EMS, ITPS दर आ CBIC सीमा शुल्क विनिमय दर निकालू।',
    tariffBtn: 'दर देखू',

    trackTitle: 'पार्सल ट्रैक करू',
    trackDesc: 'UPU S10 बारकोड आ कस्टम्स Out-of-Charge स्थिति लाइव देखू।',
    trackBtn: 'ट्रैक करू',

    aiAdvisorTitle: 'AI निर्यात सलाहकार',
    aiAdvisorDesc: 'HS कोड, RoDTEP लाभ आ DGFT नियमक प्रमाणित सलाह तत्काल प्राप्त करू।',
    aiAdvisorBtn: 'AI सं पुछू',

    // Dashboard sections
    recentConsignments: 'हालक निर्यात पार्सल',
    viewAllShipments: 'सभ देखू',
    exportReadiness: 'निर्यात तत्परता',
    manage: 'प्रबंधन',
    dnkRegistration: 'DGNK पोर्टल पंजीकरण',
    active: 'सक्रिय',
    iecRegistration: 'IEC पंजीकरण (DGFT)',
    gstLut: 'GST लेटर ऑफ अंडरटेकिंग (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'डैशबोर्ड',
    navWizard: 'PBE जनरेट करू',
    navTariff: 'डाक दर कैलकुलेटर',
    navProhibited: 'प्रतिबंधित वस्तु',
    navLocator: 'DGNK खोजू',
    navTracker: 'पार्सल ट्रैकिंग',
    navKnowledge: 'नियम आ SOP',
    navAssistant: 'AI सलाहकार',
    navWallet: 'वॉलेट',
    navBulk: 'बल्क अपलोड',

    // Common
    search: 'खोजू',
    submit: 'जमा करू',
    cancel: 'रद्द करू',
    save: 'सहेजू',
    close: 'बंद करू',
    back: 'पाछाँ',
    next: 'आगाँ',
    loading: 'लोड भ रहल अछि...',
    status: 'स्थिति',
    date: 'दिनांक',
    action: 'कार्य',
    details: 'विवरण',
    download: 'डाउनलोड',
    print: 'प्रिंट'
  },

  FR: {
    // French (Français)
    portalTitle: 'DAK GHAR NIRYAT KENDRA',
    portalSubTitle: 'Département des Postes • India Post',
    ministryName: 'Ministère des Communications',
    deptName: 'Département des Postes',
    skipToMain: 'Passer au contenu principal',
    toggleLanguage: 'Changer de langue',
    quickLookup: 'Suivi rapide de colis',
    enterBarcode: 'Entrez le code-barres UPU S10 à 13 chiffres (ex. EE928410294IN)',
    track: 'Suivre',
    newExportPBE: 'Nouvel Export (PBE)',
    walletBalance: 'Solde du portefeuille',
    activeParcels: 'Colis actifs',
    welcome: 'Bienvenue',
    exporter: 'Exportateur',
    tagline: 'Tableau de bord Dak Ghar Niryat Kendra • Créez des déclarations postales PBE, consultez les tarifs et suivez vos envois.',

    // Endless Ticker
    tickerMain: 'DAK GHAR NIRYAT KENDRA',
    tickerDept: 'DÉPARTEMENT DES POSTES',
    tickerPbe: 'BORDEREAU D\'EXPORTATION POSTALE NUMÉRIQUE (PBE)',
    tickerSub: 'EXPORTATIONS CONFORMES AUX NORMES DOUANIÈRES CBIC VIA INDIA POST',

    // Quick Actions
    genPbeTitle: 'Générer PBE',
    genPbeDesc: 'Créez les déclarations postales PBE-III/IV avec étiquette douanière CN23.',
    genPbeBtn: 'Commencer',

    tariffTitle: 'Tarifs & Devises',
    tariffDesc: 'Calculez les frais de port en direct avec les taux de change douaniers CBIC.',
    tariffBtn: 'Voir les tarifs',

    trackTitle: 'Suivre un envoi',
    trackDesc: 'Suivi en temps réel des articles UPU S10 et dédouanement FPO.',
    trackBtn: 'Suivre',

    aiAdvisorTitle: 'Conseiller IA Export',
    aiAdvisorDesc: 'Réponses instantanées sur les codes SH, avantages RoDTEP et règles DGFT.',
    aiAdvisorBtn: 'Demander à l\'IA',

    // Dashboard sections
    recentConsignments: 'Envois récents d\'exportation',
    viewAllShipments: 'Voir tous les envois',
    exportReadiness: 'Préparation à l\'export',
    manage: 'Gérer',
    dnkRegistration: 'Inscription au portail DGNK',
    active: 'Actif',
    iecRegistration: 'Code Import-Export IEC (DGFT)',
    gstLut: 'Lettre d\'engagement GST (LUT)',
    zeroIgst: '0% IGST',

    // Navigation Tabs
    navDashboard: 'Tableau de bord',
    navWizard: 'Générer PBE',
    navTariff: 'Calculateur de tarif',
    navProhibited: 'Articles interdits',
    navLocator: 'Trouver un DGNK',
    navTracker: 'Suivi de colis',
    navKnowledge: 'SOP & Circulaires',
    navAssistant: 'Conseiller IA',
    navWallet: 'Portefeuille',
    navBulk: 'Import groupé',

    // Common
    search: 'Rechercher',
    submit: 'Soumettre',
    cancel: 'Annuler',
    save: 'Enregistrer',
    close: 'Fermer',
    back: 'Retour',
    next: 'Suivant',
    loading: 'Chargement...',
    status: 'Statut',
    date: 'Date',
    action: 'Action',
    details: 'Détails',
    download: 'Télécharger',
    print: 'Imprimer'
  }
};

export const useTranslation = (lang: SupportedLanguage) => {
  const currentLang = translations[lang] || translations.EN;
  
  const t = (key: string, defaultVal?: string): string => {
    return currentLang[key] || translations.EN[key] || defaultVal || key;
  };

  return { t, currentLang, language: lang };
};
