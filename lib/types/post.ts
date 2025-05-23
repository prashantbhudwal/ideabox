export type TPostMetadata = {
  title: string;
  date: string;
  slug: string;
  heroImage?: string;
  description?: string;
};

export type TPost = {
  slug: string;
  metadata: TPostMetadata;
  content: string;
};
