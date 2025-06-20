import { C } from "../../common/constants";

const authorProfile = {
  x: "https://x.com/" + C.xUsername,
  linkedIn: "https://www.linkedin.com/in/prashantbhudwal/",
  github: "https://github.com/prashantbhudwal",
  buyMeACoffee: "https://buymeacoffee.com/" + C.bmcUsername,
};

export const link = {
  path: {
    post: ({ slug }: { slug: string }) => `/blog/${slug}`,
    space: ({ slug }: { slug: string }) => `/spaces/${slug}`,
    images: {
      spaces: ({ imgName }: { imgName: string }) => `/spaces/${imgName}`,
      blog: ({ imgName }: { imgName: string }) => `/blog/${imgName}.webp`,
    },
  },
  url: {
    internal: {
      post: ({ slug }: { slug: string }) => C.base + "/blog/" + slug,
      space: ({ slug }: { slug: string }) => C.base + "/spaces/" + slug,
    },
    external: {
      authorProfile,
    },
  },
};
