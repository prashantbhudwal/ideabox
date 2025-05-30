import { Separator } from "@/components/ui/separator";
import { SpacesGrid } from "../../../components/spaces/spaces-grid";

export default function SpacesPage() {
  return (
    <div className="flex flex-col space-y-4 px-4 sm:px-6 lg:px-8">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium leading-relaxed max-w-prose">
        Each space is a focused tool - an app, a mental model or a collection -
        built to solve a specific problem.
      </p>
      <Separator />
      <SpacesGrid />
    </div>
  );
}
