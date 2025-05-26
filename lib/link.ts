import { constants } from "./constants";

const authorProfile = {
  x: "https://x.com/" + constants.xUsername,
  linkedIn: "https://www.linkedin.com/in/prashantbhudwal/",
  github: "https://github.com/prashantbhudwal",
  buyMeACoffee: "https://buymeacoffee.com/" + constants.bmcUsername,
};

export const link = {
  path: {
    post: ({ slug }: { slug: string }) => `/blog/${slug}`,
    space: ({ slug }: { slug: string }) => `/spaces/${slug}`,
    images: {
      spaces: ({ imgName }: { imgName: string }) => `/spaces/${imgName}`,
    },
  },
  url: {
    internal: {
      post: ({ slug }: { slug: string }) => constants.base + "/blog/" + slug,
      space: ({ slug }: { slug: string }) => constants.base + "/spaces/" + slug,
    },
    external: {
      authorProfile,
    },
  },
};
