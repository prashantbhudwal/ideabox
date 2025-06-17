import { dynamic } from "~/lib/dynamic";

export const scientificMethod = {
  DefinitionsCarousel: dynamic(
    () => import("./components/definitions-carousel"),
    { ssr: false },
  ),
};
