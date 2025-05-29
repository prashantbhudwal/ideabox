import { TPost } from "@/lib/types/post.types";
import { TPostChunk } from "./chunk";

import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import { getRagConfig, TRagConfigVersion } from "./rag-defaults";

export const embedPost = async function ({
  chunks,
  config,
}: {
  chunks: TPostChunk[];
  config: TRagConfigVersion;
}) {
  const ragConfig = getRagConfig(config);

  const { embeddings } = await embedMany({
    model: openai.embedding(ragConfig.embeddingModel, {
      dimensions: ragConfig.embeddingDimension,
    }),
    values: chunks.map((chunk) => chunk.text),
  });

  return embeddings;
};
