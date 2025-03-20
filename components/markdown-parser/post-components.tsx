import { bronnComponents } from "@/content/posts/bronn";
import { largeScreenLayout } from "@/content/posts/layout-large-screens";
import { sweetenerOptions } from "@/content/posts/sweetener-options";

export const postComponents = {
  ...bronnComponents,
  ...sweetenerOptions,
  ...largeScreenLayout,
};
