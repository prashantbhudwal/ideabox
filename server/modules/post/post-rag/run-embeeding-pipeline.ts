import { getPostBySlug } from "../get-post-by-slug";
import { getPostChunks } from "./get-post-chunks";

export const runEmbeddingPipeline = async function () {
  const post = await getPostBySlug("poonch-one");
  const chunks = await getPostChunks({
    post,
    config: "v1",
  });

  // const enrichedChunk = await enrichChunkWithContext({
  //   chunk: firstChunk,
  //   post,
  // });

  // const embeddings = await embedPost({
  //   chunks: [enrichedChunk],
  //   config: "v1",
  // });

  // const enrichedChunks = await Promise.all(
  //   chunks.map((chunk) => {
  //     return generateChunkContext({
  //       chunk,
  //       post,
  //     });
  //   }),
  // );

  return chunks;
};
