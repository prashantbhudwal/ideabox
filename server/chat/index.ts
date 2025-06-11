import { RuntimeContext } from "@mastra/core/runtime-context";
import { mastra } from "../mastra";
import { ZBlogAgentData } from "@/lib/types/agent.types";
import { z } from "zod";
import { getBlogAgentRuntimeContext } from "./runtime-context";

const getParsedBlogAgentData = (data: any) => {
  const blogAgentDataResponse = ZBlogAgentData.safeParse(data);
  if (!blogAgentDataResponse.success) {
    throw new Error("Invalid blog agent data");
  }
  const blogAgentData = blogAgentDataResponse.data;
  return blogAgentData;
};

export async function getBlogAgentResponse({
  payload,
}: {
  payload: any;
}): Promise<Response> {
  const { messages, data } = payload;
  const blogAgentData = getParsedBlogAgentData(data);
  const myAgent = mastra.getAgent("blogAgent");
  const runtimeContext = getBlogAgentRuntimeContext(blogAgentData);

  const stream = await myAgent.stream(messages, {
    runtimeContext,
  });

  return stream.toDataStreamResponse();
}
