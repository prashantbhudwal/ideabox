import { Mastra } from "@mastra/core/mastra";
import { ConsoleLogger } from "@mastra/core/logger";
import { LibSQLStore } from "@mastra/libsql";
import { isDev } from "~/client/lib/utils";

import {
  travelAgentWorkflow,
  travelPlanningAgent,
  travelSuggestionAgent,
} from "~/server/dw/mastra/travel-agent-workflow/travel-agent";
import {
  queryGenerationAgent,
  researchOrchestratorAgent,
  researchWorkflow,
  toolTestingAgent,
} from "~/server/dw/mastra/deep-wiki";
import { blogAgent } from "../chat/blog.agent";
import { reflectionAgent } from "../chat/reflection.agent";

export const mastra = new Mastra({
  agents: {
    travelSuggestionAgent,
    travelPlanningAgent,
    toolTestingAgent,
    researchOrchestratorAgent,
    queryGenerationAgent,
    blogAgent,
    reflectionAgent,
  },
  storage: isDev
    ? new LibSQLStore({
        url: "file:../../memory.db",
      })
    : undefined,
  workflows: {
    travelAgentWorkflow,
    researchWorkflow,
  },
  logger: new ConsoleLogger({
    name: "Mastra",
    level: "info",
  }),

  telemetry: {
    enabled: false,
    disableLocalExport: true,
  },
});
