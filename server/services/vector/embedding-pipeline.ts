"use server";
import { TPost } from "@/lib/types/post.types";
import { service } from "..";
import { getPostChunks } from "./chunk";
import { enrichChunkWithContext } from "./chunk-context";
import { embedPost } from "./embed";

export const runEmbeddingPipeline = async function () {
  const post = await service.post.getBySlug("poonch-one");
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
