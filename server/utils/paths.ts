import path from "path";

const cwd = process.cwd();

export const serverPaths = {
  dir: {
    posts: path.join(cwd, "content/posts"),
    drafts: path.join(cwd, "content/drafts"),
    public: path.join(cwd, "public"),
  },
  file: {
    postMdx: (slug: string) =>
      path.join(serverPaths.dir.posts, slug, `${slug}.mdx`),
    draftMdx: (slug: string) =>
      path.join(serverPaths.dir.drafts, `${slug}.mdx`),
  },
};
