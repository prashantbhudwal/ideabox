"use server";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkStringify from "remark-stringify";
import { unified } from "unified";

export async function mdxToGfmMarkdown(mdxContent: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm, {
      tableCellPadding: true,
      tablePipeAlign: false,
      stringLength: (s: string) => s.length,
    })
    .use(remarkMdx)
    .use(remarkStringify, {
      bullet: "-",
      fence: "`",
      fences: true,
      incrementListMarker: false,
    })
    .process(mdxContent);

  return String(result);
}
