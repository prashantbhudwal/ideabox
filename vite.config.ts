import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import remarkGfm from "remark-gfm";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  server: {
    port: 1111,
  },
  ssr: {
    noExternal: [/react-tweet/],
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      tsr: {
        routesDirectory: "src/app",
      },
      prerender: {
        crawlLinks: true,
        enabled: true,
        filter: (route) => route.path.startsWith("/blog/"),
      },
    }),
    mdx({
      remarkPlugins: [remarkGfm],
      development: process.env.NODE_ENV === "development",
    }),
  ],
});
