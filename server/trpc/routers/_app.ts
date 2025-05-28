import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { runEmbeddingPipeline } from "@/server/vector/embedding-pipeline";
export const appRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
  runPipeline: baseProcedure.mutation(async () => {
    const data = await runEmbeddingPipeline();
    return data;
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
