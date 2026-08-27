import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Package, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Calculator, 
  Printer, 
  Sparkles, 
  Plus, 
  Trash2, 
  AlertCircle,
  Globe2,
  Info,
  Layers,
  HelpCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { ExporterProfile, ProductItem, ShipmentFormData, TariffOption } from '../types';
import { HS_CODES_DATABASE } from '../../server/data';

interface ShipmentWizardProps {
  profile: ExporterProfile;
  language: 'EN' | 'HI';
  onShipmentCreated: (shipmentData: any) => void;
  onAskAI: (prompt: string) => void;
}

export const ShipmentWizard: React.FC<ShipmentWizardProps> = ({
  profile,
  language,
  onShipmentCreated,
  onAskAI
}) => {
  const isHindi = language === 'HI';

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ShipmentFormData>({
    exporter: profile,
    recipient: {
      name: 'Sophia Miller',
      companyName: 'Artisan Living Imports LLC',
      addressLine1: '4502 Westlake Avenue, Suite 300',
      addressLine2: '',
      city: 'Austin',
      stateOrProvince: 'Texas',
      postalCode: '78746',
      country: 'United States',
      countryCode: 'US',
      email: 'sophia@artisanliving.com',
      phone: '+1 (512) 555-0199',
      taxIdOrIOSS: 'US-EIN-9842104'
    },
    products: [
      {
        id: 'prod-1',
        name: 'Handmade Brass Ganesha Figurine (Antique Finish)',
        description: 'Cast brass handicraft decorative statue made by traditional Moradabad artisans',
        hsCode: '7419.80.00',
        quantity: 2,
        unit: 'PCS',
        valueINR: 4500,
        weightGrams: 1200,
        countryOfOrigin: 'India',
        material: 'Brass (Copper-Zinc Alloy)',
        isFragile: true
      }
    ],
    serviceType: 'EMS',
    categoryOfItem: 'Sold Goods (E-Commerce)',
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    specialInstructions: 'Fragile brass handicraft. Handle with care. Moisture-barrier packaging.'
  });

  const [screeningResult, setScreeningResult] = useState<{
    status: 'FREE' | 'RESTRICTED' | 'PROHIBITED';
    color: string;
    message: string;
    action: string;
  } | null>(null);

  const [tariffs, setTariffs] = useState<TariffOption[]>([]);
  const [loadingTariffs, setLoadingTariffs] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [createdResult, setCreatedResult] = useState<any>(null);

  // Helper computations
  const totalValueINR = formData.products.reduce((acc, p) => acc + (p.valueINR * p.quantity), 0);
  const totalWeightGrams = formData.products.reduce((acc, p) => acc + (p.weightGrams * p.quantity), 0);
  const isCustomsCN23Required = totalValueINR > 30000 || formData.serviceType !== 'ITPS';

  // Fetch tariffs when reaching Step 5
  const fetchTariffs = async () => {
    setLoadingTariffs(true);
    try {
      const res = await fetch(`/api/rates/calculate?countryCode=${formData.recipient.countryCode}&weightGrams=${totalWeightGrams}&declaredValueINR=${totalValueINR}`);
      const data = await res.json();
      setTariffs(data.services || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTariffs(false);
    }
  };

  // Run regulatory screener when reaching Step 4
  const runScreening = async () => {
    try {
      const combinedNames = formData.products.map(p => p.name).join(' ');
      const res = await fetch('/api/customs/screen-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemName: combinedNames,
          destinationCountry: formData.recipient.country
        })
      });
      const data = await res.json();
      setScreeningResult(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      runScreening();
    }
    if (currentStep === 4) {
      fetchTariffs();
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const addProduct = () => {
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      name: '',
      description: '',
      hsCode: '6204.42.20',
      quantity: 1,
      unit: 'PCS',
      valueINR: 2000,
      weightGrams: 500,
      countryOfOrigin: 'India',
      material: 'Cotton / Handloom',
      isFragile: false
    };
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, newProd]
    }));
  };

  const removeProduct = (id: string) => {
    if (formData.products.length <= 1) return;
    setFormData(prev => ({
      ...prev,
      products: prev.products.filter(p => p.id !== id)
    }));
  };

  const updateProduct = (id: string, field: keyof ProductItem, val: any) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, [field]: val } : p)
    }));
  };

  const submitFinalShipment = async () => {
    setSubmitting(true);
    try {
      const payload = {
        serviceType: formData.serviceType,
        exporterDetails: formData.exporter,
        recipientDetails: formData.recipient,
        products: formData.products,
        customsDeclaration: {
          category: formData.categoryOfItem,
          invoiceNumber: formData.invoiceNumber,
          invoiceDate: formData.invoiceDate,
          totalValueINR,
          totalWeightGrams,
          formType: isCustomsCN23Required ? 'CN23' : 'CN22'
        }
      };

      const res = await fetch('/api/shipments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      setCreatedResult(data);
      onShipmentCreated(data);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      setCurrentStep(6);
    } catch (e) {
      console.error(e);
      alert('Error creating shipment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany / European Union' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'SG', name: 'Singapore' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Step Progress Bar */}
      <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-6 mb-6 shadow-2xs">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
          <span>{isHindi ? `चरण ${currentStep} / 6` : `Step ${currentStep} of 6`}</span>
          <span className="text-red-700 font-bold">
            {currentStep === 1 && (isHindi ? 'निर्यातक व प्राप्तकर्ता' : '1. Exporter & Recipient')}
            {currentStep === 2 && (isHindi ? 'उत्पाद व एचएस कोड' : '2. Products & HS Codes')}
            {currentStep === 3 && (isHindi ? 'सीमा शुल्क घोषणा' : '3. Customs Declaration')}
            {currentStep === 4 && (isHindi ? 'प्रतिबंध व अनुपालन जांच' : '4. Restrictions & Compliance')}
            {currentStep === 5 && (isHindi ? 'डाक सेवा व शुल्क' : '5. Postal Service & Tariff')}
            {currentStep === 6 && (isHindi ? 'PBE व दस्तावेज़ तैयार' : '6. Manifest & Documents Ready')}
          </span>
        </div>

        {/* Progress Dots */}
        <div className="grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map(st => (
            <div
              key={st}
              className={`h-2 rounded-full transition-all ${
                st < currentStep
                  ? 'bg-emerald-600'
                  : st === currentStep
                  ? 'bg-red-700 ring-2 ring-red-200'
                  : 'bg-stone-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Exporter & Recipient */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#C8102E] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                CBIC 48/2018-Customs (N.T.)
              </span>
              <span className="text-xs text-gray-500 font-semibold">
                Electronic Postal Bill of Export
              </span>
            </div>
            <h2 className="text-lg font-black text-stone-900">
              {isHindi ? 'चरण 1: PBE प्रकार, निर्यातक व गंतव्य प्राप्तकर्ता विवरण' : 'Step 1: PBE Classification, Exporter & Consignee Details'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Select mandatory PBE statutory category and specify the overseas recipient address in Latin script (English).
            </p>
          </div>

          {/* Official PBE Type Selector */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
            <label className="text-xs font-black text-stone-900 uppercase tracking-wider block mb-2">
              {isHindi ? 'पोस्टल बिल ऑफ एक्सपोर्ट (PBE) श्रेणी चुनें *' : 'Select Statutory Postal Bill of Export (PBE) Category *'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div 
                onClick={() => setFormData(prev => ({ ...prev, categoryOfItem: 'Sold Goods (E-Commerce)' }))}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.categoryOfItem.includes('E-Commerce')
                    ? 'bg-white border-[#C8102E] shadow-xs'
                    : 'bg-white/60 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-[#C8102E]">PBE-III (E-Commerce)</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">B2C Retail</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                  For cross-border e-commerce orders sold via online marketplaces, Shopify, Amazon Global, Etsy or exporter website.
                </p>
              </div>

              <div 
                onClick={() => setFormData(prev => ({ ...prev, categoryOfItem: 'Commercial Export (B2B)' }))}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.categoryOfItem.includes('Commercial')
                    ? 'bg-white border-[#C8102E] shadow-xs'
                    : 'bg-white/60 border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-xs text-[#C8102E]">PBE-IV (Commercial / Other)</span>
                  <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">B2B Trade</span>
                </div>
                <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                  For direct B2B wholesale consignments, trade samples, promotional exhibits, or non-marketplace commercial dispatches.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Exporter Info (Read-only / verified from profile) */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-red-700" />
                  <span>Sender / Exporter Profile</span>
                </span>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  DGNK Verified
                </span>
              </div>

              <div>
                <span className="text-stone-500 block">Business / Artisan Name:</span>
                <span className="font-bold text-stone-900 text-sm">{formData.exporter.businessName || 'Heritage Crafts India'}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-stone-500 block">IEC Code:</span>
                  <span className="font-mono font-bold text-stone-800">{formData.exporter.iecCode || 'GIFT EXEMPT (FTP 2.07)'}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">GSTIN:</span>
                  <span className="font-mono font-bold text-stone-800">{formData.exporter.gstin || '07AAAAA0000A1Z5'}</span>
                </div>
              </div>

              <div>
                <span className="text-stone-500 block">Booking DGNK Post Office:</span>
                <span className="font-semibold text-stone-800">{formData.exporter.preferredDGNK || 'New Delhi GPO DGNK (110001)'}</span>
              </div>
            </div>

            {/* Right: Recipient Form */}
            <div className="space-y-3">
              <div className="font-bold text-xs text-stone-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                <Globe2 className="w-3.5 h-3.5 text-blue-700" />
                <span>Overseas Recipient (Buyer)</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Destination Country *</label>
                <select
                  value={formData.recipient.countryCode}
                  onChange={(e) => {
                    const sel = countries.find(c => c.code === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      recipient: {
                        ...prev.recipient,
                        countryCode: e.target.value,
                        country: sel ? sel.name : e.target.value
                      }
                    }));
                  }}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-red-600 focus:outline-hidden"
                >
                  {countries.map(c => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    value={formData.recipient.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, name: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Company / Store</label>
                  <input
                    type="text"
                    value={formData.recipient.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, companyName: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                    placeholder="Company (Optional)"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Address Line 1 *</label>
                <input
                  type="text"
                  value={formData.recipient.addressLine1}
                  onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, addressLine1: e.target.value } }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  placeholder="Street address / Suite / Apartment"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.recipient.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, city: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">State / Province</label>
                  <input
                    type="text"
                    value={formData.recipient.stateOrProvince}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, stateOrProvince: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">ZIP / Postal Code *</label>
                  <input
                    type="text"
                    value={formData.recipient.postalCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, postalCode: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email (for delivery SMS)</label>
                  <input
                    type="email"
                    value={formData.recipient.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, email: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    value={formData.recipient.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, recipient: { ...prev.recipient, phone: e.target.value } }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-stone-200">
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>{isHindi ? 'आगे बढ़ें: उत्पाद विवरण' : 'Next: Product Information'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Products & HS Codes */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-stone-900">
                {isHindi ? 'चरण 2: उत्पाद विवरण एवं एचएस कोड वर्गीकरण' : 'Step 2: Product Items & HS Code Classification'}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Accurate 6 or 8 digit Harmonized System (HS) codes ensure smooth Foreign Post Office (FPO) customs clearance.
              </p>
            </div>
            <button
              onClick={addProduct}
              className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Item</span>
            </button>
          </div>

          {/* Product Items List */}
          <div className="space-y-4">
            {formData.products.map((prod, idx) => (
              <div
                key={prod.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-800">
                    Item #{idx + 1}
                  </span>
                  {formData.products.length > 1 && (
                    <button
                      onClick={() => removeProduct(prod.id)}
                      className="text-red-600 hover:text-red-800 text-xs flex items-center gap-1 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Item Title / Name *</label>
                    <input
                      type="text"
                      value={prod.name}
                      onChange={(e) => updateProduct(prod.id, 'name', e.target.value)}
                      placeholder="e.g. Handmade Brass Ganesha Statue"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Harmonized System (HS) Code *
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={prod.hsCode}
                        onChange={(e) => updateProduct(prod.id, 'hsCode', e.target.value)}
                        className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono font-bold text-stone-900"
                      >
                        {HS_CODES_DATABASE.map(h => (
                          <option key={h.code} value={h.code}>
                            {h.code} — {h.description.substring(0, 45)}...
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => onAskAI(`What is the correct 8-digit HS Code for ${prod.name || 'this handicraft'} in India Post DGNK?`)}
                        className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
                        title="Search with AI"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                        <span>AI HS Code</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={prod.quantity}
                      onChange={(e) => updateProduct(prod.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Unit Value (INR) *</label>
                    <input
                      type="number"
                      min="10"
                      value={prod.valueINR}
                      onChange={(e) => updateProduct(prod.id, 'valueINR', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Weight per Unit (Grams) *</label>
                    <input
                      type="number"
                      min="10"
                      value={prod.weightGrams}
                      onChange={(e) => updateProduct(prod.id, 'weightGrams', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Material Composition</label>
                    <input
                      type="text"
                      value={prod.material}
                      onChange={(e) => updateProduct(prod.id, 'material', e.target.value)}
                      placeholder="e.g. 100% Brass / Cotton"
                      className="w-full px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id={`fragile-${prod.id}`}
                    checked={prod.isFragile}
                    onChange={(e) => updateProduct(prod.id, 'isFragile', e.target.checked)}
                    className="rounded text-red-700 focus:ring-red-600"
                  />
                  <label htmlFor={`fragile-${prod.id}`} className="text-xs font-medium text-stone-700">
                    Fragile Handicraft / Delicate Item (Requires 50mm inner cushioning & 'FRAGILE' postal sticker)
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Consignment Totals Card */}
          <div className="bg-red-50/60 border border-red-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-stone-500 block">Total Declared FOB Value:</span>
              <span className="font-mono font-black text-red-900 text-lg">
                ₹{totalValueINR.toLocaleString('en-IN')}
              </span>
              <span className="text-[11px] text-stone-500 block">
                {totalValueINR <= 30000 ? 'Eligible for Form CN22 (≤ 300 SDR)' : 'Requires Form CN23 & PBE-I Declaration'}
              </span>
            </div>

            <div>
              <span className="text-stone-500 block">Total Gross Weight:</span>
              <span className="font-mono font-black text-stone-900 text-lg">
                {(totalWeightGrams / 1000).toFixed(2)} kg <span className="text-xs font-normal text-stone-500">({totalWeightGrams} g)</span>
              </span>
            </div>

            <div>
              <span className="text-stone-500 block">Export Category:</span>
              <span className="font-bold text-stone-900">
                {formData.categoryOfItem}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>{isHindi ? 'आगे बढ़ें: सीमा शुल्क घोषणा' : 'Next: Customs Declaration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customs Declaration */}
      {currentStep === 3 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-stone-900">
              {isHindi ? 'चरण 3: डाक सीमा शुल्क घोषणा (Customs Declaration)' : 'Step 3: Postal Customs Declaration (CN22 / CN23 & PBE)'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Select export intent, invoice reference, and commercial purpose under CBIC Circular 14/2018.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category of Export Item *</label>
                <select
                  value={formData.categoryOfItem}
                  onChange={(e: any) => setFormData(prev => ({ ...prev, categoryOfItem: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                >
                  <option value="Sold Goods (E-Commerce)">Sold Goods (E-Commerce B2C / B2B Export)</option>
                  <option value="Gift">Gift (Personal / Non-commercial)</option>
                  <option value="Commercial Sample">Commercial Trade Sample</option>
                  <option value="Returned Goods">Returned Goods</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Commercial Invoice No. *</label>
                  <input
                    type="text"
                    value={formData.invoiceNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Invoice Date *</label>
                  <input
                    type="date"
                    value={formData.invoiceDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Handling / Packaging Instructions</label>
                <textarea
                  rows={3}
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium"
                  placeholder="Special instructions for postal handlers and foreign customs..."
                />
              </div>
            </div>

            {/* Customs Form Decision Card */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <span className="font-bold text-stone-900 uppercase tracking-wider">
                  Automated Form Determination
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-100 text-purple-900 border border-purple-200">
                  {isCustomsCN23Required ? 'FORM CN23 + CP72' : 'FORM CN22 (Green Label)'}
                </span>
              </div>

              <div className="space-y-2 text-stone-700">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Postal Bill of Export (PBE-I):</strong> Will be electronically pre-filed to Foreign Post Office (FPO) Customs EDI server.
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Invoicing:</strong> 4 copies of Commercial Invoice & Packing list will be automatically formatted for the outer document pouch.
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>GST / LUT Exemption:</strong> Zero-rated export under Rule 96A with no upfront IGST payment.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>{isHindi ? 'आगे बढ़ें: प्रतिबंध व अनुपालन जांच' : 'Next: Compliance Screening'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Restrictions & Regulatory Screen */}
      {currentStep === 4 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-stone-900">
              {isHindi ? 'चरण 4: नियामक अनुपालन एवं प्रतिबंध जांच' : 'Step 4: Regulatory Compliance & Restriction Screener'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Automatic validation against ICAO Dangerous Goods, CITES wildlife list, and destination country biosecurity rules.
            </p>
          </div>

          {/* Screener Status Banner */}
          {screeningResult && (
            <div className={`p-5 rounded-xl border ${
              screeningResult.status === 'FREE'
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : screeningResult.status === 'RESTRICTED'
                ? 'bg-amber-50 border-amber-300 text-amber-950'
                : 'bg-red-50 border-red-300 text-red-950'
            }`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {screeningResult.status === 'FREE' ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <span>Export Policy Status: {screeningResult.status}</span>
              </div>
              <p className="text-xs mt-1 leading-relaxed">{screeningResult.message}</p>
              <div className="text-xs font-semibold mt-2 pt-2 border-t border-black/10">
                Required Exporter Action: {screeningResult.action}
              </div>
            </div>
          )}

          {/* Country-Specific Regulatory Alerts */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-blue-700" />
              <span>Destination Country Guidelines: {formData.recipient.country}</span>
            </h3>

            {formData.recipient.countryCode === 'US' && (
              <div className="space-y-1.5 text-stone-700">
                <p>• <strong>US CBP Section 321 De Minimis:</strong> Declared value (₹{totalValueINR}) is well below the USD $800 duty-free threshold.</p>
                <p>• <strong>Handicraft Exemption:</strong> Non-antiquity self declaration is included on the commercial invoice.</p>
              </div>
            )}

            {formData.recipient.countryCode === 'GB' && (
              <div className="space-y-1.5 text-stone-700">
                <p>• <strong>UK HMRC Postal Route:</strong> Consignments under £135 qualify for postal clearance at Langley HWDC.</p>
              </div>
            )}

            {formData.recipient.countryCode === 'DE' && (
              <div className="space-y-1.5 text-stone-700">
                <p>• <strong>EU TARIC Clearance:</strong> 6-digit HS Code is electronically transmitted via DGNK to Frankfurt IMPC.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>{isHindi ? 'आगे बढ़ें: डाक सेवा व शुल्क' : 'Next: Service & Tariff'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Postal Service Selection & Tariff */}
      {currentStep === 5 && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-2xs space-y-6">
          <div>
            <h2 className="text-lg font-black text-stone-900">
              {isHindi ? 'चरण 5: डाक सेवा का चयन एवं शुल्क' : 'Step 5: Select India Post Service & Calculated Tariff'}
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Live postage calculations based on weight tier ({(totalWeightGrams / 1000).toFixed(2)} kg) and destination ({formData.recipient.country}).
            </p>
          </div>

          {loadingTariffs ? (
            <div className="p-8 text-center text-xs text-stone-500">
              <Calculator className="w-6 h-6 text-red-700 animate-spin mx-auto mb-2" />
              <span>Calculating official India Post tariffs...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tariffs.map((t) => (
                <div
                  key={t.serviceName}
                  onClick={() => t.isEligible && setFormData(prev => ({ ...prev, serviceType: t.serviceName }))}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    formData.serviceType === t.serviceName
                      ? 'border-red-700 bg-red-50/40 shadow-xs'
                      : t.isEligible
                      ? 'border-stone-200 bg-white hover:border-stone-400'
                      : 'border-stone-200 bg-stone-100 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-stone-900">{t.serviceLabel}</span>
                      {formData.serviceType === t.serviceName && (
                        <span className="w-2.5 h-2.5 rounded-full bg-red-700" />
                      )}
                    </div>

                    <div className="text-2xl font-black text-stone-900 mb-1">
                      ₹{t.grandTotalINR.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-stone-500 mb-3">
                      Includes 10% Air/Fuel surcharge.
                    </div>

                    <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded mb-3">
                      Est. Transit: {t.transitDays}
                    </div>

                    <ul className="text-[11px] text-stone-600 space-y-1">
                      {t.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {!t.isEligible && (
                    <div className="mt-3 text-[11px] text-red-600 font-semibold">
                      {t.ineligibilityReason}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={handlePrevStep}
              className="px-4 py-2 text-stone-600 hover:text-stone-900 font-bold text-xs flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <button
              onClick={submitFinalShipment}
              disabled={submitting}
              className="px-8 py-3 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-black text-xs rounded-lg flex items-center gap-2 shadow-sm transition-colors"
            >
              <span>{submitting ? 'Registering with DGNK EDI...' : 'Confirm & Generate Export Documents'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Confirmation & Export Pack */}
      {currentStep === 6 && createdResult && (
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-2xs space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Electronic PBE Successfully Generated
            </span>
            <h2 className="text-2xl font-black text-stone-900 mt-2">
              Export Consignment Registered with DGNK!
            </h2>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Your parcel has been assigned an official UPU S10 Barcode and is ready for drop-off at your designated Dak Ghar Niryat Kendra counter.
            </p>
          </div>

          {/* Key Reference Codes Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 max-w-xl mx-auto grid grid-cols-2 gap-4 text-left">
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Article Barcode Number (S10)
              </span>
              <span className="text-lg font-black font-mono text-red-700 tracking-wider">
                {createdResult.articleId}
              </span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                Postal Bill of Export (PBE)
              </span>
              <span className="text-lg font-black font-mono text-stone-900">
                {createdResult.pbeNumber}
              </span>
            </div>
          </div>

          {/* Printable Documents & Next Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Complete DGNK Export Pack (PDF)</span>
            </button>
            <button
              onClick={() => {
                setCurrentStep(1);
                setCreatedResult(null);
              }}
              className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-lg transition-colors"
            >
              Book Another Parcel
            </button>
          </div>

          {/* Drop-off Instructions Card */}
          <div className="max-w-xl mx-auto bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-left text-xs text-amber-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Next Steps at Post Office Counter:</span>
            </div>
            <p>1. Affix the printed UPU S10 Barcode label flat on the largest box surface.</p>
            <p>2. Insert 3 copies of Commercial Invoice & CN23 Declaration in the clear adhesive exterior pouch.</p>
            <p>3. Hand over parcel at <strong>{formData.exporter.preferredDGNK || 'New Delhi GPO DGNK'}</strong> and collect your stamped postal acceptance receipt.</p>
          </div>
        </div>
      )}
    </div>
  );
};
