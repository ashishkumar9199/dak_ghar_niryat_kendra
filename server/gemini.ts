import { GoogleGenAI } from "@google/genai";
import { buildPromptContext, retrieveRelevantChunks, RetrievedContext } from "./ragEngine.js";

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
  // Step 1: Retrieve relevant official document chunks via RAG engine
  // Include words from the latest query + previous user message if available for richer multi-turn context
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
CURRENT USER QUERY: "${userQuery}"

${userProfile ? `EXPORTER PROFILE CONTEXT:
- Business Category: ${userProfile.businessType || 'MSME / Artisan'}
- Product Category: ${userProfile.productCategory || 'Handicrafts / General Goods'}
- Destination Country: ${userProfile.destinationCountry || 'International'}
- IEC Code Status: ${userProfile.hasIEC ? 'Valid IEC Available' : 'No IEC / Personal Gift Exemption'}
- GST Status: ${userProfile.hasGST ? 'GST Registered' : 'Unregistered / Exemption Category'}` : ''}

VERIFIED OFFICIAL DGNK / CUSTOMS / DGFT KNOWLEDGE BASE (RETRIEVED VIA RAG):
${formattedContext}

Please generate an authoritative, structured, and helpful response grounded in the verified official context above. Highlight required documents, circular numbers, and actionable postal instructions.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2, // High factual grounding
        topP: 0.9,
      }
    });

    const answerText = response.text || "Unable to generate grounded response. Please refer to the cited official documents.";

    // Generate dynamic follow-up suggestions based on query
    let dynamicFollowUps = [
      'What are the packaging standards for fragile items?',
      'How to file Form GST RFD-11 LUT online?',
      'What is the difference between CN22 and CN23?'
    ];

    const qLower = userQuery.toLowerCase();
    if (qLower.includes('usa') || qLower.includes('america') || qLower.includes('fda')) {
      dynamicFollowUps = [
        'How do I generate an FDA Prior Notice confirmation number?',
        'What are the Lacey Act rules for wooden crafts to USA?',
        'How does the USD $800 Section 321 threshold work?'
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

    // Strip all double asterisks from the generated answer before returning
    const cleanAnswer = answerText.replace(/\*\*/g, '');

    return {
      answer: cleanAnswer,
      groundedSources: sourcesList,
      isAiGrounded: true,
      query: userQuery,
      timestamp: new Date().toISOString(),
      suggestedFollowUps: dynamicFollowUps,
      actionLinks: [
        { label: 'Create Export Shipment (PBE)', action: 'open_wizard', icon: 'FileText' },
        { label: 'Calculate Postal Tariff', action: 'open_calculator', icon: 'Calculator' },
        { label: 'Locate Nearest DGNK Counter', action: 'open_locator', icon: 'MapPin' }
      ]
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
