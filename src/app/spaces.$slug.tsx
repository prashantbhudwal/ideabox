import { createFileRoute } from "@tanstack/react-router";
import { getSpaceBySlug } from "~/client/components/spaces/spaces";
import { useMemo } from "react";

export const Route = createFileRoute("/spaces/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return params.slug;
  },
});

function RouteComponent() {
  const slug = Route.useLoaderData();
  const space = useMemo(() => getSpaceBySlug({ slug }), [slug]);
  if (!space) {
    return <div>Space not found</div>;
  }
  const SpaceComponent = space.Component;

  return <SpaceComponent />;
}
