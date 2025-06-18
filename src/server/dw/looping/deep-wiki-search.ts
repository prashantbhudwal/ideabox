import { Agent, run, RunContext, Tool, tool } from "@openai/agents";
import wiki from "wikipedia";
import OpenAI from "openai";
import dotenv from "dotenv";
import { setOpenAIAPI, setDefaultOpenAIClient } from "@openai/agents";
import dedent from "dedent";
import { z } from "zod";

const getReflectionPrompt = (runContext: RunContext<ReflectionContext>) => {
  const { topic, summaries } = runContext.context;
  return dedent`
    You are an expert research assistant analyzing summaries about "${topic}".

    Instructions:
    - Identify knowledge gaps or areas that need deeper exploration and generate a follow-up query. (1 or multiple).
    - If provided summaries are sufficient to answer the user's question, don't generate a follow-up query.
    - If there is a knowledge gap, generate a follow-up query that would help expand your understanding.
    - Focus on technical details, implementation specifics, or emerging trends that weren't fully covered.

    Requirements:
    - Ensure the follow-up query is self-contained and includes necessary context for web search.

    Output Format:
    - Format your response as a JSON object with these exact keys:
      - "is_sufficient": true or false
      - "knowledge_gap": Describe what information is missing or needs clarification
      - "follow_up_queries": Write a specific question to address this gap

    Example:
    '''json
    {{
        "is_sufficient": true, // or false
        "knowledge_gap": "The summary lacks information about performance metrics and benchmarks", // "" if is_sufficient is true
        "follow_up_queries": ["What are typical performance benchmarks and metrics used to evaluate [specific technology]?"] // [] if is_sufficient is true
    }}
    '''

    Reflect carefully on the Summaries to identify knowledge gaps and produce a follow-up query. Then, produce your output following this JSON format:

    Summaries:
    ${summaries}`;
};

// Initialize environment and OpenAI client
dotenv.config();
const gemini = "gemini-2.0-flash";
const client = new OpenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

setDefaultOpenAIClient(client);
setOpenAIAPI("chat_completions");

// Type definitions
type UserContext = {
  research_topic: string;
  summaries: string;
};

// Tool definitions
const wikiSearchTool = tool({
  name: "search_wikipedia",
  description: "Get results from wikipedia search api.",
  parameters: z.object({ query: z.string() }),
  async execute({ query }) {
    console.log("searching for", query);
    const res = await wiki.search(query);
    const results = res.results;
    console.log("search results", results);
    return results;
  },
});

const wikiPageSearchTool = tool({
  name: "search_wikipedia_page_with_page_id",
  description: "Get results from wikipedia page api.",
  parameters: z.object({ pageId: z.string() }),
  async execute({ pageId }) {
    console.log("searching for", pageId);
    const page = await wiki.page(pageId);
    console.log("search results", page);
    return page;
  },
});

type ReflectionContext = {
  summaries: string[];
  topic: string;
};

const reflectionAgent = new Agent<ReflectionContext>({
  name: "reflection_agent",
  instructions: getReflectionPrompt,
  model: gemini,
});

const reflectionTool = tool({
  name: "reflection",
  description: "Reflect on the user's query.",
  parameters: z.object({
    summaries: z.array(z.string()),
    topic: z.string(),
  }),
  async execute({ summaries, topic }) {
    const result = run(reflectionAgent, "", {
      context: {
        summaries,
        topic,
      },
    });
    return result;
  },
});

type WikiSearchContext = {
  research_topic: string;
};

const wikiSearchAgent = new Agent<WikiSearchContext>({
  name: "wikiSearch_agent",
  instructions: (
    runContext: RunContext<WikiSearchContext>,
  ) => dedent`Conduct targeted Wiki Searches to gather the most recent, credible information on "${runContext.context.research_topic}" and synthesize it into a verifiable text artifact.

Research Topic:
${runContext.context.research_topic}`,
  model: gemini,
  tools: [wikiSearchTool, wikiPageSearchTool],
});

const runWikiSearch = async (query: string) => {
  const deepWikiAgent = new Agent<UserContext>({
    name: "deep_wiki_agent",
    instructions: (runContext: RunContext<UserContext>) => dedent`
    You are a deep wiki search agent.
    You will conduct targeted Wiki Searches to gather the most recent, credible information on "${runContext.context.research_topic}" and synthesize it into a verifiable text artifact.
    
    For this you can handoff to the wikiSearchAgent and reflectionAgent.

    You MUST REFLECT.
    
    `,
    model: gemini,
    handoffs: [wikiSearchAgent, reflectionAgent],
  });

  const result = await run(deepWikiAgent, query, {
    context: {},
    maxTurns: 10,
  });
  console.log(result.finalOutput);
  return result.finalOutput;
};

if (require.main === module) {
  runWikiSearch("What is AI?");
}
