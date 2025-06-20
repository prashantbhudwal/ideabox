import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { TRPCRouter } from "~/server/routers/_router";

export const { TRPCProvider, useTRPC } = createTRPCContext<TRPCRouter>();
