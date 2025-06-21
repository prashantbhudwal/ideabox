import { coreMessageSchema } from "ai";
import { z } from "zod";

export const ZBlogAgentData = z.object({
  routeName: z.string(),
  contentType: z.string(),
  content: z.string(),
});

export type TBlogAgentData = z.infer<typeof ZBlogAgentData>;

export const ZBlogAgentBody = z.object({
  data: ZBlogAgentData,
});

export type TBlogAgentBody = z.infer<typeof ZBlogAgentBody>;

export const ZChatAPIPayload = z.object({
  messages: z.array(coreMessageSchema),
  data: ZBlogAgentData,
});

export type TChatAPIPayload = z.infer<typeof ZChatAPIPayload>;
