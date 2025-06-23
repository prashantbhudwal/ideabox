const xUsernameValue = "prashant_hq";

const DIR = {
  POSTS: "src/content/posts",
  DRAFTS: "src/content/drafts",
  PUBLIC: "public",
  MASTRA_PLAYGROUND: ".mastra/output",
};

const personal = {
  xUsername: xUsernameValue,
  xHandle: "@" + xUsernameValue,
  bmcUsername: "ashant",
  fullName: "prashant bhudwal",
  firstName: "prashant",
};

export const C = {
  url: import.meta.env.DEV ? "http://localhost:1111" : "https://www.ashant.in",
  base: import.meta.env.DEV
    ? "http://localhost:1111/"
    : "https://www.ashant.in/",
  ...personal,
  DIR,
};
