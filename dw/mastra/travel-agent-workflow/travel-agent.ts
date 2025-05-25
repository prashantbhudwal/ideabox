/**
 * # Define Travel Agents
 *  1. Agent that generates multiple holiday options
 *    - Returns a JSON array of locations and descriptions
 *  2. Agent that creates detailed travel plans
 *    - Accepts the selected location
 *    - Returns a comprehensive itinerary
 * # Define a steps of the workflow
 *  Step 1: Generate holiday options
 *    - Uses first agent to generate holiday options
 *  Step 2: Pause the workflow
 *    - Wait for user to select a holiday option
 *    - Uses mastra suspend and resume options
 *  Step 3: Generate travel itinerary
 *    - Uses second agent to generate travel itinerary
 * # Define a mastra workflow
 * 1. create the workflow
 * 2. commit the workflow
 *
 * # Register the agents and workflow in mastra
 *
 * # Execute the workflow
 * 1. Get the workflow
 * 2. Create the run
 * 3. Start the urn with initial vacation description
 * 4. If suggestions generation succeeds
 * 5. Give the suggestions to the user
 * 6. If user selects a suggestion
 * 7. Resume the run with the selected suggestion
 * 8. If itinerary generation succeeds
 * 9. Give the itinerary to the user
 */

import { Agent } from "@mastra/core/agent";
import { gemini } from "../../../lib/models";
import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import dedent from "dedent";

import dotenv from "dotenv";
dotenv.config();

export const travelSuggestionAgent = new Agent({
  name: "travelSuggestionAgent",
  instructions: dedent`
      You are a travel agent who is given a user prompt about what kind of holiday they want to go on.
  You then generate 3 different options for the holiday. Return the suggestions as a JSON array {"location": "string", "description": "string"}[]. Don't format as markdown.
  Make the options as different as possible from each other.
  Also make the plan very short and summarized.

`,
  model: gemini,
});

export const travelPlanningAgent = new Agent({
  name: "travelPlanningAgent",
  instructions: dedent`
   You are a travel agent who is given a user prompt about what kind of holiday they want to go on. A summary of the plan is provided as well as the location.
   You then generate a detailed travel plan for the holiday.

`,
  model: gemini,
});

// # Workflows

const generateSuggestionsStep = createStep({
  id: "generate-suggestions",
  inputSchema: z.object({
    vacationDescription: z.string(),
  }),
  outputSchema: z.object({
    generatedSuggestions: z.array(
      z.object({ location: z.string(), description: z.string() }),
    ),
    vacationDescription: z.string(),
  }),
  execute: async function ({ inputData, mastra }) {
    if (!mastra) throw new Error("Mastra is not initialized");

    const { vacationDescription } = inputData;

    const agent = await mastra.getAgent("travelSuggestionAgent");

    const generatedObjectSchema = z.object({
      suggestions: z.array(
        z.object({ location: z.string(), description: z.string() }),
      ),
    });

    const result = await agent.generate(
      [
        {
          role: "user",
          content: vacationDescription,
        },
      ],
      { output: generatedObjectSchema },
    );

    console.log("📙", result.object);

    // Validate response with Zod
    const parseResult = generatedObjectSchema.safeParse(result.object);
    if (!parseResult.success) {
      throw new Error(
        `Invalid suggestions response: ${parseResult.error.message}`,
        {
          cause: parseResult.error,
        },
      );
    }
    // Return the parsed data to the workflow

    const stepOutput = {
      generatedSuggestions: parseResult.data.suggestions,
      vacationDescription,
    };

    console.log("📤", stepOutput);

    return stepOutput;
  },
});
const H_suggestionSelectionStep = createStep({
  id: "h-suggestion-selection",
  inputSchema: z.object({
    generatedSuggestions: z.array(
      z.object({ location: z.string(), description: z.string() }),
    ),
    vacationDescription: z.string(),
  }),
  suspendSchema: z.object({
    generatedSuggestions: z.array(
      z.object({ location: z.string(), description: z.string() }),
    ),
  }),
  resumeSchema: z.object({
    selection: z.string().describe("The selection of the user"),
  }),
  outputSchema: z.object({
    selection: z.string().describe("The selection of the user"),
    vacationDescription: z.string(),
  }),
  execute: async function ({ inputData, resumeData, suspend }) {
    if (!resumeData?.selection) {
      await suspend({ generatedSuggestions: inputData.generatedSuggestions });
      return {
        selection: "",
        vacationDescription: inputData?.vacationDescription,
      };
    }
    return {
      selection: resumeData?.selection,
      vacationDescription: inputData.vacationDescription,
    };
  },
});

const travelPlanningStep = createStep({
  id: "travel-planning",
  inputSchema: z.object({
    vacationDescription: z.string(),
    selection: z.string().describe("The selection of the user"),
  }),
  outputSchema: z.object({ travelPlan: z.string() }),
  execute: async function ({ inputData, mastra }) {
    const planningAgent = mastra.getAgent("travelPlanningAgent");
    if (!planningAgent) {
      throw new Error("Travel agent is not initialized");
    }
    const { selection, vacationDescription } = inputData;
    const result = await planningAgent.generate([
      { role: "assistant", content: vacationDescription },
      { role: "user", content: selection || "" },
    ]);
    console.log(result.text);
    return { travelPlan: result.text };
  },
});

const travelAgentWorkflow = createWorkflow({
  id: "travel-Agent-Workflow",
  inputSchema: z.object({ vacationDescription: z.string().describe("") }),
  outputSchema: z.object({ travelPlan: z.string() }),
  steps: [
    generateSuggestionsStep,
    H_suggestionSelectionStep,
    travelPlanningStep,
  ],
})
  .then(generateSuggestionsStep)
  .then(H_suggestionSelectionStep)
  .then(travelPlanningStep)
  .commit();

export { travelAgentWorkflow, H_suggestionSelectionStep };
