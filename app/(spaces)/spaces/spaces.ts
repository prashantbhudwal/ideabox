import { SimilaritySpace } from "./similarity";
import { SweetenerSpace } from "./sweetener";

type SpaceDefinition = {
  id: string;
  name: string;
  desc: string;
  heroImage: string;
  Component: React.ComponentType;
};

export const spaces = [
  {
    id: "sweetener-comparison",
    name: "Compare Sweeteners",
    desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
    Component: SweetenerSpace,
    heroImage: "sweeteners.webp",
  },
  {
    id: "similarity",
    name: "Text Similarity",
    desc: "Find similarity between two texts using OpenAI embeddings.",
    Component: SimilaritySpace,
    heroImage: "similarity.webp",
  },
];

export const getSpaceById = (id: string) =>
  spaces.find((space) => space.id === id);
