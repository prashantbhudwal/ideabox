"use server";
import { cache } from "react";
import { readFileSync, readdirSync } from "node:fs";
import matter from "gray-matter";
import { TPost, ZPostFrontmatter } from "@/lib/types/post.types";
import { serverPaths } from "@/server/common/paths";

export const getPostSlugs = cache(async (): Promise<string[]> => {
  const entries = readdirSync(serverPaths.dir.posts, {
    withFileTypes: true,
  });
  return entries
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
});

export const getPostBySlug = cache(async (slug: string): Promise<TPost> => {
  const fullPath = serverPaths.file.postMdx(slug);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);

  // Ensure date fields are strings before validation
  const processedMetadata = {
    ...metadata,
    createdAt:
      metadata.createdAt instanceof Date
        ? metadata.createdAt.toISOString()
        : metadata.createdAt,
    updatedAt:
      metadata.updatedAt instanceof Date
        ? metadata.updatedAt.toISOString()
        : metadata.updatedAt,
  };

  const validatedMetadata = ZPostFrontmatter.parse(processedMetadata);

  return {
    type: "post",
    ...validatedMetadata,
    content,
  };
});

export const getAllPosts = cache(async (): Promise<TPost[]> => {
  const slugs = await getPostSlugs();
  return Promise.all(slugs.map((slug) => getPostBySlug(slug)));
});
