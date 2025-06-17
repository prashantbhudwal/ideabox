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
  base: "https://www.ashant.in/",
  ...personal,
  DIR,
};
