import { QdrantVector } from "@mastra/qdrant";

export const store = new QdrantVector({
  url: process.env.QDRANT_URL!!,
  apiKey: process.env.QDRANT_API_KEY,
});
