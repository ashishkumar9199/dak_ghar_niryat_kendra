import { DGNK_KNOWLEDGE_BASE, KnowledgeChunk } from './knowledgeBase.js';

export interface RetrievedContext {
  chunk: KnowledgeChunk;
  score: number;
  matchedKeywords: string[];
}

export interface RAGInspectionResult {
  query: string;
  processedTokens: string[];
  totalKnowledgeChunks: number;
  retrievedChunks: {
    id: string;
    title: string;
    category: string;
    authority: string;
    circularRef: string;
    similarityScore: number;
    matchedKeywords: string[];
    excerpt: string;
  }[];
  generatedContextSize: number;
  timestamp: string;
}

// Basic TF-IDF style token normalizer and vector builder for fast in-memory semantic retrieval
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 2 && !STOP_WORDS.has(token));
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'what', 'which',
  'how', 'can', 'are', 'you', 'your', 'about', 'need', 'does', 'item', 'send',
  'like', 'want', 'please', 'tell', 'give', 'know', 'some', 'any', 'into', 'over'
]);

// Compute inverted index and term frequencies
interface DocumentVector {
  chunk: KnowledgeChunk;
  termFrequencies: Map<string, number>;
  magnitude: number;
}

const documentVectors: DocumentVector[] = DGNK_KNOWLEDGE_BASE.map(chunk => {
  const combinedText = `${chunk.title} ${chunk.title} ${chunk.keywords.join(' ')} ${chunk.keywords.join(' ')} ${chunk.content} ${chunk.sourceDoc} ${chunk.authority}`;
  const tokens = tokenize(combinedText);
  const tf = new Map<string, number>();

  for (const token of tokens) {
    tf.set(token, (tf.get(token) || 0) + 1);
  }

  // Calculate vector magnitude
  let sumSquares = 0;
  for (const count of tf.values()) {
    sumSquares += count * count;
  }
  const magnitude = Math.sqrt(sumSquares) || 1;

  return {
    chunk,
    termFrequencies: tf,
    magnitude
  };
});

/**
 * Retrieve the top K relevant chunks using cosine similarity + keyword boost
 */
export function retrieveRelevantChunks(query: string, topK: number = 3): RetrievedContext[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) {
    // Return top general DGNK chunks as default
    return documentVectors.slice(0, topK).map(dv => ({
      chunk: dv.chunk,
      score: 0.75,
      matchedKeywords: ['general']
    }));
  }

  const queryTf = new Map<string, number>();
  for (const token of queryTokens) {
    queryTf.set(token, (queryTf.get(token) || 0) + 1);
  }

  let queryMagSq = 0;
  for (const count of queryTf.values()) {
    queryMagSq += count * count;
  }
  const queryMagnitude = Math.sqrt(queryMagSq) || 1;

  const results: RetrievedContext[] = [];

  for (const doc of documentVectors) {
    let dotProduct = 0;
    const matchedTokens: string[] = [];

    for (const [token, qCount] of queryTf.entries()) {
      if (doc.termFrequencies.has(token)) {
        const dCount = doc.termFrequencies.get(token)!;
        dotProduct += qCount * dCount;
        matchedTokens.push(token);
      }
    }

    let cosineSim = dotProduct / (queryMagnitude * doc.magnitude);

    // Boost score if explicit keywords or title words match
    for (const kw of doc.chunk.keywords) {
      if (query.toLowerCase().includes(kw.toLowerCase())) {
        cosineSim += 0.15;
        if (!matchedTokens.includes(kw)) matchedTokens.push(kw);
      }
    }

    // Boost if title matches
    const titleTokens = tokenize(doc.chunk.title);
    for (const qt of queryTokens) {
      if (titleTokens.includes(qt)) {
        cosineSim += 0.1;
      }
    }

    // Normalize between 0 and 1
    const finalScore = Math.min(Math.max(cosineSim, 0), 0.99);

    if (finalScore > 0.05 || matchedTokens.length > 0) {
      results.push({
        chunk: doc.chunk,
        score: parseFloat(finalScore.toFixed(3)),
        matchedKeywords: Array.from(new Set(matchedTokens))
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  if (results.length === 0) {
    // Fallback to top 2 general guidance
    return documentVectors.slice(0, topK).map(dv => ({
      chunk: dv.chunk,
      score: 0.5,
      matchedKeywords: ['dgnk', 'general']
    }));
  }

  return results.slice(0, topK);
}

/**
 * Format the retrieved chunks into a structured prompt context for Gemini
 */
export function buildPromptContext(retrieved: RetrievedContext[]): string {
  return retrieved.map((r, index) => `
[OFFICIAL SOURCE #${index + 1}]
Document: ${r.chunk.sourceDoc}
Circular / Ref: ${r.chunk.circularRef}
Issuing Authority: ${r.chunk.authority}
Topic: ${r.chunk.title}
Relevance Match Score: ${(r.score * 100).toFixed(1)}%
Official Content Excerpt:
${r.chunk.content}
--------------------------------------------------`).join('\n');
}

/**
 * Inspect the RAG retrieval pipeline for transparency / grading demo
 */
export function inspectRAGPipeline(query: string): RAGInspectionResult {
  const tokens = tokenize(query);
  const retrieved = retrieveRelevantChunks(query, 4);
  const contextStr = buildPromptContext(retrieved);

  return {
    query,
    processedTokens: tokens,
    totalKnowledgeChunks: DGNK_KNOWLEDGE_BASE.length,
    retrievedChunks: retrieved.map(r => ({
      id: r.chunk.id,
      title: r.chunk.title,
      category: r.chunk.category,
      authority: r.chunk.authority,
      circularRef: r.chunk.circularRef,
      similarityScore: r.score,
      matchedKeywords: r.matchedKeywords,
      excerpt: r.chunk.content.substring(0, 220) + '...'
    })),
    generatedContextSize: contextStr.length,
    timestamp: new Date().toISOString()
  };
}
