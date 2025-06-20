#!/usr/bin/env ts-node
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import fg from "fast-glob";
import MiniSearch from "minisearch";
import { type TPost } from "../../../common/types/content.types";
import { searchConfigOptions } from "~/server/modules/search/config";
import { getAllPosts } from "~/server/modules/post/get-all-posts";
import { serverPaths } from "~/server/utils/server-paths";
import esMain from "es-main";

// Constants
const INDEX_DIR = serverPaths.dir.searchGenerated;

const saveIndex = async (index: MiniSearch<TPost>) => {
  try {
    const indexJson = index.toJSON();
    const serialized = JSON.stringify(indexJson);

    await fs.mkdir(INDEX_DIR, { recursive: true });

    const targetFile = path.join(INDEX_DIR, "minisearch-index.json");
    await fs.writeFile(targetFile, serialized);

    console.log(`✅ MiniSearch index saved to ${targetFile}
      • Size: ${(serialized.length / 1024).toFixed(1)} KB`);

    return index;
  } catch (error) {
    console.error("Error saving index:", error);
    throw error;
  }
};

async function buildIndex(): Promise<MiniSearch<TPost>> {
  console.log("🔍 Building MiniSearch index...");

  const posts = await getAllPosts();

  const miniSearch = new MiniSearch(searchConfigOptions);

  try {
    miniSearch.addAll(posts);
    console.log(`✅ Successfully added ${posts.length} documents to index`);
  } catch (err: unknown) {
    console.error("Error adding documents to index:", err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to build index: ${errorMessage}`);
  }

  const index = await saveIndex(miniSearch);

  return index;
}

if (esMain(import.meta)) {
  buildIndex()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error("Build failed:", err);
      process.exit(1);
    });
}
