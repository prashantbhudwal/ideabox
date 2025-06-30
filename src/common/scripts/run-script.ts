#!/usr/bin/env node
import glob from "fast-glob";
import { select, confirm } from "@inquirer/prompts";
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join, relative } from "path";
import { existsSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "../../..");

async function findScriptFiles(): Promise<string[]> {
  try {
    // Find all .script.ts files in the project
    const scriptFiles = await glob("**/*.script.ts", {
      cwd: projectRoot,
      absolute: true,
      ignore: ["node_modules/**", ".git/**", "dist/**", ".output/**"],
    });

    return scriptFiles.sort();
  } catch (error) {
    console.error("Error finding script files:", error);
    return [];
  }
}

function getScriptDisplayName(scriptPath: string): string {
  const relativePath = relative(projectRoot, scriptPath);
  return relativePath;
}

async function runScript(scriptPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log(`\n🚀 Running: ${getScriptDisplayName(scriptPath)}\n`);

    // Use tsx to run the TypeScript script
    const child = spawn("pnpm", ["tsx", scriptPath], {
      stdio: "inherit",
      cwd: projectRoot,
      shell: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        console.log(`\n✅ Script completed successfully`);
        resolve();
      } else {
        console.log(`\n❌ Script exited with code ${code}`);
        reject(new Error(`Script exited with code ${code}`));
      }
    });

    child.on("error", (error) => {
      console.error(`\n❌ Error running script:`, error);
      reject(error);
    });
  });
}

async function main() {
  try {
    console.log("🔍 Searching for script files...\n");

    const scriptFiles = await findScriptFiles();

    if (scriptFiles.length === 0) {
      console.log("❌ No .script.ts files found in the project");
      process.exit(1);
    }

    console.log(`Found ${scriptFiles.length} script file(s):\n`);

    // Create options for the select prompt
    const choices = scriptFiles.map((scriptPath) => ({
      name: getScriptDisplayName(scriptPath),
      value: scriptPath,
      description: `Execute ${getScriptDisplayName(scriptPath)}`,
    }));

    // Let user select which script to run
    const selectedScript = await select({
      message: "Which script would you like to run?",
      choices,
      pageSize: 10,
    });

    console.log(`\nSelected: ${getScriptDisplayName(selectedScript)}`);

    // Ask for confirmation
    const shouldRun = await confirm({
      message: `Are you sure you want to run this script?`,
      default: true,
    });

    if (!shouldRun) {
      console.log("❌ Operation cancelled");
      process.exit(0);
    }

    // Check if the script file still exists
    if (!existsSync(selectedScript)) {
      console.error(`❌ Script file not found: ${selectedScript}`);
      process.exit(1);
    }

    // Run the selected script
    await runScript(selectedScript);
  } catch (error) {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.log("\n❌ Operation cancelled by user");
      process.exit(0);
    }

    console.error("❌ An error occurred:", error);
    process.exit(1);
  }
}

// Only run if this script is being executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
