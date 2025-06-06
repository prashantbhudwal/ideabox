import { createTRPCContext } from "@/server/trpc/init";
import { appRouter } from "@/server/trpc/_app.router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });
export { handler as GET, handler as POST };
