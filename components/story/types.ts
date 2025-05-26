type StoryLayerContent = {
  text: string;
  images?: string[];
};

export const LEVEL = {
  concise: {
    name: "Concise",
    value: 1,
    description: "Quick overview of key events",
  },
  basic: {
    name: "Basic",
    value: 2,
    description: "What everyone sees.",
  },
  detailed: {
    name: "Detailed",
    value: 3,
    description: "All details, personal, professional, and philosophical.",
  },
} as const;

export const DETAIL_LABELS: Record<number, string> = {
  [LEVEL.concise.value]: "Concise",
  [LEVEL.basic.value]: "Balanced",
  [LEVEL.detailed.value]: "Detailed",
};

export type LevelOptions = (typeof LEVEL)[keyof typeof LEVEL];

interface StoryBase {
  id: string;
  coordinates: [number, number];
  zoom: number;
  title: string;
  description?: string;
}

type Layers = {
  l1: StoryLayerContent;
  l2?: StoryLayerContent;
  l3?: StoryLayerContent;
};

export type StorySubplot = Omit<Story, "subplots" | "coordinates" | "zoom">;

export type Story = StoryBase & {
  resolution: typeof LEVEL.concise | typeof LEVEL.basic | typeof LEVEL.detailed;
  layers: Layers;
  subplots?: Array<StorySubplot>;
};
