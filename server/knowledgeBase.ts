export interface KnowledgeChunk {
  id: string;
  category: 'dgnk_sop' | 'customs_cbic' | 'dgft_ftp' | 'packaging_upu' | 'country_rules' | 'prohibited_items' | 'statutory_acts' | 'tax_financial';
  title: string;
  sourceDoc: string;
  circularRef: string;
  authority: string;
  lastUpdated: string;
  content: string;
  keywords: string[];
  officialUrl?: string;
  summaryBulletPoints?: string[];
}

export const DGNK_KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: 'dgnk-overview-01',
    category: 'dgnk_sop',
    title: 'Dak Ghar Niryat Kendra (DGNK) Scheme Overview & Exporter Onboarding',
    sourceDoc: 'India Post DGNK Standard Operating Procedure (SOP) 2023-24',
    circularRef: 'DoP Circular No. 27-02/2021-BD&MD / DGNK v2.1',
    authority: 'Department of Posts, Ministry of Communications, Govt. of India',
    lastUpdated: '2024-04-15',
    content: `Dak Ghar Niryat Kendra (DGNK) is the flagship initiative by Department of Posts (India Post) in collaboration with CBIC and DGFT to drive India's 'Districts as Export Hubs' mission.
Key Operational Guidelines:
1. Online Onboarding: Exporters register on the official DGNK portal (dgnk.cept.gov.in) with basic identity credentials (PAN, Aadhaar/Business registration, email, mobile).
2. Mandatory Documents for Commercial Onboarding:
   - Import Export Code (IEC) issued by DGFT.
   - GSTIN (or declaration for unregistered persons exporting goods under exemption).
   - Authorized Dealer (AD) Code registered bank account for foreign currency remittance.
   - Letter of Undertaking (LUT) under Form GST RFD-11 for zero-rated IGST export.
3. Electronic PBE Preparation: Exporters prepare Postal Bill of Export (PBE-I for e-commerce, PBE-II for commercial) from their premises and print barcode labels and customs declarations.
4. Counter Acceptance: Pre-booked parcels can be dropped at any designated DGNK counter nationwide. Postmaster scans barcode, checks outer packaging, and issues immediate digital booking receipt.
5. Consignment Value Limit: Commercial exports up to ₹10,00,000 (10 Lakhs) per consignment are processed seamlessly under electronic PBE filing.`,
    keywords: ['dgnk', 'registration', 'iec', 'gstin', 'ad code', 'portal', 'onboarding', 'small business', 'msme', 'artisan', 'districts as export hubs', 'pbe'],
    summaryBulletPoints: [
      'Digital onboarding at dgnk.cept.gov.in with PAN & IEC',
      'Electronic PBE preparation with auto UPU S10 barcode generation',
      'Commercial exports up to ₹10 Lakhs per consignment facilitated',
      'Acceptance at 1,000+ designated Post Offices nationwide'
    ]
  },
  {
    id: 'customs-pbe-02',
    category: 'customs_cbic',
    title: 'Postal Bill of Export (PBE-I & PBE-II) Electronic Declaration & Processing Rules',
    sourceDoc: 'Postal Export (Electronic Declaration and Processing) Regulations, 2018',
    circularRef: 'CBIC Notfn. No. 48/2018-Customs (N.T.) & Circular No. 14/2018-Customs',
    authority: 'Central Board of Indirect Taxes and Customs (CBIC), Ministry of Finance',
    lastUpdated: '2023-11-20',
    content: `Postal exports from India are strictly governed by CBIC Notification 48/2018-Customs (N.T.) and Circular 14/2018-Customs:
1. Form PBE-I: Mandatory for e-commerce export consignments ordered via online platforms and shipped to international end-consumers.
2. Form PBE-II: Required for all other commercial/bulk export consignments shipped via postal mode.
3. Electronic Customs System (CPS) Integration: The DGNK portal electronically transmits all PBE data directly to the Customs Postal System (CPS) at the designated Foreign Post Office (FPO) before the mail bag arrives physically.
4. Customs Appraiser Role: Customs Appraiser at FPO examines the digital declaration, inspects parcels via non-intrusive X-ray scanners, and grants 'Export Out of Charge' (EOC) digitally.
5. Export Incentives & Tax Refunds: Electronic PBE filing serves as primary documentary proof for claiming:
   - RoDTEP (Remission of Duties and Taxes on Exported Products)
   - Duty Drawback under Customs Section 75
   - IGST Zero-Rate refund / LUT reconciliation on GST portal.`,
    keywords: ['pbe-i', 'pbe-ii', 'customs', 'cbic', 'postal bill of export', 'fpo', 'icegate', 'rodtep', 'drawback', 'lut', 'gst', 'eoc', 'cps'],
    summaryBulletPoints: [
      'PBE-I for retail e-commerce; PBE-II for B2B commercial export',
      'Direct EDI integration between DGNK and FPO Customs Postal System',
      'Enables RoDTEP, Duty Drawback, and GST refund claims',
      'Electronic Out of Charge (EOC) given by Customs Appraiser'
    ]
  },
  {
    id: 'customs-cn22-cn23-03',
    category: 'customs_cbic',
    title: 'Customs Declaration Forms: Form CN22 vs Form CN23 & CP72 Dispatch Note',
    sourceDoc: 'Universal Postal Union (UPU) Letter Post & Parcel Post Regulations',
    circularRef: 'UPU Convention Manual Art. 20 / India Post Operational Guide',
    authority: 'Universal Postal Union (UPU) & India Post International Division',
    lastUpdated: '2024-01-10',
    content: `Every international postal article must carry an official UPU customs declaration affixed to the outside of the parcel:
1. Form CN22 (Green Label):
   - Used for small packets, letters, and registered airmail articles.
   - Threshold: Total declared consignment value is up to 300 SDR (Special Drawing Rights, approx. ₹30,000 - ₹34,000 INR) and weight is under 2 kg.
   - Form Content: Summary description of goods, 6-digit HS code, net weight, item value, and sender signature.
2. Form CN23 (Detailed Declaration):
   - Mandatory for all International Air Parcels, all EMS Speed Post articles, and any consignment with declared value exceeding 300 SDR (up to ₹10 Lakhs).
   - Form Content: Detailed itemized list, tariff heading (HS Code), country of origin, net/gross weight, commercial invoice number, and certificate attachments.
3. Form CP72 (Parcel Dispatch Note):
   - Combined set of CN23 customs declaration + Postal Dispatch Note (Address label) specifically for International Air Parcels.
4. Language & Placement: Must be written in English, French, or the destination country language. Must be affixed flat on the largest package face in a transparent waterproof pouch.`,
    keywords: ['cn22', 'cn23', 'cp72', 'customs declaration', '300 sdr', 'small packet', 'air parcel', 'ems', 'dispatch note', 'upu'],
    summaryBulletPoints: [
      'CN22: Small packets < 2kg and value under 300 SDR (approx ₹33,000)',
      'CN23: All EMS, all Air Parcels, and items valued over 300 SDR',
      'CP72: Combined Dispatch Note + CN23 for Air Parcel stream',
      'Must include 6-digit HS Code, invoice details, and country of origin'
    ]
  },
  {
    id: 'dgft-iec-exemption-04',
    category: 'dgft_ftp',
    title: 'DGFT Foreign Trade Policy (FTP 2023) - IEC Requirement & Gift Exemptions',
    sourceDoc: 'Foreign Trade Policy 2023, Chapter 2 & DGFT Notification No. 01/2023',
    circularRef: 'FTP 2023 Para 2.05 & Para 2.07 / DGFT Trade Notice 03/2023',
    authority: 'Directorate General of Foreign Trade (DGFT), Ministry of Commerce & Industry',
    lastUpdated: '2023-04-01',
    content: `Import Export Code (IEC) rules under DGFT Foreign Trade Policy 2023:
1. Mandatory General Rule: All commercial business entities exporting merchandise from India must possess a valid 10-digit IEC issued by DGFT.
2. Exemptions under Para 2.07 of FTP 2023:
   - Category (a): Export of bonafide personal gifts and personal effects with FOB value not exceeding ₹5,00,000 (5 Lakhs) per shipment.
   - Category (b): Commercial samples and trade specimens within prescribed value limits.
   - Category (c): Ministries/Departments of Central or State Government.
3. Chapter 9 E-Commerce Export Facilitation:
   - DGNK electronic postal exports with valid IEC are fully eligible for RoDTEP, RoSCTL, Duty Drawback, and MAI (Market Access Initiative) schemes.
4. Online IEC Issuance: DGFT issues IEC 100% online within 24 hours at dgft.gov.in for a statutory fee of ₹500 against PAN and active bank verification.`,
    keywords: ['iec', 'dgft', 'ftp 2023', 'exemption', '5 lakh', 'gifts', 'samples', 'e-commerce', 'e-commerce export', 'rodtep'],
    summaryBulletPoints: [
      'IEC mandatory for all commercial and business sales',
      'Exemption up to ₹5,00,000 FOB for personal gifts and effects',
      'Chapter 9 of FTP 2023 grants full export incentives to postal e-commerce',
      'Instant online registration at dgft.gov.in for ₹500'
    ]
  },
  {
    id: 'packaging-upu-05',
    category: 'packaging_upu',
    title: 'International Postal Packaging Norms, UPU S10 Barcode Standard & Labeling',
    sourceDoc: 'UPU Technical Standard S10 & India Post Packaging Guidelines for Overseas Mails',
    circularRef: 'UPU Standard S10-8 / India Post Guide Part II Clause 45',
    authority: 'Universal Postal Union (UPU) & India Post International Mails Wing',
    lastUpdated: '2023-09-12',
    content: `Packaging and barcoding must strictly conform to Universal Postal Union and airline safety rules:
1. Outer Corrugated Carton:
   - Minimum 3-ply corrugated box for goods up to 5 kg; minimum 5-ply box for heavier items (5 kg - 35 kg).
   - Boxes must be rigid, clean, and free of old shipping labels or hazardous symbols.
2. Cushioning & Interior Protection:
   - Fragile items (terracotta, ceramics, glass, brassware): Minimum 50mm bubble wrap or honeycomb paper cushioning on all 6 sides.
   - Textiles & Silk Sarees: Must be packed in sealed polyethylene sleeves (minimum 50 microns) inside outer carton to protect against moisture during air transit.
3. UPU S10 13-Character Barcode Structure:
   - 2-Letter Service Indicator:
     * 'EE' - Speed Post International (EMS)
     * 'CP' - International Air Parcel
     * 'IN' / 'RX' - International Tracked Packet (ITPS) / Registered Mail
   - 8-Digit Serial Number: Unique identifier assigned by DGNK server.
   - 1-Digit Check Digit: Computed via UPU Modulo-11 weighted algorithm.
   - 2-Letter Country Code: 'IN' designating origin India.
4. Label Placement: Flat on top face; never across package seams or corners.`,
    keywords: ['packaging', 'upu s10', 'corrugated box', 'bubble wrap', 'fragile', 'handicrafts', 'textiles', 'barcode', 'label', 'ems', 'cp'],
    summaryBulletPoints: [
      'Rigid 3-ply / 5-ply corrugated carton mandatory',
      '50mm inner cushioning for handicrafts and fragile items',
      '13-character UPU S10 barcode (e.g. EE123456789IN for EMS)',
      'Waterproof envelope sleeve for all documentation'
    ]
  },
  {
    id: 'prohibited-items-06',
    category: 'prohibited_items',
    title: 'Prohibited Goods, Dangerous Goods (ICAO/IATA) & Restricted Items List',
    sourceDoc: 'Indian Post Office Act, 1898 & ICAO Technical Instructions for Safe Transport of DG',
    circularRef: 'India Post Guide Part II Section V / CBIC Prohibited Export Schedule',
    authority: 'Central Board of Indirect Taxes & Customs (CBIC) and ICAO',
    lastUpdated: '2024-03-01',
    content: `Strict regulations govern prohibited and restricted articles in international postal mails:
1. ABSOLUTELY PROHIBITED ARTICLES (Cannot be booked or transmitted by post under any circumstances):
   - Narcotics, psychotropic drugs, and prohibited chemical substances.
   - Explosives, fireworks, ammunition, safety matches, and flammable liquids.
   - Loose Lithium-ion / Lithium-metal batteries (Power banks, spare battery packs).
   - Perfumes and colognes with alcohol concentration exceeding 60% (flammable liquid hazard).
   - Antiquities and cultural art objects over 100 years old (unless non-antiquity certificate from ASI).
   - Wildlife trophies, peacock feathers, ivory, snake skin, and CITES Appendix-I species.
   - Counterfeit currency, trademark-infringing copies, and pirated software.
   - Liquid mercury, corrosive chemicals, and bio-hazardous materials.
2. RESTRICTED ARTICLES (Bookable only with required Regulatory Certificates):
   - Ayurvedic medicines & herbal supplements: Require AYUSH GMP Certificate, batch test report, and non-narcotic declaration.
   - Wooden items & timber handicrafts: Require Phytosanitary Certificate / Fumigation Certificate for timber species (e.g. Sheesham / Teak / Rosewood).
   - Spices, tea & processed dry foods: Must be dry, factory sealed, labeled in English with FSSAI license and US FDA Prior Notice (for USA).
   - Precious jewellery & silver filigree: Permitted within specific value limits with GJEPC appraisal certification.`,
    keywords: ['prohibited', 'restricted', 'antiquities', 'asi', 'narcotics', 'lithium battery', 'perfume', 'ayurveda', 'spices', 'fssai', 'cites', 'dangerous goods'],
    summaryBulletPoints: [
      'Zero tolerance for narcotics, explosives, loose batteries, and perfumes >60% alcohol',
      'Antiquities >100 yrs require Archaeological Survey of India (ASI) clearance',
      'Ayurveda requires AYUSH GMP Certificate and ingredients list',
      'Wooden items require Phytosanitary Certificate / Fumigation proof'
    ]
  },
  {
    id: 'country-usa-07',
    category: 'country_rules',
    title: 'Destination Guidelines: USA Export Rules (US CBP Section 321 & US FDA)',
    sourceDoc: 'US Code of Federal Regulations (19 CFR) & US FDA Bioterrorism Act',
    circularRef: 'US CBP Section 321 De Minimis & US FDA 21 CFR Part 1',
    authority: 'United States Customs and Border Protection (CBP) & US FDA',
    lastUpdated: '2024-02-15',
    content: `Regulations for postal exports from India to the United States:
1. Section 321 De Minimis:
   - Consignments with fair retail market value up to USD $800 per day per recipient enter the US duty-free and tax-free under informal entry.
2. US FDA Prior Notice (PN):
   - Mandatory for all foods, dry spices, tea, coffee, and consumable Ayurvedic dietary supplements.
   - Exporter must obtain a Prior Notice Confirmation Number online at access.fda.gov before dispatch and write the PN confirmation code on Form CN23.
3. Lacey Act Plant Declaration:
   - Wooden handicrafts, carved decor, and furniture require declaration of botanical plant genus/species and country of timber harvest to prevent pest infestation.
4. MoCRA (Cosmetics):
   - Herbal cosmetics and skin products must have English labeling with full ingredient listing and safety verification.
5. Textiles & Apparel:
   - Clear fabric composition tag (e.g. 100% Cotton, 100% Silk) and 'Made in India' origin label required.`,
    keywords: ['usa', 'us cbp', 'fda', 'section 321', '800 dollars', 'de minimis', 'prior notice', 'lacey act', 'spices', 'ayurveda', 'textiles'],
    summaryBulletPoints: [
      'USD $800 duty-free de minimis threshold per recipient per day',
      'FDA Prior Notice mandatory for all food, tea, spices, and dietary items',
      'Lacey Act declaration required for wooden handicrafts',
      'Clear textile labeling with 100% fiber composition & country of origin'
    ]
  },
  {
    id: 'country-eu-uk-08',
    category: 'country_rules',
    title: 'Destination Guidelines: European Union & United Kingdom (IOSS, TARIC, UK VAT)',
    sourceDoc: 'EU VAT E-Commerce Package (Directive 2017/2455) & UK HMRC Notice 143',
    circularRef: 'EU Council Directive 2017/2455 / UK HMRC Postal Guidelines',
    authority: 'European Commission Directorate-General for Taxation and Customs & UK HMRC',
    lastUpdated: '2024-02-01',
    content: `Rules for postal exports to the European Union (27 countries) and United Kingdom:
1. EU Import One-Stop Shop (IOSS):
   - For B2C retail e-commerce parcels valued up to €150 (approx ₹13,500 INR), marketplaces or sellers registered with IOSS collect destination VAT at checkout.
   - The seller's 12-character IOSS number (starting with 'IM...') must be entered in the DGNK electronic PBE declaration.
   - With valid IOSS, the parcel passes European customs without the buyer paying unexpected customs handling fees.
   - Consignments above €150: Standard EU customs duty + destination VAT collected from buyer upon delivery.
2. Mandatory 6-Digit HS Code (TARIC):
   - EU customs requires accurate 6-digit Harmonized Tariff Schedule codes in the electronic advance data (EAD). Vague terms like 'Gift' or 'Sample' will cause customs rejection.
3. United Kingdom (UK) Rules:
   - For consignments up to £135, UK VAT applies at point of sale if sold on an online platform; otherwise the recipient pays import VAT plus Royal Mail handling fee.`,
    keywords: ['eu', 'european union', 'ioss', 'vat', '150 euro', 'uk', 'hmrc', 'taric', 'hs code', 'royal mail', 'customs clearance'],
    summaryBulletPoints: [
      'EU IOSS scheme for parcels under €150 (avoids buyer delivery fees)',
      'Mandatory 6-digit HS Code (TARIC) in electronic advance data',
      'UK £135 threshold for e-commerce marketplace VAT',
      'Consignments over €150 / £135 incur standard import duty and VAT'
    ]
  },
  {
    id: 'country-gulf-aus-09',
    category: 'country_rules',
    title: 'Destination Guidelines: UAE/GCC & Australia Biosecurity Protocols',
    sourceDoc: 'GCC Unified Customs Tariff & Australian Biosecurity Act 2015',
    circularRef: 'GCC Common Customs Law / Australia BICON Import System',
    authority: 'UAE Federal Customs Authority & Australian Dept of Agriculture (DAFF)',
    lastUpdated: '2024-01-20',
    content: `Regulations for exporting to Gulf nations and Australia:
1. United Arab Emirates (UAE) & GCC:
   - De minimis threshold in UAE is AED 300 (approx USD $81).
   - Consignments valued above AED 300 incur 5% Customs Duty + 5% VAT.
   - Food, dates, and sweets require Halal assurance (if animal-derived) and clear English/Arabic expiry and production labeling.
2. Australia:
   - Extremely strict biosecurity rules enforced by DAFF (Department of Agriculture, Fisheries and Forestry).
   - Untreated wooden artifacts, raw seeds, unpolished grains, dried plant parts, and soil are strictly confiscated.
   - Wooden carvings must be sealed, polished, or accompanied by an ISPM-15 fumigation certificate.
   - Duty & GST de minimis threshold is AUD $1,000.
3. Canada:
   - Postal mail duty threshold is CAD $20. GST/HST applies on higher amounts.`,
    keywords: ['uae', 'gcc', 'dubai', 'australia', 'biosecurity', 'daff', 'canada', 'ispm 15', 'wooden', 'seeds'],
    summaryBulletPoints: [
      'UAE duty-free threshold: AED 300; 5% duty + 5% VAT above AED 300',
      'Australia: Strict biosecurity ban on raw seeds, untreated wood, and soil',
      'Australia de minimis is AUD $1,000 for customs duty',
      'Canada de minimis is CAD $20 for mail imports'
    ]
  },
  {
    id: 'services-tariff-10',
    category: 'dgnk_sop',
    title: 'India Post International Service Streams: EMS Speed Post, ITPS, Air Parcel',
    sourceDoc: 'India Post Rate Card & International Mail Operations Manual 2024',
    circularRef: 'Directorate of Operations Memo IP-INT-2024',
    authority: 'Department of Posts, Ministry of Communications',
    lastUpdated: '2024-04-01',
    content: `India Post offers three international conveyance streams through DGNK:
1. International EMS (Speed Post International):
   - Premium air express service with highest priority transit to 100+ countries.
   - Maximum weight: Up to 35 kg (20 kg for specific country limits).
   - End-to-end tracked transit with guaranteed delivery scan. Typical transit: 4 to 8 working days.
2. International Tracked Packet Service (ITPS):
   - Specially tailored for cross-border e-commerce sellers shipping light merchandise up to 2 kg.
   - Economical flat rates with full barcode tracking to 38+ major export markets (USA, UK, Germany, France, Australia, Japan, Singapore, etc.).
3. International Air Parcel:
   - Economical air transmission for packages up to 20 kg using CP72 dispatch notes.
   - Typical transit time: 7 to 15 working days.
4. Postal Insurance:
   - Exporters can insure parcels up to ₹1,00,000 declared value against transit loss or damage.`,
    keywords: ['ems', 'speed post', 'itps', 'air parcel', 'tariff', 'tracked packet', 'rates', 'weight', 'delivery time', 'insurance'],
    summaryBulletPoints: [
      'EMS Speed Post: 4-8 days express priority to 100+ countries (up to 35kg)',
      'ITPS Tracked Packet: Ultra-economical e-commerce shipping up to 2kg',
      'Air Parcel: Economical air transit up to 20kg with CP72 note',
      'Optional transit insurance up to ₹1,00,000 value'
    ]
  },
  {
    id: 'tax-lut-adcode-11',
    category: 'tax_financial',
    title: 'Financial & Tax Compliance: GST LUT (RFD-11), AD Code & EDPMS Reconciliation',
    sourceDoc: 'GST Rules for Export of Goods (Rule 96A) & RBI Master Directions on Export',
    circularRef: 'CBIC Circular No. 125/44/2019-GST / RBI AP (DIR Series) No. 74',
    authority: 'GST Council, CBIC & Reserve Bank of India (RBI)',
    lastUpdated: '2023-10-15',
    content: `Essential tax and foreign exchange rules for DGNK postal exports:
1. Zero-Rated Export under Letter of Undertaking (LUT):
   - Under Section 16 of the IGST Act, all export of goods is classified as zero-rated supply.
   - Exporters file Form GST RFD-11 (Letter of Undertaking) online at gst.gov.in at the beginning of each financial year.
   - With an active LUT, goods can be exported with ZERO upfront IGST payment.
   - If exported with IGST payment, 100% IGST refund is processed automatically based on electronic PBE confirmation.
2. Authorized Dealer (AD) Code:
   - A 14-digit code issued by the exporter's foreign exchange handling bank.
   - Registered with Customs to automatically link PBE exports with the RBI Export Data Processing and Monitoring System (EDPMS).
   - Mandatory for lawful realization and reconciliation of overseas payments into Indian business bank accounts.
3. Electronic Bank Realization Certificate (e-BRC):
   - Generated by your bank upon receipt of export proceeds in foreign currency. Proof required for claiming government incentives.`,
    keywords: ['lut', 'letter of undertaking', 'ad code', 'gst', 'igst refund', 'rfd-11', 'edpms', 'e-brc', 'zero rated', 'rbi'],
    summaryBulletPoints: [
      'File Form GST RFD-11 LUT annually to export without paying upfront IGST',
      'Automatic 100% IGST refund if exported with payment',
      '14-digit AD Code mandatory for RBI EDPMS remittance tracking',
      'e-BRC serves as proof of foreign currency realization'
    ]
  },
  {
    id: 'fpo-customs-lifecycle-12',
    category: 'customs_cbic',
    title: 'Physical & Digital FPO Clearance Lifecycle from DGNK Drop-Off to Delivery',
    sourceDoc: 'Standard Operating Procedure for Foreign Post Offices and DGNKs 2023',
    circularRef: 'DoP-CBIC Joint Operating Procedure SOP-FPO-09',
    authority: 'India Post FPO Nodal Wing & CBIC Customs Postal Wing',
    lastUpdated: '2023-11-05',
    content: `The 6-stage lifecycle of an international postal consignment booked at DGNK:
Stage 1: Electronic PBE Creation: Exporter generates PBE-I/PBE-II, UPU S10 barcode label, and CN22/CN23 customs declaration on the DGNK portal.
Stage 2: DGNK Counter Acceptance: Exporter drops package at nearest DGNK counter. Postmaster scans barcode, performs acceptance check, and issues postal receipt.
Stage 3: Transit to Foreign Post Office (FPO): Parcel is sealed in dedicated DGNK mail bags and dispatched to designated Regional FPO (Delhi, Mumbai, Chennai, Kolkata, Kochi, etc.).
Stage 4: Customs Examination & EOC: Customs Appraiser at FPO reviews digital PBE on Customs Postal System (CPS) and screens parcel via X-Ray. Upon satisfaction, Customs issues 'Export Out of Charge' (EOC).
Stage 5: Air Mail Transit Office (AMTO): Parcel transferred to international airport sorting hub and loaded onto outbound international scheduled flight.
Stage 6: Destination Customs & Delivery: Arrives at destination Office of Exchange (IMPC). Destination customs clears parcel, and destination national post (e.g. USPS, Royal Mail, Deutsche Post) completes doorstep delivery.`,
    keywords: ['fpo', 'foreign post office', 'lifecycle', 'tracking', 'out of charge', 'eoc', 'x-ray', 'amto', 'customs clearance', 'impc'],
    summaryBulletPoints: [
      'Stage 1-2: Electronic PBE registration and local DGNK counter drop-off',
      'Stage 3-4: Secure transit to FPO and digital Customs EOC clearance',
      'Stage 5: International air carrier conveyance via AMTO airport hub',
      'Stage 6: Destination customs clearance and last-mile postal delivery'
    ]
  },
  {
    id: 'statutory-post-office-act-13',
    category: 'statutory_acts',
    title: 'Statutory Framework: Indian Post Office Act & Post Office Act 2023',
    sourceDoc: 'The Post Office Act, 2023 (Act No. 43 of 2023) & Indian Post Office Act 1898',
    circularRef: 'Gazette of India Extraordinary Part II Section 1 / Act No. 43 of 2023',
    authority: 'Parliament of India & Department of Posts',
    lastUpdated: '2024-01-05',
    content: `Statutory legal foundation governing postal operations in India:
1. The Post Office Act, 2023:
   - Modernized the statutory framework for postal operations in India, facilitating digital citizen services, supply chain logistics, and cross-border trade.
   - Section 9: Authorizes central government officers to intercept, open, or detain postal articles containing prohibited goods, contraband, or items violating customs regulations.
   - Section 10: Extends statutory protection to postal staff acting in good faith while handling international mail.
2. India Post Guide Part II (Overseas Regulations):
   - Detailed regulatory manual specifying dimensions, maximum parcel weights, indemnity scales, redirection procedures, and customs cooperation protocols.
3. Customs Act, 1962 (Section 82 to 84):
   - Authorizes postal officers to present mail bags to Customs for inspection and collection of duties/statutory charges.`,
    keywords: ['post office act', 'statutory', 'customs act 1962', 'india post guide part ii', 'legal', 'regulations', 'gazette'],
    summaryBulletPoints: [
      'Post Office Act 2023 replaces legacy 1898 statute',
      'Statutory authority for customs inspection and security interception',
      'India Post Guide Part II governs all international postal transit rules',
      'Customs Act 1962 Sections 82-84 empowers postal export clearance'
    ]
  },
  {
    id: 'claims-indemnity-14',
    category: 'dgnk_sop',
    title: 'Loss, Damage & Compensation Claims under India Post International Postal Mails',
    sourceDoc: 'Universal Postal Union (UPU) Postal Payment Services Agreement & India Post Rules',
    circularRef: 'DoP Operations Manual Section XII - International Inquiries & Claims',
    authority: 'Universal Postal Union (UPU) & India Post Claims Directorate',
    lastUpdated: '2023-12-01',
    content: `Compensation and claims procedures for international postal articles:
1. Inquiries & Verification Period:
   - Exporter can initiate an official International Postal Inquiry (Form CN08) at the booking DGNK counter or online portal within 6 months from the date of posting.
2. Uninsured EMS Speed Post Claims:
   - In case of confirmed total loss or physical damage during transmission, compensation up to 30 SDR (approx ₹3,000 - ₹3,400) plus refund of postage paid is admissible under UPU rules.
3. Uninsured International Air Parcel Claims:
   - Compensation up to 40 SDR + 4.5 SDR per kilogram of lost weight plus postage refund.
4. Insured Consignments:
   - If insured at time of booking, full declared value (up to ₹1,00,000) is reimbursed upon verification of claim and non-delivery certificate from destination postal operator.
5. Inadmissible Claims: No compensation is payable if loss/damage was caused by prohibited content, faulty packaging by sender, or lawful seizure by destination customs.`,
    keywords: ['claims', 'compensation', 'indemnity', 'lost parcel', 'damage', 'insurance', 'cn08', 'sdr', 'refund'],
    summaryBulletPoints: [
      'Claims can be filed within 6 months via Form CN08',
      'Uninsured EMS: 30 SDR + postage refund for total loss',
      'Uninsured Air Parcel: 40 SDR + 4.5 SDR/kg + postage refund',
      'Insured articles: Full declared value up to ₹1,00,000 reimbursed'
    ]
  }
];
