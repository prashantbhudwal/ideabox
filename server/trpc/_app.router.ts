import { createTRPCRouter } from "./init";
import { postRouter } from "../routers/post.router";
import { pipelinesRouter } from "../routers/pipelines.router";
export const appRouter = createTRPCRouter({
  post: postRouter,
  pipeline: pipelinesRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
