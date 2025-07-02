import loadable from "@loadable/component";
import { Skeleton } from "~/client/components/ui/skeleton";

export const bronnComponents = {
  Qwen: loadable(() => import("./components/qwen"), {
    ssr: false,
    fallback: (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    ),
  }),
};
