export interface KnowledgeChunk {
  id: string;
  category: 'dgnk_sop' | 'customs_cbic' | 'dgft_ftp' | 'packaging_upu' | 'country_rules' | 'prohibited_items';
  title: string;
  sourceDoc: string;
  circularRef: string;
  authority: string;
  lastUpdated: string;
  content: string;
  keywords: string[];
}

export interface GroundedSource {
  title: string;
  sourceDoc: string;
  circularRef: string;
  authority: string;
  similarityScore: number;
  matchedKeywords: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  groundedSources?: GroundedSource[];
  isAiGrounded?: boolean;
}

export interface ExporterProfile {
  businessName: string;
  contactPerson?: string;
  exporterName?: string;
  iecCode: string;
  hasIEC: boolean;
  gstin: string;
  hasGST: boolean;
  panNumber?: string;
  adCode?: string;
  lutNumber?: string;
  hasLUT: boolean;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
  preferredDGNK: string;
  businessCategory: string;
  walletBalance?: number;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  hsCode: string;
  quantity: number;
  unit: string;
  valueINR: number;
  weightGrams: number;
  countryOfOrigin: string;
  material: string;
  isFragile: boolean;
}

export interface ShipmentFormData {
  exporter: ExporterProfile;
  recipient: {
    name: string;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    stateOrProvince: string;
    postalCode: string;
    country: string;
    countryCode: string;
    email: string;
    phone: string;
    taxIdOrIOSS: string;
  };
  products: ProductItem[];
  serviceType: 'EMS' | 'ITPS' | 'AirParcel';
  categoryOfItem: 'Gift' | 'Commercial Sample' | 'Sold Goods (E-Commerce)' | 'Returned Goods' | 'Other';
  invoiceNumber: string;
  invoiceDate: string;
  specialInstructions: string;
}

export interface DGNKCenter {
  id: string;
  name: string;
  pincode: string;
  city: string;
  district: string;
  state: string;
  address: string;
  nodalOfficer: string;
  contactNumber: string;
  email: string;
  bookingTimings?: string;
  operatingHours?: string;
  servicesAvailable: string[];
  fpoAttached?: string;
  fpoLinked?: string;
  isPickupAvailable?: boolean;
}

export interface TariffOption {
  serviceName: 'EMS' | 'ITPS' | 'AirParcel';
  serviceLabel: string;
  isEligible: boolean;
  ineligibilityReason?: string | null;
  baseRateINR: number;
  surchargeINR: number;
  grandTotalINR: number;
  transitDays: string;
  features: string[];
  maxWeightKg: number;
  customsFormRequired: 'CN22' | 'CN23';
}

export interface TrackingEvent {
  date?: string;
  time?: string;
  timestamp?: string;
  location: string;
  activity?: string;
  description?: string;
  status: string;
}

export interface TrackingResult {
  articleId: string;
  bookingDate: string;
  origin?: string;
  originDGNK?: string;
  destination?: string;
  destinationCountry?: string;
  destinationCity?: string;
  recipientName: string;
  serviceType: string;
  currentStatus: string;
  currentStatusCode?: string;
  fpoOffice?: string;
  pbeNumber?: string;
  estimatedDelivery: string;
  events: TrackingEvent[];
}

export interface ShipmentTrackingRecord {
  articleId: string;
  bookingDate: string;
  originDGNK: string;
  destinationCountry: string;
  destinationCity: string;
  recipientName: string;
  serviceType: string;
  currentStatus: string;
  currentStatusCode: 'BOOKED' | 'DISPATCHED_TO_FPO' | 'FPO_CUSTOMS_CLEARANCE' | 'OUT_OF_CHARGE' | 'DESPATCH_ABROAD' | 'ARRIVED_DESTINATION' | 'DELIVERED';
  estimatedDelivery: string;
  events: {
    timestamp: string;
    location: string;
    activity: string;
    status: string;
  }[];
}
