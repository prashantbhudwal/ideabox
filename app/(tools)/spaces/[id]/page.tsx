import { notFound } from "next/navigation";
import { getSpaceById } from "../registry";

export default async function SpacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const spaceId = (await params).id;
  const space = getSpaceById({ spaceId });
  if (!space) return notFound();
  const SpaceComponent = space.Component;
  return (
    <div>
      <SpaceComponent />
    </div>
  );
}
