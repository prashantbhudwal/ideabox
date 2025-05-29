import { getPostSlugs, getPostBySlug, getAllPosts } from "./post/post.service";

export const service = {
  post: {
    getSlugs: getPostSlugs,
    getBySlug: getPostBySlug,
    getAll: getAllPosts,
  },
};
