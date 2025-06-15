import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { LibSQLStore } from "@mastra/libsql";

import {
  travelAgentWorkflow,
  travelPlanningAgent,
  travelSuggestionAgent,
} from "../../dw/mastra/travel-agent-workflow/travel-agent";
import {
  queryGenerationAgent,
  researchOrchestratorAgent,
  researchWorkflow,
  toolTestingAgent,
} from "@/dw/mastra/deep-wiki";
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
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  workflows: {
    travelAgentWorkflow,
    researchWorkflow,
  },
  logger: createLogger({
    name: "Mastra",
    level: "info",
  }),

  telemetry: {
    enabled: false,
    disableLocalExport: true,
  },
});
