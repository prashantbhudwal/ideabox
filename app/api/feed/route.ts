import { getAllPosts } from "@/server/modules/post/core";
import { Feed } from "feed";
const baseUrl = "https://www.ashant.in";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    const posts = await getAllPosts();

    if (!posts || posts.length === 0) {
      console.log("No posts found");
      return new Response("No posts available", {
        status: 404,
        headers: { "Content-Type": "text/plain" },
      });
    }

    const feed = new Feed({
      title: "Ashant.in Blog",
      description: "Latest posts from Ashant.in",
      id: baseUrl,
      link: baseUrl,
      language: "en",
      favicon: `${baseUrl}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}`,
      author: {
        name: "Prashant",
        link: baseUrl,
      },
    });

    posts.forEach((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      feed.addItem({
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.content.substring(0, 200) + "...",
        date: new Date(post.createdAt),
      });
    });

    const feedOutput = feed.rss2();

    if (!feedOutput) {
      console.log("Feed generation failed");
      return new Response("Failed to generate feed", {
        status: 500,
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response(feedOutput, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating feed:", error);
    return new Response("Error generating feed", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
