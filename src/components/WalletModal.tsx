import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  RefreshCw, 
  Receipt,
  Sparkles,
  QrCode,
  AlertCircle
} from 'lucide-react';
import { ExporterProfile, SupportedLanguage } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ExporterProfile;
  language: SupportedLanguage;
  onUpdateBalance: (newBalance: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  profile,
  language,
  onUpdateBalance,
}) => {
  if (!isOpen) return null;

  const isHindi = language === 'HI' || language === 'MAI';
  const currentBalance = profile.walletBalance ?? 18450;
  const [topUpAmount, setTopUpAmount] = useState<number>(5000);
  const [paymentMode, setPaymentMode] = useState<'upi' | 'netbanking' | 'neft'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const transactions = [
    {
      id: 'TXN-984210',
      date: '24 Aug 2026, 14:32',
      type: 'DEBIT',
      desc: 'Speed Post EMS Franking - PBE #DGNK-2024-88234 (US)',
      amount: 1982.40,
      status: 'SUCCESS'
    },
    {
      id: 'TXN-984188',
      date: '22 Aug 2026, 11:15',
      type: 'DEBIT',
      desc: 'ITPS Packet Booking - PBE #DGNK-2024-88241 (UK)',
      amount: 855.00,
      status: 'SUCCESS'
    },
    {
      id: 'TXN-983994',
      date: '18 Aug 2026, 09:40',
      type: 'CREDIT',
      desc: 'Wallet Top-Up via SBI Corporate e-Payment (Ref: SBIE9821)',
      amount: 10000.00,
      status: 'SUCCESS'
    },
    {
      id: 'TXN-983512',
      date: '12 Aug 2026, 16:20',
      type: 'DEBIT',
      desc: 'Air Parcel Franking - PBE #DGNK-2024-88255 (AU)',
      amount: 2450.00,
      status: 'SUCCESS'
    }
  ];

  const handleTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBal = currentBalance + topUpAmount;
      onUpdateBalance(newBal);
      setIsProcessing(false);
      setSuccessMessage(isHindi ? `₹${topUpAmount.toLocaleString('en-IN')} सफलतापूर्वक वॉलेट में जोड़े गए!` : `₹${topUpAmount.toLocaleString('en-IN')} successfully added to India Post DNK Wallet!`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-gray-200">
        
        {/* Header with India Post Red & Yellow Brand */}
        <div className="bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-[#990B20] flex items-center justify-center font-black shadow-md">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider text-amber-200">
                  {isHindi ? 'डाक घर निर्यात केंद्र' : 'India Post DNK Portal'}
                </span>
                <span className="text-xs text-amber-100 font-bold">
                  IEC: {profile.iecCode || '0518029481'}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'निर्यातक फ्रैंकिंग वॉलेट' : 'Exporter Prepaid Franking Wallet'}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-amber-50 via-white to-red-50 border-2 border-amber-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                {isHindi ? 'उपलब्ध फ्रैंकिंग बैलेंस' : 'Available Franking Balance'}
              </span>
              <div className="text-3xl font-black text-gray-900 mt-1 flex items-baseline gap-1">
                <span>₹</span>
                <span>{currentBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
                <span>Auto-debited when printing UPU Barcode Postal Franking Labels</span>
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Account
              </span>
              <p className="text-[11px] font-mono text-gray-500 mt-1">
                Linked FPO: Delhi FPO / Varanasi HPO
              </p>
            </div>
          </div>

          {/* Success Banner */}
          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Quick Top-Up Section */}
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-700 uppercase tracking-wider block">
              {isHindi ? 'वॉलेट रिचार्ज राशि चुनें' : 'Select Instant Top-Up Amount'}:
            </label>

            <div className="grid grid-cols-4 gap-2">
              {[2000, 5000, 10000, 25000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-2 px-3 rounded-xl font-black text-xs border transition-all ${
                    topUpAmount === amt
                      ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-xs'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                  }`}
                >
                  ₹{amt.toLocaleString('en-IN')}
                </button>
              ))}
            </div>

            {/* Payment Mode Pills */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setPaymentMode('upi')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  paymentMode === 'upi' ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                <QrCode className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('netbanking')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  paymentMode === 'netbanking' ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Corporate NetBanking</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMode('neft')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                  paymentMode === 'neft' ? 'bg-amber-100 border-amber-300 text-amber-900' : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>NEFT / RTGS</span>
              </button>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleTopUp}
              className="w-full py-2.5 rounded-xl bg-[#C8102E] hover:bg-[#A60D24] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#FFC107]" />
                  <span>Processing Payment via Bharatkosh / SBI Gateway...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#FFC107]" />
                  <span>Top Up ₹{topUpAmount.toLocaleString('en-IN')} Now</span>
                </>
              )}
            </button>
          </div>

          {/* Recent Postage Ledger / Deductions */}
          <div className="space-y-2.5 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-gray-700 uppercase tracking-wider flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-[#C8102E]" />
                {isHindi ? 'हालिया फ्रैंकिंग व डेबिट लेन-देन' : 'Recent Postage Franking Ledger'}
              </span>
              <span className="text-[11px] text-gray-400 font-semibold">
                ICEGATE Reconciled
              </span>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {transactions.map((tx) => (
                <div 
                  key={tx.id} 
                  className="p-2.5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/80 transition-colors flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      tx.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-[#C8102E]'
                    }`}>
                      {tx.type === 'CREDIT' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 truncate max-w-[280px]">{tx.desc}</p>
                      <span className="text-[10px] text-gray-500 font-mono">{tx.id} • {tx.date}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`font-black font-mono block ${
                      tx.type === 'CREDIT' ? 'text-emerald-700' : 'text-[#C8102E]'
                    }`}>
                      {tx.type === 'CREDIT' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                    </span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-semibold">
          <span>Official Department of Posts e-Payment Service</span>
          <button
            onClick={onClose}
            className="font-bold text-gray-700 hover:text-gray-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
