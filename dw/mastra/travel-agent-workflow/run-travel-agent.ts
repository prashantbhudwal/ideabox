/**
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

import { select } from "@inquirer/prompts";
import { mastra } from "../../../mastra";
import { H_suggestionSelectionStep } from "./travel-agent";
import { z } from "zod";

async function runTravelAgent() {
  const workflow = mastra.getWorkflow("travelAgentWorkflow");
  const run = workflow.createRun({});

  // Start the workflow with initial vacation description
  const result = await run.start({
    inputData: { vacationDescription: "I want to go to the beach" },
  });

  console.log("result", result);

  const suggestionsStep = result?.steps?.["generate-suggestions"];

  // If suggestions were generated successfully, proceed with user interaction
  if (suggestionsStep.status === "success") {
    const suggestions = suggestionsStep.output?.generatedSuggestions;

    // Present options to user and get their selection
    const userInput = await select<string>({
      message: "Choose your holiday destination",
      choices: suggestions.map(
        ({
          location,
          description,
        }: {
          location: string;
          description: string;
        }) => `- ${location}: ${description}`,
      ),
    });

    console.log("Selected:", userInput);

    // Prepare to resume the workflow with user's selection
    console.log("resuming from", result, "with", {
      inputData: {
        selection: userInput,
        vacationDescription: "I want to go to the beach",
        suggestions: suggestionsStep?.output?.generatedSuggestions,
      },
      step: H_suggestionSelectionStep,
    });

    const result2 = await run.resume({
      resumeData: {
        selection: userInput,
      },
      step: H_suggestionSelectionStep,
    });

    console.dir(result2, { depth: null });
  }
}
runTravelAgent();
