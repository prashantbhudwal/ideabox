import "@/app/globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/nav";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { RootMotionProvider } from "./root-motion-provider";
import { WIP } from "@/components/wip";
import { ConvexClientProvider } from "@/components/providers/convex-client-provider";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased max-w-xl mx-4 mt-8 md:mt-16 lg:mt-20 md:mx-auto md:max-w-full xl:max-w-4xl">
        <main className="min-w-0 flex flex-col space-y-12 md:space-y-10 lg:space-y-12 xl:space-y-16 2xl:space-y-20 px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10 pb-4">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar className="2xl:mb-36" />
            <RootMotionProvider>
              <ConvexClientProvider>{children}</ConvexClientProvider>
            </RootMotionProvider>
            <WIP className="text-sm md:text-base mt-4 self-end" />
          </ThemeProvider>
          <Analytics />
        </main>
      </body>
    </html>
  );
}
