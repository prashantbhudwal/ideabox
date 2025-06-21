import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import readline from "readline";

type PostCreationResult = {
  success: boolean;
  message: string;
  postPath?: string;
  componentsPath?: string;
  indexPath?: string;
};

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Define paths
const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "posts");
const COMPONENTS_FILE = path.join(
  process.cwd(),
  "components",
  "blog",
  "mdx",
  "post-components.tsx",
);

/**
 * Prompts the user with a question and returns their answer
 * @param question - The question to ask the user
 * @returns A promise that resolves to the user's answer
 */
const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

/**
 * Creates a directory if it doesn't already exist
 * @param dirPath - The path of the directory to create
 * @returns void
 */
const createDirIfNotExists = (dirPath: string): void => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
};

/**
 * Creates a new blog post with the necessary structure
 * @returns A promise that resolves to the result of the post creation
 */
const createPost = async (): Promise<PostCreationResult> => {
  try {
    // Get slug from user
    const slug = await prompt("Enter post slug (kebab-case): ");

    if (!slug) {
      return {
        success: false,
        message: "Slug cannot be empty",
      };
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return {
        success: false,
        message: "Slug must be in kebab-case format (e.g., my-post-slug)",
      };
    }

    const postDir = path.join(POSTS_DIR, slug);

    // Check if post directory already exists
    if (fs.existsSync(postDir)) {
      return {
        success: false,
        message: `Post with slug '${slug}' already exists`,
      };
    }

    // Create post directory
    createDirIfNotExists(postDir);

    // Create components directory
    const componentsDir = path.join(postDir, "components");
    createDirIfNotExists(componentsDir);

    // Create post files
    const now = new Date().toISOString();
    const postId = uuidv4();

    // Create MDX file with frontmatter
    const mdxContent = `---
title: ${slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}
createdAt: ${now}
updatedAt: ${now}
id: ${postId}
shortTitle: ''
heroImage: ''
description: ''
tags: []
slug: ${slug}
---

Write your post content here.
`;

    const mdxFilePath = path.join(postDir, `${slug}.mdx`);
    fs.writeFileSync(mdxFilePath, mdxContent);
    console.log(`Created MDX file: ${slug}.mdx`);

    // Create index.tsx file
    const camelCaseSlug = slug.replace(/-([a-z])/g, (_, letter) =>
      (letter as string).toUpperCase(),
    );
    const indexContent = `import dynamic from "next/dynamic";

export const ${camelCaseSlug} = {
  // Add your components here, for example:
  // ExampleComponent: dynamic(
  //   () => import("./components/example-component"),
  //   { ssr: false },
  // ),
};
`;

    const indexFilePath = path.join(postDir, "index.tsx");
    fs.writeFileSync(indexFilePath, indexContent);
    console.log(`Created index.tsx file`);

    // Update post-components.tsx
    if (fs.existsSync(COMPONENTS_FILE)) {
      let componentsContent = fs.readFileSync(COMPONENTS_FILE, "utf-8");

      // Add import statement
      const importStatement = `import { ${camelCaseSlug} } from "@/content/posts/${slug}";\n`;

      // Find the first import statement to insert after
      const importIndex = componentsContent.indexOf("import");
      if (importIndex !== -1) {
        const endOfImportLine =
          componentsContent.indexOf("\n", importIndex) + 1;
        componentsContent =
          componentsContent.substring(0, endOfImportLine) +
          importStatement +
          componentsContent.substring(endOfImportLine);
      }

      // Add to postComponents object
      const postComponentsIndex = componentsContent.indexOf(
        "export const postComponents = {",
      );
      if (postComponentsIndex !== -1) {
        const afterOpenBrace =
          componentsContent.indexOf("{", postComponentsIndex) + 1;
        const newComponentEntry = `\n  ...${camelCaseSlug},`;
        componentsContent =
          componentsContent.substring(0, afterOpenBrace) +
          newComponentEntry +
          componentsContent.substring(afterOpenBrace);
      }

      fs.writeFileSync(COMPONENTS_FILE, componentsContent);
      console.log(`Updated ${COMPONENTS_FILE}`);
    } else {
      console.error(`Components file not found: ${COMPONENTS_FILE}`);
      return {
        success: false,
        message: `Components file not found: ${COMPONENTS_FILE}`,
      };
    }

    return {
      success: true,
      message: `Post '${slug}' created successfully!`,
      postPath: mdxFilePath,
      componentsPath: componentsDir,
      indexPath: indexFilePath,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
};

/**
 * Main function to run the script
 */
const main = async (): Promise<void> => {
  try {
    console.log("🚀 Post Creator - Create a new blog post with components\n");

    const result = await createPost();

    if (result.success) {
      console.log("\n✅ " + result.message);
      console.log("\nYou can now:");
      console.log(`- Edit the post at: ${result.postPath}`);
      console.log(`- Add custom components in: ${result.componentsPath}`);
    } else {
      console.error("\n❌ " + result.message);
    }
  } catch (error) {
    console.error(
      `\n❌ Unexpected error: ${error instanceof Error ? error.message : String(error)}`,
    );
  } finally {
    rl.close();
  }
};

// Run the script
main();
