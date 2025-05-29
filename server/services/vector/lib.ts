"use server";

import { TPost } from "@/lib/types/post.types";
import { store } from "./qdrant";

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
