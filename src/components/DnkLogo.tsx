import React from 'react';
import { SupportedLanguage } from '../types';
import { translations } from '../utils/translations';

interface DnkLogoProps {
  variant?: 'full' | 'compact' | 'badge' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isHindi?: boolean;
  language?: SupportedLanguage;
}

export const DnkLogo: React.FC<DnkLogoProps> = ({
  variant = 'compact',
  size = 'md',
  className = '',
  isHindi = false,
  language
}) => {
  const langKey: SupportedLanguage = language ? language : (isHindi ? 'HI' : 'EN');
  const t = translations[langKey] || translations.EN;

  // Dimensions based on size
  const sizeMap = {
    sm: { iconSize: 'w-8 h-8', textTitle: 'text-xs', textSub: 'text-[9px]' },
    md: { iconSize: 'w-10 h-10', textTitle: 'text-sm', textSub: 'text-[10px]' },
    lg: { iconSize: 'w-12 h-12', textTitle: 'text-base', textSub: 'text-xs' },
    xl: { iconSize: 'w-16 h-16', textTitle: 'text-lg', textSub: 'text-xs' }
  };

  const selectedSize = sizeMap[size];

  // The authentic DNK / India Post emblem SVG
  const LogoIcon = () => (
    <div className={`relative ${selectedSize.iconSize} rounded-xl overflow-hidden shadow-sm shrink-0 flex items-center justify-center bg-[#C8102E] border-2 border-[#FFC107]/90 group-hover:scale-105 transition-transform`}>
      {/* Postal Envelope & Export Wing SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full p-1"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Deep Red Background Gradient */}
        <defs>
          <linearGradient id="dnkRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D42426" />
            <stop offset="100%" stopColor="#990B20" />
          </linearGradient>
          <linearGradient id="dnkGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="50%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* Outer subtle shield/circle */}
        <circle cx="50" cy="50" r="46" fill="url(#dnkRedGrad)" />

        {/* Global Export Longitude/Latitude Grid lines */}
        <path d="M14 50 A36 36 0 0 1 86 50" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
        <path d="M50 14 A36 36 0 0 1 50 86" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />

        {/* India Post Iconic Soaring Wing */}
        <path 
          d="M20 74 L46 22 C48 18 54 18 56 22 L82 74 C80 66 74 60 66 58 L52 38 L36 58 C28 60 22 66 20 74 Z" 
          fill="url(#dnkGoldGrad)" 
        />
        <path 
          d="M34 76 L51 40 L68 76 C62 70 56 68 51 68 C46 68 40 70 34 76 Z" 
          fill="#FFFFFF" 
        />

        {/* Export Arrow Overlay */}
        <path 
          d="M51 26 L64 39 H56 V55 H46 V39 H38 L51 26 Z" 
          fill="#C8102E" 
          stroke="#FFFFFF" 
          strokeWidth="1.5" 
        />

        {/* DNK Text Insignia Bar */}
        <rect x="22" y="78" width="56" height="15" rx="4" fill="#FFC107" />
        <text 
          x="50" 
          y="89" 
          fill="#990B20" 
          fontFamily="system-ui, sans-serif" 
          fontWeight="900" 
          fontSize="10" 
          letterSpacing="1.5" 
          textAnchor="middle"
        >
          DNK
        </text>
      </svg>
    </div>
  );

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <LogoIcon />
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className={`font-black tracking-tight text-white ${selectedSize.textTitle}`}>
              {t.portalTitle}
            </span>
            <span className="bg-[#FFC107] text-[#990B20] text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider shadow-2xs">
              DNK
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-white/80">
            <span className={`font-medium tracking-wide ${selectedSize.textSub}`}>
              {t.deptName}
            </span>
            <span className="text-white/40">•</span>
            <span className={`font-bold text-[#FFC107] ${selectedSize.textSub}`}>
              India Post
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default compact
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <LogoIcon />
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-tight text-[#FFD54F] ${selectedSize.textTitle}`}>
            {t.portalTitle}
          </span>
          <span className="bg-[#FFC107] text-[#990B20] text-[9px] font-black px-1.5 py-0.2 rounded-xs uppercase tracking-wider shadow-2xs">
            DNK
          </span>
        </div>
        <span className="text-[10px] text-white/80 font-medium tracking-wide">
          {t.portalSubTitle}
        </span>
      </div>
    </div>
  );
};
