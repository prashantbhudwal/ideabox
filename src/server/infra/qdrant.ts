import { isDev } from "~/client/lib/utils";
import { QdrantVector } from "@mastra/qdrant";

import dotenv from "dotenv";
dotenv.config();

const QDRANT_URL = process.env.QDRANT_URL;
const QDRANT_API_KEY = process.env.QDRANT_API_KEY;

if (!QDRANT_URL || !QDRANT_API_KEY) {
  throw new Error("QDRANT_URL or QDRANT_API_KEY not set");
}

export const store = new QdrantVector({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
  https: isDev ? false : true,
});
