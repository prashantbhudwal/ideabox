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
    space: ({ id }: { id: string }) => `/spaces/${id}`,
    images: {
      spaces: ({ imgName }: { imgName: string }) => `/spaces/${imgName}`,
    },
  },
  url: {
    internal: {
      post: ({ slug }: { slug: string }) => constants.base + "/blog/" + slug,
      space: ({ id }: { id: string }) => constants.base + "/spaces/" + id,
    },
    external: {
      authorProfile,
    },
  },
};
