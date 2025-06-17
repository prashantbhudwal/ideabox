import { TRPCError } from "@trpc/server";

type ErrorWithMessage = {
  message: string;
};

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
};

const toErrorWithMessage = (maybeError: unknown): ErrorWithMessage => {
  if (isErrorWithMessage(maybeError)) return maybeError;

  try {
    return new Error(
      typeof maybeError === "string" ? maybeError : JSON.stringify(maybeError),
    );
  } catch {
    return new Error(String(maybeError));
  }
};

export const getErrorMessage = (error: unknown): string => {
  return toErrorWithMessage(error).message;
};

/**
 * Creates a standardized TRPCError from any error type
 * Only converts non-TRPCError instances to TRPCErrors
 */
export const createTRPCErrorFromUnknown = (
  error: unknown,
  defaultMessage = "An unexpected error occurred"
): TRPCError => {
  // If it's already a TRPCError, return it as is
  if (error instanceof TRPCError) {
    return error;
  }

  // Otherwise, create a new TRPCError with the error message
  const errorMessage = getErrorMessage(error);
  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: errorMessage || defaultMessage,
    cause: error,
  });
};
