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

export type TEmbeddingConfig = {
  readonly version: string;
  readonly model: string;
  readonly dimensions: number;
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
  v1: {
    version: "v1",
    model: "text-embedding-3-large",
    dimensions: 1536,
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

const ragConfigs: Record<TEmbeddingConfigVersion, TRagConfig> = {
  v1: {
    version: "v1",
    chunkConfig: chunkConfigs.v1,
    embeddingConfig: embeddingConfigs.v1,
  },
};

export const getRagConfig = function <T extends TRagConfigVersion>(version: T) {
  return ragConfigs[version];
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
