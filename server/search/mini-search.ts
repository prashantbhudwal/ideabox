import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import MiniSearch from "minisearch";
import type { TPost } from "@/lib/types/content.types";
import { SearchServiceError } from "./error";
import { searchConfig } from "./config";

declare global {
  // eslint-disable-next-line no-var
  var __SEARCH:
    | {
        readonly miniSearch: MiniSearch<TPost>;
        readonly hash: string;
      }
    | undefined;
}

const validateAsset = (indexFile: string | undefined): void => {
  if (!indexFile) {
    throw new SearchServiceError({
      code: "MISSING_ASSETS",
      message: "MiniSearch index not found in public/",
    });
  }
};

const loadSearchIndex = (): typeof global.__SEARCH => {
  const publicDir = path.join(process.cwd(), "public");
  const indexFile = readdirSync(publicDir).find((f) =>
    f.startsWith("minisearch-index_"),
  );

  validateAsset(indexFile);

  try {
    const indexJson = JSON.parse(
      readFileSync(path.join(publicDir, indexFile!), "utf8"),
    );

    const miniSearch = MiniSearch.loadJS<TPost>(indexJson, searchConfig);

    const hash = indexFile!.match(/minisearch-index_([a-f0-9]+)\.json/)![1];

    return { miniSearch, hash };
  } catch (err) {
    throw new SearchServiceError({
      code: "SEARCH_IMPORT_FAILED",
      message: "Failed to load or parse MiniSearch index",
      details: err instanceof Error ? err.message : String(err),
    });
  }
};

export const getSearch = (): {
  miniSearch: MiniSearch<TPost>;
  hash: string;
} => {
  // Initialize if not already loaded
  if (!global.__SEARCH) {
    global.__SEARCH = loadSearchIndex();
  }

  // Safe to assert non-null since we just initialized if needed
  return global.__SEARCH!;
};
