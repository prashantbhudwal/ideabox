import { createFileRoute } from "@tanstack/react-router";
import { Separator } from "~/client/components/ui/separator";
import { SpacesGrid } from "~/client/components/spaces/spaces-grid";

export const Route = createFileRoute("/spaces/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col space-y-4 px-4 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <p className="max-w-prose text-base leading-relaxed font-medium sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
        Spaces are focused tools designed to solve specific problems I encounter
        regularly.
      </p>
      <Separator />
      <SpacesGrid />
    </div>
  );
}
