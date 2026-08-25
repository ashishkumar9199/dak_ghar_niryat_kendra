import React, { useState } from 'react';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Building2, 
  Truck
} from 'lucide-react';
import { DGNKCenter, DGNK_CENTERS } from '../../server/data';

export const DGNKLocator: React.FC<{ language: 'EN' | 'HI'; onSelectCenter?: (c: DGNKCenter) => void }> = ({
  language,
  onSelectCenter
}) => {
  const isHindi = language === 'HI';

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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900">
              {isHindi ? 'डाक घर निर्यात केंद्र (DGNK) खोजें' : 'Dak Ghar Niryat Kendra (DGNK) Center Locator'}
            </h2>
            <p className="text-xs text-stone-500">
              Find designated India Post export booking counters equipped with digital PBE integration and Customs FPO links.
            </p>
          </div>
        </div>

        {/* Search & State Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-stone-200">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Post Office name, 6-digit Pincode, City, or Linked FPO..."
              className="w-full pl-9 pr-4 py-2.5 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            />
          </div>

          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
            >
              {states.map(st => (
                <option key={st} value={st}>{st === 'ALL' ? 'All States & Circles' : st}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Centers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCenters.map((center) => (
          <div
            key={center.id}
            className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:border-emerald-600 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {center.state} Circle
                </span>
                <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded">
                  PIN: {center.pincode}
                </span>
              </div>

              <h3 className="font-bold text-stone-900 text-sm mb-1">{center.name}</h3>
              <p className="text-xs text-stone-600 mb-3">{center.address}</p>

              <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{center.bookingTimings}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="font-mono">{center.contactNumber}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="text-[11px]">Linked to: <strong>{center.fpoAttached}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-700 text-[11px] font-semibold bg-emerald-50/70 p-1.5 rounded">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Doorstep pickup available for high-volume MSMEs</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Officer: {center.nodalOfficer}
              </span>

              {onSelectCenter && (
                <button
                  onClick={() => onSelectCenter(center)}
                  className="px-3 py-1 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-bold transition-colors"
                >
                  Select as My DGNK
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
