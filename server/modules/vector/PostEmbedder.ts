import { TPost } from "@/lib/types/content.types";
import {
  getChunkConfig,
  getEmbeddingConfig,
  TChunkConfigVersion,
  TEmbeddingConfigVersion,
} from "@/server/modules/vector/rag.config";
import { mdxToGfmMarkdown } from "@/server/utils/mdx-to-markdown";
import { openai } from "@ai-sdk/openai";
import { MDocument } from "@mastra/rag";
import { embedMany, generateText, LanguageModel } from "ai";
import dedent from "dedent";
import DataLoader from "dataloader";

type TPostChunk = {
  text: string;
  metadata: {
    section: string;
    postTitle: string;
    postSlug: string;
    description?: string;
    context?: string;
    [key: string]: unknown;
  };
};
export class PostEmbedder {
  readonly #configVersion: TEmbeddingConfigVersion;
  #posts: TPost[];
  #chunks: TPostChunk[] = [];
  #embeddings: number[][] = [];

  constructor({
    posts,
    embeddingConfigVersion,
  }: {
    posts: TPost[];
    embeddingConfigVersion: TEmbeddingConfigVersion;
  }) {
    this.#configVersion = embeddingConfigVersion;
    this.#posts = posts;
  }

  private get config() {
    return getEmbeddingConfig(this.#configVersion);
  }

  private get postCount() {
    return this.#posts.length;
  }

  private async getPostsMarkdown() {
    const postMDX = this.#posts.map((post) => post.content);
    const postsMarkdown = await Promise.all(
      postMDX.map((mdx) => mdxToGfmMarkdown(mdx)),
    );
    return postsMarkdown;
  }
  private async embedAll(items: string[]): Promise<number[][]> {
    const { model, dimensions } = this.config;

    const embeddingLoader = new DataLoader<string, number[]>(
      async (batch) => {
        const { embeddings } = await embedMany({
          model: openai.embedding(model, { dimensions }),
          values: batch as string[],
          maxRetries: 3,
        });
        return embeddings;
      },
      {
        maxBatchSize: 25,
      },
    );

    return Promise.all(items.map((item) => embeddingLoader.load(item)));
  }

  public async embedPosts(): Promise<this> {
    if (this.postCount === 0) {
      throw new Error("No posts to embed");
    }
    const postsMd = await this.getPostsMarkdown();
    this.#embeddings = await this.embedAll(postsMd);

    return this;
  }

  public async chunkPosts(configVersion: TChunkConfigVersion): Promise<this> {
    if (this.postCount === 0) {
      throw new Error("No posts to chunk");
    }
    const chunkConfig = getChunkConfig(configVersion);

    const allChunks = await Promise.all(
      this.#posts.map(async (post) => {
        const postMarkdown = await mdxToGfmMarkdown(post.content);
        const docFromMarkdown = MDocument.fromMarkdown(postMarkdown);
        const chunks = await docFromMarkdown.chunk({
          size: chunkConfig.maxTokens,
          overlap: chunkConfig.overlap,
          strategy: "markdown",
        });

        return chunks.map((chunk) => {
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
      }),
    );

    // Flatten all chunks from all posts into a single array
    this.#chunks = allChunks.flat();

    return this;
  }

  public async contextualizeChunks(model: LanguageModel): Promise<this> {
    if (this.#chunks.length === 0) {
      throw new Error("No chunks to contextualize. Call chunkPosts first.");
    }

    // Group chunks by post slug for efficient processing
    const chunksByPostSlug: Record<string, TPostChunk[]> = {};
    this.#chunks.forEach((chunk) => {
      const slug = chunk.metadata.postSlug;
      if (!chunksByPostSlug[slug]) {
        chunksByPostSlug[slug] = [];
      }
      chunksByPostSlug[slug].push(chunk);
    });

    // Process each post's chunks
    const contextualizedChunks: TPostChunk[] = [];

    await Promise.all(
      this.#posts.map(async (post) => {
        const postChunks = chunksByPostSlug[post.slug] || [];
        const postMarkdown = await mdxToGfmMarkdown(post.content);

        const enrichedChunks = await Promise.all(
          postChunks.map(async (chunk) => {
            const prompt = this.getContextualizationPrompt(postMarkdown, chunk);

            const { text: context } = await generateText({
              model,
              prompt,
            });

            return {
              ...chunk,
              text: `${context}\n\n${chunk.text}`,
              metadata: {
                ...chunk.metadata,
                context,
              },
            };
          }),
        );

        contextualizedChunks.push(...enrichedChunks);
      }),
    );

    this.#chunks = contextualizedChunks;

    return this;
  }

  public async embedChunks(): Promise<this> {
    if (this.chunks.length === 0) {
      throw new Error("No chunks to embed. Call chunkPosts first.");
    }
    const chunksToEmbed = this.chunks.map((chunk) => chunk.text);
    this.#embeddings = await this.embedAll(chunksToEmbed);
    return this;
  }

  private getContextualizationPrompt(postMarkdown: string, chunk: TPostChunk) {
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
  }

  public get chunks(): TPostChunk[] {
    return this.#chunks;
  }

  public get embeddings(): number[][] {
    return this.#embeddings;
  }

  public get posts(): TPost[] {
    return this.#posts;
  }
}
