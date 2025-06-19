import { baseProcedure, createTRPCRouter } from "../trpc/archive/init";
import { getSearch } from "../modules/search/mini-search";
import { to } from "await-to-js";
import { TRPCError } from "@trpc/server";
import { readdirSync, readFileSync } from "fs";
import { serverPaths } from "../utils/server-paths";
import path from "path";
import { searchConfigOptions } from "../modules/search/config";
import MiniSearch from "minisearch";
import { TPost } from "~/lib/types/content.types";

export const searchRouter = createTRPCRouter({
  getMiniSearchIndex: baseProcedure.query(async () => {
    try {
      const PUBLIC_DIR = serverPaths.dir.public;
      console.log("🟠 PUBLIC_DIR", PUBLIC_DIR);
      const indexFile = readdirSync(PUBLIC_DIR).find((f) =>
        f.startsWith("minisearch-index_"),
      );
      console.log("🟠 indexFile found");
      if (!indexFile) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Search index not found",
        });
      }

      const indexJson = JSON.parse(
        readFileSync(path.join(PUBLIC_DIR, indexFile!), "utf8"),
      );
      console.log("🟠 indexJson loaded");
      if (!indexJson) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load search index",
        });
      }

      const miniSearch = MiniSearch.loadJS<TPost>(
        indexJson,
        searchConfigOptions,
      );
      console.log("🟠 miniSearch generated");

      if (!miniSearch) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to load search index",
        });
      }
      const json = miniSearch.toJSON();
      console.log("🟠 json generated");
      return json;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get search index",
        cause: err,
      });
    }
  }),
});
