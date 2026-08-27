import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  Sparkles, 
  Package, 
  Building2, 
  FileText, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Filter, 
  BadgeCheck, 
  AlertCircle,
  RefreshCw,
  Award,
  Layers,
  FileCheck2,
  Lock,
  CheckCheck
} from 'lucide-react';
import { ExporterProfile } from '../types';

export interface ExportChecklistProps {
  profile: ExporterProfile;
  language: 'EN' | 'HI';
  onNavigate: (tab: string) => void;
  onOpenProfile: () => void;
}

export type ProductCategory = 
  | 'handicrafts'
  | 'textiles'
  | 'spices_tea'
  | 'jewellery'
  | 'leather'
  | 'ayush_herbal'
  | 'electronics';

interface CategoryConfig {
  id: ProductCategory;
  nameEn: string;
  nameHi: string;
  badge: string;
  sampleHsCode: string;
  hsDescription: string;
  rodtepRate: string;
  council: string;
  specialCertificates: {
    titleEn: string;
    titleHi: string;
    description: string;
    authority: string;
    required: boolean;
  }[];
}

const CATEGORY_CONFIGS: Record<ProductCategory, CategoryConfig> = {
  handicrafts: {
    id: 'handicrafts',
    nameEn: 'Handicrafts & Woodware (Ch 44/68/74)',
    nameHi: 'हस्तशिल्प व काष्ठ कला (अध्याय 44/68)',
    badge: 'High RoDTEP',
    sampleHsCode: '4420.10.00 / 6802.21.00',
    hsDescription: 'Statuettes & wooden ornamental articles / carved stone artwork',
    rodtepRate: '3.0% - 4.3%',
    council: 'EPCH (Export Promotion Council for Handicrafts)',
    specialCertificates: [
      {
        titleEn: 'VRIKSH / CITES Timber Legality Certificate',
        titleHi: 'वृक्ष / CITES इमारती लकड़ी वैधता प्रमाण पत्र',
        description: 'Required if exporting Dalbergia sissoo (Sheesham) or Rosewood wooden crafts.',
        authority: 'EPCH / MoEFCC',
        required: true
      },
      {
        titleEn: 'EPCH RCMC Registration',
        titleHi: 'EPCH सदस्यता प्रमाण पत्र (RCMC)',
        description: 'Registration-cum-Membership Certificate for claiming export duty drawbacks & RoDTEP.',
        authority: 'EPCH',
        required: false
      }
    ]
  },
  textiles: {
    id: 'textiles',
    nameEn: 'Handloom & Silk Apparels (Ch 50-63)',
    nameHi: 'हथकरघा, सिल्क व वस्त्र (अध्याय 50-63)',
    badge: 'RoSCTL Scheme',
    sampleHsCode: '6214.10.00 / 5007.20.00',
    hsDescription: 'Shawls, scarves, mufflers of pure silk or handloom cotton fabrics',
    rodtepRate: '4.5% - 5.5% (RoSCTL)',
    council: 'Texprocil / Silk Mark Organization / AEPC',
    specialCertificates: [
      {
        titleEn: 'Silk Mark / Handloom Mark Authentication',
        titleHi: 'सिल्क मार्क / हैंडलूम मार्क प्रमाणन',
        description: 'Quality assurance tag certifying 100% genuine natural silk or artisan handloom weave.',
        authority: 'Silk Mark Org of India / Ministry of Textiles',
        required: false
      },
      {
        titleEn: 'Textiles Committee Free from Azo Dyes Certificate',
        titleHi: 'टेक्सटाइल समिति गैर-हानिकारक रंग परीक्षण रिपोर्ट',
        description: 'Mandatory EU / UK REACH compliance proving zero banned aromatic amine azo dyes.',
        authority: 'Textiles Committee India',
        required: true
      }
    ]
  },
  spices_tea: {
    id: 'spices_tea',
    nameEn: 'Spices, Herbal Tea & Organics (Ch 09/12)',
    nameHi: 'मसाले, चाय व जैविक उत्पाद (अध्याय 09/12)',
    badge: 'Phyto Mandatory',
    sampleHsCode: '0910.30.20 / 0902.40.10',
    hsDescription: 'Turmeric powder (Curcuma), Darjeeling organic orthodox black tea',
    rodtepRate: '2.5% - 3.5%',
    council: 'Spices Board of India / Tea Board / APEDA',
    specialCertificates: [
      {
        titleEn: 'Phytosanitary Certificate (Plant Quarantine)',
        titleHi: 'पादप संगरोध प्रमाण पत्र (Phytosanitary)',
        description: 'Mandatory government phytosanitary clearance certifying consignment is free from pests.',
        authority: 'Directorate of Plant Protection, Quarantine & Storage',
        required: true
      },
      {
        titleEn: 'Spices Board CRES / FSSAI Export NOC',
        titleHi: 'स्पाइस बोर्ड CRES / FSSAI निर्यात लाइसेंस',
        description: 'Certificate of Registration as Exporter of Spices (CRES) and commercial FSSAI export endorsement.',
        authority: 'Spices Board India / FSSAI',
        required: true
      }
    ]
  },
  jewellery: {
    id: 'jewellery',
    nameEn: 'Gems & Fashion Jewellery (Ch 71)',
    nameHi: 'रत्न व आभूषण (अध्याय 71)',
    badge: 'Special Customs',
    sampleHsCode: '7113.11.00 / 7117.90.90',
    hsDescription: 'Silver jewellery with semi-precious stones & imitation fashion jewellery',
    rodtepRate: '2.0% - 2.8%',
    council: 'GJEPC (Gem & Jewellery Export Promotion Council)',
    specialCertificates: [
      {
        titleEn: 'BIS Hallmark / Purity Certificate',
        titleHi: 'BIS हॉलमार्क शुद्धता प्रमाण पत्र',
        description: 'Purity certification for precious metal content (Gold/Silver 925).',
        authority: 'Bureau of Indian Standards',
        required: true
      },
      {
        titleEn: 'Non-Precious Declaration for Imitation Items',
        titleHi: 'गैर-कीमती सामग्री घोषणा (इमिटेशन ज्वेलरी)',
        description: 'Self-declaration declaring base metal without precious gold/platinum plating.',
        authority: 'Customs CBIC (Circular 14/2018)',
        required: false
      }
    ]
  },
  leather: {
    id: 'leather',
    nameEn: 'Leather Goods & Footwear (Ch 41/42/64)',
    nameHi: 'चमड़े के उत्पाद व जूते (अध्याय 41/42)',
    badge: 'CLE Registered',
    sampleHsCode: '4202.21.90 / 6403.59.00',
    hsDescription: 'Handbags with outer surface of leather and leather footwear',
    rodtepRate: '3.0% - 4.0%',
    council: 'CLE (Council for Leather Exports)',
    specialCertificates: [
      {
        titleEn: 'Non-Wild Animal Species Declaration',
        titleHi: 'गैर-वन्यजीव पशु चमड़ा घोषणा',
        description: 'Certificate stating leather is derived from domesticated bovine/ovine animals, not banned wildlife.',
        authority: 'Wildlife Crime Control Bureau (WCCB)',
        required: true
      }
    ]
  },
  ayush_herbal: {
    id: 'ayush_herbal',
    nameEn: 'AYUSH, Ayurveda & Natural Wellness (Ch 30/33)',
    nameHi: 'आयुष, आयुर्वेद व हर्बल उत्पाद (अध्याय 30/33)',
    badge: 'AYUSH GMP',
    sampleHsCode: '3004.90.11 / 3304.99.10',
    hsDescription: 'Medicaments of Ayurvedic system / herbal beauty preparations',
    rodtepRate: '2.5% - 3.8%',
    council: 'Pharmexcil / AYUSH Ministry',
    specialCertificates: [
      {
        titleEn: 'AYUSH Manufacturing License & GMP Certificate',
        titleHi: 'आयुष निर्माण लाइसेंस व GMP प्रमाण पत्र',
        description: 'Good Manufacturing Practices certificate issued by State AYUSH Licensing Authority.',
        authority: 'Ministry of AYUSH',
        required: true
      },
      {
        titleEn: 'Heavy Metal & Microbial Safety Test Report',
        titleHi: 'भारी धातु व सुरक्षा परीक्षण रिपोर्ट',
        description: 'NABL accredited lab test report certifying Lead, Cadmium, Mercury within WHO limits.',
        authority: 'NABL Lab / Pharmexcil',
        required: true
      }
    ]
  },
  electronics: {
    id: 'electronics',
    nameEn: 'Engineering, Hardware & Electronics (Ch 84/85)',
    nameHi: 'इंजीनियरिंग व इलेक्ट्रॉनिक्स (अध्याय 84/85)',
    badge: 'CE/RoHS & MSDS',
    sampleHsCode: '8504.40.90 / 8481.80.30',
    hsDescription: 'Static converters / industrial brass valves and electronic modules',
    rodtepRate: '1.8% - 3.0%',
    council: 'EEPC India / ESC India',
    specialCertificates: [
      {
        titleEn: 'Lithium Battery UN 38.3 & MSDS (if battery-operated)',
        titleHi: 'लिथियम बैटरी UN 38.3 व सुरक्षा डेटा शीट (MSDS)',
        description: 'Mandatory ICAO/IATA dangerous goods test summary for equipment containing lithium cells.',
        authority: 'ICAO / India Post Air Security',
        required: true
      }
    ]
  }
};

