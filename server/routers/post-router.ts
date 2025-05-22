"use server";
import { cache } from "react";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { Post, PostMetadata } from "@/types/post";
const postsDirectory = join(process.cwd(), "content/posts");
const draftsDirectory = join(process.cwd(), "content/drafts");

export const getPostSlugs = cache(async (): Promise<string[]> => {
  const entries = readdirSync(postsDirectory, { withFileTypes: true });
  return entries
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
});

export const getPostBySlug = cache(async (slug: string): Promise<Post> => {
  const fullPath = join(postsDirectory, slug, `${slug}.mdx`);
  const fileContents = readFileSync(fullPath, "utf8");
  const { data: metadata, content } = matter(fileContents);

  return {
    slug,
    metadata: metadata as PostMetadata,
    content,
  };
});

export const getAllPosts = cache(async (): Promise<Post[]> => {
  const slugs = await getPostSlugs();
  return Promise.all(slugs.map((slug) => getPostBySlug(slug)));
});

export const getDraftBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    const fullPath = join(draftsDirectory, `${slug}.mdx`);
    if (!readdirSync(draftsDirectory).includes(`${slug}.mdx`)) {
      return null;
    }

    const fileContents = readFileSync(fullPath, "utf8");
    const { data: metadata, content } = matter(fileContents);

    return {
      slug,
      metadata: metadata as PostMetadata,
      content,
    };
  },
);

export const getAllDrafts = cache(async (): Promise<Post[]> => {
  const entries = readdirSync(draftsDirectory, { withFileTypes: true });
  const draftFiles = entries
    .filter((entry) => !entry.isDirectory() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));

  const drafts = await Promise.all(
    draftFiles.map((slug) => getDraftBySlug(slug)),
  );
  return drafts.filter((draft): draft is Post => draft !== null);
});
