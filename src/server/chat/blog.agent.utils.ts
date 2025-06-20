import { RuntimeContext } from "@mastra/core/runtime-context";
import { ZBlogAgentData } from "~/common/types/agent.types";
import { z } from "zod";

export type TBlogAgentRuntimeContext = {
  data: z.infer<typeof ZBlogAgentData>;
};

export const createRuntimeCtx = (
  blogAgentData: z.infer<typeof ZBlogAgentData>,
) => {
  const runtimeContext = new RuntimeContext<TBlogAgentRuntimeContext>();
  runtimeContext.set("data", blogAgentData);
  return runtimeContext;
};

export const getParsedBlogAgentData = (data: any) => {
  const blogAgentBodyResponse = ZBlogAgentData.safeParse(data);
  if (!blogAgentBodyResponse.success) {
    console.error("Validation error:", blogAgentBodyResponse.error);
    throw new Error("Invalid blog agent data");
  }
  return blogAgentBodyResponse.data;
};
