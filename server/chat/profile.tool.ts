import { layersPoints } from "@/components/story/story-data";
import { createTool } from "@mastra/core";
import { z } from "zod";

const profileTool = createTool({
  id: "fetch_prashant_life_story",
  description:
    "Use this tool to fetch Prashant's life story to answer questions about Prashant.",
  outputSchema: z.object({
    content: z.string(),
  }),
  execute: async () => {
    const storyString = JSON.stringify(layersPoints);
    return {
      content: storyString,
    };
  },
});

export default profileTool;
