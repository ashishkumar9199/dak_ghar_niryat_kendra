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

export const DGNK_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'dgnk-overview-01',
    category: 'dgnk_sop',
    title: 'Dak Ghar Niryat Kendra (DGNK) Scheme Overview & Registration',
    sourceDoc: 'India Post DGNK Standard Operating Procedure (SOP) 2023-24',
    circularRef: 'DoP Circular No. 27-02/2021-BD&MD / DGNK v2.1',
    authority: 'Department of Posts, Ministry of Communications, Govt of India',
    lastUpdated: '2024-03-15',
    content: `Dak Ghar Niryat Kendra (DGNK) is an initiative by India Post to facilitate small businesses, MSMEs, artisans, and rural entrepreneurs to export goods across the globe through the vast post office network. 
1. Exporters must register online at the DGNK portal (dgnk.cept.gov.in) with basic identity credentials.
2. Documents required for portal onboarding: Import Export Code (IEC) issued by DGFT, GSTIN (or exemption declaration under Section 16 of IGST Act), PAN Card, and Bank Account with Authorized Dealer (AD) Code registration.
3. Once registered, exporters can prepare Postal Bill of Export (PBE-I or PBE-II) electronically from their home/workshop and bring the pre-booked parcels to any designated DGNK counter for seamless dispatch.
4. Commercial exports up to ₹10,00,000 (10 Lakhs) per consignment through postal mode are facilitated under electronic PBE filing.`,
    keywords: ['dgnk', 'registration', 'iec', 'gstin', 'ad code', 'portal', 'onboarding', 'small business', 'msme', 'artisan']
  },
  {
    id: 'customs-pbe-02',
    category: 'customs_cbic',
    title: 'Postal Bill of Export (PBE-I & PBE-II) Electronic Filing Rules',
    sourceDoc: 'CBIC Customs Circular No. 14/2018-Customs & Notification No. 48/2018-Customs (N.T.)',
    circularRef: 'CBIC Notfn. No. 48/2018-Customs (N.T.) dated 04-06-2018',
    authority: 'Central Board of Indirect Taxes and Customs (CBIC), Ministry of Finance',
    lastUpdated: '2023-11-20',
    content: `Postal exports from India are governed by the Postal Export (Electronic Declaration and Processing) Regulations.
- Form PBE-I: Mandatory for e-commerce exports where individual retail parcels are dispatched directly to overseas buyers.
- Form PBE-II: Required for other commercial/bulk exports via post.
- Electronic Customs Integration: The DGNK system electronically transmits declaration data directly to the Foreign Post Office (FPO) Customs EDI server before physical arrival of the bag.
- Value Thresholds: Consignments with FOB value up to ₹10,00,000 per consignment can be exported under PBE. Shipments above ₹10 Lakhs require standard Shipping Bill processed through ICEGATE.
- Benefits: PBE filed through DGNK allows exporters to claim GST refund/LUT benefit and export incentive schemes such as RoDTEP and Duty Drawback.`,
    keywords: ['pbe-i', 'pbe-ii', 'customs', 'cbic', 'postal bill of export', 'fpo', 'icegate', 'rodtep', 'drawback', 'lut', 'gst']
  },
  {
    id: 'customs-cn22-cn23-03',
    category: 'customs_cbic',
    title: 'Customs Declaration Forms: CN22 vs CN23 & CP72 Dispatch Note',
    sourceDoc: 'Universal Postal Union (UPU) Letter Post & Parcel Post Regulations',
    circularRef: 'UPU Convention Manual Art. 20 / India Post Operational Guide',
    authority: 'Universal Postal Union (UPU) & India Post International Division',
    lastUpdated: '2024-01-10',
    content: `Every international postal article must bear an official UPU customs declaration attached to the exterior of the parcel:
1. Form CN22: Used for small packets and registered articles where declared item value is up to 300 SDR (Special Drawing Rights, approx. ₹30,000 to ₹33,000) and weight is under 2 kg. It is a single green adhesive label with summary description, HS code, weight, and value.
2. Form CN23: Mandatory for all parcels, EMS Speed Post articles, and any item valued above 300 SDR (or up to ₹10 Lakhs under DGNK). Requires detailed itemized breakdown (harmonized system code, country of origin, net weight, invoice number).
3. Form CP72: Combined package comprising CN23 customs declaration + Postal Dispatch Note (Address label) used for International Air Parcels.
4. Language Requirement: Must be filled in English or French (or the official language of destination country). Commercial invoice copy must be placed inside an adhesive clear pouch on the parcel exterior.`,
    keywords: ['cn22', 'cn23', 'cp72', 'customs declaration', '300 sdr', 'small packet', 'air parcel', 'ems', 'dispatch note']
  },
  {
    id: 'dgft-iec-exemption-04',
    category: 'dgft_ftp',
    title: 'DGFT Foreign Trade Policy (FTP 2023) - IEC Requirement & Exemptions',
    sourceDoc: 'Foreign Trade Policy 2023, Chapter 2 & DGFT Notification No. 01/2023',
    circularRef: 'FTP 2023 Para 2.05 & Para 2.07 / DGFT Trade Notice',
    authority: 'Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry',
    lastUpdated: '2023-04-01',
    content: `Import Export Code (IEC) is a 10-digit identification number issued by DGFT.
- General Rule: IEC is mandatory for all commercial import and export transactions from India.
- Exemptions under Para 2.07:
  a) Export of postal gifts and personal effects with FOB value not exceeding ₹5,00,000 (5 Lakhs) per shipment do NOT require an IEC.
  b) Export of freely exportable items by individuals for personal use.
  c) Ministries/Departments of Central or State Government.
- E-Commerce Exports: Under FTP 2023 Chapter 9, e-commerce postal exports via DGNK are entitled to all FTP benefits and export promotion schemes once registered with valid IEC and PAN.
- Obtaining IEC: IEC application is 100% online at dgft.gov.in with flat ₹500 fee, requiring PAN, active bank account, and Aadhaar/DSC verification.`,
    keywords: ['iec', 'dgft', 'ftp 2023', 'exemption', '5 lakh', 'gifts', 'samples', 'e-commerce', 'e-commerce export']
  },
  {
    id: 'packaging-upu-05',
    category: 'packaging_upu',
    title: 'International Postal Packaging, Barcoding & S10 Label Standards',
    sourceDoc: 'UPU Standard S10 & India Post Packaging Guidelines for Overseas Mails',
    circularRef: 'UPU Technical Standard S10 / India Post Circular BD/2022',
    authority: 'Universal Postal Union (UPU) Postal Technology Centre & India Post',
    lastUpdated: '2023-09-12',
    content: `All parcels dispatched via Dak Ghar Niryat Kendra must strictly comply with international postal packaging norms:
1. Outer Box: Minimum 3-ply or 5-ply corrugated cardboard carton. No old barcodes, hazardous markings, or reused branded boxes with conflicting addresses.
2. Handicrafts & Fragile Items (Brass, Terracotta, Glassware): Minimum 50mm inner cushioning (bubble wrap, air pillows, or honeycomb paper kraft). Heavy items must not touch carton walls.
3. Textiles & Garments: Must be enclosed in a waterproof polyethylene inner sleeve (minimum 50 microns) before outer cardboard boxing to prevent moisture damage during air transit.
4. Barcoding: S10 UPU standard 13-character identifier (2-character service code + 8-digit serial + 1 check digit + 'IN' country code e.g. EE123456789IN for EMS, CP123456789IN for Air Parcel, IN... for Tracked Packet).
5. Label Placement: Flat on the largest face of parcel; do not wrap barcode around corners or package edges.`,
    keywords: ['packaging', 'upu s10', 'corrugated box', 'bubble wrap', 'fragile', 'handicrafts', 'textiles', 'barcode', 'label']
  },
  {
    id: 'prohibited-items-06',
    category: 'prohibited_items',
    title: 'Prohibited and Restricted Items in Postal Export (UPU & Customs List)',
    sourceDoc: 'Indian Post Office Act 1898 & Customs Prohibited Goods Schedule',
    circularRef: 'India Post Guide Part II / ICAO Dangerous Goods Regs',
    authority: 'Customs (CBIC), DGFT, and Universal Postal Union',
    lastUpdated: '2024-02-18',
    content: `Items STRICTLY PROHIBITED in postal export (Cannot be sent under any circumstance):
- Narcotics, psychotropic substances, and contraband drugs.
- Explosives, ammunition, fireworks, matches, and flammable liquids (paints, perfumes with high alcohol content > 60%).
- Loose Lithium-ion / Lithium-metal batteries (Lithium batteries installed inside equipment permitted only under strict ICAO packing limits).
- Antiquities and art treasures over 100 years old (unless non-antiquity certificate issued by Archaeological Survey of India - ASI).
- Wildlife trophies, ivory, peacock feathers, snake skin, and species covered under CITES Appendix I.
- Counterfeit currency, counterfeit trademarked goods, and pirated media.
- Liquid mercury, corrosive acids, and bio-hazardous biological materials.

RESTRICTED ITEMS (Permitted only with specific NOC / Licenses):
- Precious metals & natural pearls (Subject to RBI/GJEPC approval & value caps).
- Ayurvedic & herbal medicine (Permitted if accompanied by AYUSH GMP certificate, batch analysis report, and non-CITES declaration).
- Spices & food items (Must be shelf-stable, dry, factory sealed with FSSAI license, nutrition labeling, and destination FDA/import permit).
- Wooden handicrafts (Requires Phytosanitary Certificate / Fumigation Certificate for timber species).`,
    keywords: ['prohibited', 'restricted', 'antiquities', 'asi', 'narcotics', 'lithium battery', 'perfume', 'ayurveda', 'spices', 'fssai', 'cites']
  },
  {
    id: 'country-usa-07',
    category: 'country_rules',
    title: 'Country Guidelines: Exporting to USA via Postal Route (CBP & FDA)',
    sourceDoc: 'US Customs and Border Protection (CBP) 19 CFR & US FDA Regulations',
    circularRef: 'US CBP Section 321 De Minimis & FDA Bioterrorism Act',
    authority: 'United States CBP and Food & Drug Administration (FDA)',
    lastUpdated: '2024-02-01',
    content: `Guidelines for exporting from India to the United States through DGNK:
1. Section 321 De Minimis: Shipments with fair market value up to USD $800 per day per recipient can enter the US duty-free and tax-free under informal postal entry.
2. Food, Spices & Herbal Products: Mandatory US FDA Prior Notice (PN) confirmation number must be generated before dispatch and noted on the CN23 customs form. Packaged food must have English labeling and nutrition facts.
3. Wooden Handicrafts: Compliant with Lacey Act (Declaration of plant species and country of harvest). Wood must be seasoned/treated to avoid pest quarantine by USDA APHIS.
4. Cosmetics & Ayurveda: MoCRA (Modernization of Cosmetics Regulation Act) compliant labeling; no adulterated or misbranded therapeutic claims unless FDA registered.
5. Textiles & Apparel: Fiber content percentage, country of origin ('Made in India'), and manufacturer identity must be clearly tagged.`,
    keywords: ['usa', 'us cbp', 'fda', 'section 321', '800 dollars', 'de minimis', 'prior notice', 'lacey act', 'spices', 'ayurveda']
  },
  {
    id: 'country-eu-08',
    category: 'country_rules',
    title: 'Country Guidelines: Exporting to European Union & UK (IOSS, TARIC, VAT)',
    sourceDoc: 'European Commission Customs & UK HMRC Postal Export Guidelines',
    circularRef: 'EU VAT E-Commerce Package & UK HMRC Notice 143',
    authority: 'European Union Customs Union & UK His Majesty Revenue and Customs',
    lastUpdated: '2024-01-25',
    content: `Guidelines for postal exports to the European Union (27 countries) and United Kingdom:
1. EU Import One-Stop Shop (IOSS):
   - For B2C e-commerce parcels valued up to €150 (approx ₹13,500), online marketplaces or sellers registered with IOSS can collect destination VAT at checkout.
   - The seller's IOSS number (starting with 'IM...') must be electronically declared in the DGNK PBE-I system.
   - If IOSS is provided, the EU postal authority delivers parcel without collecting customs processing fees from the recipient.
   - Parcels above €150: Normal EU customs duties + import VAT collected from consignee upon arrival.
2. Mandatory TARIC / 6-digit HS Code: EU Customs requires an accurate 6-digit Harmonized Tariff Schedule code electronically declared; parcels with vague descriptions like 'Gift' or 'Samples' will be rejected.
3. UK Regulations: For consignments under £135, UK VAT applies at point of sale if sold via online marketplace; otherwise recipient pays UK VAT + Royal Mail clearance fee.`,
    keywords: ['eu', 'european union', 'ioss', 'vat', '150 euro', 'uk', 'hmrc', 'taric', 'hs code', 'royal mail']
  },
  {
    id: 'country-gulf-australia-09',
    category: 'country_rules',
    title: 'Country Guidelines: UAE/GCC & Australia / Canada Postal Protocols',
    sourceDoc: 'GCC Common Customs Law & Australian Dept of Agriculture, Fisheries and Forestry (DAFF)',
    circularRef: 'GCC Customs Unified Guide & Australia BICON Import Conditions',
    authority: 'Federal Customs Authority (UAE) & Biosecurity Australia',
    lastUpdated: '2023-12-10',
    content: `Guidelines for exporting to Gulf countries and Australia/Canada:
1. United Arab Emirates (UAE) & GCC:
   - Duty-free de minimis threshold in UAE is AED 300 (approx USD $81).
   - Consignments above AED 300 incur 5% customs duty + 5% VAT.
   - Food, dates, and sweets require Halal certification if containing animal by-products and explicit expiry/production dates in Arabic/English.
2. Australia:
   - Extremely strict biosecurity regulations under Biosecurity Act 2015.
   - Raw seeds, unpolished grains, untreated bamboo/timber, and soil are strictly intercepted and destroyed by DAFF.
   - Wooden artifacts must be varnished/painted or accompanied by ISPM-15 heat treatment certificate.
   - De minimis threshold is AUD $1,000 for customs duty and GST.
3. Canada:
   - De minimis threshold is CAD $20 for mail. Above CAD $20, Canadian GST/PST/HST applies.`,
    keywords: ['uae', 'gcc', 'dubai', 'australia', 'biosecurity', 'daff', 'canada', 'ispm 15', 'wooden', 'seeds']
  },
  {
    id: 'services-tariff-10',
    category: 'dgnk_sop',
    title: 'India Post International Services: EMS Speed Post, ITPS, Air Parcel',
    sourceDoc: 'India Post Rate Card & International Mail Products Matrix 2024',
    circularRef: 'Directorate of Operations, India Post Memo IP-INT-2024',
    authority: 'India Post, Department of Posts',
    lastUpdated: '2024-04-01',
    content: `India Post offers three primary international transmission streams via DGNK:
1. International EMS (Speed Post International):
   - Premium express service with priority air transit to 100+ destinations worldwide.
   - Maximum weight: Up to 35 kg (20 kg for some countries).
   - End-to-end tracking with delivery scan confirmation. Typical transit time: 4 to 8 working days.
2. International Tracked Packet Service (ITPS):
   - Designed specifically for e-commerce cross-border sellers shipping light merchandise up to 2 kg.
   - Highly economical tariffs with barcoded tracking to 38+ major e-commerce export markets (USA, UK, France, Germany, Australia, Japan, Singapore, etc.).
   - No customs clearance surcharge.
3. International Air Parcel:
   - Cost-effective air transmission for heavier packages up to 20 kg.
   - Uses CP72 dispatch note with CN23 declaration. Delivery within 7 to 15 working days.
4. Insurance Option: Available up to declared value (maximum ₹1,00,000) for insured parcels against loss or transit damage.`,
    keywords: ['ems', 'speed post', 'itps', 'air parcel', 'tariff', 'tracked packet', 'rates', 'weight', 'delivery time']
  },
  {
    id: 'fpo-lifecycle-11',
    category: 'customs_cbic',
    title: 'Physical & Digital FPO Clearance Lifecycle from DGNK to Overseas Delivery',
    sourceDoc: 'Standard Operating Procedure for FPOs and DGNKs 2023',
    circularRef: 'DoP-CBIC Joint Operating Procedure SOP-FPO-09',
    authority: 'India Post FPO Nodal Operations & Customs FPO Wing',
    lastUpdated: '2023-10-05',
    content: `Lifecycle of an export article booked through DGNK:
Step 1: Exporter creates electronic PBE on DGNK portal and affixes UPU barcode label + CN23 declaration.
Step 2: Parcel handed over at local DGNK post office counter. Postmaster performs barcode acceptance scan, verifies outer packing, and issues postal receipt.
Step 3: Parcel dispatched in dedicated DGNK closed mail bag to the designated Regional Foreign Post Office (FPO e.g., Delhi FPO, Mumbai FPO, Chennai FPO).
Step 4: At FPO, Customs Appraiser performs X-ray screening and reviews electronic PBE declaration on Customs Postal System (CPS). If compliant, Customs gives 'Export Out of Charge' (EOC).
Step 5: Article is transferred to Air Mail Transit Office (AMTO) at international airport and loaded onto international scheduled air carrier.
Step 6: Flown to Destination Country Office of Exchange (IMPC) where destination customs performs clearance and local national postal service (USPS, Royal Mail, Deutsche Post, etc.) completes last-mile delivery.`,
    keywords: ['fpo', 'foreign post office', 'lifecycle', 'tracking', 'out of charge', 'eoc', 'x-ray', 'amto', 'customs clearance']
  },
  {
    id: 'adcode-lut-gst-12',
    category: 'dgft_ftp',
    title: 'LUT (Letter of Undertaking), AD Code & Zero-Rated GST Compliance',
    sourceDoc: 'GST Rules for Export of Goods (Rule 96A) & RBI Master Directions on Export of Goods',
    circularRef: 'CBIC Circular No. 125/44/2019-GST / RBI AP (DIR Series)',
    authority: 'GST Council & Reserve Bank of India (RBI)',
    lastUpdated: '2023-08-15',
    content: `Key financial & tax compliance for DGNK exporters:
1. Export under LUT (Zero-Rated Supply):
   - Under Section 16 of the IGST Act, export of goods is a zero-rated supply.
   - Exporters can file a Letter of Undertaking (LUT) on the GST portal (Form GST RFD-11) at the start of each financial year to export goods without paying IGST upfront.
   - Alternatively, exporters can pay IGST at time of export and claim 100% IGST refund based on electronic PBE confirmation.
2. AD Code (Authorized Dealer Code):
   - 14-digit numerical code issued by the exporter's foreign exchange handling bank.
   - Must be registered with Customs to reconcile export remittances with the RBI Export Data Processing and Monitoring System (EDPMS).
   - Necessary for receiving foreign currency remittances legitimately into your Indian business bank account.
3. Electronic BRD (Bank Realization Certificate / e-BRC):
   - Required as proof of foreign currency realization for claiming government export incentives.`,
    keywords: ['lut', 'letter of undertaking', 'ad code', 'gst', 'igst refund', 'rfd-11', 'edpms', 'e-brc', 'zero rated']
  }
];
