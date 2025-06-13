import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { getSearch } from "../search/mini-search";

export interface SearchResult {
  slug: string;
  title: string;
  score: number;
}

export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(async () => {
    const search = getSearch();
    return search.miniSearch.toJSON();
  }),
});
