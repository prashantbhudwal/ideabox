import FirecrawlApp, { ScrapeResponse } from "@mendable/firecrawl-js";
import { input, select, checkbox } from "@inquirer/prompts";
import { createHash } from "crypto";
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const main = async () => {
  try {
    // Get user input via prompts
    const url = await input({
      message: "Enter the URL to scrape:",
      validate: (input: string) => {
        if (!input.trim()) return "URL is required";
        try {
          new URL(input);
          return true;
        } catch {
          return "Please enter a valid URL";
        }
      },
    });

    const apiKey = await input({
      message: "Enter your Firecrawl API key:",
      validate: (input: string) =>
        input.trim() ? true : "API key is required",
    });

    const formats = await checkbox({
      message: "Select output formats:",
      choices: [
        { name: "markdown", value: "markdown" as const, checked: true },
        { name: "html", value: "html" as const },
        { name: "rawHtml", value: "rawHtml" as const },
        { name: "links", value: "links" as const },
        { name: "screenshot", value: "screenshot" as const },
      ],
    });

    const extractionMode = await select({
      message: "Choose extraction mode:",
      choices: [
        { name: "Standard filtering (recommended)", value: "standard" },
        { name: "LLM-based article extraction", value: "llm" },
      ],
    });

    const app = new FirecrawlApp({
      apiKey,
    });

    console.log(`Scraping ${url}...`);

    let scrapeParams: any = {
      formats,
      onlyMainContent: true,
      includeTags: ["article", "main", ".content", ".post", ".article-body"],
      excludeTags: [
        "nav",
        "header",
        "footer",
        ".sidebar",
        ".ads",
        ".navigation",
        ".menu",
        ".related",
        ".comments",
      ],
      waitFor: 2000,
      timeout: 30000,
    };

    if (extractionMode === "llm") {
      // Add LLM-based extraction for structured article content
      scrapeParams.formats = [...formats, "json"];
      scrapeParams.jsonOptions = {
        prompt:
          "Extract the main article content including title, author, publication date, and full article text. Exclude navigation menus, advertisements, related articles, and footer content.",
      };
    }

    // Scrape the website
    const scrapeResult = (await app.scrapeUrl(
      url,
      scrapeParams,
    )) as ScrapeResponse;

    if (!scrapeResult.success) {
      throw new Error(`Failed to scrape: ${scrapeResult.error}`);
    }

    // Generate unique filename based on URL and content hash
    const urlHash = createHash("md5").update(url).digest("hex").substring(0, 8);
    const contentHash = createHash("md5")
      .update(JSON.stringify(scrapeResult))
      .digest("hex")
      .substring(0, 8);

    // Create safe filename from URL
    const urlSafe = url
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9-_.]/g, "_")
      .substring(0, 50);

    const filename = `${urlSafe}_${urlHash}_${contentHash}.json`;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filepath = join(__dirname, filename);

    // Save results as JSON
    const outputData = {
      url,
      timestamp: new Date().toISOString(),
      formats,
      urlHash,
      contentHash,
      result: scrapeResult,
    };

    writeFileSync(filepath, JSON.stringify(outputData, null, 2));

    console.log(`✅ Scraping completed successfully!`);
    console.log(`📁 Results saved to: ${filename}`);
    console.log(`🔗 URL: ${url}`);
    console.log(`📊 Formats: ${formats.join(", ")}`);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

main();
