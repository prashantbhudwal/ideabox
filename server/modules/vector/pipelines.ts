import { openai } from "@ai-sdk/openai";
import { getAllPosts } from "../post/get-all-posts";
import { addPostToCollection } from "./add-post-to-collection";
import { PostEmbedder } from "./PostEmbedder";

export const runPostChunkEmbeddingPipeline = async function () {
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

export const runPostEmbeddingPipeline = async () => {
  const posts = await getAllPosts();

  const postEmbedder = new PostEmbedder({
    posts,
    embeddingConfigVersion: "v1",
  });
  const { embeddings: postEmbeddings } = await postEmbedder.embedPosts();

  await addPostToCollection({
    collectionName: "posts",
    vectors: postEmbeddings,
    posts,
    embeddingConfigVersion: "v1",
  });
};
