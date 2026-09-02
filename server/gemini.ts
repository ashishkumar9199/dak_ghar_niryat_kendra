import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { buildPromptContext, retrieveRelevantChunks, RetrievedContext } from "./ragEngine.js";
import { DEMO_TRACKING_DATA, userShipments, ShipmentTrackingRecord } from "./data.js";

let aiClient: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

export interface ChatHistoryTurn {
  role: 'user' | 'model' | 'assistant';
  text: string;
}

export interface AssistantAnswerResponse {
  answer: string;
  groundedSources: {
    title: string;
    sourceDoc: string;
    circularRef: string;
    authority: string;
    similarityScore: number;
    matchedKeywords: string[];
  }[];
  isAiGrounded: boolean;
  query: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  actionLinks?: {
    label: string;
    action: string;
    icon?: string;
  }[];
}

function findTrackingId(text: string): string | null {
  if (!text) return null;
  const normalizedText = text.toUpperCase().replace(/[\s\-_:,]/g, '');
  
  // 1. Check direct map keys
  for (const id of userShipments.keys()) {
    if (normalizedText.includes(id.toUpperCase())) {
      return id;
    }
  }
  for (const id of Object.keys(DEMO_TRACKING_DATA)) {
    if (normalizedText.includes(id.toUpperCase())) {
      return id;
    }
  }

  // 2. Standard UPU S10 (e.g. EE928410294IN)
  const upuRegex = /[A-Z]{2}\d{9}[A-Z]{2}/i;
  const match = text.match(upuRegex);
  if (match) {
    return match[0].toUpperCase();
  }

  // 3. Custom DNK format (e.g. DNK-17182928)
  const dnkRegex = /DNK\-\d+/i;
  const dnkMatch = text.match(dnkRegex);
  if (dnkMatch) {
    return dnkMatch[0].toUpperCase();
  }

  return null;
}

