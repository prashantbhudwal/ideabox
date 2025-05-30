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

export const DOCUMENT_COLLECTION: TIndexConfig = {
  indexName: "documents",
  dimension: 1536,
  metric: "cosine",
  description:
    "Stores whole documents like posts, pages, etc. Use for RAG and recommendations.",
};

export const DOCUMENT_CHUNK_COLLECTION: TIndexConfig = {
  indexName: "documentChunks",
  dimension: 1536,
  metric: "cosine",
  description: "Stores chunks of documents. Used for RAG.",
};

export const COLLECTIONS: TIndexConfig[] = [
  DOCUMENT_COLLECTION,
  DOCUMENT_CHUNK_COLLECTION,
];
