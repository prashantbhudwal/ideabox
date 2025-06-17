import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
import { createTRPCErrorFromUnknown } from "~/server/utils/error";

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});

/**
 * Error handling middleware that catches any errors thrown in procedures
 * and converts them to TRPCErrors with appropriate error messages.
 */
const errorHandlerMiddleware = t.middleware(async ({ path, type, next }) => {
  try {
    return await next();
  } catch (error) {
    // Convert any error to a TRPCError with a standardized format
    const trpcError = createTRPCErrorFromUnknown(
      error,
      `Error in ${type} '${path}'`,
    );
    throw trpcError;
  }
});

// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;

// Apply the error handling middleware to all procedures by default
export const baseProcedure = t.procedure.use(errorHandlerMiddleware);
