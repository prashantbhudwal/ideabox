/// <reference types="vite/client" />
import { DefaultCatchBoundary } from "~/client/components/DefaultCatchBoundary";
import { NotFound } from "~/client/components/NotFound";
import { seo } from "~/client/lib/utils/seo";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import * as React from "react";
import appCss from "~/styles/globals.css?url";
import { Providers } from "~/client/components/providers";
import { Navbar } from "~/client/components/navbar";
import { type TRPCRouter } from "~/server/routers/_router";
import { type QueryClient } from "@tanstack/react-query";
import { type TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { BlogSearch } from "~/client/components/search/blog-search";
import { GlobalSidebarProvider } from "~/client/components/providers/sidebar-provider";
import { getThemeServerFn } from "~/server/utils/theme";
import { cn } from "~/client/lib/utils";

interface MyRouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  loader: async () => {
    const theme = await getThemeServerFn();
    return { theme };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...seo({
        title: "ashant",
        description: `thoughts on software, design, and life`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
      // {
      //   rel: "apple-touch-icon",
      //   sizes: "180x180",
      //   href: "/apple-touch-icon.png",
      // },
      // {
      //   rel: "icon",
      //   type: "image/png",
      //   sizes: "32x32",
      //   href: "/favicon-32x32.png",
      // },
      // {
      //   rel: "icon",
      //   type: "image/png",
      //   sizes: "16x16",
      //   href: "/favicon-16x16.png",
      // },
    ],
    // scripts: [
    //   {
    //     src: "/customScript.js",
    //     type: "text/javascript",
    //   },
    // ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => (
    <RootDocument>
      <NotFound />
    </RootDocument>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootDocument>
      <Providers>
        <GlobalSidebarProvider>
          <main
            className={cn(
              "px-6 py-2 md:px-8 md:py-4 lg:px-10 lg:py-6",
              "selection:bg-primary selection:text-primary-foreground",
            )}
            data-llm="content"
          >
            <Navbar className="py-2 md:py-4 lg:py-6 2xl:py-8" />
            <div className="mx-auto max-w-full">
              {children}
              <BlogSearch />
            </div>
          </main>
        </GlobalSidebarProvider>
      </Providers>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const { theme } = Route.useLoaderData();

  const resolvedTheme = React.useMemo(() => {
    if (theme === "system") {
      return "dark";
    }
    return theme;
  }, [theme]);
  return (
    <html className={resolvedTheme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
