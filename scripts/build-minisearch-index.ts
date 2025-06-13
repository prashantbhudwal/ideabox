#!/usr/bin/env ts-node
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import fg from "fast-glob";
import matter from "gray-matter";
import MiniSearch from "minisearch";
import { z } from "zod";
import { ContentType, type TPost } from "../lib/types/content.types";

// Constants
const POST_DIR = path.join(process.cwd(), "content/posts");

// Validate frontmatter schema
const FrontMatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tags: z.array(z.enum(["health", "ai", "software", "thinking"])),
  createdAt: z.string().or(z.date()).transform(d => 
    d instanceof Date ? d.toISOString() : d
  ),
  updatedAt: z.string().or(z.date()).transform(d => 
    d instanceof Date ? d.toISOString() : d
  ),
  shortTitle: z.string().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
});

// Validate frontmatter
function validateFrontMatter(data: any, filePath: string) {
  try {
    return FrontMatterSchema.parse(data);
  } catch (err) {
    console.error(`Invalid frontmatter in ${filePath}:`, err);
    throw err;
  }
}

async function buildIndex(): Promise<MiniSearch<TPost>> {
  console.log("🔍 Building MiniSearch index...");

  // Find all MDX files
  const mdxFiles = await fg(`${POST_DIR}/**/*.mdx`, { absolute: true });
  console.log(`Found ${mdxFiles.length} MDX files`);

  // Process each MDX file
  const documents: Array<TPost> = [];
  let processedCount = 0;
  
  for (const file of mdxFiles) {
    try {
      const raw = await fs.readFile(file, "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = validateFrontMatter(data, file);
      
      // Create a unique ID using the file path hash
      const filePathHash = crypto
        .createHash("md5")
        .update(file)
        .digest("hex")
        .slice(0, 8);
      
      // Create the document with a guaranteed unique ID
      const doc: TPost = {
        ...frontmatter,
        type: ContentType.POST as const,
        content,
        id: filePathHash, // Use hash as ID to guarantee uniqueness
      };
      
      documents.push(doc);
      processedCount++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
      // Continue processing other files
    }
  }
  
  console.log(`Successfully processed ${processedCount} of ${mdxFiles.length} MDX files`);
  
  if (documents.length === 0) {
    throw new Error("No valid documents found to index");
  }

  // Create and configure index
  const miniSearch = new MiniSearch<TPost>({
    fields: ["title", "content"],
    storeFields: ["title", "slug"], // Store slug for navigation
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  // Add all documents to the index
  try {
    miniSearch.addAll(documents);
    console.log(`Successfully added ${documents.length} documents to index`);
  } catch (err: unknown) {
    console.error('Error adding documents to index:', err);
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(`Failed to build index: ${errorMessage}`);
  }

  // Export and hash
  const indexJson = miniSearch.toJSON();
  const serialized = JSON.stringify(indexJson);
  const hash = crypto
    .createHash("sha256")
    .update(serialized)
    .digest("hex")
    .slice(0, 8);

  // Ensure directory exists
  const publicDir = path.join(process.cwd(), "public");
  await fs.mkdir(publicDir, { recursive: true });

  // Clean up old index files
  const oldFiles = await fg([
    path.join(publicDir, "minisearch-index_*.json"),
  ]);
  await Promise.all(oldFiles.map(f => fs.unlink(f)));

  // Write new files
  await fs.writeFile(
    path.join(publicDir, `minisearch-index_${hash}.json`),
    serialized
  );

  console.log(`✅ MiniSearch index built successfully
📊 Stats:
  • ${documents.length} posts indexed
  • Hash: ${hash}
  • Index size: ${(serialized.length / 1024).toFixed(1)} KB`);

  return miniSearch;
}

// Run the build
buildIndex()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error("Build failed:", err);
    process.exit(1);
  });
