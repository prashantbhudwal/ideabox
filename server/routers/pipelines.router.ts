import { baseProcedure, createTRPCRouter } from "../trpc/init";
import {
  runPostChunkEmbeddingPipeline,
  runPostEmbeddingPipeline,
} from "../modules/vector/pipelines";

export const pipelinesRouter = createTRPCRouter({
  postEmbeddingPipeline: baseProcedure.mutation(async () => {
    await runPostEmbeddingPipeline();
  }),
  postChunksEmbeddingPipeline: baseProcedure.mutation(async () => {
    await runPostChunkEmbeddingPipeline();
  }),
});
