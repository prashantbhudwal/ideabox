import { createServerFn } from "@tanstack/react-start";
import { embedMany } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import similarity from "compute-cosine-similarity";

// Optional: input validation with Zod
import { z } from "zod";
export const InputSchema = z.object({
  text1: z.string().min(1, "First text is required"),
  text2: z.string().min(1, "Second text is required"),
  apiKey: z.string().min(1, "API key is required"),
});
export const embedAndCompareProd = createServerFn({
  method: "POST",
  response: "data",
})
  .validator((input) => InputSchema.parse(input))
  .handler(async ({ data: { text1, text2, apiKey } }) => {
    const embeddingModel = createOpenAI({
      apiKey,
      fetch: async (url, options) => {
        const res = await fetch(url, options);
        if (res.status === 401) throw new Error("Invalid API key");
        if (!res.ok) {
          const err = (await res.json()) as { error?: { message: string } };
          throw new Error(err.error?.message ?? "Embedding failed");
        }
        return res;
      },
    }).embedding("text-embedding-3-small");

    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: [text1, text2],
    });

    if (!embeddings || embeddings.length !== 2) {
      throw new Error("Failed to generate embeddings");
    }

    return similarity(embeddings[0], embeddings[1]);
  });
