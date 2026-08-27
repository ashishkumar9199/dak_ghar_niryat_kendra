import React from 'react';

interface FeatureIconProps {
  id:
    | 'pbe'
    | 'tariff'
    | 'tracker'
    | 'ai-advisor'
    | 'barcode-scanner'
    | 'readiness'
    | 'locator'
    | 'prohibited'
    | 'circulars';
  className?: string;
}

export const FeatureVectorIcon: React.FC<FeatureIconProps> = ({ id, className = 'w-12 h-12' }) => {
  switch (id) {
    case 'pbe':
      // Generate PBE: Minimalist 2D UI icon of a digital shipping package with a verified checkmark label, flat vector style, coral red and pastel pink theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container / Clean Base */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="2.5" />
          
          {/* Shipping Package Isometric Cube */}
          {/* Top Face */}
          <path
            d="M28 12L42 19L28 26L14 19L28 12Z"
            fill="#FFE4E6"
            stroke="#E11D48"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Left Face */}
          <path
            d="M14 19V34L28 41V26L14 19Z"
            fill="#F43F5E"
            stroke="#BE123C"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Right Face */}
          <path
            d="M42 19V34L28 41V26L42 19Z"
            fill="#FB7185"
            stroke="#BE123C"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Packing Tape on Top */}
          <path d="M28 12V26" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 15.5L35 22.5" stroke="#FDA4AF" strokeWidth="2" strokeLinecap="round" />

          {/* Verified Digital Checkmark Label (Floating on bottom right) */}
          <circle cx="39" cy="38" r="9" fill="#FFFFFF" stroke="#E11D48" strokeWidth="2.5" />
          <circle cx="39" cy="38" r="6.5" fill="#E11D48" />
          <path
            d="M36 38L38 40L42.5 35.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'tariff':
      // Tariff & Currency: Minimalist 2D UI icon of a currency exchange calculator paired with layered gold and green coin tokens, flat vector style, amber yellow theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="2.5" />
          
          {/* Modern Digital Calculator Body */}
          <rect x="10" y="10" width="25" height="36" rx="6" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.2" />
          
          {/* Calculator Screen with ₹ Symbol */}
          <rect x="14" y="14" width="17" height="8" rx="2.5" fill="#78350F" />
          <text x="16.5" y="20.5" fill="#FDE68A" fontSize="7" fontWeight="bold" fontFamily="monospace">₹ 98.4</text>
          
          {/* Calculator Buttons */}
          <circle cx="17" cy="27" r="2" fill="#FBBF24" />
          <circle cx="23" cy="27" r="2" fill="#FBBF24" />
          <circle cx="17" cy="34" r="2" fill="#FBBF24" />
          <circle cx="23" cy="34" r="2" fill="#FBBF24" />
          <rect x="15" y="39" width="8" height="3" rx="1.5" fill="#D97706" />

          {/* Layered Gold & Green Coin Tokens (Top & Bottom) */}
          {/* Back Green Coin */}
          <ellipse cx="40" cy="24" rx="8" ry="5.5" fill="#D1FAE5" stroke="#059669" strokeWidth="2" />
          <text x="37.5" y="26" fill="#047857" fontSize="6.5" fontWeight="bold">$</text>
          
          {/* Front Gold Coin */}
          <ellipse cx="38" cy="36" rx="9" ry="6.5" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.2" />
          <ellipse cx="38" cy="34.5" rx="6.5" ry="4.5" fill="#FDE047" stroke="#B45309" strokeWidth="1.2" />
          <text x="35" y="37" fill="#854D0E" fontSize="8" fontWeight="black">₹</text>
        </svg>
      );

    case 'tracker':
      // Track Shipment: Minimalist 2D UI icon of a magnifying glass scanning a parcel along a dashed route, flat vector style, soft violet and purple theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#FAF5FF" stroke="#E9D5FF" strokeWidth="2.5" />
          
          {/* Dashed Route Path */}
          <path
            d="M12 40C16 32 20 38 28 32C34 27 34 18 42 16"
            stroke="#C084FC"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3.5 3.5"
          />

          {/* Mini Parcel along route */}
          <rect x="10" y="34" width="10" height="10" rx="2.5" fill="#F3E8FF" stroke="#9333EA" strokeWidth="1.8" />
          <path d="M10 37H20M15 34V44" stroke="#A855F7" strokeWidth="1.2" />

          {/* Destination Pin Point */}
          <circle cx="43" cy="16" r="3.5" fill="#9333EA" stroke="#7E22CE" strokeWidth="1.5" />
          <circle cx="43" cy="16" r="1.5" fill="#FFFFFF" />

          {/* Large Optical Magnifying Glass Scanning Center */}
          <circle cx="28" cy="27" r="11" fill="#FFFFFF" stroke="#7E22CE" strokeWidth="2.5" />
          <circle cx="28" cy="27" r="8" fill="#F3E8FF" stroke="#C084FC" strokeWidth="1.5" />
          {/* Scanner Optical Grid / Target */}
          <path d="M28 22V32M23 27H33" stroke="#9333EA" strokeWidth="1.5" strokeLinecap="round" />
          {/* Lens Handle */}
          <path
            d="M36 35L44 43"
            stroke="#6B21A8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'ai-advisor':
      // AI Export Advisor: Minimalist 2D UI icon of a glowing AI neural spark with an intelligent chat bubble, flat vector style, soft electric blue theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2.5" />
          
          {/* Intelligent Chat Bubble */}
          <path
            d="M12 16C12 12.6863 14.6863 10 18 10H38C41.3137 10 44 12.6863 44 16V30C44 33.3137 41.3137 36 38 36H24L15 43V36H18C14.6863 36 12 33.3137 12 30V16Z"
            fill="#DBEAFE"
            stroke="#2563EB"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Inner Chat Lines / Pulse */}
          <circle cx="21" cy="23" r="2.5" fill="#3B82F6" />
          <circle cx="28" cy="23" r="2.5" fill="#2563EB" />
          <circle cx="35" cy="23" r="2.5" fill="#1D4ED8" />

          {/* Glowing AI Neural Spark / Star */}
          <path
            d="M40 7L41.5 12L46.5 13.5L41.5 15L40 20L38.5 15L33.5 13.5L38.5 12L40 7Z"
            fill="#3B82F6"
            stroke="#1D4ED8"
            strokeWidth="1.2"
          />
          <path
            d="M14 6L15 9L18 10L15 11L14 14L13 11L10 10L13 9L14 6Z"
            fill="#60A5FA"
          />
        </svg>
      );

    case 'barcode-scanner':
      // Quick Article Lookup: Minimalist 2D UI icon of a linear barcode with an intersecting scanner beam, flat vector style, slate gray theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2.5" />
          
          {/* Barcode Frame / Sheet */}
          <rect x="10" y="12" width="36" height="32" rx="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />

          {/* Linear Barcode Lines */}
          <line x1="16" y1="18" x2="16" y2="34" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="20" y1="18" x2="20" y2="34" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="24" y1="18" x2="24" y2="34" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <line x1="29" y1="18" x2="29" y2="34" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="33" y1="18" x2="33" y2="34" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="37" y1="18" x2="37" y2="34" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="18" x2="40" y2="34" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

          {/* Intersecting Glowing Laser Scanner Beam */}
          <line x1="8" y1="26" x2="48" y2="26" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="8" cy="26" r="2.5" fill="#EF4444" />
          <circle cx="48" cy="26" r="2.5" fill="#EF4444" />
          
          {/* Numbers under barcode */}
          <text x="17" y="40" fill="#64748B" fontSize="4.5" fontWeight="bold" fontFamily="monospace">EE9284102IN</text>
        </svg>
      );

    case 'readiness':
      // Export Readiness Items: Minimalist 2D UI icon of an official compliance badge with a green security shield, flat vector style, emerald green theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="2.5" />
          
          {/* Compliance Badge / Circular Starburst Rosette */}
          <circle cx="28" cy="28" r="18" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.2" />

          {/* Security Shield Center */}
          <path
            d="M28 14L37 18V26C37 32.5 28 39 28 39C28 39 19 32.5 19 26V18L28 14Z"
            fill="#15803D"
            stroke="#14532D"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Verified White Checkmark */}
          <path
            d="M23.5 26.5L26.5 29.5L32.5 23.5"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Certificate Ribbon Tails */}
          <path d="M22 41L18 49L24 46L28 49V41" fill="#16A34A" />
          <path d="M34 41L38 49L32 46L28 49V41" fill="#15803D" />
        </svg>
      );

    case 'locator':
      // Find Nearest DNK Office: Minimalist 2D UI icon of a GPS map pin combined with a postal mail slot, flat vector style, teal and mint green theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="2.5" />
          
          {/* GPS Map Pin Body */}
          <path
            d="M28 8C18.6 8 11 15.6 11 25C11 36.5 28 49 28 49C28 49 45 36.5 45 25C45 15.6 37.4 8 28 8Z"
            fill="#CCFBF1"
            stroke="#0D9488"
            strokeWidth="2.5"
          />

          {/* Postal Mail Slot / Letterbox Inside Pin */}
          <circle cx="28" cy="23" r="10" fill="#FFFFFF" stroke="#0F766E" strokeWidth="2" />
          
          {/* Mail Slot */}
          <rect x="22" y="19" width="12" height="3" rx="1" fill="#0D9488" />
          {/* Dropped Envelope */}
          <path
            d="M23 23H33V28C33 28.5 32.5 29 32 29H24C23.5 29 23 28.5 23 28V23Z"
            fill="#5EEAD4"
            stroke="#0F766E"
            strokeWidth="1.2"
          />
          <path d="M23 23L28 26L33 23" stroke="#0F766E" strokeWidth="1.2" />
        </svg>
      );

    case 'prohibited':
      // Prohibited Goods Screener: Minimalist 2D UI icon of a warning triangle shield detecting hazardous material, flat vector style, warning orange theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#FFF7ED" stroke="#FFEDD5" strokeWidth="2.5" />
          
          {/* Warning Shield / Triangle Base */}
          <path
            d="M28 9L44 38C45.2 40.2 43.6 43 41.1 43H14.9C12.4 43 10.8 40.2 12 38L28 9Z"
            fill="#FFEDD5"
            stroke="#EA580C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Inner Caution Flame / Hazardous Symbol Core */}
          <path
            d="M28 17L39 37H17L28 17Z"
            fill="#F97316"
          />

          {/* High Contrast Exclamation Mark */}
          <path d="M28 22V30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="28" cy="34" r="1.8" fill="#FFFFFF" />

          {/* Hazard Scan Radar Wave */}
          <path d="M38 15C42 18 45 23 45 29" stroke="#C2410C" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 2" />
        </svg>
      );

    case 'circulars':
      // CBIC Circulars & SOP Hub: Minimalist 2D UI icon of a formal government binder with a bookmark ribbon, flat vector style, deep purple theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Card Container */}
          <rect x="3" y="3" width="50" height="50" rx="14" fill="#FAF5FF" stroke="#F3E8FF" strokeWidth="2.5" />
          
          {/* Formal Government Binder Cover */}
          <rect x="13" y="10" width="28" height="36" rx="5" fill="#E9D5FF" stroke="#7E22CE" strokeWidth="2.5" />
          
          {/* Binder Spine Ridge */}
          <rect x="13" y="10" width="6" height="36" rx="2" fill="#7E22CE" />
          <circle cx="16" cy="18" r="1.5" fill="#FFFFFF" />
          <circle cx="16" cy="28" r="1.5" fill="#FFFFFF" />
          <circle cx="16" cy="38" r="1.5" fill="#FFFFFF" />

          {/* Official Emblem / Document Stamp on Front */}
          <rect x="23" y="16" width="13" height="4" rx="2" fill="#A855F7" />
          <line x1="23" y1="24" x2="34" y2="24" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" />
          <line x1="23" y1="28" x2="31" y2="28" stroke="#6B21A8" strokeWidth="2" strokeLinecap="round" />
          
          {/* Red/Gold Bookmark Ribbon Dropping down from top */}
          <path
            d="M33 10V22L36 19.5L39 22V10H33Z"
            fill="#EF4444"
            stroke="#B91C1C"
            strokeWidth="1.2"
          />
        </svg>
      );

    default:
      return null;
  }
};
