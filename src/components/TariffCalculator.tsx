import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Globe2, 
  Plane, 
  Clock, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  ShieldCheck, 
  Scale,
  Sparkles
} from 'lucide-react';
import { TariffOption } from '../types';

export const TariffCalculator: React.FC<{ language: 'EN' | 'HI'; onBookService?: (service: string) => void }> = ({
  language,
  onBookService
}) => {
  const isHindi = language === 'HI';

  const [countryCode, setCountryCode] = useState('US');
  const [weightGrams, setWeightGrams] = useState(800);
  const [declaredValueINR, setDeclaredValueINR] = useState(8500);
  const [tariffs, setTariffs] = useState<TariffOption[]>([]);
  const [loading, setLoading] = useState(false);

  const countries = [
    { code: 'US', name: 'United States of America', region: 'Americas' },
    { code: 'GB', name: 'United Kingdom', region: 'Europe' },
    { code: 'DE', name: 'Germany / European Union', region: 'Europe' },
    { code: 'AE', name: 'United Arab Emirates (Dubai/Abu Dhabi)', region: 'Middle East' },
    { code: 'AU', name: 'Australia', region: 'Oceania' },
    { code: 'CA', name: 'Canada', region: 'Americas' }
  ];

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

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D42426] flex items-center justify-center font-black">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {isHindi ? 'भारतीय डाक अंतरराष्ट्रीय दर कैलकुलेटर' : 'India Post International Tariff Calculator'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Official postal rates for Speed Post International (EMS), Tracked Packet (ITPS), and Air Parcel.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 pt-6 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-blue-600" />
              <span>Destination Country</span>
            </label>
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#D42426] focus:outline-none"
            >
              {countries.map(c => (
                <option key={c.code} value={c.code}>{c.name} ({c.region})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-gray-600" />
                <span>Parcel Gross Weight</span>
              </span>
              <span className="font-mono font-black text-[#D42426]">
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
                className="w-full accent-[#D42426] cursor-pointer"
              />
              <div className="flex gap-1.5 flex-wrap">
                {[100, 500, 1000, 2000, 5000, 10000].map(w => (
                  <button
                    key={w}
                    onClick={() => setWeightGrams(w)}
                    className={`text-[11px] px-2.5 py-1 rounded-xl border transition-colors ${
                      weightGrams === w
                        ? 'bg-[#D42426] text-white font-bold border-[#D42426]'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {w >= 1000 ? `${w / 1000}kg` : `${w}g`}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Declared Export Value (INR)
            </label>
            <input
              type="number"
              min="100"
              step="500"
              value={declaredValueINR}
              onChange={(e) => setDeclaredValueINR(parseInt(e.target.value, 10) || 0)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono font-bold text-gray-900 focus:ring-2 focus:ring-[#D42426] focus:outline-none"
              placeholder="Declared FOB value"
            />
            <span className="text-[11px] text-gray-500 mt-1.5 block font-medium">
              {declaredValueINR <= 30000 ? 'Eligible for Form CN22 (≤ 300 SDR)' : 'Mandatory Form CN23 (> 300 SDR)'}
            </span>
          </div>
        </div>
      </div>

      {/* Calculated Rate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 p-12 text-center text-xs text-gray-500 bg-white rounded-[28px] border border-gray-200">
            <Calculator className="w-8 h-8 text-[#D42426] animate-spin mx-auto mb-2" />
            <span>Calculating postage for {weightGrams}g...</span>
          </div>
        ) : (
          tariffs.map((t) => (
            <div
              key={t.serviceName}
              className={`bg-white rounded-[28px] border-2 p-6 shadow-xs flex flex-col justify-between ${
                t.isEligible ? 'border-gray-200 hover:border-[#D42426] transition-colors' : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    {t.serviceName}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t.transitDays}</span>
                  </span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-2">{t.serviceLabel}</h3>

                <div className="my-4">
                  <div className="text-3xl font-black text-gray-900 tracking-tight">
                    ₹{t.grandTotalINR.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 font-medium">
                    Base: ₹{t.baseRateINR} + Fuel/Customs: ₹{t.fuelSurchargeINR} + GST: ₹{t.taxINR}
                  </div>
                </div>

                <div className="space-y-2 py-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Max Allowed Weight: <strong>{t.maxWeightKg} kg</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Customs Paperwork: <strong>{t.customsDoc}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>UPU S10 End-to-End Tracking</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                {t.isEligible ? (
                  <button
                    onClick={() => onBookService && onBookService(t.serviceName)}
                    className="w-full py-3 bg-[#D42426] hover:bg-[#B71C1E] text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all group"
                  >
                    <span>Create PBE with this Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="text-center py-2 text-xs font-bold text-[#D42426]">
                    Exceeds service weight limit ({t.maxWeightKg}kg)
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* RoDTEP & GST Export Incentive Note */}
      <div className="bg-[#FFC107]/20 border border-[#FFC107]/50 rounded-[28px] p-6 text-xs text-gray-800 flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-[#FFC107] text-[#D42426] flex items-center justify-center font-black shrink-0 shadow-xs">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-sm mb-1">
            Export Benefits for MSMEs & Artisans (RoDTEP & Duty Drawback)
          </h4>
          <p className="text-gray-700 leading-relaxed">
            Exports routed through Dak Ghar Niryat Kendra with valid PBE-I/PBE-II declarations are eligible for <strong>RoDTEP duty remissions</strong> (1.5% to 4.3% on FOB value) and zero-rated GST under LUT (Form GST RFD-11).
          </p>
        </div>
      </div>

    </div>
  );
};
