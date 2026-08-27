import React, { useState } from 'react';
import { Megaphone, ChevronRight, Pause, Play, Bell, ExternalLink } from 'lucide-react';

interface NoticeTickerProps {
  language: 'EN' | 'HI';
  onNavigate?: (tab: string) => void;
  onOpenRagInspector?: () => void;
}

export const NoticeTicker: React.FC<NoticeTickerProps> = ({
  language,
  onNavigate,
  onOpenRagInspector,
}) => {
  const isHindi = language === 'HI';
  const [isPaused, setIsPaused] = useState(false);

  const notices = [
    {
      id: 1,
      tagEn: 'CBIC 48/2018',
      tagHi: 'कस्टम्स 48/2018',
      textEn: 'Mandatory Electronic Postal Bill of Export (PBE-III for E-Commerce & PBE-IV for Commercial) via DNK Portal.',
      textHi: 'DNK पोर्टल के माध्यम से ई-कॉमर्स (PBE-III) और वाणिज्यिक निर्यात (PBE-IV) का इलेक्ट्रॉनिक फाइलिंग अनिवार्य।',
      linkTab: 'wizard'
    },
    {
      id: 2,
      tagEn: 'ICES Live',
      tagHi: 'ICES लाइव',
      textEn: 'Direct ICES 1.5 FPO integration active for automated Customs Out-of-Charge (OOC) and ICEGATE e-BRC tracking.',
      textHi: 'कस्टम्स आउट-ऑफ-चार्ज (OOC) और ICEGATE e-BRC ट्रैकिंग हेतु ICES 1.5 FPO सर्वर सीधा लाइव कनेक्टेड है।',
      linkTab: 'tracker'
    },
    {
      id: 3,
      tagEn: 'Zero IGST',
      tagHi: 'शून्य IGST',
      textEn: 'Claim 0% IGST export billing upfront by submitting GST LUT Form RFD-11 under Section 16(3) CGST Act.',
      textHi: 'CGST अधिनियम धारा 16(3) के तहत GST LUT फॉर्म RFD-11 दर्ज कर 0% IGST शून्य-दर चालान प्राप्त करें।',
      linkTab: 'dashboard'
    },
    {
      id: 4,
      tagEn: 'RoDTEP Claim',
      tagHi: 'RoDTEP लाभ',
      textEn: 'Up to 5.5% RoDTEP & RoSCTL export duty remission directly credited to linked AD Code bank account.',
      textHi: '5.5% तक का RoDTEP और RoSCTL निर्यात प्रोत्साहन सीधे बैंक खाते में क्रेडिट होगा।',
      linkTab: 'calculator'
    },
    {
      id: 5,
      tagEn: 'ITPS 42 Countries',
      tagHi: 'ITPS 42 देश',
      textEn: 'International Tracked Packet Service (ITPS) now covers 42 destination countries with end-to-end barcode scan.',
      textHi: 'अंतरराष्ट्रीय ट्रैक्ड पैकेट सेवा (ITPS) अब बारकोड ट्रैकिंग के साथ 42 गंतव्य देशों में उपलब्ध है।',
      linkTab: 'locator'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-[#FFC107] text-[#5c3e00] border-b border-amber-500/40 text-xs font-medium py-1.5 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left Notice Badge */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1 bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs uppercase tracking-wider animate-pulse">
            <Bell className="w-3 h-3 text-[#FFC107]" />
            {isHindi ? 'ताजा सूचना' : 'DNK Flash'}
          </span>
          <span className="hidden sm:inline-block font-black text-xs text-[#800000] uppercase tracking-wide">
            {isHindi ? 'डाक विभाग' : 'Department of Posts'}:
          </span>
        </div>

        {/* Center Marquee / Notice Content */}
        <div className="flex-1 overflow-hidden relative min-h-[22px] flex items-center">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white/80 text-[#800000] font-black text-[10px] px-1.5 py-0.2 rounded border border-amber-600/30 uppercase shrink-0">
              {isHindi ? notices[currentIndex].tagHi : notices[currentIndex].tagEn}
            </span>
            <span className="text-xs font-bold text-gray-900 truncate">
              {isHindi ? notices[currentIndex].textHi : notices[currentIndex].textEn}
            </span>
          </div>
        </div>

        {/* Right Navigation Arrows for Ticker */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setCurrentIndex((prev) => (prev === 0 ? notices.length - 1 : prev - 1))}
            className="w-5 h-5 rounded bg-white/70 hover:bg-white text-[#800000] flex items-center justify-center font-bold text-[11px] transition-colors"
            title="Previous Notice"
          >
            ‹
          </button>
          <span className="text-[10px] font-bold text-[#800000] px-1">
            {currentIndex + 1}/{notices.length}
          </span>
          <button
            onClick={() => setCurrentIndex((prev) => (prev === notices.length - 1 ? 0 : prev + 1))}
            className="w-5 h-5 rounded bg-white/70 hover:bg-white text-[#800000] flex items-center justify-center font-bold text-[11px] transition-colors"
            title="Next Notice"
          >
            ›
          </button>
          
          {onNavigate && notices[currentIndex].linkTab && (
            <button
              onClick={() => onNavigate(notices[currentIndex].linkTab!)}
              className="hidden md:inline-flex items-center gap-1 ml-2 text-[10px] font-black text-[#C8102E] bg-white hover:bg-[#800000] hover:text-white px-2 py-0.5 rounded transition-colors shadow-2xs uppercase"
            >
              <span>{isHindi ? 'देखें' : 'Open'}</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
