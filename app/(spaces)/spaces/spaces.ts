import { SimilaritySpace } from "./similarity";
import { SweetenerSpace } from "./sweetener";

type tagOptions = "health" | "ai" | "software" | "thinking";

type SpaceDefinition = {
  id: string;
  name: string;
  desc: string;
  heroImage: string;
  Component: React.ComponentType;
  tags: tagOptions[];
  title: string;
};

export const spaces: SpaceDefinition[] = [
  {
    id: "sweetener-comparison",
    name: "Compare Sweeteners",
    desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
    Component: SweetenerSpace,
    heroImage: "sweeteners.webp",
    tags: ["health", "software"],
    title: "Sweeteners",
  },
  {
    id: "text-similarity",
    name: "Text Similarity",
    desc: "Find similarity between two texts using OpenAI embeddings.",
    Component: SimilaritySpace,
    heroImage: "similarity.webp",
    tags: ["ai", "software"],
    title: "Similarity",
  },
];

export const getSpaceById = (id: string) =>
  spaces.find((space) => space.id === id);
