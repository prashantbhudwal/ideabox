import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import contentCollections from "@content-collections/vinxi";

export default defineConfig({
  server: {
    port: 1111,
  },
  ssr: {
    noExternal: [/react-tweet/, "wikipedia"],
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
  ],
});
