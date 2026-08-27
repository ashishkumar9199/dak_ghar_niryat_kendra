import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Building2, 
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { DGNKCenter, DGNK_CENTERS } from '../../server/data';
import { SupportedLanguage } from '../types';

export const DGNKLocator: React.FC<{ language: SupportedLanguage; onSelectCenter?: (c: DGNKCenter) => void }> = ({
  language,
  onSelectCenter
}) => {
  const isHindi = language === 'HI' || language === 'MAI';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('ALL');

  const states = ['ALL', 'Delhi', 'Maharashtra', 'Karnataka', 'Rajasthan', 'Uttar Pradesh', 'Tamil Nadu', 'West Bengal'];

  const filteredCenters = DGNK_CENTERS.filter(c => {
    const fpoName = c.fpoAttached || '';
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.pincode.includes(searchQuery) ||
                          c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          fpoName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === 'ALL' || c.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="w-full max-w-6xl 2xl:max-w-[1440px] mx-auto px-3 sm:px-5 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-4 sm:space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 p-4 sm:p-6 lg:p-7 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-speedpost-stripes" />

        <div className="flex items-center gap-3 mb-2 mt-1">
          <div className="w-11 h-11 rounded-2xl bg-red-100 text-[#C8102E] flex items-center justify-center font-bold shadow-2xs">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                India Post Network
              </span>
              <span className="text-xs text-gray-500 font-semibold">1,000+ Authorized Booking Counters</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-0.5">
              {isHindi ? 'डाक घर निर्यात केंद्र (DGNK) खोजें' : 'Find Nearest Dak Ghar Niryat Kendra'}
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Locate authorized post offices with electronic PBE counter integration and linked Foreign Post Offices (FPO).
            </p>
          </div>
        </div>

        {/* Search & State Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-gray-200">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Post Office name, 6-digit Pincode, City, or Linked FPO..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#C8102E] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-[#C8102E] focus:bg-white focus:outline-none transition-all"
            >
              {states.map(s => (
                <option key={s} value={s}>{s === 'ALL' ? 'All States & Circles' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid of DGNK Centers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCenters.map(center => (
          <div 
            key={center.id}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs hover:border-[#C8102E] hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="inline-block px-2 py-0.5 bg-red-100 text-[#C8102E] font-bold text-[10px] rounded-md uppercase tracking-wider mb-1">
                    {center.state} • PIN: {center.pincode}
                  </span>
                  <h3 className="text-base font-black text-gray-900 group-hover:text-[#C8102E] transition-colors">
                    {center.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{center.address}</p>
                </div>

                <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-[#C8102E] group-hover:text-white flex items-center justify-center text-gray-600 transition-colors shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-gray-50 rounded-xl text-xs border border-gray-100">
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{center.bookingTimings || '09:00 - 17:00'}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{center.contactNumber || '1800-266-6868'}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 text-[#C8102E] font-semibold text-[11px] pt-1 border-t border-gray-200/60">
                  <Truck className="w-3.5 h-3.5 shrink-0" />
                  <span>Linked FPO: <strong>{center.fpoAttached || 'Delhi FPO'}</strong> (EDI Enabled)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-1">
              <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PBE Barcode Accepted</span>
              </span>

              <button
                onClick={() => onSelectCenter && onSelectCenter(center)}
                className="px-3 py-1.5 bg-[#C8102E] hover:bg-[#A60D24] text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-2xs"
              >
                <span>Select for Drop-off</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
