import { TPost } from "@/lib/types/post.types";
import { TRagConfigVersion } from "@/server/config/rag-defaults";
import { getRagConfig } from "@/server/config/rag-defaults";
import { mdxToGfmMarkdown } from "@/server/common/mdx-to-markdown";
import { MDocument } from "@mastra/rag";

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
        postTitle: post.title,
        postSlug: post.slug,
        description: post.description,
      },
    };
  });

  return chunkWithMetadata;
};
