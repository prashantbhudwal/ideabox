import { getPostChunks } from "./get-post-chunks";

export type TPostChunk = Awaited<ReturnType<typeof getPostChunks>>[number];
