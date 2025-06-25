import { ThemeProvider } from "./theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools";
import { MDXProvider } from "@mdx-js/react";
import { components } from "../blog/mdx/components";
import { isDev } from "~/client/lib/utils/isDev";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <MDXProvider components={components}>{children}</MDXProvider>
      <ReactQueryDevtools buttonPosition="bottom-right" />
      {isDev && <TanStackRouterDevtools position="bottom-left" />}
    </ThemeProvider>
  );
};
