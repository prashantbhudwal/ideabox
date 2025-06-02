"use server";

import fs from "fs";
import path from "path";
import {
  serialize,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import remarkGfm from "remark-gfm";
import { isDev } from "@/lib/utils";

/**
 * Type for the scope that will be available in MDX
 */
type MdxScope = Record<string, unknown>;

/**
 * Processes MDX content using next-mdx-remote-client
 * @param content - The MDX content to process
 * @returns The serialized MDX content ready for rendering
 */
export async function processMdx(
  content: string,
): Promise<SerializeResult<Record<string, unknown>, MdxScope>> {
  // Using serialize from next-mdx-remote-client
  return await serialize<Record<string, unknown>, MdxScope>({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        format: "mdx",
        development: isDev,
      },
      parseFrontmatter: true,
      // Ensure no async/await in the compiled output
      disableExports: true,
      disableImports: true,
    },
  });
}

// /**
//  * Reads an MDX file from the filesystem and processes it
//  * @param filePath - Path to the MDX file
//  * @returns The serialized MDX content ready for rendering
//  */
// export async function readAndProcessMdxFile(
//   filePath: string,
// ): Promise<SerializeResult<Record<string, unknown>, MdxScope>> {
//   const fullPath = path.join(process.cwd(), filePath);
//   const fileContent = fs.readFileSync(fullPath, "utf8");
//   return await processMdx(fileContent);
// }
