import { mastra } from "../mastra";
import { createDataStreamResponse } from "ai";
import { createRuntimeCtx, getParsedBlogAgentData } from "./blog.agent.utils";

export type TAgentAnnotation = {
  type: "step";
  value: number;
  stepName: string;
  message: string;
};

export async function getBlogAgentResponse({
  payload,
}: {
  payload: any;
}): Promise<Response> {
  console.log("payload", payload);
  const { messages, data } = payload;

  const isFirstMessage = messages.length === 1;

  const blogAgentData = getParsedBlogAgentData(data);
  const myAgent = mastra.getAgent("blogAgent");
  const runtimeContext = createRuntimeCtx(blogAgentData);

  const stream = createDataStreamResponse({
    status: 200,
    statusText: "OK",
    headers: {
      "Custom-Header": "value",
    },
    async execute(dataStream) {
      // Write data
      // dataStream.writeData({ value: "Hello" });

      // // Write annotation
      // if (isFirstMessage) {
      //   dataStream.writeMessageAnnotation({
      //     type: "step",
      //     value: 1,
      //     stepName: "Reading",
      //     message: "I am reading the blog.",
      //   });
      //   await devUtils.simulateCall();
      //   dataStream.writeMessageAnnotation({
      //     type: "step",
      //     value: 2,
      //     stepName: "Analyzing",
      //     message: "I am analyzing the blog to answer your question.",
      //   });
      //   await devUtils.simulateCall();
      // }

      //mastra agent stream
      const agentStream = await myAgent.stream(messages, {
        runtimeContext,
      });
      // Merge agent stream
      agentStream.mergeIntoDataStream(dataStream);
    },
    onError: (error) => `Custom error: ${JSON.stringify(error)}`,
  });

  return stream;
}
