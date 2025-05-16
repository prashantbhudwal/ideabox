"use server";
import { embedMany } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import similarity from "compute-cosine-similarity";

class APIKeyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIKeyError";
  }
}

export async function embedAndCompareProd(
  text1: string,
  text2: string,
  apiKey: string,
) {
  try {
    const embeddingModel = createOpenAI({
      apiKey,
      fetch: async (url, options) => {
        const response = await fetch(url, options);
        if (response.status === 401) {
          throw new APIKeyError(
            "Invalid API key. Please check your OpenAI API key and try again.",
          );
        }
        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.error?.message || "Failed to generate embeddings",
          );
        }
        return response;
      },
    }).embedding("text-embedding-3-small");

    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: [text1, text2],
    });

    if (!embeddings || embeddings.length !== 2) {
      throw new Error("Failed to generate embeddings");
    }

    const [vec1, vec2] = embeddings;

    const sim = similarity(vec1, vec2);

    return sim;
  } catch (error: any) {
    if (error instanceof APIKeyError) {
      throw error;
    }
    throw new Error(error.message || "An error occurred while comparing texts");
  }
}
