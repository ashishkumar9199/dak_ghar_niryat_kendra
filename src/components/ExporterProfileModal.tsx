import React, { useState } from 'react';
import { X, User, Building2, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { ExporterProfile } from '../types';

interface ExporterProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ExporterProfile;
  onSaveProfile: (newProfile: ExporterProfile) => void;
}

export const ExporterProfileModal: React.FC<ExporterProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<ExporterProfile>({ ...profile });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">Exporter Profile & Registration</h3>
              <p className="text-xs text-stone-500">Configure your trade credentials and default DGNK counter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 text-sm font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs">
          
          <div>
            <label className="block font-semibold text-stone-700 mb-1">Business / Artisan Name *</label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-600 focus:outline-hidden"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Contact Person *</label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Business Category *</label>
              <select
                value={formData.businessCategory}
                onChange={(e) => setFormData(prev => ({ ...prev, businessCategory: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
              >
                <option value="Handicrafts & Artifacts">Handicrafts & Artifacts</option>
                <option value="Handloom & Textiles">Handloom & Textiles</option>
                <option value="Ayurveda & Herbal">Ayurveda & Herbal</option>
                <option value="Leather & Footwear">Leather & Footwear</option>
                <option value="Jewelry & Brassware">Jewelry & Brassware</option>
                <option value="Spices & Organic Food">Spices & Organic Food</option>
                <option value="General Merchandise">General Merchandise</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Import Export Code (IEC)</label>
              <input
                type="text"
                value={formData.iecCode}
                onChange={(e) => setFormData(prev => ({ ...prev, iecCode: e.target.value, hasIEC: !!e.target.value }))}
                placeholder="e.g. 0512048291 (Leave blank if exempt)"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono font-bold"
              />
              <span className="text-[10px] text-stone-500 mt-0.5 block">
                FTP Para 2.07 exemption for personal gifts/samples &lt; ₹5L
              </span>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">GSTIN (if registered)</label>
              <input
                type="text"
                value={formData.gstin}
                onChange={(e) => setFormData(prev => ({ ...prev, gstin: e.target.value, hasGST: !!e.target.value }))}
                placeholder="07AAAAA0000A1Z5"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Bank AD Code (for EDPMS)</label>
              <input
                type="text"
                value={formData.adCode}
                onChange={(e) => setFormData(prev => ({ ...prev, adCode: e.target.value }))}
                placeholder="14-digit Authorized Dealer Code"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Preferred DGNK Counter</label>
              <input
                type="text"
                value={formData.preferredDGNK}
                onChange={(e) => setFormData(prev => ({ ...prev, preferredDGNK: e.target.value }))}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
              />
            </div>
          </div>

          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-2">
            <input
              type="checkbox"
              id="hasLUT"
              checked={formData.hasLUT}
              onChange={(e) => setFormData(prev => ({ ...prev, hasLUT: e.target.checked }))}
              className="rounded text-red-700 focus:ring-red-600"
            />
            <label htmlFor="hasLUT" className="text-xs text-stone-700 font-medium">
              Letter of Undertaking (LUT / RFD-11) Active (Zero-rated export without upfront IGST payment)
            </label>
          </div>

          {/* Footer CTAs */}
          <div className="flex justify-end gap-2 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white rounded-lg font-bold shadow-xs transition-colors"
            >
              Save Profile Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
