import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { ContentType } from "~/common/types/content.types";
const posts = defineCollection({
  name: "posts",
  directory: "src/content/posts",
  include: "**/*.mdx",
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.enum(["health", "ai", "software", "thinking"])),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      mdx,
      type: ContentType.POST,
    };
  },
});
export default defineConfig({
  collections: [posts],
});
