/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["substackcdn.com"],
    unoptimized: true,
  },
  serverExternalPackages: ["@mastra/*"],
  experimental: {
    typedEnv: true,
  },
};

export default nextConfig;
