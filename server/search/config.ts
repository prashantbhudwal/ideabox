import type { TPost } from "@/lib/types/content.types";
import type { Options } from "minisearch";

export const searchConfig: Options<TPost> = {
  fields: ["title", "content"],
  storeFields: ["title"],
  searchOptions: {
    boost: { title: 2 },
    fuzzy: 0.2,
    prefix: true,
  },
  extractField: (document: TPost, fieldName: string) => {
    const value = document[fieldName as keyof TPost];
    return typeof value === "string" ? value : "";
  },
};
