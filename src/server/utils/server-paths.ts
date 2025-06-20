import path from "path";
import { existsSync } from "fs";
import { isMastraPlayground } from "~/client/lib/utils";
import { C } from "~/common/constants";

const findProjectRoot = (startPath: string): string => {
  let currentPath = startPath;
  while (currentPath !== path.parse(currentPath).root) {
    if (existsSync(path.join(currentPath, "package.json"))) {
      return currentPath;
    }
    currentPath = path.dirname(currentPath);
  }
  throw new Error("Could not find project root (no package.json found)");
};

const cwd = process.cwd();
const basePath = isMastraPlayground ? findProjectRoot(cwd) : cwd;

export const serverPaths = {
  cwd: basePath,
  dir: {
    posts: path.join(basePath, C.DIR.POSTS),
    drafts: path.join(basePath, C.DIR.DRAFTS),
    public: path.join(basePath, C.DIR.PUBLIC),
    searchGenerated: path.join(basePath, "src/server/modules/search/generated"),
  },
  file: {
    postMdx: (slug: string) =>
      path.join(serverPaths.dir.posts, slug, `${slug}.mdx`),
    draftMdx: (slug: string) =>
      path.join(serverPaths.dir.drafts, `${slug}.mdx`),
  },
};
