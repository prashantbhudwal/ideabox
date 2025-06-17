import {
  TChunkConfig,
  TEmbeddingConfig,
} from "~/server/modules/vector/rag.config";
import { z } from "zod";
export enum ContentType {
  POST = "post",
  PROMPT = "prompt",
  SPACE = "space",
}
export type TContentType = (typeof ContentType)[keyof typeof ContentType];

const ZContentBase = z.object({
  id: z.string(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  title: z.string(),
  shortTitle: z.string().optional(),
  description: z.string().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.enum(["health", "ai", "software", "thinking"])),
});

type TContentBase = z.infer<typeof ZContentBase>;

export const ZPostFrontmatter = ZContentBase.pick({
  id: true,
  title: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
  shortTitle: true,
  description: true,
  heroImage: true,
  tags: true,
});

export type TPost = TContentBase & {
  type: ContentType.POST;
  content: string;
};
export type TSpace = TContentBase & {
  type: ContentType.SPACE;
  Component: React.ComponentType;
};

export type TPrompt = TContentBase & {
  type: ContentType.PROMPT;
  prompt: string;
};

export type TPostIndexingMetadata = (TPost | TSpace | TPrompt) & {
  embeddingConfig: TEmbeddingConfig;
  isChunked: boolean;
  chunkConfig: TChunkConfig | null;
};
