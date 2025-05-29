import { TPost } from "@/lib/types/post.types";
import { mdxToGfmMarkdown } from "@/server/common/mdx-to-markdown";
import { MDocument } from "@mastra/rag";
import { embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import dedent from "dedent";
import { generateText } from "ai";
import {
  getRagConfig,
  TRagConfigVersion,
} from "@/server/common/config/rag-defaults";
import { store } from "@/server/infra/qdrant";
import { getPostBySlug } from "./core";

export async function createCollection({
  collectionName,
  dimension,
}: {
  collectionName: string;
  dimension: number;
}) {
  await store.createIndex({
    indexName: collectionName,
    dimension,
  });
}

type TPostCollectionMetadata = {
  id: string;
  text: string;
  slug: string;
  description?: string;
};

const getPostMetadataForCollection = (
  posts: TPost[],
): TPostCollectionMetadata[] => {
  return posts.map((post) => ({
    id: post.slug,
    text: post.title,
    slug: post.slug,
    description: post.description,
  }));
};

export async function addPostsToCollection({
  collectionName,
  vectors,
  posts,
}: {
  collectionName: string;
  vectors: number[][];
  posts: TPost[];
}) {
  const metadata = getPostMetadataForCollection(posts);

  await store.upsert({
    indexName: collectionName,
    vectors,
    metadata,
    ids: posts.map((post) => post.slug),
  });
}

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

export type TPostChunk = Awaited<ReturnType<typeof getPostChunks>>[number];

export const embedPost = async function ({
  chunks,
  config,
}: {
  chunks: TPostChunk[];
  config: TRagConfigVersion;
}) {
  const ragConfig = getRagConfig(config);

  const { embeddings } = await embedMany({
    model: openai.embedding(ragConfig.embeddingModel, {
      dimensions: ragConfig.embeddingDimension,
    }),
    values: chunks.map((chunk) => chunk.text),
  });

  return embeddings;
};

export const runEmbeddingPipeline = async function () {
  const post = await getPostBySlug("poonch-one");
  const chunks = await getPostChunks({
    post,
    config: "v1",
  });

  // const enrichedChunk = await enrichChunkWithContext({
  //   chunk: firstChunk,
  //   post,
  // });

  // const embeddings = await embedPost({
  //   chunks: [enrichedChunk],
  //   config: "v1",
  // });

  // const enrichedChunks = await Promise.all(
  //   chunks.map((chunk) => {
  //     return generateChunkContext({
  //       chunk,
  //       post,
  //     });
  //   }),
  // );

  return chunks;
};
