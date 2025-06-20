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
import { TRPCRouter } from "~/server/routers/_router";
import { QueryClient } from "@tanstack/react-query";
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { BlogSearch } from "~/client/components/search/blog-search";
interface MyRouterContext {
  queryClient: QueryClient;

  trpc: TRPCOptionsProxy<TRPCRouter>;
}
export const Route = createRootRouteWithContext<MyRouterContext>()({
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
        title:
          "TanStack Start | Type-Safe, Client-First, Full-Stack React Framework",
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
    scripts: [
      {
        src: "/customScript.js",
        type: "text/javascript",
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased mx-4 mt-8 md:mt-10 lg:mt-12 md:mx-auto max-w-full selection:bg-primary selection:text-primary-foreground">
        <main className="min-w-0 flex flex-col space-y-12 md:space-y-10 lg:space-y-12 xl:space-y-16 2xl:space-y-20 px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10 pb-4">
          <Providers>
            <Navbar className="2xl:mb-36" />
            {children}
            <BlogSearch />
          </Providers>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
