import {
  ContentType,
  TContentType,
  type TPost,
  type TPostIndexingMetadata,
} from "~/common/types/content.types";
import {
  getEmbeddingConfig,
  TEmbeddingConfig,
  type TEmbeddingConfigVersion,
} from "./rag.config";
import { store } from "~/server/infra/qdrant";
import to from "await-to-js";
import { type TCollectionName } from "./schema/collection-schema";

export class ContentIndexer {
  #collection: TCollectionName;
  #embeddingConfigVersion: TEmbeddingConfigVersion;

  constructor({
    collection,
    embeddingConfigVersion,
  }: {
    collection: TCollectionName;
    embeddingConfigVersion: TEmbeddingConfigVersion;
  }) {
    this.#collection = collection;
    this.#embeddingConfigVersion = embeddingConfigVersion;
  }

  public async indexWholePosts({
    posts,
    vectors,
  }: {
    posts: TPost[];
    vectors: number[][];
  }) {
    const embeddingConfig = getEmbeddingConfig(this.#embeddingConfigVersion);

    const postsMetadata: TPostIndexingMetadata[] = posts.map((post) => ({
      ...post,
      embeddingConfig,
      chunkConfig: null,
      isChunked: false,
    }));

    const [error, result] = await to(
      store.upsert({
        indexName: this.#collection,
        vectors,
        metadata: postsMetadata,
        ids: posts.map((post) => post.id),
      }),
    );

    if (error) {
      console.error("Error indexing posts:", error);
      throw error;
    }
  }
}
