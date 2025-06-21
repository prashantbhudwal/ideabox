import { cache } from "react";
import { type TPost } from "~/common/types/content.types";
import { ContentType } from "~/common/types/content.types";
import { allPosts } from "content-collections";

export const getAllPosts = cache(async (): Promise<TPost[]> => {
  const posts: TPost[] = allPosts.map((post) => {
    const { mdx, _meta, ...rest } = post;
    return {
      ...rest,
      type: ContentType.POST,
    };
  });
  return posts;
});
