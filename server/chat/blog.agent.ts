import { gemini, gemini25, models } from "@/lib/models";
import { Agent } from "@mastra/core/agent";
import { fetchPostsTOOL, keywordSearchPostsTOOL } from "./search.tool";
import { Memory } from "@mastra/memory";
import { isDev } from "@/lib/utils";
import { LibSQLStore } from "@mastra/libsql";
import profileTool from "./profile.tool";
import { getBlogAgentPrompt } from "./blog.agent.prompt";

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
  },
  defaultGenerateOptions: {
    maxSteps: 6,
  },
  memory,
});
