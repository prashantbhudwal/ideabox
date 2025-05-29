import "server-only";

import { createTRPCContext } from "./init";
import { appRouter } from "./_app.router";

export const trpc = appRouter.createCaller(createTRPCContext);
