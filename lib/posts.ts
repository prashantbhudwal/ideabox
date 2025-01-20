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

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);
  console.log(metadata);
  console.log(content);
  console.log(slug);
  return {
    slug,
    metadata: metadata as PostMetadata,
    content,
  };
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  console.log(slugs);
  return slugs.map((slug) => getPostBySlug(slug.replace(/\.md$/, "")));
}
