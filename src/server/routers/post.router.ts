import { baseProcedure, createTRPCRouter } from "../trpc/archive/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getAllPosts } from "~/server/modules/post/get-all-posts";
import { getPostBySlug } from "~/server/modules/post/get-post-by-slug";
import { getSimilarPosts } from "../modules/post/get-similar-posts";

export const postRouter = createTRPCRouter({
  getBySlug: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await getPostBySlug(input.slug);

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Post with slug '${input.slug}' not found`,
        });
      }

      return post;
    }),

  getAll: baseProcedure.query(async () => {
    return getAllPosts();
  }),
  getSimilarPosts: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const data = await getSimilarPosts({ id: input.id });
      return data;
    }),
});
