import { TPost } from "@/lib/types/post.types";
import { TEmbeddingConfig } from "@/server/modules/vector/rag.config";

export type TPostCollectionMetadata = Omit<TPost, "heroImage"> & {
  embeddingConfig: TEmbeddingConfig;
};
