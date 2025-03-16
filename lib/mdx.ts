"use server";

import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

export async function serializeMdx(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      format: "mdx",
    },
  });
}
