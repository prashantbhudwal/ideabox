import { useParams } from "@tanstack/react-router";
import { useMemo } from "react";
import { getSpaceBySlug } from "~/client/components/spaces/spaces";
import { link } from "~/client/lib/link";

type TSpaceInfo = {
  spaceTitle: string | null;
  spaceId: string | null;
  spaceUrl: string | null;
  spaceShortTitle: string | null;
};

const DEFAULT_SPACE_INFO: TSpaceInfo = {
  spaceTitle: null,
  spaceId: null,
  spaceUrl: null,
  spaceShortTitle: null,
};

export function useSpaceInfo(): TSpaceInfo {
  const spaceSlug = useParams({
    from: "/spaces/$slug",
    select: (params) => params.slug,
    structuralSharing: true,
    shouldThrow: false,
  });

  return useMemo(() => {
    if (!spaceSlug) return DEFAULT_SPACE_INFO;

    const space = getSpaceBySlug({ slug: spaceSlug });
    if (!space) return DEFAULT_SPACE_INFO;

    return {
      spaceTitle: space.title.toLowerCase(),
      spaceId: space.id,
      spaceUrl: link.url.internal.space({ slug: space.slug }),
      spaceShortTitle: space.shortTitle?.toLowerCase() ?? null,
    };
  }, [spaceSlug]);
}
