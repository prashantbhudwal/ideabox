/**
 * How would a deep wiki search work?
 * ## Tasks
 * 1. Confirm research topic : ConfirmResearchTopicTask
 * 2. Chat with user : ChatWithUserTask
 * 3. Conduct wikipedia searches : SearchTask
 * 4. Reflect on the search results : ReflectOnSearchResultsTask
 * 5. Generate report : GenerateReportTask
 *
 * ## Agents
 * 1. ResearchOrchestratorAgent
 * 2. ReflectionAgent
 * 3. SearchAgent
 * 4. ReportAgent
 *
 * ## Tools
 *
 * ### External Tools
 * - Wikipedia search api
 * - Wikipedia page api
 *
 * ### Handoff Tools
 * - ReflectionHandoffTool: Hands off the reflection task to the reflection agent.
 * - SearchHandoffTool: Hands off the search task to the search agent.
 * - ReportHandoffTool: Hands off the report task to the report agent
 *
 * ## Agent-Task Mapping
 * - ResearchOrchestratorAgent:  [ConfirmResearchTopicTask, ChatWithUserTask]
 * - ReflectionAgent: [ReflectOnSearchResultsTask]
 * - SearchAgent: [SearchTask]
 * - ReportAgent: [GenerateReportTask]
 *
 * ## Agent-Tool Mapping
 * - ResearchOrchestratorAgent:  [SearchHandoffTool, ReflectionHandoffTool, ReportHandoffTool]
 * - ReflectionAgent: None
 * - SearchAgent: [WikipediaSearchTool, WikipediaPageSearchTool]
 * - ReportAgent: None
 *
 * ## Task-Tool Mapping
 * - ConfirmResearchTopicTask: None
 * - ChatWithUserTask: None
 * - SearchTask: [WikipediaSearchTool, WikipediaPageSearchTool]
 * - ReflectOnSearchResultsTask: None
 * - GenerateReportTask: None
 */

/**
 * Human Flow: What would a human do if the were doing this manually?
 * 1. First they would interact with the internet and formulate the real research topic.
 *  - getting information about what they are thinking
 *  - this seems like a multi-turn process
 *  - in current web it could be a
 *      - a multi-turn web search
 *      - a multi-turn chat with chatbot
 *  -
 * 2. Then they would search the internet with site:wikipedia.org to get the search results related to the research topic.
 * 3. Human clicks on one search result to see what the page is about.
 * 4. Human skims the page to get the main points of the page.
 * 5. Human reflects on the page and decides if it is relevant to the research topic.
 * 6. If it is helpful, they would copy the link, and save it in their notebook along with some notes.
 * 7. They either go deep in through the hyperlinks of the page.
 * 8. Or they go back and click on another search result to see what the page is about.
 * 9. If there are no more pages that are relevant in the search result, they would change the search query and repeat the process.
 */
import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
const run = async () => {};

import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { gemini } from "@/lib/models";
import dedent from "dedent";
import { createTool } from "@mastra/core";
import wiki from "wikipedia";
import type { Page } from "wikipedia";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
const Z_SearchResultSchema = z.object({
  results: z.array(
    z.object({
      query: z.string(),
      pages: z.array(z.object({ title: z.string(), id: z.string() })),
    }),
  ),
});

// # Step 1

export const queryGenerationAgent = new Agent({
  instructions: dedent`The user provides you with a research topic and you generate queries to search wikipedia api from that.
  
  YOU ONLY GENERATE 3-5 QUERIES
  `,
  model: gemini,
  name: "Search Query Generation Agent",
  defaultGenerateOptions: {
    output: z.object({ queries: z.array(z.string()) }),
  },
});

const queryGenerationTool = createTool({
  id: "query_generation_tool",
  inputSchema: z.object({ researchTopic: z.string() }),
  outputSchema: z.object({ queries: z.array(z.string()) }),
  description: "generates queries for the wikipedia searches",
  execute: async ({ context, mastra }) => {
    const { researchTopic } = context;
    const result = await queryGenerationAgent.generate(researchTopic, {
      output: z.object({ queries: z.array(z.string()) }),
    });
    return result.object;
  },
});

const queryGenerationStep = createStep(queryGenerationTool);

