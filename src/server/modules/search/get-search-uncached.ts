import indexJson from "./generated/minisearch-index.json" assert { type: "json" };
import { searchConfigOptions } from "./config";
import MiniSearch from "minisearch";
import { type TPost } from "~/common/types/content.types";

// Fast cold start but is imported-serialized on every request
export const getSearchUncached = (): {
  readonly miniSearch: MiniSearch<TPost>;
} => {
  return {
    miniSearch: MiniSearch.loadJS<TPost>(indexJson, searchConfigOptions),
  };
};
