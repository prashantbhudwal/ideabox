import loadable from "@loadable/component";
import { Skeleton } from "~/client/components/ui/skeleton";

export const scientificMethod = {
  DefinitionsCarousel: loadable(
    () => import("./components/definitions-carousel"),
    {
      ssr: false,
      fallback: (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      ),
    },
  ),
};
