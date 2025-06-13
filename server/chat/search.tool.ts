import { getSearch } from "@/server/modules/search/mini-search";
import { createTool } from "@mastra/core";
import { z } from "zod";

export const keywordSearchPostsTOOL = createTool({
  id: "keyword_search_posts_tool",
  description: `Use this tool to search posts by keyword.
  Internally it uses MiniSearch to search posts by keyword and returns a maximum of 10 results.  
  `,
  inputSchema: z.object({
    query: z.string().describe("The query to search for posts"),
    limit: z.number().describe("The number of results to return. Max 10."),
  }),
  outputSchema: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      id: z.string(),
    }),
  ),
  execute: async ({ context }) => {
    const { miniSearch } = getSearch();
    const results = miniSearch.search(context.query);

    const MAX_RESULTS = 10;

    const topResults = results.slice(
      0,
      context.limit > MAX_RESULTS ? MAX_RESULTS : context.limit,
    );

    const formattedResults = topResults.map((result) => ({
      slug: result.slug || "",
      title: result.title || "",
      id: result.id || "",
    }));

    return formattedResults;
  },
});

export const fetchPostsTool = createTool({
  id: "fetch_posts_tool",
  description: `Use this tool to fetch posts by id.`,
  inputSchema: z.object({
    id: z.array(z.string().describe("The id of the post")),
  }),
  outputSchema: z.array(
    z.object({
      slug: z.string(),
      title: z.string(),
      id: z.string(),
      content: z.string(),
    }),
  ),
  execute: async ({ context }) => {
    const { miniSearch } = getSearch();
    const results = context.id.map((id) => miniSearch.search(id)[0]);

    const formattedResults = results.map((result) => ({
      title: result.title || "",
      id: result.id || "",
      content: result.content || "",
      slug: result.slug || "",
    }));

    return formattedResults;
  },
});
