import { baseProcedure, createTRPCRouter } from "../trpc/archive/init";
import { getSearch } from "../modules/search/mini-search";
import { to } from "await-to-js";
import { TRPCError } from "@trpc/server";
import MiniSearch from "minisearch";
import { TPost } from "~/lib/types/content.types";
import indexJson from "../modules/search/generated/minisearch-index.json" assert { type: "json" };
import { searchConfigOptions } from "../modules/search/config";

const miniSearch = MiniSearch.loadJS<TPost>(
  indexJson as any,
  searchConfigOptions,
);

export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(() => miniSearch.toJSON()),
});
