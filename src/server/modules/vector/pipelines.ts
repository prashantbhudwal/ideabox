import { openai } from "@ai-sdk/openai";
import { getAllPosts } from "../post/get-all-posts";
import { PostEmbedder } from "./PostEmbedder";

import { select, confirm } from "@inquirer/prompts";
import { ContentIndexer } from "./ContentIndexer";
import esMain from "es-main";

export const runPostChunkEmbeddingPipeline = async function () {
  throw new Error("Not implemented yet");

  const posts = await getAllPosts();

  const postEmbedder = new PostEmbedder({
    posts,
    embeddingConfigVersion: "v1",
  });

  const model = openai("gpt-4.1-nano");

  await postEmbedder.chunkPosts("v1");
  await postEmbedder.contextualizeChunks(model);
  await postEmbedder.embedChunks();

  const chunks = postEmbedder.chunks;

  return chunks;
};

// TODO Make this idempotent
export const runPostEmbeddingPipeline = async () => {
  throw new Error("Comment this error in the src out to run the pipeline");
  const posts = await getAllPosts();

  const BATCH_SIZE = 10;

  for (let i = 0; i < posts.length; i += BATCH_SIZE) {
    const batch = posts.slice(i, i + BATCH_SIZE);
    const postEmbedder = new PostEmbedder({
      posts: batch,
      embeddingConfigVersion: "v1",
    });
    const { embeddings: vectors } = await postEmbedder.embedPosts();

    const indexer = new ContentIndexer({
      collection: "documents",
      embeddingConfigVersion: "v1",
    });

    await indexer.indexWholePosts({
      posts: batch,
      vectors,
    });
  }
};

export const runPipeline = async () => {
  const pipeline = await select({
    message: "Select a pipeline",
    choices: [
      { name: "Post Chunk Embedding Pipeline", value: "post-chunk-embedding" },
      { name: "Post Embedding Pipeline", value: "post-embedding" },
    ],
  });

  const isSure = await confirm({
    message: `Are you sure you want to run ${pipeline} pipeline?`,
  });

  if (!isSure) {
    console.log("Pipeline cancelled");
    return;
  }

  console.log("Running pipeline...");

  switch (pipeline) {
    case "post-chunk-embedding":
      return await runPostChunkEmbeddingPipeline();
    case "post-embedding":
      return await runPostEmbeddingPipeline();
    default:
      throw new Error("Invalid pipeline");
  }
};

export const main = async () => {
  await runPipeline();
};

if (esMain(import.meta)) {
  main();
}
