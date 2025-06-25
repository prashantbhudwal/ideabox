import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import contentCollections from "@content-collections/vinxi";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    port: 1111,
  },
  ssr: {
    noExternal: [/react-tweet/, "wikipedia", /^wikipedia/, "@types/wikipedia"],
    external: ["@mastra/*"],
  },
  plugins: [
    contentCollections(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart({
      tsr: {
        routesDirectory: "src/app",
      },
      target: "vercel",
      prerender: {
        crawlLinks: true,
        enabled: true,
        filter: (route) => route.path.startsWith("/blog/"),
      },
    }),
    // BEAST MODE: Rollup bundle analyzer - only runs when ANALYZE=true
    process.env.ANALYZE === "true" &&
      visualizer({
        filename: "dist/stats.html",
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: "treemap", // or "sunburst", "network"
      }),
  ].filter(Boolean),
});
