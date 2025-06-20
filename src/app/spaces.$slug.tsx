import { createFileRoute } from "@tanstack/react-router";
import { getSpaceBySlug } from "~/components/spaces/spaces";

export const Route = createFileRoute("/spaces/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return params.slug;
  },
});

function RouteComponent() {
  const slug = Route.useLoaderData();
  const space = getSpaceBySlug({ slug });
  if (!space) {
    return <div>Space not found</div>;
  }
  const SpaceComponent = space.Component;

  return <SpaceComponent />;
}
