import { getAllPosts } from "@/server/modules/post/get-all-posts";

const baseUrl = "https://www.ashant.in";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    const posts = await getAllPosts();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${posts
        .map(
          (post) => `
        <url>
          <loc>${baseUrl}/blog/${post.slug}</loc>
          <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return new Response("Error generating sitemap", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
