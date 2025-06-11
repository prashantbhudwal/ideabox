import { RuntimeContext } from "@mastra/core/runtime-context";
import { ZBlogAgentData } from "@/lib/types/agent.types";
import { z } from "zod";

export type TBlogAgentRuntimeContext = {
  data: z.infer<typeof ZBlogAgentData>;
};


export const getBlogAgentRuntimeContext = (
  blogAgentData: z.infer<typeof ZBlogAgentData>,
) => {
  const runtimeContext = new RuntimeContext<TBlogAgentRuntimeContext>();
  runtimeContext.set("data", blogAgentData);
  return runtimeContext;
};
