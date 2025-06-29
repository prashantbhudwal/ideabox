import { gemini, gemini25, models } from "~/server/utils/models";
import { Agent } from "@mastra/core/agent";
import { fetchPostsTOOL, keywordSearchPostsTOOL } from "./tools/search.tool";
import { Memory } from "@mastra/memory";
import { isDev } from "~/client/lib/utils";
import { LibSQLStore } from "@mastra/libsql";
import profileTool from "./tools/profile.tool";
import { getBlogAgentPrompt } from "./blog.agent.prompt";
import { reflectionTool } from "./tools/reflection.tool";

const memory = isDev
  ? new Memory({
      storage: new LibSQLStore({
        url: "file:../mastra.db",
      }),
    })
  : undefined;

export const blogAgent = new Agent({
  name: "Blog Agent",
  instructions: getBlogAgentPrompt,
  model: models.gemini25,
  tools: {
    keywordSearchPostsTOOL,
    fetchPostsTOOL,
    profileTool,
    reflectionTool,
  },
  defaultGenerateOptions: {
    maxSteps: 10,
  },
  memory,
});
