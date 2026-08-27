import React from 'react';

interface MenuIconProps {
  id: string;
  className?: string;
}

export const MenuVectorIcon: React.FC<MenuIconProps> = ({ id, className = 'w-10 h-10' }) => {
  switch (id) {
    case 'dashboard':
      // DNK Customer Dashboard: Modular control panel or layered analytical charts, soft red theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2.5" />
          {/* Top Header Bar / Modular Control */}
          <rect x="9" y="9" width="30" height="7" rx="3.5" fill="#FFE4E6" stroke="#E11D48" strokeWidth="2" />
          <circle cx="14" cy="12.5" r="1.5" fill="#E11D48" />
          <circle cx="19" cy="12.5" r="1.5" fill="#FDA4AF" />
          {/* Analytics Chart Bar 1 */}
          <rect x="9" y="27" width="6" height="12" rx="3" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" />
          {/* Analytics Chart Bar 2 */}
          <rect x="17" y="21" width="6" height="18" rx="3" fill="#FB7185" stroke="#E11D48" strokeWidth="2" />
          {/* Analytics Chart Bar 3 (Highest) */}
          <rect x="25" y="16" width="6" height="23" rx="3" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
          {/* Trend line over charts */}
          <path
            d="M33 22L37 26M37 26V21M37 26H32"
            stroke="#9F1239"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="34" cy="34" r="4.5" fill="#FFE4E6" stroke="#E11D48" strokeWidth="2" />
        </svg>
      );

    case 'assistant':
      // AI Customs Assistant: Friendly AI robot face with a spark, yellow and orange theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Robot Antenna */}
          <path d="M24 13V8" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="7" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          {/* Robot Head Body */}
          <rect x="10" y="13" width="28" height="24" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
          {/* Robot Ears */}
          <rect x="6" y="21" width="4" height="8" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <rect x="38" y="21" width="4" height="8" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          {/* Eye Screen */}
          <rect x="14" y="18" width="20" height="9" rx="4.5" fill="#451A03" />
          {/* Glowing Eyes */}
          <circle cx="19" cy="22.5" r="2" fill="#FDE68A" />
          <circle cx="29" cy="22.5" r="2" fill="#FDE68A" />
          {/* Friendly Smile */}
          <path d="M19 31C20.5 33 23.5 33 29 31" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          {/* AI Spark Star at Top Right */}
          <path
            d="M38 6L39.2 9.5L42.5 10.5L39.2 11.8L38 15L36.8 11.8L33.5 10.5L36.8 9.5L38 6Z"
            fill="#F59E0B"
            stroke="#B45309"
            strokeWidth="1"
          />
        </svg>
      );

    case 'wizard':
      // Digital Postal Bill: Digital file hovering over a shipping parcel, green theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#F0FDF4" stroke="#10B981" strokeWidth="2.5" />
          {/* Shipping Parcel (Lower Box) */}
          <path
            d="M10 26L24 19L38 26L24 33L10 26Z"
            fill="#DCFCE7"
            stroke="#059669"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M10 26V37L24 43V33M38 26V37L24 43"
            fill="#BBF7D0"
            stroke="#059669"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Digital File Hovering Above */}
          <rect x="15" y="7" width="18" height="20" rx="4" fill="#FFFFFF" stroke="#047857" strokeWidth="2.5" />
          {/* Document Content Lines */}
          <path d="M19 13H29M19 17H27M19 21H24" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
          {/* Verified Checkmark Stamp on Document */}
          <circle cx="28" cy="21" r="3.5" fill="#10B981" />
          <path d="M26.5 21L27.5 22L29.5 20" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'calculator':
      // Tariff Rate Estimator: Modern digital calculator with a currency symbol, blue theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
          {/* Calculator Body */}
          <rect x="11" y="8" width="26" height="32" rx="6" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2.5" />
          {/* Calculator LCD Screen with Currency */}
          <rect x="15" y="12" width="18" height="8" rx="3" fill="#1E3A8A" />
          <text x="17" y="18" fill="#93C5FD" fontSize="6.5" fontWeight="bold" fontFamily="monospace">₹ 142.5</text>
          {/* Keypad Grid (Thick Rounded Keys) */}
          <circle cx="17" cy="25" r="2" fill="#93C5FD" />
          <circle cx="24" cy="25" r="2" fill="#93C5FD" />
          <circle cx="31" cy="25" r="2" fill="#3B82F6" />
          
          <circle cx="17" cy="31" r="2" fill="#93C5FD" />
          <circle cx="24" cy="31" r="2" fill="#93C5FD" />
          <circle cx="31" cy="31" r="2" fill="#2563EB" />
          
          <rect x="15" y="35" width="10" height="3" rx="1.5" fill="#93C5FD" />
          <circle cx="31" cy="36.5" r="2" fill="#1D4ED8" />
        </svg>
      );

    case 'tracker':
      // Track & Trace: Dashed tracking route ending in a map pin, purple theme, thick rounded outlines
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2.5" />
          {/* Origin Starting Point */}
          <circle cx="12" cy="36" r="4" fill="#E9D5FF" stroke="#7E22CE" strokeWidth="2" />
          <circle cx="12" cy="36" r="1.5" fill="#7E22CE" />
          {/* Dashed Route S-Curve Path */}
          <path
            d="M16 34C22 30 18 20 28 18"
            stroke="#9333EA"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="3 3"
          />
          {/* Glowing Map Pin Target at End */}
          <path
            d="M32 9C27.5 9 24 12.5 24 17C24 23 32 31 32 31C32 31 40 23 40 17C40 12.5 36.5 9 32 9Z"
            fill="#C084FC"
            stroke="#6B21A8"
            strokeWidth="2"
          />
          <circle cx="32" cy="16.5" r="3" fill="#FFFFFF" stroke="#6B21A8" strokeWidth="1.5" />
          {/* Pulse ring */}
          <circle cx="32" cy="17" r="6" stroke="#D8B4FE" strokeWidth="1.5" strokeDasharray="2 2" />
        </svg>
      );

    case 'prohibited':
      // Restricted Goods Screener: Security shield with subtle warning/alert mark, bright pink & red theme
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2.5" />
          {/* Security Shield */}
          <path
            d="M24 7L37 12V22C37 31 24 40 24 40C24 40 11 31 11 22V12L24 7Z"
            fill="#FFE4E6"
            stroke="#BE123C"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Warning / Scanner Diagonal Beam */}
          <path d="M16 19L32 27" stroke="#FB7185" strokeWidth="2" strokeDasharray="2 2" />
          {/* Alert Exclamation Mark in Center */}
          <path d="M24 16V25" stroke="#BE123C" strokeWidth="3" strokeLinecap="round" />
          <circle cx="24" cy="30" r="1.8" fill="#BE123C" />
        </svg>
      );

    case 'locator':
      // Find Nearest Post Office: GPS map pin containing a post office building, amber yellow theme
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Large GPS Map Pin */}
          <path
            d="M24 7C16.5 7 10.5 13 10.5 20.5C10.5 29.5 24 41 24 41C24 41 37.5 29.5 37.5 20.5C37.5 13 31.5 7 24 7Z"
            fill="#FEF3C7"
            stroke="#B45309"
            strokeWidth="2.5"
          />
          {/* Post Office Traditional Building Inside Pin */}
          <path d="M18 20L24 15L30 20H18Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <rect x="19" y="20" width="10" height="7" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
          {/* Columns */}
          <line x1="21.5" y1="20" x2="21.5" y2="27" stroke="#D97706" strokeWidth="1.2" />
          <line x1="24" y1="20" x2="24" y2="27" stroke="#D97706" strokeWidth="1.2" />
          <line x1="26.5" y1="20" x2="26.5" y2="27" stroke="#D97706" strokeWidth="1.2" />
          {/* Steps */}
          <path d="M17 27H31" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'knowledge':
      // Knowledge Repository: Digital tablet showing an open reference book, indigo theme
      return (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${className} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        >
          {/* Base Container */}
          <rect x="3" y="3" width="42" height="42" rx="12" fill="#EEF2FF" stroke="#6366F1" strokeWidth="2.5" />
          {/* Digital Tablet Frame */}
          <rect x="10" y="8" width="28" height="32" rx="5" fill="#E0E7FF" stroke="#4338CA" strokeWidth="2" />
          {/* Open Reference Book Inside Screen */}
          <path
            d="M15 19C18 17.5 22 18 24 20C26 18 30 17.5 33 19V31C30 29.5 26 30 24 32C22 30 18 29.5 15 31V19Z"
            fill="#FFFFFF"
            stroke="#3730A3"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Book Spine Center Divider */}
          <line x1="24" y1="20" x2="24" y2="32" stroke="#4338CA" strokeWidth="2" />
          {/* Text Page lines */}
          <line x1="18" y1="23" x2="21" y2="23" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="18" y1="26" x2="21" y2="26" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="27" y1="23" x2="30" y2="23" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="27" y1="26" x2="30" y2="26" stroke="#818CF8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Tablet Home Indicator */}
          <circle cx="24" cy="37" r="1.5" fill="#6366F1" />
        </svg>
      );

    default:
      return (
        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
          ?
        </div>
      );
  }
};
