import { SimilarityMetric } from "../rag.config";
import { TIndexConfig } from "./migrate";
/**
 * # Creating Collections
 * 1. Export new collections as a const in this file
 * 2. Add it to COLLECTIONS array
 * 3. Run `pnpm vector:migrate` to create the collection
 *
 * Note:
 * - The collections already exist will not be created again
 * - If you delete a const from this file, the collection will not be deleted
 * - If you change a const from this file, the collection will not be updated
 */

export const DOCUMENT_COLLECTION = {
  indexName: "documents",
  dimension: 1536,
  metric: SimilarityMetric.COSINE,
  description:
    "Stores whole documents like posts, pages, etc. Use for RAG and recommendations.",
} as const;

export const DOCUMENT_CHUNK_COLLECTION = {
  indexName: "documentChunks",
  dimension: 1536,
  metric: SimilarityMetric.COSINE,
  description: "Stores chunks of documents. Used for RAG.",
} as const;

export const COLLECTIONS = [
  DOCUMENT_COLLECTION,
  DOCUMENT_CHUNK_COLLECTION,
] as const;

export type TCollectionName = (typeof COLLECTIONS)[number]["indexName"];
