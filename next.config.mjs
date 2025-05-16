/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["substackcdn.com"],
    unoptimized: true,
  },
  serverExternalPackages: ["@mastra/*"],
};

export default nextConfig;
