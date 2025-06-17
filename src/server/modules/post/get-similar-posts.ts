import { store } from "~/server/infra/qdrant";
import { getEmbeddingConfig } from "../vector/rag.config";

export const getSimilarPosts = async ({ id }: { id: string }) => {
  const dummyVector = new Array(getEmbeddingConfig("v1").dimensions).fill(0);

  const searchResults = await store.query({
    indexName: "documents",
    filter: {
      $hasId: [id],
    },
    queryVector: dummyVector,
    includeVector: true,
  });

  const targetVector = searchResults[0].vector;

  if (!targetVector) {
    console.error("Target vector not found");
    return [];
  }

  try {
    const similarPosts = await store.query({
      indexName: "documents",
      queryVector: targetVector,
      filter: {
        $not: {
          $hasId: [id],
        },
      },
      topK: 3,
    });

    const similarPostIds = similarPosts.map((post) => post.id);

    return similarPostIds;
  } catch (error) {
    console.error("Error getting similar posts:", error);
    return [];
  }
};
