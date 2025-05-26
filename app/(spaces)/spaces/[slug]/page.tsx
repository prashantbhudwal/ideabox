import { notFound } from "next/navigation";
import { getSpaceBySlug } from "../spaces";

export default async function SpacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const spaceSlug = (await params).slug;
  const space = getSpaceBySlug({ slug: spaceSlug });
  if (!space) return notFound();
  const SpaceComponent = space.Component;
  return (
    <div>
      <SpaceComponent />
    </div>
  );
}
