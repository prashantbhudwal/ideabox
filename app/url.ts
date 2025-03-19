const base = "https://www.ashant.in/";
export const xUsername = "prashant_hq";
export const xHandle = "@" + xUsername;

export const url = {
  blog: ({ slug }: { slug: string }) => base + "blog/" + slug,
  external: {
    x: "https://x.com/" + xUsername,
  },
};
