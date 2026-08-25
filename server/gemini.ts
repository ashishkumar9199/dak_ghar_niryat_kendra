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
}

export async function generateGroundedAnswer(
  userQuery: string,
  userProfile?: {
    businessType?: string;
    productCategory?: string;
    destinationCountry?: string;
    hasIEC?: boolean;
    hasGST?: boolean;
  }
): Promise<AssistantAnswerResponse> {
  // Step 1: Retrieve relevant official document chunks via RAG engine
  const retrievedContexts = retrieveRelevantChunks(userQuery, 3);
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

    const fallbackAnswer = `### Grounded Regulatory Summary from Official DGNK / Customs Records

Based on official India Post & Customs guidelines (**${topChunk?.sourceDoc || 'DGNK SOP'}**, Circular Ref: *${topChunk?.circularRef || 'DoP Circular'}*):

${topChunk?.content || 'Please consult your local Dak Ghar Niryat Kendra officer.'}

${secondChunk ? `\n\n**Additional Requirement (${secondChunk.sourceDoc}):**\n${secondChunk.content}` : ''}

---
*Note: This information is strictly grounded in verified India Post, CBIC, and DGFT records.*`;

    return {
      answer: fallbackAnswer,
      groundedSources: sourcesList,
      isAiGrounded: true,
      query: userQuery,
      timestamp: new Date().toISOString()
    };
  }

  // System instruction enforcing strict domain grounding and official citations
  const systemInstruction = `You are the official AI Export Assistant for Dak Ghar Niryat Kendra (DGNK), an initiative of India Post (Ministry of Communications, Government of India).
Your primary mandate is to help small businesses, artisans, MSMEs, and first-time Indian exporters navigate international postal exports with absolute accuracy.

CRITICAL GROUNDING RULES:
1. Ground your answers primarily in the official knowledge chunks provided below (India Post SOP, CBIC Circular 14/2018, DGFT Foreign Trade Policy 2023, UPU regulations, and country-specific customs guidelines).
2. Explicitly cite the source document name, circular reference, or issuing authority (e.g. "As per CBIC Circular 14/2018...", "According to DGFT FTP 2023 Para 2.07...", "Under UPU S10 packaging norms...").
3. Structure your answers with clean Markdown headings, bullet points, and actionable step-by-step guidance tailored for first-time exporters.
4. If a question touches on prohibited/restricted items (like batteries, ivory, antiquities, ayurveda, sandalwood), clearly state the restriction and required NOCs.
5. If the user asks something outside the verified knowledge base or requiring legal adjudication, clearly state: "Please verify this specific requirement with your local Foreign Post Office (FPO) or DGFT regional authority."
6. Do NOT hallucinate unsupported policies or imaginary duty rates. Always maintain an encouraging, professional, and helpful tone for Indian artisans and MSMEs.`;

  const userPrompt = `
User Query: "${userQuery}"

${userProfile ? `Exporter Profile Context:
- Business Category: ${userProfile.businessType || 'MSME / Artisan'}
- Product Focus: ${userProfile.productCategory || 'General Merchandise'}
- Destination Country: ${userProfile.destinationCountry || 'International'}
- IEC Status: ${userProfile.hasIEC ? 'Valid IEC Available' : 'No IEC / Personal Exemption'}
- GSTIN: ${userProfile.hasGST ? 'GST Registered' : 'Unregistered / Below Threshold'}` : ''}

VERIFIED OFFICIAL DGNK / CUSTOMS / DGFT KNOWLEDGE CONTEXT (RETRIEVED VIA RAG):
${formattedContext}

Please generate a well-structured, authoritative, and helpful answer grounded in the verified official context above. Highlight necessary documents (PBE-I/PBE-II, CN22/CN23, Commercial Invoice, LUT, AD Code) where relevant.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high factual precision
        topP: 0.9,
      }
    });

    const answerText = response.text || "Unable to generate grounded response. Please refer to the cited official documents.";

    return {
      answer: answerText,
      groundedSources: sourcesList,
      isAiGrounded: true,
      query: userQuery,
      timestamp: new Date().toISOString()
    };
  } catch (error: any) {
    console.error("Gemini API generation error:", error);
    // Return grounded fallback using top chunks
    const top = retrievedContexts[0]?.chunk;
    return {
      answer: `### Grounded Regulatory Information\n\nAccording to **${top?.sourceDoc}** (*${top?.circularRef}*):\n\n${top?.content}\n\n*Source: ${top?.authority}*`,
      groundedSources: sourcesList,
      isAiGrounded: false,
      query: userQuery,
      timestamp: new Date().toISOString()
    };
  }
}
