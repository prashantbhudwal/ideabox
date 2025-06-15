import { models } from "@/lib/models";
import { Agent } from "@mastra/core";
import dedent from "dedent";
import { blogAgentToolsPrompt } from "./blog.agent.prompt";
import { RuntimeContext } from "@mastra/core/runtime-context";
import { TReflectionAgentRuntimeContext } from "./tools/reflection.tool";

export const reflectionAgent = new Agent({
  name: "Reflection Agent",
  instructions: ({
    runtimeContext,
  }: {
    runtimeContext: RuntimeContext<TReflectionAgentRuntimeContext>;
  }) => dedent`You are a reflection agent. You reflect on the conversation. You don't answer the question. You just reflect on the conversation based on the topic of reflection. The topic of reflection is given in the <topic> tag.
  
  You can reflect for 50-200 words.

  The reflection should be about what to do next.

  You can respond with just your reflection or you can recommend tools to use in the next step. Or you can do both.

  ${blogAgentToolsPrompt}

  <topic>${runtimeContext.get("topicToThinkAbout")}</topic>
  `,
  model: models.gptO4mini,
});
