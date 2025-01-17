import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    return {
      filename,
      slug: filename.replace('.md', ''),
    };
  });

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.filename}>
          <Link href={`/blog/posts/${post.slug}`}>
              {post.slug}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
