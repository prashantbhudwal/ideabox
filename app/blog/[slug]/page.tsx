import { Markdown } from "@/components/markdown-parser";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getPostSlugs().map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
  return slugs;
}

export default async function Post({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3 text-gray-900 dark:text-gray-100">
          {post.metadata.title}
        </h1>
        <time className="text-sm text-gray-600 dark:text-gray-400">
          {new Date(post.metadata.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
      </header>
      <div className="prose prose-lg dark:prose-invert">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
