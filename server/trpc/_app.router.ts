import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "./init";
import { postRouter } from "../routers/post.router";
import { runEmbeddingPipeline } from "../modules/post/vector";
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
  post: postRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
