"use server";
import { compile } from "@mdx-js/mdx";
import { createServerFn } from "@tanstack/react-start";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import { isDev } from "~/lib/utils";

export const processMdxContent = createServerFn({
  type: "static", // Static generation at build time
  method: "GET",
})
  .validator((content: string) => {
    if (typeof content !== "string") {
      throw new Error("Content must be a string");
    }
    return content;
  })
  .handler(async ({ data }) => {
    try {
      // Parse frontmatter from MDX content
      const { data: frontmatter, content: mdxContent } = matter(data);

      // Compile MDX to JSX
      const compiledResult = await compile(mdxContent, {
        remarkPlugins: [remarkGfm],
        development: isDev,
        outputFormat: "function-body",
      });

      return {
        compiledSource: String(compiledResult),
        frontmatter,
        error: null,
      };
    } catch (error) {
      console.error("Error processing MDX:", error);
      return {
        compiledSource: "",
        frontmatter: {},
        error: error instanceof Error ? error.message : String(error),
      };
    }
  });
