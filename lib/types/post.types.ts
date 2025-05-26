import { z } from "zod";

const ZContentBase = z.object({
  id: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  shortTitle: z.string().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.enum(["health", "ai", "software", "thinking"])),
});

type TContentBase = z.infer<typeof ZContentBase>;

export const ZPostFrontmatter = ZContentBase.pick({
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  shortTitle: true,
  description: true,
  heroImage: true,
  tags: true,
});

export type TPost = TContentBase & {
  type: "post";
  content: string;
};
export type TSpace = TContentBase & {
  type: "space";
  Component: React.ComponentType;
};

export type TPrompt = TContentBase & {
  type: "prompt";
  prompt: string;
};
