import { getAllPostFiles, getValidatedPost } from "./utils";
import path from "path";
import esMain from "es-main";

const POST_DIR = path.join(process.cwd(), "content/posts");

const checkDuplicatePostsById = async () => {
  const posts = await getAllPostFiles({ dir: POST_DIR });

  const idMap = new Map<string, string[]>();

  const postMetadata = await Promise.all(
    posts.map(async (post) => {
      const { metadata } = await getValidatedPost({ file: post });
      return { id: metadata.id, file: post };
    }),
  );

  for (const { id, file } of postMetadata) {
    if (!idMap.has(id)) {
      idMap.set(id, []);
    }
    idMap.get(id)!.push(file);
  }

  // Find duplicates
  for (const [id, files] of idMap.entries()) {
    if (files.length > 1) {
      console.log(`
        📝 Duplicate post ID found: ${id}
        📝 Files: ${files.join(", ")}
      `);
    }
  }

  console.log(`
    Run Summary:
    📝 Total posts: ${posts.length}
    📝 Unique IDs: ${idMap.size}
    📝 Duplicates found: ${posts.length - idMap.size}
    `);
};

if (esMain(import.meta)) {
  checkDuplicatePostsById().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
