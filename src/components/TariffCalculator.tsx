import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calculator, 
  Globe2, 
  Clock, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  Scale,
  Sparkles,
  ArrowLeftRight,
  Coins,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { TariffOption, CbicExchangeRate, SupportedLanguage } from '../types';
import { DEFAULT_CBIC_EXCHANGE_RATES, getCurrencyForCountry } from '../data/cbicExchangeRates';

export const TariffCalculator: React.FC<{ language: SupportedLanguage; onBookService?: (service: string) => void }> = ({
  language,
  onBookService
}) => {
  const isHindi = language === 'HI' || language === 'MAI';

  // Calculator inputs
  const [countryCode, setCountryCode] = useState('US');
  const [weightGrams, setWeightGrams] = useState(800);
  const [declaredValueINR, setDeclaredValueINR] = useState(8500);
  const [tariffs, setTariffs] = useState<TariffOption[]>([]);
  const [loading, setLoading] = useState(false);

  // CBIC Currency Converter State
  const [exchangeRates, setExchangeRates] = useState<CbicExchangeRate[]>(DEFAULT_CBIC_EXCHANGE_RATES);
  const [targetCurrency, setTargetCurrency] = useState<string>('USD');
  const [displayMode, setDisplayMode] = useState<'dual' | 'inr' | 'foreign'>('dual');
  const [customConvertAmount, setCustomConvertAmount] = useState<number>(100);
  const [convertDirection, setConvertDirection] = useState<'foreign_to_inr' | 'inr_to_foreign'>('foreign_to_inr');
  const [notificationRef, setNotificationRef] = useState('CBIC Notif. No. 14/2026-Customs (N.T.)');

  const countries = [
    { code: 'US', name: 'United States of America', region: 'Americas', defaultCur: 'USD' },
    { code: 'GB', name: 'United Kingdom', region: 'Europe', defaultCur: 'GBP' },
    { code: 'DE', name: 'Germany / European Union', region: 'Europe', defaultCur: 'EUR' },
    { code: 'AE', name: 'United Arab Emirates (Dubai/Abu Dhabi)', region: 'Middle East', defaultCur: 'AED' },
    { code: 'AU', name: 'Australia', region: 'Oceania', defaultCur: 'AUD' },
    { code: 'CA', name: 'Canada', region: 'Americas', defaultCur: 'CAD' },
    { code: 'JP', name: 'Japan', region: 'Asia-Pacific', defaultCur: 'JPY' },
    { code: 'SG', name: 'Singapore', region: 'Asia-Pacific', defaultCur: 'SGD' },
    { code: 'SA', name: 'Saudi Arabia', region: 'Middle East', defaultCur: 'SAR' },
    { code: 'CH', name: 'Switzerland', region: 'Europe', defaultCur: 'CHF' },
    { code: 'NZ', name: 'New Zealand', region: 'Oceania', defaultCur: 'NZD' },
    { code: 'HK', name: 'Hong Kong', region: 'Asia-Pacific', defaultCur: 'HKD' }
  ];

  // Fetch latest CBIC rates from API if available
  useEffect(() => {
    const fetchCbicRates = async () => {
      try {
        const res = await fetch('/api/exchange-rates/cbic');
        if (res.ok) {
          const data = await res.json();
          if (data.rates && Array.isArray(data.rates)) {
            setExchangeRates(data.rates);
          }
          if (data.effectiveNotification) {
            setNotificationRef(data.effectiveNotification);
          }
        }
      } catch (err) {
        console.warn('Using local fallback for CBIC exchange rates:', err);
      }
    };
    fetchCbicRates();
  }, []);

  // Update target currency when destination country changes
  const handleCountryChange = (newCode: string) => {
    setCountryCode(newCode);
    const matchedCur = getCurrencyForCountry(newCode);
    setTargetCurrency(matchedCur);
  };

  // Get active currency details
  const activeRateObj = useMemo(() => {
    return exchangeRates.find(r => r.currencyCode === targetCurrency) || exchangeRates[0];
  }, [exchangeRates, targetCurrency]);

  // Converter math helper
  const inrToForeign = (inrVal: number): number => {
    if (!activeRateObj || activeRateObj.exportRateINR <= 0) return 0;
    const perUnitRate = activeRateObj.exportRateINR / activeRateObj.unit;
    return inrVal / perUnitRate;
  };

  const foreignToInr = (foreignVal: number): number => {
    if (!activeRateObj || activeRateObj.exportRateINR <= 0) return 0;
    const perUnitRate = activeRateObj.exportRateINR / activeRateObj.unit;
    return foreignVal * perUnitRate;
  };

  const formatForeign = (val: number): string => {
    if (activeRateObj.currencyCode === 'JPY') {
      return `${activeRateObj.symbol}${Math.round(val).toLocaleString()}`;
    }
    return `${activeRateObj.symbol}${val.toFixed(2)}`;
  };

  // Declared value in foreign currency
  const declaredValueForeign = useMemo(() => {
    return inrToForeign(declaredValueINR);
  }, [declaredValueINR, activeRateObj]);

  // Quick bi-directional converter computed result
  const calculatedConversion = useMemo(() => {
    if (convertDirection === 'foreign_to_inr') {
      const inr = foreignToInr(customConvertAmount);
      return {
        from: `${activeRateObj.symbol}${customConvertAmount.toLocaleString()} ${activeRateObj.currencyCode}`,
        to: `₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 2 })} INR`,
        inrValue: inr
      };
    } else {
      const foreign = inrToForeign(customConvertAmount);
      return {
        from: `₹${customConvertAmount.toLocaleString('en-IN')} INR`,
        to: `${formatForeign(foreign)} ${activeRateObj.currencyCode}`,
        inrValue: customConvertAmount
      };
    }
  }, [customConvertAmount, convertDirection, activeRateObj]);

  // Synchronize bi-directional custom converted amount to Declared Value
  const applyConvertedToDeclaredValue = () => {
    if (convertDirection === 'foreign_to_inr') {
      const inr = Math.round(foreignToInr(customConvertAmount));
      setDeclaredValueINR(inr);
    } else {
      setDeclaredValueINR(Math.round(customConvertAmount));
    }
  };

  const calculateRates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/rates/calculate?countryCode=${countryCode}&weightGrams=${weightGrams}&declaredValueINR=${declaredValueINR}`);
      const data = await res.json();
      setTariffs(data.services || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    calculateRates();
  }, [countryCode, weightGrams, declaredValueINR]);

  // SDR equivalent for Customs (1 SDR approx ₹115.20)
  const declaredValueSDR = Math.round(declaredValueINR / 115.2);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#C8102E] flex items-center justify-center font-black shrink-0 shadow-xs">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                  {isHindi ? 'भारतीय डाक अंतरराष्ट्रीय दर एवं मुद्रा कैलकुलेटर' : 'International Tariff & CBIC Currency Calculator'}
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  CBIC Sec 14 Live
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
                {isHindi 
                  ? 'Speed Post EMS, ITPS एवं Air Parcel की आधिकारिक दरें व CBIC अधिसूचित सीमा शुल्क विनिमय दरें।'
                  : 'Official India Post postage rates for Speed Post EMS, Tracked Packet (ITPS), and Air Parcel with CBIC notified customs valuation rates.'}
              </p>
            </div>
          </div>

          {/* Display Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-2xl self-start md:self-auto border border-gray-200">
            <button
              onClick={() => setDisplayMode('dual')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === 'dual'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isHindi ? 'दोहरी मुद्रा (Dual)' : 'Dual (₹ & Foreign)'}
            </button>
            <button
              onClick={() => setDisplayMode('inr')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === 'inr'
                  ? 'bg-white text-[#C8102E] shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setDisplayMode('foreign')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === 'foreign'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {activeRateObj.currencyCode} ({activeRateObj.symbol})
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-6 border-t border-gray-100">
          {/* Destination Country */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-blue-600" />
                <span>{isHindi ? 'गंतव्य देश (Destination)' : 'Destination Country'}</span>
              </span>
              <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                {activeRateObj.currencyCode} Auto
              </span>
            </label>
            <select
              value={countryCode}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.region}) - {c.defaultCur}</option>
              ))}
            </select>
          </div>

          {/* Parcel Weight */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-gray-600" />
                <span>{isHindi ? 'पार्सल का सकल वजन' : 'Parcel Gross Weight'}</span>
              </span>
              <span className="font-mono font-black text-[#C8102E]">
                {(weightGrams / 1000).toFixed(2)} kg ({weightGrams}g)
              </span>
            </label>
            <div className="space-y-2.5">
              <input
                type="range"
                min="50"
                max="20000"
                step="50"
                value={weightGrams}
                onChange={(e) => setWeightGrams(parseInt(e.target.value, 10))}
                className="w-full accent-[#C8102E] cursor-pointer"
              />
              <div className="flex gap-1.5 flex-wrap">
                {[100, 500, 800, 1000, 2000, 5000, 10000].map(w => (
                  <button
                    key={w}
                    onClick={() => setWeightGrams(w)}
                    className={`text-[11px] px-2.5 py-1 rounded-xl border transition-colors ${
                      weightGrams === w
                        ? 'bg-[#C8102E] text-white font-bold border-[#C8102E]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {w >= 1000 ? `${w / 1000}kg` : `${w}g`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Declared Export Value (INR & Target Currency) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center justify-between">
              <span>{isHindi ? 'घोषित निर्यात मूल्य (Declared Value)' : 'Declared FOB Value (INR)'}</span>
              <span className="font-mono font-bold text-blue-700">
                ≈ {formatForeign(declaredValueForeign)} {activeRateObj.currencyCode}
              </span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-xs font-black text-gray-400">₹</span>
              <input
                type="number"
                min="100"
                step="500"
                value={declaredValueINR}
                onChange={(e) => setDeclaredValueINR(parseInt(e.target.value, 10) || 0)}
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#C8102E] focus:outline-none"
                placeholder="Declared FOB value in INR"
              />
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-gray-500 mt-1.5 font-medium">
              <span>
                {declaredValueINR <= 34500 ? 'Eligible for Form CN22 (≤ 300 SDR)' : 'Mandatory Form CN23 (> 300 SDR)'}
              </span>
              <span className="font-mono text-gray-400">~{declaredValueSDR} SDR</span>
            </div>
          </div>
        </div>
      </div>

      {/* CBIC Customs Currency Converter Interactive Box */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-md border border-blue-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Top Bar with CBIC Notification Details */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-blue-800/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-xs shrink-0">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-black text-white tracking-tight">
                    {isHindi ? 'CBIC आधिकारिक सीमा शुल्क विनिमय दर' : 'CBIC Notified Customs Exchange Rate'}
                  </h3>
                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 px-2 py-0.5 rounded-md uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ICEGATE Synchronized
                  </span>
                </div>
                <p className="text-xs text-blue-200 font-medium">
                  {notificationRef} • Section 14, Customs Act 1962 (Export Valuation)
                </p>
              </div>
            </div>

            {/* Currency Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-200">
                {isHindi ? 'निर्यात मुद्रा चुनें:' : 'Target Currency:'}
              </span>
              <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
                className="bg-blue-900/80 hover:bg-blue-900 text-amber-300 border border-amber-400/50 rounded-xl px-3.5 py-2 text-xs font-black focus:outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
              >
                {exchangeRates.map(r => (
                  <option key={r.currencyCode} value={r.currencyCode} className="bg-slate-900 text-white">
                    {r.currencyCode} ({r.symbol}) - {r.currencyName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rate Highlighting & Live Bi-Directional Quick Converter */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* Active Exchange Rate Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-4.5 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-blue-300 font-bold mb-1">
                  Official Export Valuation Exchange Rate
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-amber-300 font-mono">
                    {activeRateObj.unit > 1 ? `${activeRateObj.unit} ${activeRateObj.currencyCode}` : `1 ${activeRateObj.currencyCode}`} = ₹{activeRateObj.exportRateINR.toFixed(2)}
                  </span>
                  <span className="text-xs text-emerald-400 font-bold">INR</span>
                </div>
                <div className="text-[11px] text-gray-300 mt-2 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Export Rate (Customs FOB):</span>
                    <span className="font-mono font-bold text-white">₹{activeRateObj.exportRateINR.toFixed(2)} / {activeRateObj.unit > 1 ? `${activeRateObj.unit} units` : 'unit'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Import Rate (CIF/Landed):</span>
                    <span className="font-mono text-gray-400">₹{activeRateObj.importRateINR.toFixed(2)} / {activeRateObj.unit > 1 ? `${activeRateObj.unit} units` : 'unit'}</span>
                  </div>
                </div>
              </div>

              {/* Threshold indicator pill */}
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] text-blue-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  All Postal Bills of Export (PBE) & Commercial Invoices must use this CBIC rate.
                </span>
              </div>
            </div>

            {/* Live Bi-Directional Currency Scratchpad Converter (7 cols) */}
            <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-4.5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-200 flex items-center gap-1.5">
                  <ArrowLeftRight className="w-4 h-4 text-amber-400" />
                  <span>{isHindi ? 'त्वरित मुद्रा परिवर्तक (Quick Converter)' : 'Live Bi-directional Converter'}</span>
                </span>
                
                <button
                  onClick={() => setConvertDirection(d => d === 'foreign_to_inr' ? 'inr_to_foreign' : 'foreign_to_inr')}
                  className="text-[11px] text-amber-300 hover:text-amber-200 flex items-center gap-1 font-bold bg-white/10 px-2 py-0.5 rounded-lg border border-white/10 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Switch: {convertDirection === 'foreign_to_inr' ? `${activeRateObj.currencyCode} ➔ INR` : `INR ➔ ${activeRateObj.currencyCode}`}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* Input box */}
                <div>
                  <label className="text-[10px] uppercase font-bold text-gray-300 block mb-1">
                    {convertDirection === 'foreign_to_inr' ? `Enter in ${activeRateObj.currencyCode} (${activeRateObj.symbol})` : 'Enter in INR (₹)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-gray-400">
                      {convertDirection === 'foreign_to_inr' ? activeRateObj.symbol : '₹'}
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={customConvertAmount}
                      onChange={(e) => setCustomConvertAmount(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-blue-700/60 rounded-xl text-xs font-mono font-bold text-white focus:ring-2 focus:ring-amber-400 focus:outline-none"
                      placeholder="Amount"
                    />
                  </div>
                </div>

                {/* Output box */}
                <div className="bg-slate-900/90 border border-amber-400/40 rounded-xl p-2.5">
                  <div className="text-[10px] uppercase font-bold text-amber-300">
                    {convertDirection === 'foreign_to_inr' ? 'Calculated INR Equivalent' : `Calculated ${activeRateObj.currencyCode} Equivalent`}
                  </div>
                  <div className="text-lg font-black font-mono text-white mt-0.5">
                    {calculatedConversion.to}
                  </div>
                </div>
              </div>

              {/* Action buttons & Presets */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-gray-400 font-medium">Quick:</span>
                  {[50, 100, 250, 500, 1000].map(val => (
                    <button
                      key={val}
                      onClick={() => setCustomConvertAmount(val)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-blue-200 border border-white/10 transition-colors"
                    >
                      {convertDirection === 'foreign_to_inr' ? `${activeRateObj.symbol}${val}` : `₹${val}`}
                    </button>
                  ))}
                </div>

                <button
                  onClick={applyConvertedToDeclaredValue}
                  className="text-[11px] font-black bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1 rounded-xl shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Set as Declared Export Value</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Calculated Postage Rate Cards with Dual-Currency Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-800 flex items-center gap-2">
            <span>{isHindi ? 'उपलब्ध डाक सेवाएं व दरें' : 'Available Postal Services & Rates'}</span>
            <span className="text-xs font-bold text-gray-500 font-mono">
              ({(weightGrams / 1000).toFixed(2)} kg to {countries.find(c => c.code === countryCode)?.name})
            </span>
          </h3>
          
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <span>Converted @ 1 {activeRateObj.currencyCode} = ₹{activeRateObj.exportRateINR}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-3 p-12 text-center text-xs text-gray-500 bg-white rounded-[28px] border border-gray-200">
              <Calculator className="w-8 h-8 text-[#C8102E] animate-spin mx-auto mb-2" />
              <span>Calculating official India Post postage and foreign currency equivalents for {weightGrams}g...</span>
            </div>
          ) : (
            tariffs.map((t) => {
              const grandTotalForeign = inrToForeign(t.grandTotalINR);
              const baseRateForeign = inrToForeign(t.baseRateINR);
              const surchargeForeign = inrToForeign(t.surchargeINR);
              const perKgINR = Math.round((t.grandTotalINR / weightGrams) * 1000);
              const perKgForeign = inrToForeign(perKgINR);

              return (
                <div
                  key={t.serviceName}
                  className={`bg-white rounded-[28px] border-2 p-6 shadow-xs flex flex-col justify-between ${
                    t.isEligible ? 'border-gray-200 hover:border-[#C8102E] transition-all hover:shadow-md' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div>
                    {/* Header badge & transit days */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black uppercase tracking-wider text-gray-700 bg-gray-100 px-2.5 py-0.5 rounded-lg border border-gray-200">
                        {t.serviceName}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t.transitDays}</span>
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-base mb-3">{t.serviceLabel}</h3>

                    {/* Grand Total Price Block based on displayMode */}
                    <div className="my-4 p-4 rounded-2xl bg-gray-50 border border-gray-200/80">
                      {displayMode === 'dual' && (
                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight font-mono">
                              ₹{t.grandTotalINR.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-blue-700 tracking-tight font-mono">
                              {formatForeign(grandTotalForeign)}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 mt-1 border-t border-gray-200 pt-1">
                            <span>Indian Rupee</span>
                            <span>{activeRateObj.currencyName} ({activeRateObj.currencyCode})</span>
                          </div>
                        </div>
                      )}

                      {displayMode === 'inr' && (
                        <div>
                          <div className="text-3xl font-black text-gray-900 tracking-tight font-mono">
                            ₹{t.grandTotalINR.toLocaleString('en-IN')}
                          </div>
                          <div className="text-xs text-gray-500 font-bold mt-0.5">
                            Approx. {formatForeign(grandTotalForeign)} {activeRateObj.currencyCode}
                          </div>
                        </div>
                      )}

                      {displayMode === 'foreign' && (
                        <div>
                          <div className="text-3xl font-black text-blue-700 tracking-tight font-mono">
                            {formatForeign(grandTotalForeign)} {activeRateObj.currencyCode}
                          </div>
                          <div className="text-xs text-gray-500 font-bold mt-0.5">
                            Official: ₹{t.grandTotalINR.toLocaleString('en-IN')} INR
                          </div>
                        </div>
                      )}

                      {/* Detailed fee breakdown */}
                      <div className="mt-2.5 pt-2 border-t border-gray-200 text-[11px] text-gray-600 space-y-1">
                        <div className="flex items-center justify-between">
                          <span>Base Postage:</span>
                          <span className="font-mono font-medium">₹{t.baseRateINR} ({formatForeign(baseRateForeign)})</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Air / Fuel Surcharge (10%):</span>
                          <span className="font-mono font-medium">₹{t.surchargeINR} ({formatForeign(surchargeForeign)})</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-500 text-[10px]">
                          <span>Effective Rate / kg:</span>
                          <span className="font-mono">₹{perKgINR}/kg ({formatForeign(perKgForeign)}/kg)</span>
                        </div>
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 py-2 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Max Allowed Weight: <strong>{t.maxWeightKg} kg</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Customs Paperwork: <strong>{t.customsFormRequired} Declaration</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>UPU S10 Barcode Track & Trace</span>
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    {t.isEligible ? (
                      <button
                        onClick={() => onBookService && onBookService(t.serviceName)}
                        className="w-full py-3 bg-[#C8102E] hover:bg-[#A30D25] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all group cursor-pointer"
                      >
                        <span>Book PBE with {t.serviceName}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="text-center py-2 text-xs font-bold text-[#C8102E] bg-red-50 rounded-xl">
                        Exceeds service weight limit ({t.maxWeightKg}kg)
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Export Benefits and RoDTEP / Customs Information Banner */}
      <div className="bg-[#FFC107]/15 border-2 border-[#FFC107]/60 rounded-[28px] p-6 text-xs text-gray-800 flex flex-col sm:flex-row items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#FFC107] text-[#990B20] flex items-center justify-center font-black shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-gray-900 text-sm">
            Export Benefits for MSMEs & Artisans (RoDTEP & Duty Drawback)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Exports routed through Dak Ghar Niryat Kendra with valid PBE-III (e-Commerce) or PBE-IV (Commercial) are eligible for <strong>RoDTEP duty remissions</strong> (1.5% to 4.3% on FOB value) and zero-rated GST under Letter of Undertaking (LUT / Form GST RFD-11). Foreign exchange valuation on PBE forms must strictly follow the CBIC notified exchange rates displayed above.
          </p>
        </div>
      </div>

    </div>
  );
};
