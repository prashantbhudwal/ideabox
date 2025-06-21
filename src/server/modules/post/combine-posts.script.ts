import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "./get-all-posts";
import { type TPost } from "~/common/types/content.types";
import esMain from "es-main";

/**
 * Combines all blog posts into a single markdown file and generates a TOC file
 * @returns An object containing paths to the generated files
 */
export const combineAllPosts = async (): Promise<{
  postsPath: string;
  tocPath: string;
}> => {
  // Get all posts
  const posts = await getAllPosts();

  // Sort posts by date (newest first)
  const sortedPosts = [...posts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Create the content directory if it doesn't exist
  const outputDir = path.join(process.cwd(), "content/allposts");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate the combined markdown content
  const combinedContent = generateCombinedMarkdown(sortedPosts);

  // Generate the TOC markdown content
  const tocContent = generateTocMarkdown(sortedPosts);

  // Write to files
  const postsPath = path.join(outputDir, "all-posts.md");
  const tocPath = path.join(outputDir, "toc.md");

  fs.writeFileSync(postsPath, combinedContent, "utf8");
  fs.writeFileSync(tocPath, tocContent, "utf8");

  console.log(`✅ All posts combined into: ${postsPath}`);
  console.log(`✅ Table of contents generated at: ${tocPath}`);

  return { postsPath, tocPath };
};

/**
 * Generates the combined markdown content from all posts
 */
const generateCombinedMarkdown = (posts: TPost[]): string => {
  const lines: string[] = [
    "# All Blog Posts",
    `*Combined on ${new Date().toISOString().split("T")[0]}*`,
    "",
    "---",
    "",
  ];

  posts.forEach((post, index) => {
    // Add post header with metadata
    lines.push(`## ${post.title}`);
    lines.push("");
    lines.push(
      `**Date:** ${new Date(post.createdAt).toISOString().split("T")[0]}`,
    );

    if (post.tags && post.tags.length > 0) {
      lines.push(`**Tags:** ${post.tags.join(", ")}`);
    }

    lines.push("");
    lines.push(post.content);

    // Add separator between posts (except after the last one)
    if (index < posts.length - 1) {
      lines.push("");
      lines.push("---");
      lines.push("");
    }
  });

  return lines.join("\n");
};

/**
 * Generates a table of contents markdown file with post metadata
 */
const generateTocMarkdown = (posts: TPost[]): string => {
  const currentDate = new Date().toISOString().split("T")[0];

  // Create a JSON-like structure that's more token-efficient
  let output = `# Posts TOC (${currentDate}) - ${posts.length} total\n\n`;

  // Add compact post data
  posts.forEach((post, index) => {
    // Extract first paragraph from content
    const firstParagraph = extractFirstParagraph(post.content);

    // Format dates
    const created = new Date(post.createdAt).toISOString().split("T")[0];
    const updated = new Date(post.updatedAt).toISOString().split("T")[0];

    // Format tags
    const tags = post.tags && post.tags.length > 0 ? post.tags.join(",") : "-";

    // Build compact entry
    output += `${index + 1}. ${post.title}\n`;
    output += `id:${post.id || "-"} slug:${post.slug || "-"} created:${created}`;

    // Only add updated if different from created
    if (created !== updated) {
      output += ` updated:${updated}`;
    }

    output += ` tags:${tags}`;

    // Add optional fields only if they exist
    if (post.shortTitle) {
      output += ` short:"${post.shortTitle}"`;
    }

    if (post.heroImage) {
      output += ` img:${post.heroImage}`;
    }

    // Add description and first paragraph on new lines for readability
    if (post.description) {
      output += `\ndesc:"${post.description}"`;
    }

    // Add first paragraph
    output += `\nfirst:"${firstParagraph}"\n\n`;
  });

  return output;
};

/**
 * Extracts the first paragraph from a markdown content
 * Skips import statements and front matter
 */
const extractFirstParagraph = (content: string): string => {
  // Split content into lines
  const lines = content.split("\n");

  // Skip import statements and empty lines
  let startIndex = 0;
  while (startIndex < lines.length) {
    const line = lines[startIndex].trim();
    if (!line.startsWith("import") && line !== "" && !line.startsWith("---")) {
      break;
    }
    startIndex++;
  }

  // Find the first paragraph
  let paragraph = "";
  let inParagraph = false;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip headings, code blocks, and other non-paragraph elements
    if (
      line.startsWith("#") ||
      line.startsWith("```") ||
      line.startsWith(">") ||
      line.startsWith("- ") ||
      line.startsWith("* ") ||
      line.startsWith("1. ")
    ) {
      continue;
    }

    // If we find a non-empty line, start collecting the paragraph
    if (line !== "" && !inParagraph) {
      inParagraph = true;
      paragraph = line;
    } else if (line !== "" && inParagraph) {
      // Continue collecting the paragraph
      paragraph += " " + line;
    } else if (line === "" && inParagraph) {
      // End of paragraph
      break;
    }
  }

  return paragraph || "No paragraph found";
};

/**
 * Main function to run the combine posts pipeline
 */
export const main = async (): Promise<void> => {
  console.log("Starting to combine all posts...");
  await combineAllPosts();
  console.log("Posts combination completed!");
};

if (esMain(import.meta)) {
  main();
}
