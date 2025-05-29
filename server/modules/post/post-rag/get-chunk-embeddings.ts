import { TRagConfigVersion } from "@/server/config/rag-defaults";
import { TPostChunk } from "./types";
import { embedMany } from "ai";
import { getRagConfig } from "@/server/config/rag-defaults";
import { openai } from "@ai-sdk/openai";

export const getChunkEmbeddings = async function ({
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
