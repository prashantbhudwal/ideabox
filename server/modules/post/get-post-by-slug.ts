import { serverPaths } from "@/server/utils/paths";
import { cache } from "react";
import { readFileSync, readdirSync } from "node:fs";
import matter from "gray-matter";
import { TPost, ZPostFrontmatter } from "@/lib/types/post.types";

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
