import { baseProcedure, createTRPCRouter } from "../trpc/archive/init";
import { getSearch } from "../modules/search/mini-search";
import { to } from "await-to-js";
import { TRPCError } from "@trpc/server";

export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(async () => {
    const [err, search] = await to(getSearch());
    if (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get search index",
      });
    }
    console.log("search", search);
    try {
      return search.miniSearch.toJSON();
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to serialize search index",
        cause: err,
      });
    }
  }),
});
