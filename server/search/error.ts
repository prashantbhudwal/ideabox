export type SearchError = {
  readonly code:
    | "SEARCH_NOT_INITIALIZED"
    | "SEARCH_IMPORT_FAILED"
    | "INVALID_QUERY"
    | "MISSING_ASSETS";
  readonly message: string;
  readonly details?: unknown;
};

export class SearchServiceError extends Error {
  constructor(readonly error: SearchError) {
    super(error.message);
    this.name = "SearchServiceError";
  }
}
