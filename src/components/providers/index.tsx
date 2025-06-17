import { ClientOnly } from "@tanstack/react-router";
import { ThemeProvider } from "./theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientOnly fallback={<div className="bg-black"></div>}>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </ClientOnly>
  );
};
