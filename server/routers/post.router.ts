import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getAllPosts, getPostBySlug } from "@/server/modules/post/core";

export const postRouter = createTRPCRouter({
  getSlugs: baseProcedure.query(async () => {
    return getAllPosts();
  }),

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
  // getSimilarPosts: baseProcedure.query(async () => {
  //   const data = await service.post.getSimilarPosts();
  //   return data;
  // }),
});
