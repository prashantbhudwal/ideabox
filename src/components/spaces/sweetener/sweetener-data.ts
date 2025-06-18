type Source = {
  url: string;
  description: string;
};

type SweetenerInfo = {
  name: string;
  tldr: string;
  gi: number;
  relativeSweetness: number;
  state: "powder" | "liquid" | "both";
  requiresCarrier: boolean;
  solidCarrier: string | undefined;
  liquidCarrier: string | undefined;
  caloriesPerGram: number;
};

export type SweetenerData = Array<
  SweetenerInfo & {
    sources: Record<keyof SweetenerInfo, Source>;
  }
>;

export const sweetenerData: SweetenerData = [
  {
    name: "Honey",
    tldr: "Natural sweetener from bees, high in fructose.",
    gi: 60,
    relativeSweetness: 1.2,
    state: "both",
    requiresCarrier: false,
    solidCarrier: undefined,
    liquidCarrier: undefined,
    caloriesPerGram: 3,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "Wikipedia page on honey",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "Overview of honey",
      },
      gi: {
        url: "https://glycemic-index.net/honey",
        description: "Glycemic index of honey",
      },
      relativeSweetness: {
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4519653",
        description: "Sweetness of honey compared to sugar",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "Forms of honey",
      },
      requiresCarrier: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "Use of honey in food",
      },
      solidCarrier: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "No solid carrier needed for honey",
      },
      liquidCarrier: {
        url: "https://en.wikipedia.org/wiki/Honey",
        description: "No liquid carrier needed for honey",
      },
      caloriesPerGram: {
        url: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/169640/nutrients",
        description: "Nutritional information for honey",
      },
    },
  },
  {
    name: "Maple Syrup",
    tldr: "Natural sweetener from maple tree sap, primarily sucrose.",
    gi: 54,
    relativeSweetness: 1,
    state: "both",
    requiresCarrier: false,
    solidCarrier: undefined,
    liquidCarrier: undefined,
    caloriesPerGram: 2.6,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "Wikipedia page on maple syrup",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "Overview of maple syrup",
      },
      gi: {
        url: "https://glycemic-index.net/maple-syrup",
        description: "Glycemic index of maple syrup",
      },
      relativeSweetness: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "Sweetness of maple syrup",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "Forms of maple syrup",
      },
      requiresCarrier: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "Use of maple syrup",
      },
      solidCarrier: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "No solid carrier needed for maple syrup",
      },
      liquidCarrier: {
        url: "https://en.wikipedia.org/wiki/Maple_syrup",
        description: "No liquid carrier needed for maple syrup",
      },
      caloriesPerGram: {
        url: "https://fdc.nal.usda.gov/fdc-app.html#/food-details/169661/nutrients",
        description: "Nutritional information for maple syrup",
      },
    },
  },
  {
    name: "Stevia",
    tldr: "Natural, zero-calorie sweetener from the Stevia plant.",
    gi: 0,
    relativeSweetness: 250,
    state: "both",
    requiresCarrier: true,
    solidCarrier: "Maltodextrin",
    liquidCarrier: "Water",
    caloriesPerGram: 0,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Stevia",
        description: "Wikipedia page on stevia",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Stevia",
        description: "Overview of stevia",
      },
      gi: {
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890837",
        description: "Stevia and blood sugar impact",
      },
      relativeSweetness: {
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890837",
        description: "Sweetness of stevia",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Stevia",
        description: "Forms of stevia",
      },
      requiresCarrier: {
        url: "https://www.stevia.com",
        description: "Stevia often requires carriers",
      },
      solidCarrier: {
        url: "https://www.stevia.com",
        description: "Common solid carrier for stevia",
      },
      liquidCarrier: {
        url: "https://www.stevia.com",
        description: "Common liquid carrier for stevia",
      },
      caloriesPerGram: {
        url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4890837",
        description: "Caloric content of stevia",
      },
    },
  },
  {
    name: "Monk Fruit",
    tldr: "Natural, zero-calorie sweetener from monk fruit extract.",
    gi: 0,
    relativeSweetness: 150,
    state: "both",
    requiresCarrier: true,
    solidCarrier: "Erythritol",
    liquidCarrier: "Water",
    caloriesPerGram: 0,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Siraitia_grosvenorii",
        description: "Wikipedia page on monk fruit",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Siraitia_grosvenorii",
        description: "Overview of monk fruit",
      },
      gi: {
        url: "https://www.healthline.com/nutrition/monk-fruit-sweetener",
        description: "Glycemic index of monk fruit",
      },
      relativeSweetness: {
        url: "https://www.healthline.com/nutrition/monk-fruit-sweetener",
        description: "Sweetness of monk fruit",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Siraitia_grosvenorii",
        description: "Forms of monk fruit sweetener",
      },
      requiresCarrier: {
        url: "https://www.lakanto.com",
        description: "Monk fruit often requires carriers",
      },
      solidCarrier: {
        url: "https://www.lakanto.com",
        description: "Common solid carrier for monk fruit",
      },
      liquidCarrier: {
        url: "https://www.lakanto.com",
        description: "Common liquid carrier for monk fruit",
      },
      caloriesPerGram: {
        url: "https://www.healthline.com/nutrition/monk-fruit-sweetener",
        description: "Caloric content of monk fruit",
      },
    },
  },
  {
    name: "Aspartame",
    tldr: "Artificial, zero-calorie sweetener used in diet products.",
    gi: 0,
    relativeSweetness: 200,
    state: "both",
    requiresCarrier: true,
    solidCarrier: "Maltodextrin",
    liquidCarrier: "Water",
    caloriesPerGram: 0,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Wikipedia page on aspartame",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Overview of aspartame",
      },
      gi: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Aspartame and blood sugar",
      },
      relativeSweetness: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Sweetness of aspartame",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Forms of aspartame",
      },
      requiresCarrier: {
        url: "https://www.aspartame.org",
        description: "Aspartame often requires carriers",
      },
      solidCarrier: {
        url: "https://www.aspartame.org",
        description: "Common solid carrier for aspartame",
      },
      liquidCarrier: {
        url: "https://www.aspartame.org",
        description: "Common liquid carrier for aspartame",
      },
      caloriesPerGram: {
        url: "https://en.wikipedia.org/wiki/Aspartame",
        description: "Caloric content of aspartame",
      },
    },
  },
  {
    name: "Sucralose",
    tldr: "Artificial, zero-calorie sweetener, highly stable.",
    gi: 0,
    relativeSweetness: 600,
    state: "both",
    requiresCarrier: true,
    solidCarrier: "Maltodextrin",
    liquidCarrier: "Water",
    caloriesPerGram: 0,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Wikipedia page on sucralose",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Overview of sucralose",
      },
      gi: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Sucralose and blood sugar",
      },
      relativeSweetness: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Sweetness of sucralose",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Forms of sucralose",
      },
      requiresCarrier: {
        url: "https://www.splenda.com",
        description: "Sucralose often requires carriers",
      },
      solidCarrier: {
        url: "https://www.splenda.com",
        description: "Common solid carrier for sucralose",
      },
      liquidCarrier: {
        url: "https://www.splenda.com",
        description: "Common liquid carrier for sucralose",
      },
      caloriesPerGram: {
        url: "https://en.wikipedia.org/wiki/Sucralose",
        description: "Caloric content of sucralose",
      },
    },
  },
  {
    name: "Xylitol",
    tldr: "Sugar alcohol with fewer calories, used in gum and candies.",
    gi: 10,
    relativeSweetness: 1,
    state: "both",
    requiresCarrier: false,
    solidCarrier: undefined,
    liquidCarrier: undefined,
    caloriesPerGram: 2.4,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "Wikipedia page on xylitol",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "Overview of xylitol",
      },
      gi: {
        url: "https://www.healthline.com/nutrition/xylitol-101",
        description: "Glycemic index of xylitol",
      },
      relativeSweetness: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "Sweetness of xylitol",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "Forms of xylitol",
      },
      requiresCarrier: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "Use of xylitol",
      },
      solidCarrier: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "No solid carrier needed for xylitol",
      },
      liquidCarrier: {
        url: "https://en.wikipedia.org/wiki/Xylitol",
        description: "No liquid carrier needed for xylitol",
      },
      caloriesPerGram: {
        url: "https://en.wikipedia.org/wiki/Sugar_alcohol",
        description: "Calories in sugar alcohols",
      },
    },
  },
  {
    name: "Erythritol",
    tldr: "Sugar alcohol, nearly zero calories, gentle on digestion.",
    gi: 0,
    relativeSweetness: 0.7,
    state: "powder",
    requiresCarrier: false,
    solidCarrier: undefined,
    liquidCarrier: undefined,
    caloriesPerGram: 0.2,
    sources: {
      name: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "Wikipedia page on erythritol",
      },
      tldr: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "Overview of erythritol",
      },
      gi: {
        url: "https://www.healthline.com/nutrition/erythritol",
        description: "Glycemic index of erythritol",
      },
      relativeSweetness: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "Sweetness of erythritol",
      },
      state: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "Forms of erythritol",
      },
      requiresCarrier: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "Use of erythritol",
      },
      solidCarrier: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "No solid carrier needed for erythritol",
      },
      liquidCarrier: {
        url: "https://en.wikipedia.org/wiki/Erythritol",
        description: "No liquid carrier needed for erythritol",
      },
      caloriesPerGram: {
        url: "https://en.wikipedia.org/wiki/Sugar_alcohol",
        description: "Calories in sugar alcohols",
      },
    },
  },
];
