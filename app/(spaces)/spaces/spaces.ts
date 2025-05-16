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
    name: "Sweeteners",
    desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
    Component: SweetenerSpace,
    heroImage: "sweeteners.png",
  },
  {
    id: "similarity",
    name: "Similarity",
    desc: "Compare two texts and find their similarity",
    Component: SimilaritySpace,
    heroImage: "scientific-method.png",
  },
];

export const getSpaceById = (id: string) =>
  spaces.find((space) => space.id === id);
