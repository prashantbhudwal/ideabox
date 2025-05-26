import { TSpace } from "@/lib/types/post.types";
import { SimilaritySpace } from "./similarity";
import { SweetenerSpace } from "./sweetener";

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
    type: "space",
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
    type: "space",
  },
];

export const getSpaceBySlug = ({ slug }: { slug: string }) =>
  spaces.find((space) => space.slug === slug);
