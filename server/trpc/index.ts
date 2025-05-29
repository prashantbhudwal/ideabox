import "server-only";

import { createTRPCContext } from "./init";
import { appRouter } from "./routers/_app";

export const trpc = appRouter.createCaller(createTRPCContext);
