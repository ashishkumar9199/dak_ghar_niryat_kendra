import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { generateGroundedAnswer } from "./server/gemini.js";
import { inspectRAGPipeline } from "./server/ragEngine.js";
import { DGNK_KNOWLEDGE_BASE } from "./server/knowledgeBase.js";
import { DGNK_CENTERS, HS_CODES_DATABASE, TARIFF_RATES, DEMO_TRACKING_DATA, ShipmentTrackingRecord, CBIC_EXCHANGE_RATES, userShipments } from "./server/data.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory registered users store on server
  const serverUsers = new Map<string, any>();
  
  // Seed server with initial accounts
  serverUsers.set('exports@varanasihandicrafts.org', {
    id: 'usr-varanasi-01',
    email: 'exports@varanasihandicrafts.org',
    password: 'password123',
    contactPerson: 'Devendra Sharma',
    businessName: 'Varanasi Silk & Handicrafts Guild',
    phone: '+91 98390 12845',
    businessCategory: 'Handicrafts & Artifacts',
    hasIEC: true,
    iecCode: '0518029481',
    hasGST: true,
    gstin: '09AAAFV1284M1ZV',
    hasLUT: true,
    lutNumber: 'AD0903250084712',
    preferredDGNK: 'Varanasi Cantt HPO DGNK (221002)',
    address: 'Plot 42, Chowk Silk Enclave, Godowlia',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    pincode: '221002',
    walletBalance: 18450,
    role: 'exporter',
    createdAt: '2025-11-15T10:30:00.000Z',
    lastLoginAt: new Date().toISOString()
  });

  // 1. Health check
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      service: "Dak Ghar Niryat Kendra Digital Export Platform",
      version: "2.4.0",
      geminiConfigured: !!process.env.GEMINI_API_KEY,
      knowledgeChunksCount: DGNK_KNOWLEDGE_BASE.length,
      timestamp: new Date().toISOString()
    });
  });

  // 1b. Auth Endpoints (Register, Login, Session)
  app.post("/api/auth/register", (req: Request, res: Response) => {
    try {
      const { email, password, contactPerson, businessName, phone, businessCategory, hasIEC, iecCode, hasGST, gstin, preferredDGNK } = req.body;
      const cleanEmail = (email || '').trim().toLowerCase();

      if (!cleanEmail || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      if (serverUsers.has(cleanEmail)) {
        return res.status(409).json({ error: "An account with this email is already registered." });
      }

      const newUser = {
        id: `usr-dnk-${Date.now().toString(36)}`,
        email: cleanEmail,
        password: password.trim(),
        contactPerson: contactPerson || 'Authorized Exporter',
        businessName: businessName || 'Indian Export MSME',
        phone: phone || '+91 98765 43210',
        businessCategory: businessCategory || 'Handicrafts & Artifacts',
        hasIEC: !!hasIEC,
        iecCode: iecCode || '',
        hasGST: !!hasGST,
        gstin: gstin || '',
        hasLUT: false,
        lutNumber: '',
        preferredDGNK: preferredDGNK || 'New Delhi GPO DGNK (110001)',
        walletBalance: 5000,
        role: 'exporter',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      serverUsers.set(cleanEmail, newUser);
      const { password: _, ...userSafe } = newUser;
      return res.status(201).json({ success: true, user: userSafe });
    } catch (err: any) {
      return res.status(500).json({ error: "Registration failed", details: err.message });
    }
  });

  app.post("/api/auth/login", (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPass = (password || '').trim();

      if (!cleanEmail || !cleanPass) {
        return res.status(400).json({ error: "Email and password are required." });
      }

      const user = serverUsers.get(cleanEmail);
      if (!user) {
        return res.status(404).json({ error: "No account found with this email address. Please register." });
      }

      if (user.password && user.password !== cleanPass) {
        return res.status(401).json({ error: "Incorrect password." });
      }

      user.lastLoginAt = new Date().toISOString();
      const { password: _, ...userSafe } = user;
      return res.json({ success: true, user: userSafe });
    } catch (err: any) {
      return res.status(500).json({ error: "Login failed", details: err.message });
    }
  });

  // 2. RAG AI Assistant Chatbot endpoint (Multi-turn trained DNK Postal Assistant)
  app.post("/api/assistant/chat", async (req: Request, res: Response) => {
    try {
      const { query, userProfile, history } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "A valid 'query' string is required." });
      }

      const result = await generateGroundedAnswer(query, userProfile, history);
      return res.json(result);
    } catch (err: any) {
      console.error("Error in /api/assistant/chat:", err);
      return res.status(500).json({ error: "Failed to generate grounded answer.", details: err.message });
    }
  });

  // 3. RAG Pipeline Inspection endpoint (demonstrating chunk retrieval & vector scoring)
  app.post("/api/assistant/rag-inspect", (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Query string is required for inspection." });
      }

      const inspection = inspectRAGPipeline(query);
      return res.json(inspection);
    } catch (err: any) {
      console.error("Error in /api/assistant/rag-inspect:", err);
      return res.status(500).json({ error: "Inspection failed.", details: err.message });
    }
  });

  // 4. Official Knowledge Base chunks listing
  app.get("/api/knowledge-base", (req: Request, res: Response) => {
    const { category } = req.query;
    let items = DGNK_KNOWLEDGE_BASE;
    if (category && typeof category === 'string') {
      items = items.filter(k => k.category === category);
    }
    return res.json({
      total: items.length,
      chunks: items
    });
  });

  // 5. DGNK Centers locator search
  app.get("/api/dgnk/centers", (req: Request, res: Response) => {
    const { search, state, pincode } = req.query;
    let results = [...DGNK_CENTERS];

    if (pincode && typeof pincode === 'string') {
      results = results.filter(c => c.pincode.startsWith(pincode.trim()));
    } else if (state && typeof state === 'string' && state !== 'ALL') {
      results = results.filter(c => c.state.toLowerCase() === state.toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase().trim();
      results = results.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.district.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q) ||
        c.servicesAvailable.some(s => s.toLowerCase().includes(q))
      );
    }

    return res.json({
      total: results.length,
      centers: results
    });
  });

  // 6. HS Codes Search
  app.get("/api/hs-codes", (req: Request, res: Response) => {
    const { search, category } = req.query;
    let items = [...HS_CODES_DATABASE];

    if (category && typeof category === 'string' && category !== 'ALL') {
      items = items.filter(h => h.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(h =>
        h.code.includes(q) ||
        h.description.toLowerCase().includes(q) ||
        h.category.toLowerCase().includes(q)
      );
    }

    return res.json({
      total: items.length,
      hsCodes: items
    });
  });

  // 7. Tariff Rate Calculator
  app.get("/api/rates/calculate", (req: Request, res: Response) => {
    const countryCode = (req.query.countryCode as string) || 'US';
    const weightGrams = parseInt(req.query.weightGrams as string, 10) || 500;
    const declaredValueINR = parseInt(req.query.declaredValueINR as string, 10) || 5000;

    const availableTariffs = TARIFF_RATES.filter(t => t.countryCode === countryCode);
    const countryName = availableTariffs[0]?.countryName || 'Selected Destination';

    const calculatedServices = availableTariffs.map(t => {
      const isOverMaxWeight = (weightGrams / 1000) > t.maxWeightKg;
      let totalINR = 0;

      if (!isOverMaxWeight) {
        if (weightGrams <= t.baseWeightGrams) {
          totalINR = t.baseRateINR;
        } else {
          const excessWeight = weightGrams - t.baseWeightGrams;
          const additionalUnits = Math.ceil(excessWeight / t.addlWeightGrams);
          totalINR = t.baseRateINR + (additionalUnits * t.addlRateINR);
        }
      }

      // Air surcharge / Fuel surcharge (standard India Post 10% international fuel/conveyance surcharge)
      const surchargeINR = Math.round(totalINR * 0.10);
      const grandTotalINR = totalINR + surchargeINR;

      return {
        serviceName: t.serviceName,
        serviceLabel: t.serviceLabel,
        isEligible: !isOverMaxWeight,
        ineligibilityReason: isOverMaxWeight ? `Weight exceeds max ${t.maxWeightKg}kg for this service.` : null,
        baseRateINR: totalINR,
        surchargeINR,
        grandTotalINR,
        transitDays: t.transitDays,
        features: t.features,
        maxWeightKg: t.maxWeightKg,
        customsFormRequired: declaredValueINR > 30000 || t.serviceName === 'AirParcel' || t.serviceName === 'EMS' ? 'CN23' : 'CN22'
      };
    });

    return res.json({
      countryCode,
      countryName,
      weightGrams,
      declaredValueINR,
      services: calculatedServices
    });
  });

  // 7b. CBIC Customs Exchange Rates endpoint
  app.get("/api/exchange-rates/cbic", (req: Request, res: Response) => {
    const { currency } = req.query;
    if (currency && typeof currency === 'string') {
      const found = CBIC_EXCHANGE_RATES.find(c => c.currencyCode.toUpperCase() === currency.toUpperCase());
      if (found) {
        return res.json({ success: true, rate: found });
      }
    }
    return res.json({
      success: true,
      rates: CBIC_EXCHANGE_RATES,
      authority: "Central Board of Indirect Taxes and Customs (CBIC), Ministry of Finance, Govt. of India",
      statutorySection: "Section 14 of Customs Act, 1962",
      effectiveNotification: "CBIC Notif. No. 14/2026-Customs (N.T.)",
      lastSynchronized: new Date().toISOString()
    });
  });

  // 8. Tracking API
  app.get(["/api/tracking/track/:id", "/api/shipments/track/:id"], (req: Request, res: Response) => {
    const articleId = (req.params.id || '').toUpperCase().trim();

    if (userShipments.has(articleId)) {
      return res.json({
        found: true,
        shipment: userShipments.get(articleId)
      });
    }

    if (DEMO_TRACKING_DATA[articleId]) {
      return res.json({
        found: true,
        shipment: DEMO_TRACKING_DATA[articleId]
      });
    }

    // Auto-generate realistic response for valid S10 barcode pattern
    const isS10Format = /^[A-Z]{2}\d{9}IN$/.test(articleId);
    if (isS10Format) {
      const generatedRecord: ShipmentTrackingRecord = {
        articleId,
        bookingDate: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        originDGNK: 'Designated DGNK Counter (India Post)',
        destinationCountry: 'United States of America',
        destinationCity: 'New York, NY',
        recipientName: 'International Consignee',
        serviceType: articleId.startsWith('EE') ? 'Speed Post International (EMS)' : articleId.startsWith('CP') ? 'International Air Parcel' : 'Tracked Packet (ITPS)',
        currentStatus: 'Dispatched from DGNK to Foreign Post Office (FPO)',
        currentStatusCode: 'DISPATCHED_TO_FPO',
        estimatedDelivery: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
        events: [
          {
            timestamp: new Date(Date.now() - 86400000).toISOString().replace('T', ' ').substring(0, 16),
            location: 'National Sorting Hub (NSH) / AMTO',
            activity: 'Bag closed and forwarded to Foreign Post Office (FPO) for Customs X-Ray examination',
            status: 'In Transit to FPO'
          },
          {
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString().replace('T', ' ').substring(0, 16),
            location: 'Designated DGNK Post Office Counter',
            activity: 'Article booked via DGNK Portal. Postal receipt issued.',
            status: 'Booked'
          }
        ]
      };
      return res.json({
        found: true,
        shipment: generatedRecord
      });
    }

    return res.status(404).json({
      found: false,
      message: `Article ID '${articleId}' not found. Please enter a valid 13-character India Post S10 barcode (e.g. EE928410294IN, IN482019385IN, CP710928374IN).`
    });
  });

  // 9. Shipment creation and digital PBE generator
  app.post("/api/shipments/create", (req: Request, res: Response) => {
    try {
      const data = req.body;
      const {
        serviceType = 'EMS',
        exporterDetails = {},
        recipientDetails = {},
        products = [],
        customsDeclaration = {}
      } = data;

      // Generate authentic S10 UPU Barcode
      const prefix = serviceType === 'EMS' ? 'EE' : serviceType === 'AirParcel' ? 'CP' : 'IN';
      const random9Digits = Math.floor(100000000 + Math.random() * 900000000).toString();
      const articleId = `${prefix}${random9Digits}IN`;

      const pbeNumber = `PBE-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

      const totalValueINR = products.reduce((acc: number, p: any) => acc + (parseFloat(p.valueINR || 0) * (parseInt(p.quantity || 1, 10))), 0);
      const totalWeightGrams = products.reduce((acc: number, p: any) => acc + (parseFloat(p.weightGrams || 0) * (parseInt(p.quantity || 1, 10))), 0);

      const newShipment: ShipmentTrackingRecord = {
        articleId,
        bookingDate: new Date().toISOString().split('T')[0],
        originDGNK: exporterDetails.preferredDGNK || 'New Delhi GPO DGNK (110001)',
        destinationCountry: recipientDetails.country || 'United States',
        destinationCity: recipientDetails.city || 'City Center',
        recipientName: recipientDetails.name || 'Overseas Buyer',
        serviceType: serviceType === 'EMS' ? 'Speed Post International (EMS)' : serviceType === 'AirParcel' ? 'International Air Parcel' : 'Tracked Packet Service (ITPS)',
        currentStatus: 'PBE Filed Electronically — Ready for Drop-off at DGNK Counter',
        currentStatusCode: 'BOOKED',
        estimatedDelivery: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
        events: [
          {
            timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
            location: exporterDetails.preferredDGNK || 'DGNK Online Portal',
            activity: `Electronic Postal Bill of Export (${pbeNumber}) registered. Barcode ${articleId} generated.`,
            status: 'Pre-Booked'
          }
        ]
      };

      userShipments.set(articleId, newShipment);

      return res.json({
        success: true,
        articleId,
        pbeNumber,
        pbeType: totalValueINR > 100000 ? 'PBE-II (Commercial)' : 'PBE-I (E-Commerce Export)',
        customsFormType: totalValueINR > 30000 || serviceType !== 'ITPS' ? 'CN23' : 'CN22',
        totalValueINR,
        totalWeightGrams,
        shipment: newShipment,
        documents: {
          pbeGenerated: true,
          commercialInvoiceUrl: `/manifests/${articleId}-invoice.pdf`,
          customsDeclarationUrl: `/manifests/${articleId}-cn23.pdf`,
          shippingLabelUrl: `/manifests/${articleId}-label.pdf`
        }
      });
    } catch (err: any) {
      console.error("Error creating shipment:", err);
      return res.status(500).json({ error: "Failed to create export shipment.", details: err.message });
    }
  });

  // 10. Prohibited & Restricted Item Quick Screener
  app.post(["/api/customs/screen-item", "/api/prohibited-check"], (req: Request, res: Response) => {
    const { itemName, destinationCountry } = req.body;
    const name = (itemName || '').toLowerCase();

    // Check prohibited keywords
    const prohibitedKeywords = ['battery', 'lithium', 'firework', 'explosive', 'narcotic', 'antiquity', 'antique', 'ivory', 'snake', 'wildlife', 'peacock', 'mercury', 'perfume', 'alcohol', 'flammable', 'counterfeit'];
    const isProhibited = prohibitedKeywords.some(kw => name.includes(kw));

    // Check restricted keywords
    const restrictedKeywords = ['ayurveda', 'herb', 'wood', 'sheesham', 'sandalwood', 'spice', 'tea', 'gold', 'silver', 'jewelry', 'jewellery', 'leather', 'medicine', 'seed'];
    const isRestricted = restrictedKeywords.some(kw => name.includes(kw));

    if (isProhibited) {
      return res.json({
        status: 'PROHIBITED',
        color: 'red',
        message: `Item matches prohibited export list (Dangerous Goods / Antiquity / Wildlife regulations). Cannot be dispatched via postal mail.`,
        action: 'Reject or consult FPO Customs Nodal Officer.'
      });
    }

    if (isRestricted) {
      return res.json({
        status: 'RESTRICTED',
        color: 'amber',
        message: `Permitted under DGNK with special regulatory documents (e.g. NOC, AYUSH GMP, Phytosanitary, Lacey Act, or FSSAI certificate).`,
        action: 'Attach required compliance certificates with CN23 and Commercial Invoice.'
      });
    }

    return res.json({
      status: 'FREE',
      color: 'green',
      message: `Item is classified as freely exportable under DGFT Foreign Trade Policy 2023. Standard DGNK PBE-I / CN22 / CN23 filing applies.`,
      action: 'Ready for standard booking.'
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dak Ghar Niryat Kendra Server running on http://localhost:${PORT}`);
  });
}

startServer();
