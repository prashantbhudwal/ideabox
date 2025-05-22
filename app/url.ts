const base = "https://www.ashant.in/";
export const xUsername = "prashant_hq";
export const xHandle = "@" + xUsername;

const authorProfile = {
  x: "https://x.com/" + xUsername,
  linkedIn: "https://www.linkedin.com/in/prashantbhudwal/",
  github: "https://github.com/prashantbhudwal",
};

const images = {
  spaces: ({ imgName }: { imgName: string }) => `/spaces/${imgName}`,
};

const share = {
  post: ({ slug }: { slug: string }) => base + "/blog/" + slug,
};

export const url = {
  share,
  authorProfile,
  spaceById: ({ id }: { id: string }) => `/spaces/${id}`,
  images,
  post: ({ slug }: { slug: string }) => `/blog/${slug}`,
};
