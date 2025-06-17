export enum ChunkingStrategyEnum {
  MARKDOWN = "markdown",
  SENTENCE = "sentence",
  CONTEXTUAL_MARKDOWN = "contextual-markdown",
}

export type ChunkConfigVersion = "v1";

export type TChunkConfig = {
  readonly version: ChunkConfigVersion;
  readonly maxTokens: number;
  readonly overlapRatio: number;
  readonly overlap: number;
  readonly chunkingStrategy: ChunkingStrategyEnum;
};

export enum SimilarityMetric {
  COSINE = "cosine",
}

export type TSimilarityMetric = (typeof SimilarityMetric)[keyof typeof SimilarityMetric];

export type TEmbeddingConfig = {
  readonly version: string;
  readonly model: string;
  readonly dimensions: number;
  readonly metric: TSimilarityMetric;
};

export type TRagConfigVersion = "v1";
export type TRagConfig = {
  readonly version: TRagConfigVersion;
  readonly chunkConfig: TChunkConfig;
  readonly embeddingConfig: TEmbeddingConfig;
};

export type TEmbeddingConfigVersion = "v1";
export type TChunkConfigVersion = "v1";

const embeddingConfigs: Record<TEmbeddingConfigVersion, TEmbeddingConfig> = {
  // DO NOT CHANGE THIS, IT IS USED IN MIGRATION SCRIPTS, create new version if needed
  v1: {
    version: "v1",
    model: "text-embedding-3-large",
    dimensions: 1536,
    metric: SimilarityMetric.COSINE,
  },
};

const chunkConfigs: Record<TChunkConfigVersion, TChunkConfig> = {
  v1: {
    version: "v1",
    maxTokens: 800,
    overlapRatio: 0.3,
    overlap: Math.floor(800 * 0.3),
    chunkingStrategy: ChunkingStrategyEnum.CONTEXTUAL_MARKDOWN,
  },
};

export const getEmbeddingConfig = function <T extends TEmbeddingConfigVersion>(
  version: T,
) {
  return embeddingConfigs[version];
};

export const getChunkConfig = function <T extends TChunkConfigVersion>(
  version: T,
) {
  return chunkConfigs[version];
};
