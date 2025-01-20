import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMetadata = {
  title: string;
  date: string;
  slug: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs(): string[] {
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  return entries
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, slug, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);
  
  return {
    slug,
    metadata: metadata as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  return slugs.map((slug) => getPostBySlug(slug));
}
