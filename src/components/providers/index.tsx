import { ClientOnly } from "@tanstack/react-router";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "node_modules/@tanstack/react-router-devtools/dist/esm/TanStackRouterDevtools";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientOnly fallback={<div className="bg-black"></div>}>
      <ThemeProvider defaultTheme="dark">
        {children}
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <TanStackRouterDevtools position="bottom-left" />
      </ThemeProvider>
    </ClientOnly>
  );
};
