import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { LibSQLStore } from "@mastra/libsql";

import {
  travelAgentWorkflow,
  travelPlanningAgent,
  travelSuggestionAgent,
} from "../../dw/mastra/travel-agent-workflow/travel-agent";

export const mastra = new Mastra({
  agents: { travelSuggestionAgent, travelPlanningAgent },
  storage: new LibSQLStore({
    url: "file:../../memory.db",
  }),
  workflows: {
    travelAgentWorkflow,
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
