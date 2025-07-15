import { ContentType, type TSpace } from "~/common/types/content.types";
import { SimilaritySpace } from "./similarity";
import { SweetenerSpace } from "./sweetener";
import { ChunkerSpace } from "./chunker";

export const spaces: TSpace[] = [
  {
    id: "c335bd7f-cf8e-4e4e-9b04-6a6d1b36e7bb",
    slug: "sweetener-comparison",
    description:
      "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
    Component: SweetenerSpace,
    heroImage: "sweeteners.webp",
    tags: ["health", "software"],
    title: "Compare Sweeteners",
    shortTitle: "Sweeteners",
    createdAt: "2025-05-26T11:48:24.000Z",
    updatedAt: "2025-05-26T11:48:24.000Z",
    type: ContentType.SPACE,
  },
  {
    id: "8a1a8093-0f02-4b20-a780-6d24e87a230f",
    slug: "text-similarity",
    description: "Find similarity between two texts using OpenAI embeddings.",
    Component: SimilaritySpace,
    heroImage: "similarity.webp",
    tags: ["ai", "software"],
    title: "Text Similarity",
    shortTitle: "Similarity",
    createdAt: "2025-05-26T11:48:24.000Z",
    updatedAt: "2025-05-26T11:48:24.000Z",
    type: ContentType.SPACE,
  },
  {
    id: "c044f7bb-7a12-44fe-813f-9ae423aeda85",
    slug: "chunker",
    description:
      "Chunker is a tool that helps you chunk your text into smaller pieces.",
    Component: ChunkerSpace,
    heroImage: "chunker.png",
    tags: ["thinking", "software"],
    title: "Text Chunker",
    shortTitle: "Chunker",
    createdAt: "2025-07-15T11:48:24.000Z",
    updatedAt: "2025-07-15T11:48:24.000Z",
    type: ContentType.SPACE,
  },
];

export const getSpaceBySlug = ({ slug }: { slug: string }) =>
  spaces.find((space) => space.slug === slug);