// # Step 2
const wikiSearchTool = createTool({
  id: "wiki_search_tool",
  description:
    "Use this tool to search wikipedia. Returns pages that you can browse using a different tool.",
  inputSchema: z.object({
    queries: z.array(z.string()),
  }),
  outputSchema: Z_SearchResultSchema,
  execute: async ({ context }) => {
    // 1. extract the array of queries
    const { queries } = context;

    // 2. for each query, call wiki.search and transform into { title, id } pages
    const results = await Promise.all(
      queries.map(async (q) => {
        // wiki.search returns something like { results: RawSearchItem[], suggestion?: string }
        const raw = await wiki.search(q, { limit: 5 });

        // raw.results might be string[] or objects; normalize both cases
        const pages = raw.results.map((item) => {
          if (typeof item === "string") {
            return { title: item, id: item };
          }
          // assume item has .title and .pageid
          return {
            title: item.title,
            id: String((item as any).pageid ?? item.title),
          };
        });

        // return the shape your outputSchema expects
        return { query: q, pages };
      }),
    );

    // 3. wrap it up under `results`
    return { results };
  },
});
const searchStep = createStep(wikiSearchTool);

// # Step 3
const pageSelectionAgent = new Agent({
  name: "Page Selection Agent",
  instructions:
    "You select pages relevant to the original research topic, and return an array of page ids.",
  model: gemini,
});

export const pageSelectionTOOL = createTool({
  id: "page_selection_tool",
  description:
    "Select pages relevant to the original research topic, and return an array of page ids.",
  inputSchema: Z_SearchResultSchema,
  outputSchema: z.object({ pageIds: z.array(z.string()) }),
  execute: async ({ context }) => {
    const pages = context.results.flatMap((result) => result.pages);
    const pagesString = JSON.stringify(pages);
    console.dir(pages, { depth: 100 });
    const selectedPages = await pageSelectionAgent.generate(pagesString, {
      output: z.object({ pageIds: z.array(z.string()) }),
    });
    console.dir(selectedPages.object, { depth: 100 });
    return selectedPages.object;
  },
});
const pageSelectionStep = createStep(pageSelectionTOOL);

// # Step 4
const getWikiPageTOOL = createTool({
  id: "get_wiki_page_content_tool",
  description: dedent``,
  inputSchema: z.object({ pageIds: z.array(z.string()) }),
  outputSchema: z.string(),
  execute: async ({ context }) => {
    const pageIds = context.pageIds;
    console.log("pageIds", pageIds);

    try {
      // First get the page objects
      const pagePromises = pageIds.map((pageId) => wiki.page(pageId));
      const pages = await Promise.all(pagePromises);
      console.dir(pages, { depth: 100 });

      // Then fetch the content for each page (content is a method that needs to be awaited)
      const contentPromises = pages.map((page) => page.content());
      const contents = await Promise.all(contentPromises);

      // Combine page titles with their contents
      const formattedPages = pages.map((page, index) => {
        return `# ${page.title}\n\n${contents[index]}`;
      });

      const pagesString = formattedPages.join("\n\n---\n\n");
      const pagesStringSlice = pagesString.slice(0, 10000);
      console.log("pagesString length:", pagesString.length);
      return pagesStringSlice;
    } catch (error) {
      console.error("Error fetching wiki content:", error);
      return "Error fetching Wikipedia content. Please try again.";
    }
  },
});
const getPageContentStep = createStep(getWikiPageTOOL);

// # Step 5
const reportGeneratorAgent = new Agent({
  name: "Report Generator Agent",
  instructions:
    "You generate a markdown report based on the pages provided. Add citations in form of github markdown footnotes.",
  model: gemini,
});

const reportGenerationStep = createStep(reportGeneratorAgent);

export const researchWorkflow = createWorkflow({
  id: "research-workflow",
  inputSchema: z.object({ researchTopic: z.string() }),
  outputSchema: z.object({
    report: z.string(),
  }),
  steps: [
    searchStep,
    queryGenerationStep,
    pageSelectionStep,
    getPageContentStep,
    reportGenerationStep,
  ],
})
  .then(queryGenerationStep)
  .then(searchStep)
  .then(pageSelectionStep)
  .then(getPageContentStep)
  .map(({ inputData }) => {
    return {
      prompt: inputData,
    };
  })
  .then(reportGenerationStep)
  .commit();
const memory = new Memory({
  storage: new LibSQLStore({
    url: "file:../mastra.db", // Or your database URL
  }),
});

export const researchOrchestratorAgent = new Agent({
  name: "Deep Wiki",
  instructions: dedent`
    You are DeepWiki. You are a research agent. 
    
    You first help user narrow down the research topic by asking questions and getting more information about the research topic.

    Once, the user agrees to proceed, you use the research workflow to generate a report based on the pages provided. Add citations in form of github markdown footnotes.
    `,
  model: gemini,
  workflows: { researchWorkflow },
  memory,
});

export const toolTestingAgent = new Agent({
  name: "Tool Tester",
  instructions: dedent`
    You allow user to test the tools that you have.
    `,
  model: gemini,
  tools: {
    wikiSearchTool,
  },
});
