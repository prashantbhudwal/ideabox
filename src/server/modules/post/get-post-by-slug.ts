import { cache } from "react";
import { ContentType, TPost } from "~/lib/types/content.types";
import { allPosts } from "content-collections";

export const getPostBySlug = cache(async (slug: string): Promise<TPost> => {
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error(`Post with slug '${slug}' not found`);
  }

  return {
    ...post,
    type: ContentType.POST,
  };
});
