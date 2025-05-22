import {
  getAllDrafts,
  getAllPosts,
  getDraftBySlug,
  getPostBySlug,
  getPostSlugs,
} from "./post-router";

export const server = {
  post: {
    getSlugs: getPostSlugs,
    getBySlug: getPostBySlug,
    getAll: getAllPosts,
    getDraftBySlug,
    getAllDrafts,
  },
};
