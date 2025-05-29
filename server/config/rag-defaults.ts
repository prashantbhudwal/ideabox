export const ragConfigs = {
  v1: {
    version: "v1",
    embeddingModel: "text-embedding-3-large",
    embeddingDimension: 1536,
    maxTokens: 800,
    overlapRatio: 0.3,
    overlap: Math.floor(800 * 0.3),
  },
};

export const getRagConfig = function <T extends keyof typeof ragConfigs>(
  version: T,
) {
  return ragConfigs[version];
};

export type TRagConfigVersion = keyof typeof ragConfigs;
