import { getSpaceBySlug } from "@/components/spaces/spaces";
import { link } from "@/lib/link";
import { useParams, usePathname } from "next/navigation";

export function useSpaceInfo() {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();
  if (!pathname.startsWith("/spaces/"))
    return {
      spaceTitle: null,
      spaceId: null,
      spaceUrl: null,
      spaceShortTitle: null,
    };

  const spaceSlug = params.slug;

  const space = getSpaceBySlug({ slug: spaceSlug });
  if (!space)
    return {
      spaceTitle: null,
      spaceId: null,
      spaceUrl: null,
      spaceShortTitle: null,
    };
  return {
    spaceTitle: space.title.toLowerCase(),
    spaceId: space.id,
    spaceUrl: link.url.internal.space({ slug: space.slug }),
    spaceShortTitle: space.shortTitle?.toLowerCase(),
  };
}
