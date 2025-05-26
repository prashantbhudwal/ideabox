"use server";
import { TPost } from "@/lib/types/post.types";
import { server } from "../routers";
import { getPostChunks } from "./chunk";
import { enrichChunkWithContext } from "./chunk-context";
import { embedPost } from "./embed";

export const runEmbeddingPipeline = async function () {
  const post = await server.post.getBySlug("poonch-one");
  const chunks = await getPostChunks({
    post,
    config: "v1",
  });
  const firstChunk = chunks[0];

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

  return {};
};
