import { createFileRoute } from "@tanstack/react-router";
import { getSpaceBySlug } from "~/components/spaces/spaces";

export const Route = createFileRoute("/spaces/$slug")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const space = getSpaceBySlug({ slug: params.slug });
    return {
      space,
    };
  },
});

function RouteComponent() {
  const { space } = Route.useLoaderData();
  if (!space) {
    return <div>Space not found</div>;
  }
  const SpaceComponent = space.Component;

  return <SpaceComponent />;
}
