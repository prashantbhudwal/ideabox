#!/usr/bin/env ts-node
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import fg from "fast-glob";
import MiniSearch from "minisearch";
import { type TPost } from "../../../lib/types/content.types";
import { searchConfigOptions } from "@/server/modules/search/config";
import { getAllPosts } from "@/server/modules/post/get-all-posts";
import { serverPaths } from "@/server/utils/paths";

// Constants
const PUBLIC_DIR = serverPaths.dir.public;

const saveIndex = async (index: MiniSearch<TPost>) => {
  try {
    const indexJson = index.toJSON();
    const serialized = JSON.stringify(indexJson);
    const hash = crypto
      .createHash("sha256")
      .update(serialized)
      .digest("hex")
      .slice(0, 8);

    await fs.mkdir(PUBLIC_DIR, { recursive: true });

    const oldFiles = await fg([
      path.join(PUBLIC_DIR, "minisearch-index_*.json"),
    ]);
    await Promise.all(oldFiles.map((f) => fs.unlink(f)));

    await fs.writeFile(
      path.join(PUBLIC_DIR, `minisearch-index_${hash}.json`),
      serialized,
    );

    console.log(`✅ MiniSearch index saved successfully
  • Index saved to ${path.join(PUBLIC_DIR, `minisearch-index_${hash}.json`)}
  • Hash: ${hash}
  • Index size: ${(serialized.length / 1024).toFixed(1)} KB`);

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

if (require.main === module) {
  buildIndex()
    .then(() => {
      process.exit(0);
    })
    .catch((err) => {
      console.error("Build failed:", err);
      process.exit(1);
    });
}