export const ExportChecklist: React.FC<ExportChecklistProps> = ({
  profile,
  language,
  onNavigate,
  onOpenProfile,
}) => {
  const isHindi = language === 'HI';

  // Determine initial category
  const getInitialCategory = (): ProductCategory => {
    if (profile.businessCategory) {
      const lower = profile.businessCategory.toLowerCase();
      if (lower.includes('textile') || lower.includes('handloom') || lower.includes('silk')) return 'textiles';
      if (lower.includes('spice') || lower.includes('tea') || lower.includes('food')) return 'spices_tea';
      if (lower.includes('jewel') || lower.includes('gem')) return 'jewellery';
      if (lower.includes('leather')) return 'leather';
      if (lower.includes('ayush') || lower.includes('herbal') || lower.includes('cosmetic')) return 'ayush_herbal';
      if (lower.includes('elect') || lower.includes('engineer')) return 'electronics';
    }
    return 'handicrafts';
  };

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(getInitialCategory);
  const [expandedStep, setExpandedStep] = useState<string | null>('step-iec');

  // Checklist state tracked locally with initial smart-defaults from exporter profile
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({
    'step-iec': Boolean(profile.iecCode && profile.iecCode.length >= 10),
    'step-gst-lut': Boolean(profile.hasLUT || profile.gstin),
    'step-ad-code': Boolean(profile.adCode),
    'step-hs-code': true, // User identified their product category
    'step-invoice': false,
    'step-pbe-form': false,
    'step-category-cert': false,
    'step-packaging-sealing': false,
  });

  // Sync with profile updates
  useEffect(() => {
    setCheckedSteps(prev => ({
      ...prev,
      'step-iec': Boolean(profile.iecCode && profile.iecCode.length >= 10),
      'step-gst-lut': Boolean(profile.hasLUT || profile.gstin),
      'step-ad-code': Boolean(profile.adCode),
    }));
  }, [profile.iecCode, profile.hasLUT, profile.gstin, profile.adCode]);

  const toggleStep = (stepId: string) => {
    setCheckedSteps(prev => ({
      ...prev,
      [stepId]: !prev[stepId]
    }));
  };

  const currentCategoryConfig = CATEGORY_CONFIGS[selectedCategory];

  // Core Mandatory Steps
  const mandatorySteps = [
    {
      id: 'step-iec',
      number: '01',
      titleEn: 'Import Export Code (IEC) Verification',
      titleHi: 'आयात निर्यात कोड (IEC) सत्यापन',
      isCompleted: checkedSteps['step-iec'],
      required: true,
      badge: profile.iecCode ? `Verified: ${profile.iecCode}` : 'Action Required',
      badgeColor: profile.iecCode ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800',
      descEn: 'A 10-digit PAN-based alphanumeric code issued by DGFT. Mandatory for all commercial exports via DGNK.',
      descHi: 'डीजीएफटी द्वारा जारी 10-अंकीय पैन-आधारित कोड। DGNK के माध्यम से वाणिज्यिक निर्यात हेतु अनिवार्य।',
      statutoryRef: 'DGFT FTP 2023 Para 2.05 / CBIC Circular 14/2018',
      actionLabelEn: profile.iecCode ? 'View IEC Details' : 'Configure IEC in Profile',
      actionLabelHi: profile.iecCode ? 'IEC विवरण देखें' : 'प्रोफ़ाइल में IEC दर्ज करें',
      action: onOpenProfile,
      tipEn: 'For small gifts up to ₹5,00,000 sent by individuals, Para 2.07 exemption applies with PAN.',
      tipHi: 'व्यक्तिगत ₹5 लाख तक के उपहार पार्सल पर पैरा 2.07 के तहत IEC से छूट प्राप्त है।'
    },
    {
      id: 'step-gst-lut',
      number: '02',
      titleEn: 'GSTIN & Letter of Undertaking (LUT) Filing',
      titleHi: 'GSTIN व अंडरटेकिंग पत्र (LUT - Form RFD-11)',
      isCompleted: checkedSteps['step-gst-lut'],
      required: true,
      badge: profile.hasLUT ? 'LUT Active (0% IGST)' : (profile.gstin ? 'GSTIN Present' : 'Pending'),
      badgeColor: profile.hasLUT ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800',
      descEn: 'File Form GST RFD-11 online on the GST portal to export at 0% IGST without paying tax upfront.',
      descHi: 'जीएसटी पोर्टल पर फॉर्म RFD-11 दाखिल करें ताकि बिना अग्रिम टैक्स चुकाए 0% IGST पर निर्यात किया जा सके।',
      statutoryRef: 'CGST Act Section 16(3) / Rule 96A',
      actionLabelEn: 'Update GST/LUT Status',
      actionLabelHi: 'GST/LUT स्थिति अपडेट करें',
      action: onOpenProfile,
      tipEn: 'Zero-rated supply: Saves working capital by avoiding the IGST payment & refund cycle.',
      tipHi: 'LUT से निर्यातक की कार्यशील पूंजी नहीं फंसती और तुरंत शून्य टैक्स चालान बनता है।'
    },
    {
      id: 'step-ad-code',
      number: '03',
      titleEn: 'Authorized Dealer (AD) Code & Bank Account',
      titleHi: 'अधिकृत डीलर (AD) कोड व बैंक खाता लिंकिंग',
      isCompleted: checkedSteps['step-ad-code'],
      required: true,
      badge: profile.adCode ? 'AD Code Linked' : 'Recommended',
      badgeColor: profile.adCode ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700',
      descEn: '14-digit bank branch code registered on ICEGATE to reconcile foreign currency inward remittances (e-BRC).',
      descHi: 'ICEGATE पर पंजीकृत 14-अंकीय बैंक कोड, जो विदेशी मुद्रा आवक (e-BRC) और फेमा अनुपालन के लिए आवश्यक है।',
      statutoryRef: 'RBI FEMA Notification No. 23(R)/2015-RB',
      actionLabelEn: 'Check Bank Registration',
      actionLabelHi: 'बैंक विवरण जांचें',
      action: onOpenProfile,
      tipEn: 'Ensures smooth EDPMS reconciliation and automated RoDTEP scrip credit directly to bank.',
      tipHi: 'विदेशी मुद्रा आवक का सीधा बैंक खाता मिलान और RoDTEP लाभ प्राप्त करने में सहायक।'
    },
    {
      id: 'step-hs-code',
      number: '04',
      titleEn: `8-Digit HS Code Classification (${currentCategoryConfig.sampleHsCode})`,
      titleHi: `8-अंकीय HS कोड वर्गीकरण (${currentCategoryConfig.sampleHsCode})`,
      isCompleted: checkedSteps['step-hs-code'],
      required: true,
      badge: `RoDTEP: ${currentCategoryConfig.rodtepRate}`,
      badgeColor: 'bg-purple-100 text-purple-800',
      descEn: `Harmonized System (ITC-HS) code for ${currentCategoryConfig.nameEn}. Declared on CN23 & PBE forms.`,
      descHi: `${currentCategoryConfig.nameHi} के लिए अधिकृत ITC-HS कोड। CN23 और PBE फॉर्म में दर्ज होता है।`,
      statutoryRef: 'Customs Tariff Act, 1975 & CBIC WCO Nomenclature',
      actionLabelEn: 'Ask AI for HS Code',
      actionLabelHi: 'AI से HS कोड पूछें',
      action: () => onNavigate('assistant'),
      tipEn: `Sample standard classification: ${currentCategoryConfig.sampleHsCode} (${currentCategoryConfig.hsDescription}).`,
      tipHi: `नमूना वर्गीकरण: ${currentCategoryConfig.sampleHsCode} (${currentCategoryConfig.hsDescription})।`
    },
    {
      id: 'step-category-cert',
      number: '05',
      titleEn: `Category-Specific Export Certifications (${currentCategoryConfig.council})`,
      titleHi: `श्रेणी-विशिष्ट प्रमाणन व NOC (${currentCategoryConfig.council})`,
      isCompleted: checkedSteps['step-category-cert'],
      required: false,
      badge: currentCategoryConfig.badge,
      badgeColor: 'bg-amber-100 text-amber-800',
      descEn: `Export council registrations, lab testing, and quality standards for ${currentCategoryConfig.nameEn}.`,
      descHi: `${currentCategoryConfig.nameHi} के लिए एक्सपोर्ट काउंसिल पंजीकरण और विशेष गुणवत्ता प्रमाण पत्र।`,
      statutoryRef: `${currentCategoryConfig.council} & Foreign Trade Policy`,
      actionLabelEn: 'Verify Category Rules',
      actionLabelHi: 'नियम व प्रमाण पत्र जांचें',
      action: () => onNavigate('knowledge'),
      tipEn: currentCategoryConfig.specialCertificates.map(c => `${c.titleEn}: ${c.description}`).join(' '),
      tipHi: currentCategoryConfig.specialCertificates.map(c => `${c.titleHi}: ${c.description}`).join(' ')
    },
    {
      id: 'step-invoice',
      number: '06',
      titleEn: 'Export Commercial Invoice & Value Declaration',
      titleHi: 'वाणिज्यिक निर्यात बीजक (Invoice) व घोषणा',
      isCompleted: checkedSteps['step-invoice'],
      required: true,
      badge: 'FEMA Compliant',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      descEn: 'Itemized commercial invoice with currency, Incoterms (DAP/CPT), recipient address & consignor sign.',
      descHi: 'मुद्रा (USD/EUR), खरीदार का पता, वस्तु का वजन व मूल्य दर्शाने वाला हस्ताक्षरित वाणिज्यिक चालान।',
      statutoryRef: 'UPU Convention Letter Post Regulations Art 19-001',
      actionLabelEn: 'Create with PBE Wizard',
      actionLabelHi: 'PBE विज़ार्ड से बनाएं',
      action: () => onNavigate('wizard'),
      tipEn: 'Always enclose 3 copies of Commercial Invoice and 1 Packing List in the transparent pouch.',
      tipHi: 'पार्सल के बाहरी पारदर्शी पाउच में चालान की 3 प्रतियां और 1 पैकिंग सूची अवश्य संलग्न करें।'
    },
    {
      id: 'step-pbe-form',
      number: '07',
      titleEn: 'Digital Postal Bill of Export (PBE-I / PBE-II) Filing',
      titleHi: 'डिजिटल पोस्टल बिल ऑफ एक्सपोर्ट (e-PBE) जनरेशन',
      isCompleted: checkedSteps['step-pbe-form'],
      required: true,
      badge: 'Auto Barcode Franking',
      badgeColor: 'bg-red-100 text-[#C8102E]',
      descEn: 'Electronic declaration (PBE-II for e-commerce, PBE-I for regular) transmitted directly to Customs FPO EDI.',
      descHi: 'इलेक्ट्रॉनिक निर्यात घोषणा जो सीधे फॉरेन पोस्ट ऑफिस (FPO) कस्टम्स EDI सर्वर को भेजी जाती है।',
      statutoryRef: 'CBIC Postal Export Regulations 2018 (Notification 48/2018-Cus)',
      actionLabelEn: 'Start New PBE Now',
      actionLabelHi: 'नया PBE अभी बनाएं',
      action: () => onNavigate('wizard'),
      tipEn: 'Our DGNK Wizard automatically formats PBE-I/II and generates CN23 customs label with S10 tracking.',
      tipHi: 'हमारा DGNK विज़ार्ड स्वचालित रूप से PBE जनरेट करता है और S10 बारकोड फ्रैंकिंग तैयार करता है।'
    },
    {
      id: 'step-packaging-sealing',
      number: '08',
      titleEn: 'UPU Packaging & Security Compliance',
      titleHi: 'UPU पैकेजिंग व सुरक्षा सीलिंग मानक',
      isCompleted: checkedSteps['step-packaging-sealing'],
      required: true,
      badge: 'Air Cargo Safe',
      badgeColor: 'bg-blue-100 text-blue-800',
      descEn: 'Tamper-proof packaging with barcoded franking label, waterproof customs pouch and fragile cushioning.',
      descHi: 'सुरक्षित पैकेजिंग, स्पष्ट बारकोड लेबल, वाटरप्रूफ कस्टम्स पाउच व विमानन सुरक्षा दिशा-निर्देश।',
      statutoryRef: 'Universal Postal Union (UPU) Postal Security Standards S58',
      actionLabelEn: 'Check Prohibited Screener',
      actionLabelHi: 'प्रतिबंधित वस्तु जांच',
      action: () => onNavigate('prohibited'),
      tipEn: 'Ensure no liquid spillage, battery declaration compliance, and strong 5-ply outer corrugated box.',
      tipHi: 'सुनिश्चित करें कि कोई तरल रिसाव न हो और 5-प्लाई मजबूत बाहरी बॉक्स का उपयोग किया गया हो।'
    }
  ];

  const totalSteps = mandatorySteps.length;
  const completedCount = mandatorySteps.filter(s => s.isCompleted).length;
  const readinessPercentage = Math.round((completedCount / totalSteps) * 100);

  const isReadyForExport = readinessPercentage >= 75;

  return (
    <div className="bg-white border border-gray-200 rounded-[28px] p-6 sm:p-7 shadow-xs relative overflow-hidden">
      
      {/* Top Section with Title, Category Switcher & Export Readiness Badge */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 bg-[#C8102E] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
              <FileCheck2 className="w-3 h-3" />
              {isHindi ? 'निर्यात तैयारी चेकलिस्ट' : 'Export Preparation Checklist'}
            </span>
            <span className="text-xs text-gray-500 font-semibold">
              CBIC 14/2018 & DGFT FTP 2023
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            {isHindi ? 'निर्यात पूर्व वैधानिक व दस्तावेज़ सत्यापन' : 'Mandatory Export Preparation Steps'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-2xl">
            {isHindi
              ? 'DGNK के माध्यम से पार्सल बुक करने से पहले आवश्यक पंजीकरण, HS कोड और उत्पाद-विशिष्ट प्रमाणन जांचें।'
              : 'Track and complete statutory verifications (IEC, GST-LUT, HS Code, and certifications) tailored to your product category.'}
          </p>
        </div>

        {/* Readiness Meter Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 min-w-[240px] shrink-0">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              {isHindi ? 'निर्यात तत्परता' : 'Export Readiness'}
            </span>
            <span className={`text-sm font-black px-2 py-0.5 rounded-md ${
              isReadyForExport ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {readinessPercentage}% Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 rounded-full ${
                isReadyForExport 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-amber-500 to-[#C8102E]'
              }`}
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-gray-500 mt-2">
            <span>{completedCount} of {totalSteps} Steps Ready</span>
            {isReadyForExport ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCheck className="w-3.5 h-3.5" /> Ready for PBE
              </span>
            ) : (
              <span className="text-amber-700 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> Steps Remaining
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Category Selector Pills */}
      <div className="pt-5 pb-4">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>{isHindi ? 'उत्पाद श्रेणी चुनें' : 'Select Product Category for Tailored Compliance'}:</span>
          </label>
          <span className="text-[11px] text-[#C8102E] font-bold">
            {currentCategoryConfig.council}
          </span>
        </div>

        {/* Category selector chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {(Object.keys(CATEGORY_CONFIGS) as ProductCategory[]).map((catKey) => {
            const config = CATEGORY_CONFIGS[catKey];
            const isSelected = selectedCategory === catKey;

            return (
              <button
                key={catKey}
                onClick={() => setSelectedCategory(catKey)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 border shrink-0 ${
                  isSelected
                    ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-sm'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                }`}
              >
                <span>{isHindi ? config.nameHi.split('(')[0] : config.nameEn.split('(')[0]}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-black uppercase ${
                  isSelected ? 'bg-[#FFC107] text-[#C8102E]' : 'bg-gray-200 text-gray-700'
                }`}>
                  {config.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Intelligence Summary Banner */}
      <div className="bg-gradient-to-r from-amber-50/80 via-white to-amber-50/50 border border-amber-200/80 rounded-2xl p-4 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-[#C8102E] flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
            HS
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black text-gray-900">
                {currentCategoryConfig.nameEn}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded">
                RoDTEP Incentive: {currentCategoryConfig.rodtepRate}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              Standard HS Code: <strong className="font-mono text-[#C8102E]">{currentCategoryConfig.sampleHsCode}</strong> — {currentCategoryConfig.hsDescription}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('assistant')}
          className="self-start md:self-center px-3.5 py-1.5 bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
          <span>Ask AI Customs Advisor</span>
        </button>
      </div>

      {/* Steps List (Accordion / Interactive Cards) */}
      <div className="space-y-3">
        {mandatorySteps.map((step) => {
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={`rounded-2xl border transition-all ${
                step.isCompleted
                  ? 'bg-emerald-50/30 border-emerald-200/80'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Step Header Row */}
              <div 
                className="p-4 sm:p-4.5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none"
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  
                  {/* Interactive Toggle Checkbox Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStep(step.id);
                    }}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                      step.isCompleted
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 border border-gray-300'
                    }`}
                    title={step.isCompleted ? 'Mark step as incomplete' : 'Mark step as completed'}
                  >
                    {step.isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                  </button>

                  {/* Step Title & Subtitle */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] font-black text-gray-400 font-mono">
                        {step.number}
                      </span>
                      <h3 className={`text-sm font-bold truncate ${
                        step.isCompleted ? 'text-gray-900 line-through-none' : 'text-gray-900'
                      }`}>
                        {isHindi ? step.titleHi : step.titleEn}
                      </h3>
                      {step.badge && (
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${step.badgeColor}`}>
                          {step.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {isHindi ? step.descHi : step.descEn}
                    </p>
                  </div>
                </div>

                {/* Right Expand Arrow */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-gray-100 space-y-3 bg-gray-50/50 rounded-b-2xl">
                  
                  {/* Detailed Explanation & Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    <div className="md:col-span-2 bg-white p-3.5 rounded-xl border border-gray-200 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="font-bold uppercase tracking-wider text-[#C8102E]">
                          Statutory Requirement
                        </span>
                        <span className="font-mono font-medium text-gray-600">
                          {step.statutoryRef}
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        {isHindi ? step.descHi : step.descEn}
                      </p>
                      <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-xs text-[#8B6E00] flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFC107] shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Official Export Tip:</strong> {isHindi ? step.tipHi : step.tipEn}
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Button for Step */}
                    <div className="bg-white p-3.5 rounded-xl border border-gray-200 flex flex-col justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider block mb-1">
                          Action & Tool
                        </span>
                        <p className="text-xs font-bold text-gray-800">
                          {step.isCompleted ? 'Step is Marked Complete' : 'Perform Verification Now'}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <button
                          type="button"
                          onClick={step.action}
                          className="w-full py-2 px-3 rounded-xl bg-[#C8102E] hover:bg-[#A60D24] text-white text-xs font-black shadow-xs transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>{isHindi ? step.actionLabelHi : step.actionLabelEn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleStep(step.id)}
                          className="w-full py-1.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors"
                        >
                          {step.isCompleted ? 'Mark as Incomplete' : 'Toggle Completed'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Special Category Requirements if this is Step 05 */}
                  {step.id === 'step-category-cert' && (
                    <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-2 mt-2">
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>Specific Certificates for {currentCategoryConfig.nameEn}</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {currentCategoryConfig.specialCertificates.map((cert, cIdx) => (
                          <div key={cIdx} className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs">
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-bold text-gray-900">{cert.titleEn}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded uppercase ${
                                cert.required ? 'bg-red-100 text-[#C8102E]' : 'bg-gray-200 text-gray-700'
                              }`}>
                                {cert.required ? 'Mandatory' : 'Optional'}
                              </span>
                            </div>
                            <p className="text-gray-600 text-[11px] leading-snug">{cert.description}</p>
                            <p className="text-[10px] text-gray-400 font-semibold mt-1">Authority: {cert.authority}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Checklist Footer with Reset and Next Action */}
      <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-emerald-600" />
          <span>Compliant with Indian Postal Customs Regulations 2018 (PBE Notification 48/2018)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCheckedSteps({
                'step-iec': Boolean(profile.iecCode && profile.iecCode.length >= 10),
                'step-gst-lut': Boolean(profile.hasLUT || profile.gstin),
                'step-ad-code': Boolean(profile.adCode),
                'step-hs-code': true,
                'step-invoice': false,
                'step-pbe-form': false,
                'step-category-cert': false,
                'step-packaging-sealing': false,
              });
            }}
            className="text-gray-600 hover:text-gray-900 font-bold flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Checks</span>
          </button>

          <button
            onClick={() => onNavigate('wizard')}
            className="px-4 py-2 bg-[#C8102E] hover:bg-[#A60D24] text-white font-black rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Package className="w-3.5 h-3.5 text-[#FFC107]" />
            <span>Proceed to Create PBE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
