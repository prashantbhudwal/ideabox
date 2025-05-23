import { getSpaceById } from "@/app/(spaces)/spaces/spaces";
import { link } from "@/lib/link";
import { useParams, usePathname } from "next/navigation";

export function useSpaceInfo() {
  const params = useParams<{ id: string }>();
  const pathname = usePathname();
  if (!pathname.startsWith("/spaces/"))
    return {
      spaceTitle: null,
      spaceId: null,
      spaceUrl: null,
    };

  const spaceId = params.id;

  const space = getSpaceById(spaceId);
  if (!space)
    return {
      spaceTitle: null,
      spaceId: null,
      spaceUrl: null,
    };
  return {
    spaceTitle: space.title.toLowerCase(),
    spaceId: space.id,
    spaceUrl: link.url.internal.space({ id: space.id }),
  };
}
