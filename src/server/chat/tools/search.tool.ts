import { getSearch } from "~/server/modules/search/mini-search";
import { createTool } from "@mastra/core";
import { z } from "zod";

export const keywordSearchPostsTOOL = createTool({
  id: "keyword_search_posts_tool",
  description: `Use this tool to search posts by keyword or phrase. You can break the user query into multiple keywords or phrases to get better results.
  Internally it uses MiniSearch to search posts for keyword or phrase and returns a maximum of 10 results.  
  `,
  inputSchema: z.object({
    queries: z
      .array(z.string().describe("The query to search for posts."))
      .describe("The queries to search for posts. Max 5 queries."),
    limit: z
      .number()
      .describe(
        "The number of results to return. Max 10. Must be decided by the model based on the query.",
      ),
  }),
  outputSchema: z.array(
    z.object({
      query: z.string(),
      results: z.array(
        z.object({
          slug: z.string(),
          title: z.string(),
          id: z.string(),
        }),
      ),
    }),
  ),
  execute: async ({ context }) => {
    const { miniSearch } = getSearch();
    const queries = context.queries;
    const searches = queries.map((query) => miniSearch.search(query));

    const results = searches.map((search) => search.slice(0, context.limit));

    const formattedResults = results.map((result, index) => ({
      query: queries[index],
      results: result.map((post) => ({
        slug: post.slug || "",
        title: post.title || "",
        id: post.id || "",
      })),
    }));

    return formattedResults;
  },
});

export const fetchPostsTOOL = createTool({
  id: "fetch_posts_tool",
  description: `Use this tool to fetch posts by id. You can fetch a maximum of 3 posts.`,
  inputSchema: z.object({
    id: z
      .array(z.string().describe("The id of the post"))
      .describe("The ids of the posts to fetch. Max 3 ids."),
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
