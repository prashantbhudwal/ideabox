import { cache } from "react";
import { ContentType, type TPost } from "~/common/types/content.types";
import { allPosts } from "content-collections";

export const getPostBySlug = cache(async (slug: string) => {
  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    throw new Error(`Post with slug '${slug}' not found`);
  }

  return {
    ...post,
    type: ContentType.POST,
  };
});
