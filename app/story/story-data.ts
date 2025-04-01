import endent from "endent";

export const LEVEL = {
  concise: {
    name: "Concise",
    value: 1,
    description: "Quick overview of key events",
  },
  professional: {
    name: "Professional",
    value: 2,
    description: "Career and work-related details",
  },
  personal: {
    name: "Personal",
    value: 3,
    description: "Personal experiences and growth",
  },
  philosophical: {
    name: "Philosophical",
    value: 4,
    description: "Deep insights and reflections",
  },
} as const;

export type LevelOptions = (typeof LEVEL)[keyof typeof LEVEL];

type StoryLayerContent = {
  text: string;
  images?: string[];
};

interface StoryBase {
  id: string;
  coordinates: [number, number];
  zoom: number;
  title: string;
  description?: string;
}

type LayersConcise = { concise: StoryLayerContent };
type LayersProfessional = LayersConcise & { professional: StoryLayerContent };
type LayersPersonal = LayersProfessional & { personal: StoryLayerContent };
type LayersPhilosophical = LayersPersonal & {
  philosophical: StoryLayerContent;
};

export type StorySubplot =
  | Omit<StoryConcise, "subplots" | "coordinates" | "zoom">
  | Omit<StoryProfessional, "subplots" | "coordinates" | "zoom">
  | Omit<StoryPersonal, "subplots" | "coordinates" | "zoom">
  | Omit<StoryPhilosophical, "subplots" | "coordinates" | "zoom">;

type StoryConcise = StoryBase & {
  resolution: typeof LEVEL.concise;
  layers: LayersConcise & {
    professional?: StoryLayerContent;
    personal?: StoryLayerContent;
    philosophical?: StoryLayerContent;
  };
  subplots?: StorySubplot[];
};

type StoryProfessional = StoryBase & {
  resolution: typeof LEVEL.professional;
  layers: LayersProfessional & {
    personal?: StoryLayerContent;
    philosophical?: StoryLayerContent;
  };
  subplots?: StorySubplot[];
};

type StoryPersonal = StoryBase & {
  resolution: typeof LEVEL.personal;
  layers: LayersPersonal & {
    philosophical?: StoryLayerContent;
  };
  subplots?: StorySubplot[];
};

type StoryPhilosophical = StoryBase & {
  resolution: typeof LEVEL.philosophical;
  layers: LayersPhilosophical;
  subplots?: StorySubplot[];
};

export type Story =
  | StoryConcise
  | StoryProfessional
  | StoryPersonal
  | StoryPhilosophical;

export const layersPoints: Story[] = [
  {
    id: "poonch",
    coordinates: [74.0933, 33.7714],
    zoom: 11,
    title: "Poonch",
    description: "1993-2009",
    resolution: LEVEL.philosophical,
    layers: {
      concise: {
        text: "I was born in the early 90s in Poonch - a small, but beautiful town the border of India and Pakistan.",
      },

      professional: {
        text: "Professional Text",
      },
      personal: {
        text: "Personal Text",
      },
      philosophical: {
        text: "Philosophical Text",
      },
    },
  },
  {
    id: "jammu",
    coordinates: [74.857, 32.7266],
    zoom: 11.5,
    title: "Jammu",
    description: "2009-2012",
    resolution: LEVEL.concise,
    layers: {
      concise: {
        text: "This is where I did my 11th and 12th. Once a vacation destination, this is where I pursued every Indian's dream of studying for IIT.",
      },
    },
  },
  {
    id: "mumbai",
    coordinates: [72.8777, 19.076],
    zoom: 10.5,
    title: "Mumbai",
    description: "2012-2022",
    resolution: LEVEL.concise,
    layers: {
      concise: {
        text: "This is city where I became myself - this is where I earned my degree, got my first job, had my first drink, rented my first apartment and started my first startup. Mumbai is as much a home to me as my hometown.",
      },
    },

    subplots: [
      {
        id: "college",
        title: "Engineering Degree",
        description: "2012-16",
        layers: {
          concise: {
            text: endent`
        I did my Bachelor in Engineering in Information Technology from Mumbai University. I scored well, never failed, got placed after it, but knowing what I know now, I don't know what I learned, other then obedience.`,
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "job",
        title: "First Job",
        description: "2016-18",
        layers: {
          concise: {
            text: endent`I was placed out of college but did not join after orientation, instead I took up an unpaid internship at a Startup. The buttoned up shirts, rows of cubicles and hierarchies makes me want to puke. 
        
        The internship converted to a job in 3 months, and later to a founding-team designation. You can read the whole layers [here](https://example.com).`,
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "first-startup",
        title: "First Revenue",
        description: "2018-19",
        layers: {
          concise: {
            text: "",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "crash",
        title: "Health",
        description: "2019-21",
        layers: {
          concise: {
            text: "",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "medal",
        title: "Training Teachers",
        description: "2021-2022",
        layers: {
          concise: {
            text: endent`I started Mungr (renamed to Medal) in 2021 with a hope of creating a teacher hiring platform. I hired a couple of interns and started with a simple teacher training and evaluation. We trained over 20 teachers, got 5 of them jobs at companies but made zero money out of this.
        
        We started creating a Platform in the beginning of 2022. The interns were doing the programming.
        `,
          },
        },

        resolution: LEVEL.concise,
      },
    ],
  },
  {
    id: "bangalore",
    coordinates: [77.5946, 12.9716],
    zoom: 11,
    title: "Bengaluru",
    description: "2022-present",
    layers: {
      concise: {
        text: "First company that made revenue.",
      },
    },

    resolution: LEVEL.concise,
    subplots: [
      {
        id: "code",
        title: "Code, Sleep, Repeat",
        description: "2022-23",
        layers: {
          concise: {
            text: endent`Hiring engineers as a non-technical founder is a big pain. At this point in time, I no longer wanted to deal with this pain. So I decided that I would learn to code. The end of 2022 and the beginning of 2023 was all about learning to code.
        
        I enrolled in Scrimba, which in my opinion is the best place to learn code. I had tried to learn programming many times before, but this was the first time I felt supported and was successful. [Here](https://example.com) are my thoughts after coding for 365 days.
        `,
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "falconai",
        title: "AI Teachers",
        description: "2023-24",
        layers: {
          concise: {
            text: "",
          },
        },

        resolution: LEVEL.concise,
      },
      {
        id: "break",
        title: "Recovery",
        description: "2024-present",
        layers: {
          concise: {
            text: "",
          },
        },

        resolution: LEVEL.concise,
      },
    ],
  },
];

export const DETAIL_LABELS: Record<number, string> = {
  [LEVEL.concise.value]: "Concise",
  [LEVEL.professional.value]: "Default",
  [LEVEL.personal.value]: "Detailed",
  [LEVEL.philosophical.value]: "Deep Dive",
};
