import { baseProcedure, createTRPCRouter } from "../trpc/init";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { service } from "@/server/services";

export const postRouter = createTRPCRouter({
  getSlugs: baseProcedure.query(async () => {
    return service.post.getSlugs();
  }),

  getBySlug: baseProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const post = await service.post.getBySlug(input.slug);

      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Post with slug '${input.slug}' not found`,
        });
      }

      return post;
    }),

  getAll: baseProcedure.query(async () => {
    return service.post.getAll();
  }),
});
