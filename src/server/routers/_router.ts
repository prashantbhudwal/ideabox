// import { TRPCError } from '@trpc/server'
import type { TRPCRouterRecord } from "@trpc/server";
// import { z } from 'zod'

import { createTRPCRouter } from "../trpc/init";
import { postRouter } from "~/server/routers/post.router";
import { pipelinesRouter } from "~/server/routers/pipelines.router";
import { searchRouter } from "~/server/routers/search.router";

export const trpcRouter = createTRPCRouter({
  post: postRouter,
  pipeline: pipelinesRouter,
  search: searchRouter,
});
export type TRPCRouter = typeof trpcRouter;
