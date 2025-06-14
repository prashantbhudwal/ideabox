import { serverPaths } from "@/server/utils/server-paths";
import { cache } from "react";
import { ContentType, TPost } from "@/lib/types/content.types";
import { getValidatedPost } from "./utils";

export const getPostBySlug = cache(async (slug: string): Promise<TPost> => {
  const fullPath = serverPaths.file.postMdx(slug);
  const post = await getValidatedPost({ file: fullPath });
  return {
    type: ContentType.POST,
    ...post.metadata,
    content: post.content,
  };
});
