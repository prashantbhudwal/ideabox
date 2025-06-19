import { baseProcedure, createTRPCRouter } from "../trpc/archive/init";
import { getSearchUncached } from "../modules/search/get-search-uncached";

export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(() => {
    const { miniSearch } = getSearchUncached();
    return miniSearch.toJSON();
  }),
});
