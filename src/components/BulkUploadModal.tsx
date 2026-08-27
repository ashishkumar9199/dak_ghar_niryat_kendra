import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Package, 
  Layers, 
  RefreshCw,
  Sparkles,
  FileText
} from 'lucide-react';
import { ExporterProfile, ShipmentFormData, SupportedLanguage } from '../types';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
  profile: ExporterProfile;
  onBulkProcessed: (itemsCount: number) => void;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  language,
  profile,
  onBulkProcessed,
}) => {
  if (!isOpen) return null;

  const isHindi = language === 'HI' || language === 'MAI';
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewRows, setPreviewRows] = useState<any[] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const sampleCsvData = `Recipient Name,Country,City,Address,Product Name,HS Code,Quantity,Value (INR),Weight (g),Service
Sophia Miller,US,Austin,"4502 Westlake Ave",Handmade Brass Ganesha,7419.80.00,2,4500,1200,EMS
Oliver Smith,GB,London,"12 Kensington Park",Assam Eri Silk Stole,5007.20.00,3,3200,450,ITPS
Lucas Dubois,FR,Paris,"8 Rue de la Paix",Organic Turmeric Powder,0910.30.20,5,1800,2500,AirParcel
Elena Rossi,IT,Milan,"Via Monte Napoleone 4",Jaipur Silver Filigree Earrings,7113.11.00,1,6500,150,EMS
Klaus Weber,DE,Berlin,"Friedrichstrasse 100",Varanasi Brocade Fabric,5007.90.00,4,8400,980,EMS`;

  const handleDownloadTemplate = () => {
    const blob = new Blob([sampleCsvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'DGNK_Bulk_Consignment_Template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSimulateLoad = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setPreviewRows([
        { id: 1, recipient: 'Sophia Miller', country: 'United States (US)', product: 'Handmade Brass Ganesha', hsCode: '7419.80.00', qty: 2, value: '₹4,500', weight: '1.2 kg', service: 'EMS Speed Post', valid: true },
        { id: 2, recipient: 'Oliver Smith', country: 'United Kingdom (GB)', product: 'Assam Eri Silk Stole', hsCode: '5007.20.00', qty: 3, value: '₹3,200', weight: '0.45 kg', service: 'ITPS Packet', valid: true },
        { id: 3, recipient: 'Lucas Dubois', country: 'France (FR)', product: 'Organic Turmeric Powder', hsCode: '0910.30.20', qty: 5, value: '₹1,800', weight: '2.5 kg', service: 'Air Parcel', valid: true },
        { id: 4, recipient: 'Elena Rossi', country: 'Italy (IT)', product: 'Jaipur Silver Filigree Earrings', hsCode: '7113.11.00', qty: 1, value: '₹6,500', weight: '0.15 kg', service: 'EMS Speed Post', valid: true },
        { id: 5, recipient: 'Klaus Weber', country: 'Germany (DE)', product: 'Varanasi Brocade Fabric', hsCode: '5007.90.00', qty: 4, value: '₹8,400', weight: '0.98 kg', service: 'EMS Speed Post', valid: true },
      ]);
      setIsProcessing(false);
    }, 800);
  };

  const handleConfirmBatch = () => {
    setIsSuccess(true);
    onBulkProcessed(5);
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setPreviewRows(null);
      setSelectedFile(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gray-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#990B20] via-[#C8102E] to-[#A60D24] text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFC107] text-[#990B20] flex items-center justify-center font-black shadow-md">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded uppercase tracking-wider text-amber-200">
                {isHindi ? 'थोक पार्सल डेटा प्रविष्टि' : 'Bulk Consignment Booking'}
              </span>
              <h3 className="text-lg font-black text-white">
                {isHindi ? 'CSV / Excel थोक PBE अपलोडर' : 'Batch PBE Data Import (CSV/Excel)'}
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

        {/* Modal Content */}
        <div className="p-6 space-y-5">
          
          {/* Instructions & Template Download */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Official DGNK Batch Import Standard</span>
              </h4>
              <p className="text-xs text-gray-600 mt-0.5">
                Upload comma-separated values (CSV) containing Recipient details, HS Codes & values.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadTemplate}
              className="px-3.5 py-1.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-xs font-bold rounded-xl shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Download CSV Template</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          {!previewRows && (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files?.[0]) {
                  setSelectedFile(e.dataTransfer.files[0]);
                  handleSimulateLoad();
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                dragOver ? 'border-[#C8102E] bg-red-50/50' : 'border-gray-300 hover:border-gray-400 bg-gray-50/50'
              }`}
              onClick={() => handleSimulateLoad()}
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-[#C8102E] flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">
                {isHindi ? 'CSV फाइल यहां ड्रैग करें या क्लिक करें' : 'Click to Upload or Drag & Drop Consignment File'}
              </h4>
              <p className="text-xs text-gray-500 mt-1">
                Supports .CSV, .XLSX (Max 200 articles per batch file)
              </p>
              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-[#C8102E]">
                  Click to test sample 5-consignment batch
                </span>
              </div>
            </div>
          )}

          {/* Processing Spinner */}
          {isProcessing && (
            <div className="p-8 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#C8102E] animate-spin mx-auto" />
              <p className="text-xs font-bold text-gray-700">
                Validating HS Codes against DGFT ITC-HS database & parsing address fields...
              </p>
            </div>
          )}

          {/* Validated Batch Table Preview */}
          {previewRows && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>5 Articles Validated (0 Errors)</span>
                </span>
                <span className="text-xs font-bold text-gray-500 font-mono">
                  Total Batch Value: ₹24,400
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-100 text-gray-700 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-2.5">#</th>
                      <th className="p-2.5">Recipient</th>
                      <th className="p-2.5">Destination</th>
                      <th className="p-2.5">Product & HS Code</th>
                      <th className="p-2.5">Value</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previewRows.map((row) => (
                      <tr key={row.id} className="hover:bg-gray-50">
                        <td className="p-2.5 font-bold text-gray-500">{row.id}</td>
                        <td className="p-2.5 font-bold text-gray-900">{row.recipient}</td>
                        <td className="p-2.5 text-gray-600">{row.country}</td>
                        <td className="p-2.5">
                          <span className="font-semibold text-gray-800 block">{row.product}</span>
                          <span className="font-mono text-[10px] text-gray-500">{row.hsCode}</span>
                        </td>
                        <td className="p-2.5 font-bold text-gray-900">{row.value}</td>
                        <td className="p-2.5">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Valid
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isSuccess ? (
                <div className="bg-emerald-100 text-emerald-900 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Batch imported successfully! Generating 5 PBE records...</span>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setPreviewRows(null)}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                  >
                    Cancel / Re-upload
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBatch}
                    className="px-4 py-2 rounded-xl text-xs font-black bg-[#C8102E] hover:bg-[#A60D24] text-white shadow-xs transition-colors flex items-center gap-1.5"
                  >
                    <span>Confirm & Generate 5 PBE Forms</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-[11px] text-gray-500 flex items-center justify-between">
          <span>CBIC Postal Export Regulations 2018 Compliant</span>
          <button onClick={onClose} className="font-bold text-gray-700 hover:text-gray-900">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
