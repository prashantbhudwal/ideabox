import { store } from "@/server/infra/qdrant";

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
