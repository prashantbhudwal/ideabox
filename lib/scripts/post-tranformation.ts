/**
 * Transforms a post from the old format to the new format.
 * This mainly means changing the metadata format.
 * The old metadata is of the type
 * export type TPostMetadata = {
  title: string;
  date: string;
  slug: string;
  heroImage?: string;
  description?: string;
};
* The new metadata is of the type
 * export type TPostFrontmatter = {
 *   id: string;
 *   title: string;
 *   slug: string;
 *   createdAt: string;
 *   updatedAt: string;
 *   shortTitle: string;
 *   description: string;
 *   heroImage: string;
 * };
 * 
 * THis will be done by reading frontmatter of all mdx files in content/posts
 * and then updating the metadata of the post.
 * 
 * Change the date to createdAt
 * Set updatedAt to createdAt as it is an initial creation
 * Generate and set id to uuid
 * Set shortTitle to title if it is not present
 * Set a blank hero image if it is not present
 * Set description to "" if it is not present
 * Set tags to [] if it is not present
 * set the slug to the directory name of the post
 * delete the date field
 * 
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { v4 as uuid } from "uuid";

// Stats tracking variables
type TransformationStats = {
  totalDirectories: number;
  totalMdxFiles: number;
  processedDirectories: number;
  processedFiles: number;
  startTime: number;
};

const stats: TransformationStats = {
  totalDirectories: 0,
  totalMdxFiles: 0,
  processedDirectories: 0,
  processedFiles: 0,
  startTime: Date.now(),
};

// Initial setup
const postsDirectory = join(process.cwd(), "content/posts");
console.log(`\n📂 Scanning directory: ${postsDirectory}`);

const entries = readdirSync(postsDirectory, { withFileTypes: true });
const directories = entries.filter((entry) => entry.isDirectory());
stats.totalDirectories = directories.length;

console.log(`Found ${stats.totalDirectories} post directories to process\n`);

// Count total MDX files before processing
let totalMdxFilesCount = 0;
for (const dir of directories) {
  const dirPath = join(postsDirectory, dir.name);
  const dirFiles = readdirSync(dirPath, { withFileTypes: true });
  const dirMdxFiles = dirFiles.filter(
    (file) => file.isFile() && file.name.endsWith(".mdx")
  );
  totalMdxFilesCount += dirMdxFiles.length;
}
stats.totalMdxFiles = totalMdxFilesCount;
console.log(`Found ${stats.totalMdxFiles} total MDX files to transform\n`);
console.log(`🔄 Starting transformation process...\n`);

// Process each directory
for (const directory of directories) {
  stats.processedDirectories++;
  const directoryPath = join(postsDirectory, directory.name);
  console.log(`Processing directory (${stats.processedDirectories}/${stats.totalDirectories}): ${directory.name}`);
  
  const files = readdirSync(directoryPath, { withFileTypes: true });
  const mdxFiles = files.filter(
    (file) => file.isFile() && file.name.endsWith(".mdx"),
  );
  
  console.log(`  Found ${mdxFiles.length} MDX files in this directory`);
  
  for (const mdxFile of mdxFiles) {
    stats.processedFiles++;
    const filePath = join(directoryPath, mdxFile.name);
    console.log(`  Transforming file (${stats.processedFiles}/${stats.totalMdxFiles}): ${mdxFile.name}`);
    
    const fileContents = readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    
    // Create a new frontmatter object without the date field
    const { date, ...restFrontmatter } = frontmatter;
    
    const newFrontmatter = {
      ...restFrontmatter,
      // Change the date to createdAt
      createdAt: date,
      // Set updatedAt to createdAt as it is an initial creation
      updatedAt: date,
      // Generate and set id to uuid
      id: uuid(),
      // Set shortTitle to title if it is not present
      shortTitle: frontmatter.shortTitle || frontmatter.title,
      // Set a blank hero image if it is not present
      heroImage: frontmatter.heroImage || "",
      // Set description to "" if it is not present
      description: frontmatter.description || "",
      // Set tags to [] if it is not present
      tags: frontmatter.tags || [],
      // Set the slug to the directory name of the post
      slug: directory.name,
    };
    
    const newFileContents = matter.stringify(content, newFrontmatter);
    writeFileSync(filePath, newFileContents);
    console.log(`  ✅ Successfully transformed ${mdxFile.name}`);
  }
  
  console.log(`✅ Completed directory: ${directory.name}\n`);
}

// Display final summary statistics
const endTime = Date.now();
const processingTimeSeconds = ((endTime - stats.startTime) / 1000).toFixed(2);

console.log(`\n📊 Transformation Summary:`);
console.log(`---------------------------`);
console.log(`Total directories processed: ${stats.processedDirectories}/${stats.totalDirectories}`);
console.log(`Total files transformed: ${stats.processedFiles}/${stats.totalMdxFiles}`);
console.log(`Processing time: ${processingTimeSeconds} seconds`);
console.log(`---------------------------`);
console.log(`\n✨ Post transformation completed successfully!\n`);

