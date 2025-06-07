import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import withBundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    domains: ["substackcdn.com"],
    unoptimized: true,
  },
  serverExternalPackages: ["@mastra/*"],
  experimental: {
    typedEnv: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Enable bundle analyzer based on environment variable
const analyzeBundles = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// Merge MDX config with Next.js config and bundle analyzer
export default analyzeBundles(withMDX(nextConfig));
