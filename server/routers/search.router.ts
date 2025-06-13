import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { getSearch } from "../search/mini-search";


export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(async () => {
    const search = getSearch();
    return search.miniSearch.toJSON();
  }),
});
