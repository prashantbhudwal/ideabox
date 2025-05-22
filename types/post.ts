export type PostMetadata = {
  title: string;
  date: string;
  slug: string;
  heroImage?: string;
  description?: string;
};

export type Post = {
  slug: string;
  metadata: PostMetadata;
  content: string;
};