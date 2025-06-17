import { z } from "zod";

export const ZBlogAgentData = z.object({
  routeName: z.string(),
  contentType: z.string(),
  content: z.string(),
});

export const ZBlogAgentBody = z.object({
  data: ZBlogAgentData,
});

export type TBlogAgentBody = z.infer<typeof ZBlogAgentBody>;
