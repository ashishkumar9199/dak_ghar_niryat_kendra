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
  bookingTimings: string;
  servicesAvailable: string[];
  fpoAttached: string;
}

export interface TariffRate {
  serviceName: 'EMS' | 'ITPS' | 'AirParcel';
  serviceLabel: string;
  countryCode: string;
  countryName: string;
  baseWeightGrams: number;
  baseRateINR: number;
  addlWeightGrams: number;
  addlRateINR: number;
  maxWeightKg: number;
  transitDays: string;
  features: string[];
}

export interface HSCodeItem {
  code: string;
  description: string;
  category: string;
  gstRate: number;
  rodtepRate: string;
  exportPolicy: 'Free' | 'Restricted' | 'Prohibited';
  keyComplianceDoc: string;
  suggestedPackaging: string;
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

export const DGNK_CENTERS: DGNKCenter[] = [
  {
    id: 'DGNK-DL-001',
    name: 'New Delhi GPO Dak Ghar Niryat Kendra',
    pincode: '110001',
    city: 'New Delhi',
    district: 'Central Delhi',
    state: 'Delhi',
    address: 'Ashoka Road, Connaught Place, New Delhi GPO Complex',
    nodalOfficer: 'Rajesh Sharma, Assistant Postmaster (Export)',
    contactNumber: '+91 11 2336 4111',
    email: 'dgnk.delhigpo@indiapost.gov.in',
    bookingTimings: '09:00 AM - 05:30 PM (Mon-Sat)',
    servicesAvailable: ['EMS Speed Post', 'ITPS Tracked Packet', 'Air Parcel', 'Electronic PBE Onsite Kiosk', 'Packaging Consultation'],
    fpoAttached: 'Delhi Foreign Post Office (Kotla Road)'
  },
  {
    id: 'DGNK-RJ-002',
    name: 'Jaipur GPO DGNK (Handicraft & Gemstone Hub)',
    pincode: '302001',
    city: 'Jaipur',
    district: 'Jaipur',
    state: 'Rajasthan',
    address: 'MI Road, Near Panch Batti, Jaipur GPO',
    nodalOfficer: 'Meenakshi Rathore, Export Nodal Officer',
    contactNumber: '+91 141 236 8872',
    email: 'dgnk.jaipur@indiapost.gov.in',
    bookingTimings: '09:30 AM - 06:00 PM (Mon-Sat)',
    servicesAvailable: ['EMS Speed Post', 'Air Parcel', 'ITPS', 'Fragile Packaging Assistance', 'Jewelry Pre-Screening'],
    fpoAttached: 'Delhi FPO (Western Transit Link)'
  },
  {
    id: 'DGNK-UP-003',
    name: 'Varanasi Cantt Head Post Office DGNK (Silk & Handloom)',
    pincode: '221002',
    city: 'Varanasi',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    address: 'The Mall Road, Cantonment, Varanasi',
    nodalOfficer: 'Anil Kumar Mishra, Postal Assistant',
    contactNumber: '+91 542 250 3210',
    email: 'dgnk.varanasi@indiapost.gov.in',
    bookingTimings: '09:00 AM - 05:00 PM (Mon-Sat)',
    servicesAvailable: ['Silk & Handloom Export Facilitation', 'Electronic PBE-I Desk', 'ITPS', 'Air Parcel'],
    fpoAttached: 'Kolkata Foreign Post Office'
  },
  {
    id: 'DGNK-UP-004',
    name: 'Moradabad Head Post Office DGNK (Brassware City)',
    pincode: '244001',
    city: 'Moradabad',
    district: 'Moradabad',
    state: 'Uttar Pradesh',
    address: 'Station Road, Civil Lines, Moradabad',
    nodalOfficer: 'Mohammad Farooq, DGNK Manager',
    contactNumber: '+91 591 241 1290',
    email: 'dgnk.moradabad@indiapost.gov.in',
    bookingTimings: '09:00 AM - 05:30 PM (Mon-Sat)',
    servicesAvailable: ['Brass & Metalware Packaging Help', 'PBE Electronic Filing', 'EMS International', 'Air Parcel'],
    fpoAttached: 'Delhi Foreign Post Office'
  },
  {
    id: 'DGNK-MH-005',
    name: 'Mumbai GPO Dak Ghar Niryat Kendra',
    pincode: '400001',
    city: 'Mumbai',
    district: 'Mumbai City',
    state: 'Maharashtra',
    address: 'Chhatrapati Shivaji Terminus Area, Fort, Mumbai GPO',
    nodalOfficer: 'Sunil Patil, Senior Superintendent of Post Offices',
    contactNumber: '+91 22 2262 0730',
    email: 'dgnk.mumbaigpo@indiapost.gov.in',
    bookingTimings: '08:30 AM - 06:30 PM (Mon-Sat)',
    servicesAvailable: ['EMS Speed Post', 'ITPS', 'Air Parcel', 'Direct FPO Link', 'LUT & IEC Verification Helpdesk'],
    fpoAttached: 'Mumbai Foreign Post Office (Ballard Estate)'
  },
  {
    id: 'DGNK-TN-006',
    name: 'Chennai GPO Dak Ghar Niryat Kendra',
    pincode: '600001',
    city: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    address: 'Rajaji Salai, George Town, Chennai GPO Complex',
    nodalOfficer: 'S. Ramanathan, Export Promotion Officer',
    contactNumber: '+91 44 2534 1145',
    email: 'dgnk.chennai@indiapost.gov.in',
    bookingTimings: '09:00 AM - 06:00 PM (Mon-Sat)',
    servicesAvailable: ['EMS Speed Post', 'ITPS', 'Air Parcel', 'Leather & Garment Export Guidance'],
    fpoAttached: 'Chennai Foreign Post Office (Meenambakkam)'
  },
  {
    id: 'DGNK-KA-007',
    name: 'Bengaluru GPO Dak Ghar Niryat Kendra',
    pincode: '560001',
    city: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    address: 'Raj Bhavan Road, Bengaluru GPO Complex',
    nodalOfficer: 'Deepa Hegde, DGNK Coordinator',
    contactNumber: '+91 80 2286 4444',
    email: 'dgnk.bengaluru@indiapost.gov.in',
    bookingTimings: '09:00 AM - 06:00 PM (Mon-Sat)',
    servicesAvailable: ['E-commerce D2C Desk', 'ITPS Special Counter', 'EMS Speed Post', 'PBE Assistance'],
    fpoAttached: 'Bengaluru Foreign Post Office'
  },
  {
    id: 'DGNK-GJ-008',
    name: 'Surat Head Post Office DGNK (Textile & Diamond Cluster)',
    pincode: '395003',
    city: 'Surat',
    district: 'Surat',
    state: 'Gujarat',
    address: 'Muglisara, Surat HPO Complex',
    nodalOfficer: 'Bhavesh Patel, Export Officer',
    contactNumber: '+91 261 242 3311',
    email: 'dgnk.surat@indiapost.gov.in',
    bookingTimings: '09:30 AM - 05:30 PM (Mon-Sat)',
    servicesAvailable: ['Textile Sample Export', 'Synthetic Fabric Packaging Certification', 'EMS', 'ITPS'],
    fpoAttached: 'Ahmedabad Foreign Post Office'
  },
  {
    id: 'DGNK-KL-009',
    name: 'Kochi Head Post Office DGNK (Spices & Coir Hub)',
    pincode: '682001',
    city: 'Kochi',
    district: 'Ernakulam',
    state: 'Kerala',
    address: 'Mattancherry / Fort Kochi Road, Kochi',
    nodalOfficer: 'Mathew Thomas, Assistant Postmaster',
    contactNumber: '+91 484 222 5590',
    email: 'dgnk.kochi@indiapost.gov.in',
    bookingTimings: '09:00 AM - 05:00 PM (Mon-Sat)',
    servicesAvailable: ['Spices & Essential Oils Verification', 'Air Parcel', 'EMS', 'ITPS'],
    fpoAttached: 'Kochi Foreign Post Office'
  },
  {
    id: 'DGNK-WB-010',
    name: 'Kolkata GPO Dak Ghar Niryat Kendra',
    pincode: '700001',
    city: 'Kolkata',
    district: 'Kolkata',
    state: 'West Bengal',
    address: 'Netaji Subhash Road, BBD Bagh, Kolkata GPO',
    nodalOfficer: 'Sourav Banerjee, Postal Superintendent',
    contactNumber: '+91 33 2230 4545',
    email: 'dgnk.kolkatagpo@indiapost.gov.in',
    bookingTimings: '09:00 AM - 06:00 PM (Mon-Sat)',
    servicesAvailable: ['Terracotta & Leather Goods Desk', 'EMS', 'Air Parcel', 'ITPS', 'Direct Port Air Connection'],
    fpoAttached: 'Kolkata Foreign Post Office'
  }
];

export const HS_CODES_DATABASE: HSCodeItem[] = [
  {
    code: '7419.80.00',
    description: 'Brass Artware, Handicrafts and Statues (Cast & Engraved)',
    category: 'Handicrafts & Metalware',
    gstRate: 12,
    rodtepRate: '2.5%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Commercial Invoice, Packing List, Non-Antiquity Self-Declaration',
    suggestedPackaging: '5-ply corrugated carton with 50mm bubble cushioning and desiccants'
  },
  {
    code: '6204.42.20',
    description: 'Women Handloom Cotton Dresses and Kurtas',
    category: 'Textiles & Garments',
    gstRate: 5,
    rodtepRate: '4.3%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Commercial Invoice, Fiber Content Certificate, Handloom Tag',
    suggestedPackaging: 'Sealed polybag inner liner (50 microns) inside cardboard carton'
  },
  {
    code: '4420.11.00',
    description: 'Wooden Handicrafts and Carved Figurines (Sheesham / Mango Wood)',
    category: 'Wood & Furniture',
    gstRate: 12,
    rodtepRate: '2.2%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Phytosanitary/Fumigation Certificate, Lacey Act Declaration (for USA)',
    suggestedPackaging: 'Heavy duty box with corner edge protectors and moisture barrier'
  },
  {
    code: '0902.10.20',
    description: 'Organic Darjeeling / Assam Black Tea in Retail Packaging',
    category: 'Food & Agricultural',
    gstRate: 5,
    rodtepRate: '1.8%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Tea Board RCMC, FSSAI License, US FDA Prior Notice (if USA)',
    suggestedPackaging: 'Airtight foil moisture-barrier pouch inside branded rigid box'
  },
  {
    code: '3004.90.11',
    description: 'Ayurvedic Herbal Supplements & Immunity Blends',
    category: 'Ayurveda & Health',
    gstRate: 12,
    rodtepRate: '1.5%',
    exportPolicy: 'Restricted',
    keyComplianceDoc: 'AYUSH Manufacturing License, GMP Certificate, Non-CITES Herb Declaration',
    suggestedPackaging: 'Tamper-evident sealed amber bottles in bubble lined boxes'
  },
  {
    code: '4202.21.10',
    description: 'Handcrafted Genuine Leather Handbags & Wallets',
    category: 'Leather Goods',
    gstRate: 18,
    rodtepRate: '3.1%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Commercial Invoice, CLE (Council for Leather Exports) RCMC, Declaration of non-banned animal hide',
    suggestedPackaging: 'Dust bag sleeve with silica gel packets inside rigid carton'
  },
  {
    code: '6912.00.10',
    description: 'Terracotta Pottery & Hand-painted Ceramic Tableware',
    category: 'Ceramics & Clay',
    gstRate: 12,
    rodtepRate: '2.0%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Lead & Cadmium Free Food Grade Certificate (for tableware)',
    suggestedPackaging: 'Individual double bubble wrap, honeycomb kraft padding with FRAGILE label'
  },
  {
    code: '7113.11.20',
    description: 'Handmade 925 Sterling Silver Jewelry with Semi-Precious Stones',
    category: 'Gems & Jewelry',
    gstRate: 3,
    rodtepRate: '1.2%',
    exportPolicy: 'Restricted',
    keyComplianceDoc: 'BIS Hallmark Certificate, GJEPC RCMC, Gemological testing memo, Valuation Invoice',
    suggestedPackaging: 'Tamper-proof insured postal security pouch inside sealed hard box'
  },
  {
    code: '0910.30.20',
    description: 'Pure Ground Turmeric (High Curcumin Grade)',
    category: 'Spices',
    gstRate: 5,
    rodtepRate: '2.4%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Spices Board Certificate of Registration, FSSAI Export License, US FDA PN',
    suggestedPackaging: 'Heavy vacuum sealed multi-layer pouch with batch & expiry labeling'
  },
  {
    code: '3307.41.00',
    description: 'Handcrafted Agarbatti (Incense Sticks) & Dhoop',
    category: 'Fragrance & Aromatherapy',
    gstRate: 12,
    rodtepRate: '2.0%',
    exportPolicy: 'Free',
    keyComplianceDoc: 'Commercial Invoice, Material Safety Data Sheet (MSDS) confirming non-flammable base',
    suggestedPackaging: 'Moisture resistant cello-wrap cartons'
  }
];

export const TARIFF_RATES: TariffRate[] = [
  // USA
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'US',
    countryName: 'United States',
    baseWeightGrams: 250,
    baseRateINR: 1150,
    addlWeightGrams: 250,
    addlRateINR: 320,
    maxWeightKg: 35,
    transitDays: '4-7 Working Days',
    features: ['Fastest Priority Air', 'End-to-End Tracking', 'Up to 35kg', 'Dedicated Customs Lane']
  },
  {
    serviceName: 'ITPS',
    serviceLabel: 'International Tracked Packet Service',
    countryCode: 'US',
    countryName: 'United States',
    baseWeightGrams: 100,
    baseRateINR: 420,
    addlWeightGrams: 100,
    addlRateINR: 110,
    maxWeightKg: 2,
    transitDays: '7-12 Working Days',
    features: ['Best for E-Commerce up to 2kg', 'Economical', 'Doorstep Delivery Tracking']
  },
  {
    serviceName: 'AirParcel',
    serviceLabel: 'International Air Parcel',
    countryCode: 'US',
    countryName: 'United States',
    baseWeightGrams: 1000,
    baseRateINR: 2100,
    addlWeightGrams: 1000,
    addlRateINR: 650,
    maxWeightKg: 20,
    transitDays: '8-14 Working Days',
    features: ['Great for Heavy Handicrafts & Bulk', 'CP72 Included', 'Up to 20kg']
  },
  // United Kingdom
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    baseWeightGrams: 250,
    baseRateINR: 980,
    addlWeightGrams: 250,
    addlRateINR: 280,
    maxWeightKg: 30,
    transitDays: '4-6 Working Days',
    features: ['Direct Heathrow AMTO Flight', 'Full Royal Mail Tracking', 'Priority Handling']
  },
  {
    serviceName: 'ITPS',
    serviceLabel: 'International Tracked Packet Service',
    countryCode: 'GB',
    countryName: 'United Kingdom',
    baseWeightGrams: 100,
    baseRateINR: 380,
    addlWeightGrams: 100,
    addlRateINR: 95,
    maxWeightKg: 2,
    transitDays: '6-10 Working Days',
    features: ['E-Commerce Optimized', 'Pre-Notified Customs', 'Light Parcels']
  },
  // UAE
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    baseWeightGrams: 250,
    baseRateINR: 750,
    addlWeightGrams: 250,
    addlRateINR: 190,
    maxWeightKg: 30,
    transitDays: '3-5 Working Days',
    features: ['Direct Gulf Connectivity', 'Emirates Post Integration', 'High Speed']
  },
  {
    serviceName: 'ITPS',
    serviceLabel: 'International Tracked Packet Service',
    countryCode: 'AE',
    countryName: 'United Arab Emirates',
    baseWeightGrams: 100,
    baseRateINR: 320,
    addlWeightGrams: 100,
    addlRateINR: 75,
    maxWeightKg: 2,
    transitDays: '5-8 Working Days',
    features: ['Very Low Cost', 'SMS Alerts', 'Online Delivery Confirmation']
  },
  // Germany / EU
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'DE',
    countryName: 'Germany / EU',
    baseWeightGrams: 250,
    baseRateINR: 1050,
    addlWeightGrams: 250,
    addlRateINR: 310,
    maxWeightKg: 30,
    transitDays: '5-8 Working Days',
    features: ['IOSS VAT Compatible', 'Deutsche Post Integration', 'Detailed Tracking']
  },
  {
    serviceName: 'ITPS',
    serviceLabel: 'International Tracked Packet Service',
    countryCode: 'DE',
    countryName: 'Germany / EU',
    baseWeightGrams: 100,
    baseRateINR: 390,
    addlWeightGrams: 100,
    addlRateINR: 98,
    maxWeightKg: 2,
    transitDays: '7-12 Working Days',
    features: ['Ideal for EU E-Commerce', 'Electronic TARIC Pre-filing', 'Up to 2kg']
  },
  // Australia
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'AU',
    countryName: 'Australia',
    baseWeightGrams: 250,
    baseRateINR: 1180,
    addlWeightGrams: 250,
    addlRateINR: 340,
    maxWeightKg: 20,
    transitDays: '5-9 Working Days',
    features: ['Australia Post Express', 'Biosecurity Clearance Support', 'Direct Tracking']
  },
  {
    serviceName: 'ITPS',
    serviceLabel: 'International Tracked Packet Service',
    countryCode: 'AU',
    countryName: 'Australia',
    baseWeightGrams: 100,
    baseRateINR: 410,
    addlWeightGrams: 100,
    addlRateINR: 105,
    maxWeightKg: 2,
    transitDays: '8-14 Working Days',
    features: ['Budget Friendly', 'Online Tracking', 'Up to 2kg']
  },
  // Canada
  {
    serviceName: 'EMS',
    serviceLabel: 'Speed Post International (EMS)',
    countryCode: 'CA',
    countryName: 'Canada',
    baseWeightGrams: 250,
    baseRateINR: 1190,
    addlWeightGrams: 250,
    addlRateINR: 330,
    maxWeightKg: 30,
    transitDays: '5-9 Working Days',
    features: ['Canada Post Express', 'Priority Customs', 'Full Tracking']
  }
];

