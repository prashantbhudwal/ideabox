import dynamic from "next/dynamic";

export const scientificMethod = {
  DefinitionsCarousel: dynamic(
    () => import("./components/definitions-carousel"),
    { ssr: false },
  ),
};
