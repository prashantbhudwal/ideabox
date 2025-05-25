import { TPost } from "@/lib/types/post";
import { mdxToGfmMarkdown } from "./mdx-to-markdown";
import { MDocument } from "@mastra/rag";
import { getRagConfig, TRagConfigVersion } from "./rag-defaults";

export const getPostChunks = async function ({
  post,
  config,
}: {
  post: TPost;
  config: TRagConfigVersion;
}) {
  const postMdx = post.content;
  const postMarkdown = await mdxToGfmMarkdown(postMdx);
  const docFromMarkdown = MDocument.fromMarkdown(postMarkdown);

  const ragConfig = getRagConfig(config);

  const chunks = await docFromMarkdown.chunk({
    size: ragConfig.maxTokens,
    overlap: ragConfig.overlap,
    strategy: "markdown",
  });

  const chunkWithMetadata = chunks.map((chunk) => {
    return {
      ...chunk,
      metadata: {
        ...chunk.metadata,
        section: chunk.metadata.section,
        postTitle: post.metadata.title,
        postSlug: post.slug,
        description: post.metadata.description,
      },
    };
  });

  return chunkWithMetadata;
};

export type TPostChunk = Awaited<ReturnType<typeof getPostChunks>>[number];
