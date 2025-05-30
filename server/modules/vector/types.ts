import { TPost } from "@/lib/types/post.types";
import { TEmbeddingConfig } from "@/server/config/rag.config";

export type TPostCollectionMetadata = Omit<TPost, "heroImage"> & {
  embeddingConfig: TEmbeddingConfig;
};
