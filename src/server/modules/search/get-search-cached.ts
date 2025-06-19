import MiniSearch from "minisearch";
import type { TPost } from "~/lib/types/content.types";
import { searchConfigOptions } from "./config";
import indexJson from "./generated/minisearch-index.json" assert { type: "json" };

declare global {
  // eslint-disable-next-line no-var
  var __SEARCH:
    | {
        readonly miniSearch: MiniSearch<TPost>;
      }
    | undefined;
}

const loadSearchIndex = (): typeof global.__SEARCH => {
  const miniSearch = MiniSearch.loadJS<TPost>(indexJson, searchConfigOptions);

  return {
    miniSearch,
  };
};
// Slow cold start but fast after that
export const getSearchCached = (): {
  readonly miniSearch: MiniSearch<TPost>;
} => {
  // Initialize if not already loaded
  if (!global.__SEARCH) {
    global.__SEARCH = loadSearchIndex();
  }

  // Safe to assert non-null since we just initialized if needed
  return global.__SEARCH!;
};
