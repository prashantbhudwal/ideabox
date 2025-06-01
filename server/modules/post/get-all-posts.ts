import { cache } from "react";
import { getPostSlugs } from "./get-post-slugs";
import { TPost } from "@/lib/types/content.types";
import { getPostBySlug } from "./get-post-by-slug";

export const getAllPosts = cache(async (): Promise<TPost[]> => {
  const slugs = await getPostSlugs();
  return Promise.all(slugs.map((slug) => getPostBySlug(slug)));
});
