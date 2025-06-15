import { createTool } from "@mastra/core";
import { RuntimeContext } from "@mastra/core/runtime-context";
import dedent from "dedent";
import { z } from "zod";
export type TReflectionAgentRuntimeContext = {
  topicToThinkAbout: string;
};
export const reflectionTool = createTool({
  id: "reflective_thought_tool",
  description: dedent`Use this tool after every other tool call to reflect on the information that you have just gathered.`,
  outputSchema: z.object({
    text: z.string(),
  }),
  inputSchema: z.object({
    topicToThinkAbout: z
      .string()
      .describe("What do you want the thinking agent to think about?"),
  }),
  execute: async ({
    runtimeContext,
    mastra,
    threadId,
    resourceId,
    context,
  }) => {
    const blogAgent = mastra?.getAgent("blogAgent");
    if (!threadId || !resourceId) {
      throw new Error("Thread ID and Resource ID are required");
    }
    const blogAgentMemoryInstance = blogAgent?.getMemory();
    if (!blogAgentMemoryInstance) {
      throw new Error("Blog agent memory instance not found");
    }
    const memory = await blogAgentMemoryInstance.query({
      threadId,
      resourceId,
    });
    console.log("--🪧 memory ---");
    console.dir(memory.uiMessages, { depth: 100 });
    console.log("--🪧 memory ---");
    if (!memory) {
      throw new Error("Memory not found");
    }
    console.log("--🪧 memory.messages ---");
    console.dir(memory.messages, { depth: 100 });
    console.log("--🪧 memory.messages ---");

    const reflectionAgent = mastra?.getAgent("reflectionAgent");
    if (!reflectionAgent) {
      throw new Error("Reflection agent not found");
    }

    const reflectionAgentRuntimeContext =
      new RuntimeContext<TReflectionAgentRuntimeContext>();
    reflectionAgentRuntimeContext.set("topicToThinkAbout", context.topicToThinkAbout);

    const result = await reflectionAgent.generate(memory.messages, {
      runtimeContext: reflectionAgentRuntimeContext,
    });
    console.log("--🪧 result ---");
    console.dir(result, { depth: 100 });
    console.log("--🪧 result ---");
    console.dir(
      await blogAgentMemoryInstance.query({
        threadId,
        resourceId,
      }),
      { depth: 100 },
    );
    return {
      text: result.text,
    };

    // await blogAgentMemoryInstance.saveMessages({
    //   messages: [
    //     {
    //       role: "assistant" as const,
    //       content: test,
    //       id: "",
    //       createdAt: new Date(),
    //       type: "text",
    //     },
    //   ],
    // });

    // print all messages

    // return result;
  },
});
