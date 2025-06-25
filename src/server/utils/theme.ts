import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";

export type Theme = "dark" | "light" | "system";

const THEME_STORAGE_KEY = "vite-ui-theme";

const THEME = "dark";

export const getThemeServerFn = createServerFn({
  method: "GET",
}).handler(async () => {
  return (getCookie(THEME_STORAGE_KEY) || THEME) as Theme;
});

export const setThemeServerFn = createServerFn({
  method: "POST",
})
  .validator((data: unknown) => {
    if (
      typeof data !== "string" ||
      !["dark", "light", "system"].includes(data)
    ) {
      throw new Error("Invalid theme provided");
    }
    return data as Theme;
  })
  .handler(async ({ data }) => {
    // Change to data when we have a way to set the theme. Everything defaults to dark for now.
    setCookie(THEME_STORAGE_KEY, THEME, {
      httpOnly: false, // Allow client-side access
      secure: false, // Set to true in production with HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    return data;
  });
