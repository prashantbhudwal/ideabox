import loadable from "@loadable/component";
import { Skeleton } from "~/client/components/ui/skeleton";

const SweetenerList = loadable(() => import("./components/list"), {
  ssr: false,
  fallback: (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  ),
});

export const sweetenerOptions = {
  SweetenerList,
};