export async function generateGroundedAnswer(
  userQuery: string,
  userProfile?: {
    businessType?: string;
    productCategory?: string;
    destinationCountry?: string;
    hasIEC?: boolean;
    hasGST?: boolean;
  },
  history?: ChatHistoryTurn[]
): Promise<AssistantAnswerResponse> {
  // Check for tracking keywords & potential tracking ID
  const hasTrackingKeywords = /track|order|package|parcel|consignment|shipment|status|where is|receipt/i.test(userQuery);
  const matchedTrackingId = findTrackingId(userQuery) || (history ? findTrackingId(history.map(h => h.text).join(' ')) : null);

  let trackingContext = "";
  let foundShipment: ShipmentTrackingRecord | null = null;

  if (matchedTrackingId) {
    const shipment = userShipments.get(matchedTrackingId) || DEMO_TRACKING_DATA[matchedTrackingId];
    if (shipment) {
      foundShipment = shipment;
      trackingContext = `
[LIVE SHIPMENT TRACKING DATA RETRIEVED]
Consignment ID: ${shipment.articleId}
Booking Date: ${shipment.bookingDate}
Origin: ${shipment.originDGNK}
Destination City: ${shipment.destinationCity}
Destination Country: ${shipment.destinationCountry}
Recipient Name: ${shipment.recipientName}
Postal Shipping Service: ${shipment.serviceType}
Current Status Summary: ${shipment.currentStatus}
Status Code: ${shipment.currentStatusCode}
Estimated Delivery: ${shipment.estimatedDelivery}

CHRONOLOGICAL SHIPPING EVENTS LOG (Newest events first):
${shipment.events.map((e, idx) => `  Event #${idx + 1}:
    Timestamp: ${e.timestamp}
    Location: ${e.location}
    Activity Detail: ${e.activity}
    Customs/Transit Status: ${e.status}`).join('\n')}
`;
    } else {
      trackingContext = `
[SHIPMENT TRACKING SYSTEM SEARCH RESULT]
The user queried for consignment code: "${matchedTrackingId}", but this ID is not found in the live DGNK shipments registry.
Instructions: Inform the user politely that the consignment ID they entered was not recognized. Encourage them to verify the format (e.g., standard 13-character code like EE928410294IN) or explain that custom shipments can take a short time (2-4 hours) to be indexed in the tracking logs after the physical counter scan.
`;
    }
  }

  const shippingServicesContext = `
DGNK STANDARD EXPORT SHIPPING SERVICES:
1. Speed Post International (EMS)
   - Category: Premium high-priority express air courier.
   - Transit Time: 4-9 business days to global destinations.
   - Weight Limit: Up to 35 kg.
   - Tracking: Premium end-to-end continuous item-level tracking with real-time updates.
   - Ideal For: Urgent documents, precious handicrafts, medicines, high-value MSME products.

2. International Tracked Packet Service (ITPS)
   - Category: Economical e-commerce optimized postal packet.
   - Transit Time: 8-15 business days.
   - Weight Limit: Strictly up to 2 kg.
   - Tracking: Cost-effective milestone electronic tracking (updates on dispatch, foreign office entry, customs, and delivery).
   - Ideal For: Small e-commerce sellers, artisans exporting jewelry, silks, light wooden crafts, or toys.

3. Air Parcel
   - Category: Reliable standard cargo-weight parcel shipping.
   - Transit Time: 10-20 business days.
   - Weight Limit: Up to 20kg - 30kg.
   - Tracking: Standard parcel exchange office tracking.
   - Ideal For: Heavy bulky commercial exports, brassware, stone sculptures, large handicraft batches where shipping costs need to be minimized.
`;

  // Step 1: Retrieve relevant official document chunks via RAG engine
  const fullSearchQuery = history && history.length > 0 
    ? `${userQuery} ${history[history.length - 1]?.text || ''}`.substring(0, 400)
    : userQuery;

  const retrievedContexts = retrieveRelevantChunks(fullSearchQuery, 4);
  const formattedContext = buildPromptContext(retrievedContexts);

  const sourcesList = retrievedContexts.map(rc => ({
    title: rc.chunk.title,
    sourceDoc: rc.chunk.sourceDoc,
    circularRef: rc.chunk.circularRef,
    authority: rc.chunk.authority,
    similarityScore: rc.score,
    matchedKeywords: rc.matchedKeywords
  }));

  const ai = getGeminiClient();

  if (!ai) {
    // Grounded synthesis fallback using retrieved official knowledge chunks directly
    if (foundShipment) {
      const fallbackAnswer = `Live Consignment Tracking Report (DNK Offline Mode)

I located your active consignment shipment! Here are the live shipping and customs status details:

• Consignment ID: ${foundShipment.articleId}
• Service Type: ${foundShipment.serviceType}
• Destination: ${foundShipment.destinationCity}, ${foundShipment.destinationCountry}
• Recipient: ${foundShipment.recipientName}
• Latest Status: ${foundShipment.currentStatus}
• Estimated Delivery: ${foundShipment.estimatedDelivery}

Step-by-step Tracking History:
${foundShipment.events.map(e => `• [${e.timestamp}] ${e.location}\n  Activity: ${e.activity} (Status: ${e.status})`).join('\n\n')}

Let me know if you would like me to explain any of these events or check package dimensions guidelines!`;

      return {
        answer: fallbackAnswer,
        groundedSources: sourcesList,
        isAiGrounded: true,
        query: userQuery,
        timestamp: new Date().toISOString(),
        suggestedFollowUps: [
          'What does "Export Out of Charge" mean?',
          'How do I file Form PBE-I for this consignment?',
          'View nearest DGNK counter details'
        ],
        actionLinks: [
          { label: 'View Tracking Panel', action: 'open_tracker', icon: 'Search' }
        ]
      };
    } else if (hasTrackingKeywords && !matchedTrackingId) {
      const fallbackAnswer = `How can I help you track your shipment today?

If you are looking to track your international postal parcel or e-commerce order, I would be delighted to look up the live database and customs status for you!

To search the live registers, please reply with your 13-character Consignment ID (e.g., standard Speed Post format like EE928410294IN).

For your information, Dak Ghar Niryat Kendra (DNK) supports the following three international export shipping services:
1. Speed Post International (EMS) – End-to-end premium tracking for packages up to 35kg. Excellent for urgent or high-value shipments.
2. International Tracked Packet Service (ITPS) – Economical milestone-based tracking for lightweight parcels under 2kg. Specifically designed for e-commerce exporters.
3. Air Parcel – Reliable standard shipping for bulk commercial cargo up to 20-30kg.

Please share your consignment number, and I will instantly retrieve its progress report!`;

      return {
        answer: fallbackAnswer,
        groundedSources: sourcesList,
        isAiGrounded: true,
        query: userQuery,
        timestamp: new Date().toISOString(),
        suggestedFollowUps: [
          'Track demo shipment EE928410294IN',
          'What is the difference between ITPS and EMS Speed Post?',
          'Calculate Postal Shipping Tariff'
        ]
      };
    }

    const topChunk = retrievedContexts[0]?.chunk;
    const secondChunk = retrievedContexts[1]?.chunk;
    const thirdChunk = retrievedContexts[2]?.chunk;

    const fallbackAnswer = `Official Grounded Response from Dak Ghar Niryat Kendra (DNK)

Based on official India Post & Customs regulatory directives (${topChunk?.sourceDoc || 'India Post DGNK SOP'}, Ref: ${topChunk?.circularRef || 'DoP Circular'}):

${topChunk?.content || 'Please consult your designated Dak Ghar Niryat Kendra officer.'}

${secondChunk ? `\n\nAdditional Regulatory Requirement (${secondChunk.sourceDoc} - ${secondChunk.circularRef}):\n${secondChunk.content}` : ''}

${thirdChunk ? `\n\nKey Standard Reference (${thirdChunk.sourceDoc}):\n${thirdChunk.content}` : ''}

---
Official Verification: This information is strictly grounded in verified guidelines from Department of Posts (India Post), Central Board of Indirect Taxes and Customs (CBIC), and Directorate General of Foreign Trade (DGFT).`;

    return {
      answer: fallbackAnswer,
      groundedSources: sourcesList,
      isAiGrounded: true,
      query: userQuery,
      timestamp: new Date().toISOString(),
      suggestedFollowUps: [
        'What documents are needed for Form PBE-I?',
        'How do I generate a CN23 customs label?',
        'What is the maximum weight for Speed Post International?'
      ],
      actionLinks: [
        { label: 'Book New Export Consignment', action: 'open_wizard' },
        { label: 'Calculate Shipping Tariff', action: 'open_calculator' }
      ]
    };
  }

  // System instruction: Official DGNK AI Chatbot & Postal Appraiser
  const systemInstruction = `You are the official "Dak Ghar Niryat Kendra (DNK) AI Chatbot & Virtual Postal Appraiser", an authorized digital service of India Post (Department of Posts, Ministry of Communications, Government of India), operating in joint coordination with CBIC (Customs) and DGFT (Ministry of Commerce & Industry).

YOUR PRIMARY MISSION:
Provide clear, authoritative, accurate, and step-by-step guidance to Indian exporters, small businesses, rural artisans, weavers, MSMEs, and cross-border e-commerce sellers shipping goods internationally through the India Post DGNK network.

HUMAN-LIKE INTERACTIVE CONVERSATION & TRACKING RULES:
1. Actively listen and respond in a warm, polite, and human-like conversational manner. Speak naturally, show empathy, and encourage small businesses.
2. If the user asks to track their shipment, order, or package:
   - Check if the [LIVE SHIPMENT TRACKING DATA RETRIEVED] context is provided in the prompt.
   - If a valid shipment record IS provided, explain its status in a friendly, narrative, human-like way:
     • Greet the user by stating that their parcel was located successfully.
     • Summarize its journey clearly (e.g. "Great news! Your Speed Post International package is currently on its way to ${foundShipment?.destinationCity || 'its destination'}. It was cleared by customs at the Foreign Post Office in Delhi and has departed on an Air India cargo flight...").
     • Present the chronological timeline of events in a clean, easy-to-read, and beautifully formatted checklist/table, translating technical terms where helpful (e.g., explain that PBE-I means Postal Bill of Export, and Out of Charge means customs has approved it for transit).
     • Highlight the estimated delivery date clearly and reassure the user of its safety.
   - If the user wants to track a package but HAS NOT provided a tracking ID, or if the ID is not found:
     • Greet them and express your readiness to check the live tracking registers.
     • Politely ask them to share their 13-character Consignment ID (standard formats like EE928410294IN, or any custom booking confirmation code).
     • Introduce the standard shipping services of India Post (EMS Speed Post, ITPS, and Air Parcel) so they understand the available service and tracking types.
3. If the user shares a tracking ID, retrieve it, look it up in the live data, and provide the human-friendly summary as described.

STRICT GROUNDING & REGULATORY RULES:
1. Ground your answers strictly in the official knowledge chunks provided below. These include:
   - India Post DGNK Standard Operating Procedure (SOP) 2023-24 (Circular 27-02/2021-BD&MD)
   - CBIC Circular No. 14/2018-Customs & Notification No. 48/2018-Customs (N.T.) on Postal Bill of Export (PBE-I and PBE-II)
   - DGFT Foreign Trade Policy (FTP 2023) Chapter 2 & Chapter 9 (E-Commerce Exports, IEC rules, ₹5 Lakh gift exemption, RoDTEP/Duty Drawback)
   - Universal Postal Union (UPU) Convention & Manuals (Form CN22, Form CN23, CP72 Dispatch Note, 300 SDR threshold, UPU S10 Barcode Standard)
   - Dangerous Goods Regulations (ICAO/IATA - strict ban on loose lithium batteries, flammable perfumes >60% alcohol, explosives)
   - Specific Country Import Protocols:
     * USA: US CBP Section 321 ($800 de minimis), US FDA Prior Notice (PN) for foods/spices/tea/ayurveda, Lacey Act for wooden crafts.
     * European Union: IOSS (Import One-Stop Shop) for parcels ≤ €150, mandatory 6-digit HS code (TARIC).
     * United Kingdom: £135 threshold for HMRC marketplace VAT.
     * UAE / GCC: AED 300 de minimis, 5% duty + 5% VAT above AED 300.
     * Australia: Strict DAFF Biosecurity ban on raw seeds, untreated wood, and soil; AUD $1,000 threshold.
   - Tax & Forex: GST RFD-11 Letter of Undertaking (LUT) for zero-rated export, 14-digit AD Code for RBI EDPMS reconciliation.

2. CITE OFFICIAL DOCUMENTS & CIRCULAR REFERENCES:
   - In your answer, explicitly mention the governing circular or rule (e.g. "As per CBIC Notification 48/2018-Customs (N.T.)...", "Under DGFT FTP 2023 Chapter 9...", "In accordance with UPU S10 Barcode standards...").

3. ANSWER FORMATTING & STRUCTURE:
   - Use clean, neat formatting with simple bullet points (using standard dashes or unicode bullets like •) and numbered action steps.
   - CRITICAL FORMATTING RULE: Never use markdown bold double-asterisks (**) or single-asterisks (*) anywhere in your responses because the chat interface renders plain text without markdown conversion. To highlight key terms or names, write them in plain text or capitalize them, but NEVER wrap them in double-asterisks (**) or single-asterisks (*).
   - Provide a "Documents Required" checklist when relevant (e.g. 1. PBE-I, 2. CN23, 3. Commercial Invoice with HS Code, 4. LUT).
   - If the user asks in Hindi or another Indian language, respond fluently in that language while keeping technical regulatory terms (PBE, CN22/CN23, HS Code, IEC, DGNK) crystal clear.

4. SAFETY & PROHIBITED GOODS:
   - If an item is prohibited (e.g., loose lithium battery, antique art >100 years without ASI certificate, animal ivory, flammable liquid), clearly explain the restriction and suggest authorized alternatives (e.g. ASI certificate, AYUSH GMP certificate, Phytosanitary certificate).

5. CONVERSATIONAL TONE:
   - Be helpful, respectful, courteous, and encouraging to Indian MSMEs and artisans.
   - Conclude with a helpful proactive tip or next step.`;

  // Build conversational context if history exists
  let conversationHistoryText = '';
  if (history && history.length > 0) {
    const recentHistory = history.slice(-6); // Last 6 turns
    conversationHistoryText = recentHistory.map(h => `${h.role === 'user' ? 'User' : 'DNK Bot'}: ${h.text}`).join('\n');
  }

  const userPrompt = `
${conversationHistoryText ? `PREVIOUS CHAT CONVERSATION HISTORY:\n${conversationHistoryText}\n\n` : ''}
${trackingContext ? `LIVE SHIPMENT TRACKING CONTEXT:\n${trackingContext}\n\n` : ''}
${hasTrackingKeywords ? `DGNK SHIPPING SERVICES REFERENCE FOR TRACKING QUERY:\n${shippingServicesContext}\n\n` : ''}
CURRENT USER QUERY: "${userQuery}"

${userProfile ? `EXPORTER PROFILE CONTEXT:
- Business Category: ${userProfile.businessType || 'MSME / Artisan'}
- Product Category: ${userProfile.productCategory || 'Handicrafts / General Goods'}
- Destination Country: ${userProfile.destinationCountry || 'International'}
- IEC Code Status: ${userProfile.hasIEC ? 'Valid IEC Available' : 'No IEC / Personal Gift Exemption'}
- GST Status: ${userProfile.hasGST ? 'GST Registered' : 'Unregistered / Exemption Category'}` : ''}

VERIFIED OFFICIAL DGNK / CUSTOMS / DGFT KNOWLEDGE BASE (RETRIEVED VIA RAG):
${formattedContext}

Please generate an authoritative, structured, and helpful response grounded in the verified official context above. Highlight required documents, circular numbers, and actionable postal instructions. Keep it highly human-like, narrative, and engaging.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.3, // Slightly higher for friendly human-like narration while preserving factuality
        topP: 0.9,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.MINIMAL
        }
      }
    });

    const answerText = response.text || "Unable to generate grounded response. Please refer to the cited official documents.";

    // Generate dynamic follow-up suggestions based on query
    let dynamicFollowUps = [
      'What are the packaging standards for fragile items?',
      'How to file Form GST RFD-11 LUT online?',
      'What is the difference between CN22 and CN23?'
    ];

    if (matchedTrackingId) {
      dynamicFollowUps = [
        'How do I claim Duty Drawback / RoDTEP for this shipment?',
        'What does customs Out of Charge mean?',
        'How long does Speed Post take to reach destination city?'
      ];
    } else {
      const qLower = userQuery.toLowerCase();
      if (qLower.includes('usa') || qLower.includes('america') || qLower.includes('fda')) {
        dynamicFollowUps = [
          'How do I generate an FDA Prior Notice confirmation number?',
          'What are the Lacey Act rules for wooden crafts to USA?',
          'How does the USD $800 Section 321 de minimis work?'
        ];
      } else if (qLower.includes('battery') || qLower.includes('perfume') || qLower.includes('prohibit')) {
        dynamicFollowUps = [
          'Can I send batteries installed inside equipment?',
          'What documents are needed for Ayurvedic medicines?',
          'How to get a Non-Antiquity Certificate from ASI?'
        ];
      } else if (qLower.includes('pbe') || qLower.includes('customs') || qLower.includes('iec')) {
        dynamicFollowUps = [
          'When is an IEC code not required under FTP 2023?',
          'How does FPO issue Export Out of Charge (EOC)?',
          'Can I claim RoDTEP on postal e-commerce exports?'
        ];
      }
    }

    // Strip all double asterisks from the generated answer before returning
    const cleanAnswer = answerText.replace(/\*\*/g, '');

    const returnedActionLinks = foundShipment ? [
      { label: 'View Real-time Tracking Panel', action: 'open_tracker', icon: 'Search' },
      { label: 'Calculate Speed Post Tariff', action: 'open_calculator', icon: 'Calculator' }
    ] : [
      { label: 'Create Export Shipment (PBE)', action: 'open_wizard', icon: 'FileText' },
      { label: 'Calculate Postal Tariff', action: 'open_calculator', icon: 'Calculator' },
      { label: 'Locate Nearest DGNK Counter', action: 'open_locator', icon: 'MapPin' }
    ];

    return {
      answer: cleanAnswer,
      groundedSources: sourcesList,
      isAiGrounded: true,
      query: userQuery,
      timestamp: new Date().toISOString(),
      suggestedFollowUps: dynamicFollowUps,
      actionLinks: returnedActionLinks
    };
  } catch (error: any) {
    console.error("Gemini API generation error:", error);
    const top = retrievedContexts[0]?.chunk;
    return {
      answer: `Official Grounded Response (Dak Ghar Niryat Kendra)\n\nAccording to ${top?.sourceDoc} (Ref: ${top?.circularRef || 'SOP Guideline'}):\n\n${top?.content}\n\nOfficial Source: ${top?.authority}`,
      groundedSources: sourcesList,
      isAiGrounded: false,
      query: userQuery,
      timestamp: new Date().toISOString(),
      suggestedFollowUps: [
        'What are the packaging standards for fragile items?',
        'How to file Form GST RFD-11 LUT online?'
      ]
    };
  }
}
