import type { TPost } from "~/common/types/content.types";
import type { Options } from "minisearch";
import MiniSearch from "minisearch";

export const searchConfigOptions: Options<TPost> = {
  fields: ["title", "shortTitle", "description", "content", "tags", "id"],
  storeFields: [
    "slug",
    "title",
    "shortTitle",
    "description",
    "tags",
    "heroImage",
    "createdAt",
    "content",
    "id",
  ],
  searchOptions: {
    boost: { title: 3, shortTitle: 2, tags: 1.5 },
    prefix: true, // “rea” matches “reading”
    fuzzy: 0.2, // 20 % Levenshtein distance
    combineWith: "AND", // all words must appear (avoids noisy OR)
  },
  extractField: (doc: TPost, fieldName: string): string => {
    const val = doc[fieldName as keyof TPost];

    if (Array.isArray(val)) return val.join(" "); // tags → "health ai"
    if (typeof val === "string") return val;

    return ""; // dates, images, etc. become empty
  },
  idField: "id",
  tokenize: (
    s, // simple ASCII fold + lower-case
  ) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .match(/[a-z0-9]+/g) ?? [],
  processTerm: (t) => (t.length > 1 ? t : null),
};

export type SearchResult = Pick<
  TPost,
  | "slug"
  | "title"
  | "shortTitle"
  | "description"
  | "tags"
  | "heroImage"
  | "createdAt"
  | "content"
  | "id"
>;