export const DEMO_TRACKING_DATA: Record<string, ShipmentTrackingRecord> = {
  'EE928410294IN': {
    articleId: 'EE928410294IN',
    bookingDate: '2025-05-10',
    originDGNK: 'Jaipur GPO DGNK (Rajasthan)',
    destinationCountry: 'United States',
    destinationCity: 'Austin, Texas',
    recipientName: 'Sophia Miller (Artisan Home Imports)',
    serviceType: 'Speed Post International (EMS)',
    currentStatus: 'Customs Cleared at Delhi FPO — Departed on Air India Cargo',
    currentStatusCode: 'DESPATCH_ABROAD',
    estimatedDelivery: '2025-05-16',
    events: [
      {
        timestamp: '2025-05-12 18:40',
        location: 'Delhi Air Mail Transit Office (AMTO), IGI Airport',
        activity: 'Despatched to Destination Office of Exchange (USJFKF - New York JFK)',
        status: 'In International Flight Transit'
      },
      {
        timestamp: '2025-05-12 11:15',
        location: 'Foreign Post Office (FPO), Kotla Road, New Delhi',
        activity: 'Electronic PBE-I Customs Out of Charge (EOC) Granted. Export clearance completed.',
        status: 'Customs Cleared'
      },
      {
        timestamp: '2025-05-11 22:30',
        location: 'Foreign Post Office (FPO), New Delhi',
        activity: 'Item received in closed DGNK mail bag from Jaipur GPO. X-Ray & non-invasive scan passed.',
        status: 'FPO Processing'
      },
      {
        timestamp: '2025-05-10 16:45',
        location: 'Jaipur GPO DGNK Counter (302001)',
        activity: 'Article Booked via DGNK Portal. CN23 verified, postal receipt generated.',
        status: 'Booked'
      }
    ]
  },
  'IN482019385IN': {
    articleId: 'IN482019385IN',
    bookingDate: '2025-05-11',
    originDGNK: 'Varanasi Cantt HPO DGNK (UP)',
    destinationCountry: 'United Kingdom',
    destinationCity: 'Manchester, M14 5TP',
    recipientName: 'Oliver Higgins (Heritage Textiles UK)',
    serviceType: 'International Tracked Packet Service (ITPS)',
    currentStatus: 'Arrived at Royal Mail International Hub (Heathrow HWDC)',
    currentStatusCode: 'ARRIVED_DESTINATION',
    estimatedDelivery: '2025-05-17',
    events: [
      {
        timestamp: '2025-05-13 09:10',
        location: 'Langley HWDC (Heathrow Worldwide Distribution Centre), UK',
        activity: 'Item received at destination Office of Exchange. Handed over to UK Customs (HMRC).',
        status: 'Arrived at Destination Country'
      },
      {
        timestamp: '2025-05-12 04:30',
        location: 'Kolkata Foreign Post Office (AMTO)',
        activity: 'Loaded onto flight BA198 to London Heathrow.',
        status: 'Despatch Abroad'
      },
      {
        timestamp: '2025-05-11 14:20',
        location: 'Varanasi Cantt HPO DGNK (221002)',
        activity: 'Article received and barcoded for ITPS export stream.',
        status: 'Booked'
      }
    ]
  },
  'CP710928374IN': {
    articleId: 'CP710928374IN',
    bookingDate: '2025-05-13',
    originDGNK: 'Moradabad HPO DGNK (UP)',
    destinationCountry: 'Germany',
    destinationCity: 'Munich, Bavaria',
    recipientName: 'Hans Weber (Bavarian Decor GmbH)',
    serviceType: 'International Air Parcel',
    currentStatus: 'Under X-Ray & Customs Examination at Delhi FPO',
    currentStatusCode: 'FPO_CUSTOMS_CLEARANCE',
    estimatedDelivery: '2025-05-22',
    events: [
      {
        timestamp: '2025-05-14 10:05',
        location: 'Delhi Foreign Post Office, Kotla Road',
        activity: 'Postal Bill of Export PBE-II data verified with CBIC ICEGATE. Physical carton undergoing X-Ray screening.',
        status: 'Under Customs Screening'
      },
      {
        timestamp: '2025-05-13 15:30',
        location: 'Moradabad HPO DGNK (244001)',
        activity: 'Booked. CP72 dispatch note attached with 4 copies of commercial invoice.',
        status: 'Booked at DGNK'
      }
    ]
  }
};
