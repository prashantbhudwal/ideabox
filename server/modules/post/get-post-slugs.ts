"use server";
import { cache } from "react";
import { readdirSync } from "node:fs";
import { serverPaths } from "@/server/common/paths";

export const getPostSlugs = cache(async (): Promise<string[]> => {
  const entries = readdirSync(serverPaths.dir.posts, {
    withFileTypes: true,
  });
  return entries
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
});
