import { TPost } from "@/lib/types/post.types";
import { store } from "@/server/infra/qdrant";
import { TPostCollectionMetadata } from "./types";
import {
  getEmbeddingConfig,
  TEmbeddingConfigVersion,
} from "@/server/config/rag.config";

import to from "await-to-js";

const getPostMetadataForCollection = ({
  posts,
  embeddingConfigVersion,
}: {
  posts: TPost[];
  embeddingConfigVersion: TEmbeddingConfigVersion;
}): TPostCollectionMetadata[] => {
  const embeddingConfig = getEmbeddingConfig(embeddingConfigVersion);

  return posts.map((post) => ({
    id: post.id,
    text: post.title,
    slug: post.slug,
    description: post.description,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    title: post.title,
    tags: post.tags,
    type: post.type,
    content: post.content,
    embeddingConfig,
  }));
};

export async function addPostToCollection({
  collectionName,
  vectors,
  posts,
  embeddingConfigVersion,
}: {
  collectionName: string;
  vectors: number[][];
  posts: TPost[];
  embeddingConfigVersion: TEmbeddingConfigVersion;
}) {
  const metadata = getPostMetadataForCollection({
    posts,
    embeddingConfigVersion,
  });

  const [error, result] = await to(
    store.upsert({
      indexName: collectionName,
      vectors,
      metadata,
      ids: posts.map((post) => post.id),
    }),
  );

  if (error) {
    console.error("Error adding post to collection:", error);
    throw error;
  }
}
