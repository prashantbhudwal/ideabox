import { createTRPCRouter } from "./init";
import { postRouter } from "../../routers/post.router";
import { pipelinesRouter } from "../../routers/pipelines.router";
import { searchRouter } from "../../routers/search.router";

export const appRouter = createTRPCRouter({
  post: postRouter,
  pipeline: pipelinesRouter,
  search: searchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
