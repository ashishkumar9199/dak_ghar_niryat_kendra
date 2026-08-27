import React, { useState } from 'react';
import { Megaphone, ChevronRight, Pause, Play, Bell, ExternalLink } from 'lucide-react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';

interface NoticeTickerProps {
  language: SupportedLanguage;
  onNavigate?: (tab: string) => void;
  onOpenRagInspector?: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({
  language,
  onNavigate,
  onOpenRagInspector,
}) => {
  const isHindi = language === 'HI' || language === 'MAI';
  const t = translations[language] || translations.EN;
  const [isPaused, setIsPaused] = useState(false);

  const notices: Record<SupportedLanguage, Array<{ id: number; tag: string; text: string; linkTab: string }>> = {
    EN: [
      { id: 1, tag: 'CBIC 48/2018', text: 'Mandatory Electronic Postal Bill of Export (PBE-III for E-Commerce & PBE-IV for Commercial) via DNK Portal.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES Live', text: 'Direct ICES 1.5 FPO integration active for automated Customs Out-of-Charge (OOC) and ICEGATE e-BRC tracking.', linkTab: 'tracker' },
      { id: 3, tag: 'Zero IGST', text: 'Claim 0% IGST export billing upfront by submitting GST LUT Form RFD-11 under Section 16(3) CGST Act.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP Claim', text: 'Up to 5.5% RoDTEP & RoSCTL export duty remission directly credited to linked AD Code bank account.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 Countries', text: 'International Tracked Packet Service (ITPS) now covers 42 destination countries with end-to-end barcode scan.', linkTab: 'locator' }
    ],
    HI: [
      { id: 1, tag: 'कस्टम्स 48/2018', text: 'DNK पोर्टल के माध्यम से ई-कॉमर्स (PBE-III) और वाणिज्यिक निर्यात (PBE-IV) का इलेक्ट्रॉनिक फाइलिंग अनिवार्य।', linkTab: 'wizard' },
      { id: 2, tag: 'ICES लाइव', text: 'कस्टम्स आउट-ऑफ-चार्ज (OOC) और ICEGATE e-BRC ट्रैकिंग हेतु ICES 1.5 FPO सर्वर सीधा लाइव कनेक्टेड है।', linkTab: 'tracker' },
      { id: 3, tag: 'शून्य IGST', text: 'CGST अधिनियम धारा 16(3) के तहत GST LUT फॉर्म RFD-11 दर्ज कर 0% IGST शून्य-दर चालान प्राप्त करें।', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP लाभ', text: '5.5% तक का RoDTEP और RoSCTL निर्यात प्रोत्साहन सीधे बैंक खाते में क्रेडिट होगा।', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 देश', text: 'अंतरराष्ट्रीय ट्रैक्ड पैकेट सेवा (ITPS) अब बारकोड ट्रैकिंग के साथ 42 गंतव्य देशों में उपलब्ध है।', linkTab: 'locator' }
    ],
    KN: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK ಪೋರ್ಟಲ್ ಮೂಲಕ ಇ-ಕಾಮರ್ಸ್ (PBE-III) ಮತ್ತು ವಾಣಿಜ್ಯ ರಫ್ತು (PBE-IV) ಗಾಗಿ ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಫೈಲಿಂಗ್ ಕಡ್ಡಾಯ.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES ಲೈವ್', text: 'ಕಸ್ಟಮ್ಸ್ ಔಟ್-ಆಫ್-ಚಾರ್ಜ್ (OOC) ಮತ್ತು ಇ-ಬಿಆರ್‌ಸಿ ಟ್ರ್ಯಾಕಿಂಗ್‌ಗಾಗಿ ICES 1.5 FPO ಸರ್ವರ್ ನೇರ ಸಂಪರ್ಕ ಹೊಂದಿದೆ.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT ಫಾರ್ಮ್ RFD-11 ಸಲ್ಲಿಸುವ ಮೂಲಕ 0% IGST ರಫ್ತು ಬಿಲ್ಲಿಂಗ್ ಪಡೆಯಿರಿ.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP ಲಾಭ', text: '5.5% ವರೆಗಿನ RoDTEP ಮತ್ತು RoSCTL ರಫ್ತು ಪ್ರೋತ್ಸಾಹ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ನೇರವಾಗಿ ಜಮೆಯಾಗುತ್ತದೆ.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 ದೇಶಗಳು', text: 'ಅಂತಾರಾಷ್ಟ್ರೀಯ ಟ್ರ್ಯಾಕ್ಡ್ ಪ್ಯಾಕೆಟ್ ಸೇವೆ (ITPS) ಈಗ 42 ದೇಶಗಳಿಗೆ ಲಭ್ಯವಿದೆ.', linkTab: 'locator' }
    ],
    TA: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK போர்டல் மூலம் இ-காமர்ஸ் (PBE-III) மற்றும் வணிக ஏற்றுமதி (PBE-IV) மின்னணு தாக்கல் கட்டாயம்.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES நேரலை', text: 'சுங்க அனுமதி (OOC) மற்றும் e-BRC கண்காணிப்பிற்கு ICES 1.5 FPO நேரடி இணைப்பு பயன்பாட்டில் உள்ளது.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT படிவம் RFD-11 சமர்ப்பித்து 0% IGST ஏற்றுமதி விலைப்பட்டியலைப் பெறுங்கள்.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP பலன்', text: '5.5% வரை RoDTEP மற்றும் RoSCTL ஏற்றுமதி சலுகை வங்கி கணக்கில் நேரடியாக வரவு வைக்கப்படும்.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 நாடுகள்', text: 'சர்வதேச கண்காணிப்பு பார்சல் சேவை (ITPS) இப்போது 42 நாடுகளுக்குக் கிடைக்கிறது.', linkTab: 'locator' }
    ],
    ML: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK പോർട്ടൽ വഴി ഇ-കൊമേഴ്‌സ് (PBE-III), വാണിജ്യ കയറ്റുമതി (PBE-IV) ഇലക്ട്രോണിക് ഫയലിംഗ് നിർബന്ധമാണ്.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES ലൈവ്', text: 'കസ്റ്റംസ് ഒഒസി (OOC), e-BRC ട്രാക്കിംഗിനായി ICES 1.5 FPO സെർവർ നേരിട്ട് ബന്ധിപ്പിച്ചിരിക്കുന്നു.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT ഫോം RFD-11 സമർപ്പിച്ച് 0% IGST കയറ്റുമതി ഇൻവോയ്സ് ആനുകൂല്യം നേടുക.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP ആനുകൂല്യം', text: '5.5% വരെയുള്ള RoDTEP & RoSCTL ആനുകൂല്യങ്ങൾ ബാങ്ക് അക്കൗണ്ടിലേക്ക് നേരിട്ട് ലഭിക്കും.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 രാജ്യങ്ങൾ', text: 'ഇന്റർനാഷണൽ ട്രാക്ക്ഡ് പാക്കറ്റ് സർവീസ് (ITPS) ഇപ്പോൾ 42 രാജ്യങ്ങളിൽ ലഭ്യമാണ്.', linkTab: 'locator' }
    ],
    PA: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK ਪੋਰਟਲ ਰਾਹੀਂ ਈ-ਕਾਮਰਸ (PBE-III) ਅਤੇ ਵਪਾਰਕ ਨਿਰਯਾਤ (PBE-IV) ਦੀ ਇਲੈਕਟ੍ਰਾਨਿਕ ਫਾਈਲਿੰਗ ਲਾਜ਼ਮੀ ਹੈ।', linkTab: 'wizard' },
      { id: 2, tag: 'ICES ਲਾਈਵ', text: 'ਕਸਟਮਜ਼ ਆਊਟ-ਆਫ-ਚਾਰਜ (OOC) ਅਤੇ e-BRC ਟ੍ਰੈਕਿੰਗ ਲਈ ICES 1.5 FPO ਸਰਵਰ ਸਿੱਧਾ ਜੁੜਿਆ ਹੋਇਆ ਹੈ।', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT ਫਾਰਮ RFD-11 ਜਮ੍ਹਾਂ ਕਰਕੇ 0% IGST ਨਿਰਯਾਤ ਬਿਲਿੰਗ ਲਾਭ ਪ੍ਰਾਪਤ ਕਰੋ।', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP ਲਾਭ', text: '5.5% ਤੱਕ RoDTEP ਅਤੇ RoSCTL ਨਿਰਯਾਤ ਪ੍ਰੋਤਸਾਹਨ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਜਮ੍ਹਾ ਹੋਵੇਗਾ।', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 ਦੇਸ਼', text: 'ਅੰਤਰਰਾਸ਼ਟਰੀ ਟ੍ਰੈਕਡ ਪੈਕੇਟ ਸੇਵਾ (ITPS) ਹੁਣ 42 ਦੇਸ਼ਾਂ ਵਿੱਚ ਉਪਲਬਧ ਹੈ।', linkTab: 'locator' }
    ],
    TE: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK పోర్టల్ ద్వారా ఇ-కామర్స్ (PBE-III) మరియు వాణిజ్య ఎగుమతి (PBE-IV) ఎలక్ట్రానిక్ ఫైలింగ్ తప్పనిసరి.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES లైవ్', text: 'కస్టమ్స్ ఔట్-ఆఫ్-ఛార్జ్ (OOC) & e-BRC ట్రాకింగ్ కోసం ICES 1.5 FPO సర్వర్ నేరుగా కనెక్ట్ చేయబడింది.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT ఫారం RFD-11 సమర్పించి 0% IGST ఎగుమతి బిల్లింగ్ పొందండి.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP ప్రయోజనం', text: '5.5% వరకు RoDTEP మరియు RoSCTL ప్రోత్సాహకాలు నేరుగా బ్యాంక్ ఖాతాకు జమ అవుతాయి.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 దేశాలు', text: 'ఇంటర్నేషనల్ ట్రాక్డ్ ప్యాకెట్ సర్వీస్ (ITPS) ఇప్పుడు 42 దేశాలలో అందుబాటులో ఉంది.', linkTab: 'locator' }
    ],
    GU: [
      { id: 1, tag: 'CBIC 48/2018', text: 'DNK પોર્ટલ દ્વારા ઈ-કોમર્સ (PBE-III) અને વાણિજ્યિક નિકાસ (PBE-IV) નું ઇલેક્ટ્રોનિક ફાઇલિંગ ફરજિયાત.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES લાઈવ', text: 'કસ્ટમ્સ આઉટ-ઓફ-ચાર્જ (OOC) અને e-BRC ટ્રેકિંગ માટે ICES 1.5 FPO સર્વર સીધું જોડાયેલું છે.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'GST LUT ફોર્મ RFD-11 સબમિટ કરીને 0% IGST નિકાસ બિલિંગ મેળવો.', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP લાભ', text: '5.5% સુધી RoDTEP અને RoSCTL નિકાસ પ્રોત્સાહન સીધા બેંક ખાતામાં જમા થશે.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 દેશો', text: 'ઇન્ટરનેશનલ ટ્રેક્ડ પેકેટ સર્વિસ (ITPS) હવે 42 દેશોમાં ઉપલબ્ધ છે.', linkTab: 'locator' }
    ],
    MAI: [
      { id: 1, tag: 'कस्टम्स 48/2018', text: 'DNK पोर्टलक माध्यम सं ई-कॉमर्स (PBE-III) आ वाणिज्यिक निर्यात (PBE-IV) इलेक्ट्रॉनिक फाइलिंग अनिवार्य।', linkTab: 'wizard' },
      { id: 2, tag: 'ICES लाइव', text: 'कस्टम्स आउट-ऑफ-चार्ज (OOC) आ ICEGATE e-BRC ट्रैकिंग हेतु ICES 1.5 FPO सर्वर सीधा लाइव कनेक्टेड अछि।', linkTab: 'tracker' },
      { id: 3, tag: 'शून्य IGST', text: 'CGST अधिनियम धारा 16(3) केर अंतर्गत GST LUT फॉर्म RFD-11 दर्ज कए 0% IGST शून्य-दर चालान प्राप्त करू।', linkTab: 'dashboard' },
      { id: 4, tag: 'RoDTEP लाभ', text: '5.5% धरि केर RoDTEP आ RoSCTL निर्यात प्रोत्साहन सीधे बैंक खाता मे क्रेडिट होयत।', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 देश', text: 'अंतरराष्ट्रीय ट्रैक्ड पैकेट सेवा (ITPS) आब बारकोड ट्रैकिंग संग 42 देश मे उपलब्ध अछि।', linkTab: 'locator' }
    ],
    FR: [
      { id: 1, tag: 'CBIC 48/2018', text: 'Déclaration électronique obligatoire PBE-III (e-commerce) et PBE-IV (commercial) via le portail DNK.', linkTab: 'wizard' },
      { id: 2, tag: 'ICES En Direct', text: 'Intégration directe ICES 1.5 FPO active pour le dédouanement OOC et le suivi e-BRC ICEGATE.', linkTab: 'tracker' },
      { id: 3, tag: '0% IGST', text: 'Bénéficiez d\'une facturation à 0% d\'IGST avec le formulaire GST LUT RFD-11.', linkTab: 'dashboard' },
      { id: 4, tag: 'Avantage RoDTEP', text: 'Jusqu\'à 5,5% d\'exonération de droits RoDTEP & RoSCTL crédités directement sur votre compte bancaire.', linkTab: 'calculator' },
      { id: 5, tag: 'ITPS 42 Pays', text: 'Le service International Tracked Packet Service (ITPS) couvre désormais 42 pays avec suivi code-barres.', linkTab: 'locator' }
    ]
  };

  const activeNotices = notices[language] || notices.EN;
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-full max-w-full overflow-hidden bg-gradient-to-r from-amber-500 via-amber-400 to-[#FFC107] text-[#5c3e00] border-b border-amber-500/40 text-xs font-medium py-1.5 px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 shadow-2xs">
      <div className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex items-center justify-between gap-2 sm:gap-3 min-w-0">
        
        {/* Left Notice Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider animate-pulse">
            <Bell className="w-3 h-3 text-[#FFC107]" />
            {language === 'FR' ? 'Info Flash' : isHindi ? 'ताजा सूचना' : 'DNK Flash'}
          </span>
          <span className="hidden sm:inline-block font-black text-xs text-[#800000] uppercase tracking-wide">
            {t.deptName}:
          </span>
        </div>

        {/* Center Marquee / Notice Content */}
        <div className="flex-1 overflow-hidden relative min-h-[22px] flex items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white/80 text-[#800000] font-black text-[10px] px-1.5 py-0.2 rounded border border-amber-600/30 uppercase shrink-0">
              {activeNotices[currentIndex]?.tag || 'INFO'}
            </span>
            <span className="text-xs font-bold text-gray-900 truncate">
              {activeNotices[currentIndex]?.text}
            </span>
          </div>
        </div>

        {/* Right Navigation Arrows for Ticker */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? activeNotices.length - 1 : prev - 1))}
            className="p-1 hover:bg-amber-600/20 rounded transition-colors text-[#5c3e00]"
            title="Previous Notice"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === activeNotices.length - 1 ? 0 : prev + 1))}
            className="p-1 hover:bg-amber-600/20 rounded transition-colors text-[#5c3e00]"
            title="Next Notice"
          >
            ›
          </button>
          {activeNotices[currentIndex]?.linkTab && (
            <button
              onClick={() => onNavigate && onNavigate(activeNotices[currentIndex].linkTab)}
              className="ml-1 px-1.5 py-0.5 bg-[#C8102E] text-white text-[10px] font-bold rounded hover:bg-[#A60D24] transition-colors"
            >
              {t.details} →
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

