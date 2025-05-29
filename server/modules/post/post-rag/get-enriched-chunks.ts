import { mdxToGfmMarkdown } from "@/server/common/mdx-to-markdown";
import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import dedent from "dedent";
import { TPostChunk } from "./types";
import { TPost } from "@/lib/types/post.types";
const getContextualizationPrompt = (
  postMarkdown: string,
  chunk: TPostChunk,
) => {
  return dedent`
<document>
${postMarkdown}
</document>
Here is the chunk we want to situate within the whole document
<chunk>
${chunk.text}
</chunk>
Please give a short succinct context to situate this chunk within the overall document for the purposes of improving search retrieval of the chunk. Answer only with the succinct context and nothing else.
`;
};

export const enrichChunkWithContext = async function ({
  chunk,
  post,
}: {
  chunk: TPostChunk;
  post: TPost;
}) {
  const postMarkdown = await mdxToGfmMarkdown(post.content);

  const prompt = getContextualizationPrompt(postMarkdown, chunk);

  const { text: context } = await generateText({
    model: openai("gpt-4.1-nano"),
    prompt,
  });

  const contextualChunkText = `${context}\n\n${chunk.text}`;

  const updatedChunkObject = {
    ...chunk,
    text: contextualChunkText,
    metadata: {
      ...chunk.metadata,
      context,
    },
  };

  return updatedChunkObject;
};
