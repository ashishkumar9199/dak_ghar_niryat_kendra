import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Plane, 
  Building2, 
  ShieldCheck, 
  FileText, 
  ArrowRight,
  Globe2,
  AlertCircle
} from 'lucide-react';
import { TrackingResult } from '../types';

export const ShipmentTracker: React.FC<{ initialArticleId?: string; language: 'EN' | 'HI' }> = ({
  initialArticleId = 'EE928410294IN',
  language
}) => {
  const isHindi = language === 'HI';

  const [articleId, setArticleId] = useState(initialArticleId);
  const [trackingData, setTrackingData] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTracking = async (idToSearch: string) => {
    if (!idToSearch.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/shipments/track/${idToSearch.trim()}`);
      if (!res.ok) {
        throw new Error('Consignment article ID not found.');
      }
      const data = await res.json();
      setTrackingData(data);
    } catch (e: any) {
      setError(e.message || 'Tracking information could not be retrieved.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialArticleId) {
      fetchTracking(initialArticleId);
    }
  }, [initialArticleId]);

  const sampleArticles = [
    { id: 'EE928410294IN', label: 'Speed Post EMS to USA (In Flight Transit)' },
    { id: 'IN482019385IN', label: 'ITPS Packet to UK (Royal Mail Langley Hub)' },
    { id: 'CP710928374IN', label: 'Air Parcel to Germany (Delhi FPO Customs)' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Search Console */}
      <div className="bg-white rounded-[28px] sm:rounded-[32px] border border-gray-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3.5 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#D42426] flex items-center justify-center font-black">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              {isHindi ? 'भारतीय डाक अंतरराष्ट्रीय पार्सल ट्रैकर' : 'India Post International Article Lifecycle Tracker'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">
              Track 13-character UPU S10 Barcodes across DGNK booking, FPO EDI Customs clearance, and international destination hubs.
            </p>
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchTracking(articleId);
          }}
          className="flex flex-col sm:flex-row gap-2 mt-6 pt-4 border-t border-gray-100"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              value={articleId}
              onChange={(e) => setArticleId(e.target.value.toUpperCase())}
              placeholder="Enter 13-character Barcode (e.g. EE928410294IN)"
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-mono font-bold tracking-wider text-gray-900 focus:ring-2 focus:ring-[#D42426] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !articleId.trim()}
            className="px-6 py-3 bg-[#D42426] hover:bg-[#B71C1E] disabled:opacity-50 text-white font-bold text-xs rounded-2xl transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{loading ? 'Searching...' : 'Track Article'}</span>
          </button>
        </form>

        {/* Sample Barcode Buttons */}
        <div className="flex flex-wrap items-center gap-2 mt-3.5 text-xs text-gray-500">
          <span className="font-bold text-gray-400">Quick Samples:</span>
          {sampleArticles.map(s => (
            <button
              key={s.id}
              onClick={() => {
                setArticleId(s.id);
                fetchTracking(s.id);
              }}
              className="bg-gray-100 hover:bg-red-50 hover:text-[#D42426] hover:border-red-200 border border-gray-200 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all"
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tracking Details View */}
      {trackingData && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Top Status Header */}
          <div className="bg-white rounded-[28px] border border-gray-200 p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-black text-lg text-gray-900">{trackingData.articleId}</span>
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">
                    {trackingData.serviceType}
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <span>From: <strong>{trackingData.origin}</strong></span>
                  <ArrowRight className="w-3 h-3 text-gray-400" />
                  <span>To: <strong>{trackingData.destination}</strong></span>
                </div>
              </div>

              <div className="sm:text-right">
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">Current Status</div>
                <div className="text-base font-black text-[#D42426] mt-0.5">{trackingData.currentStatus}</div>
                <div className="text-[11px] text-gray-400">Estimated Delivery: {trackingData.estimatedDelivery}</div>
              </div>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="bg-white rounded-[28px] border border-gray-200 p-6 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">
              Consignment Event History
            </h3>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200">
              {trackingData.events.map((evt, idx) => {
                const isLatest = idx === 0;
                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isLatest 
                        ? 'bg-[#D42426] border-white shadow-md' 
                        : 'bg-white border-gray-300'
                    }`}>
                      {isLatest && <div className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-ping" />}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-black ${isLatest ? 'text-[#D42426]' : 'text-gray-800'}`}>
                          {evt.status}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400">{evt.timestamp}</span>
                      </div>
                      <div className="text-xs text-gray-600 font-medium">{evt.location}</div>
                      {evt.remarks && (
                        <div className="text-[11px] text-gray-500 mt-1 italic">{evt.remarks}</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
