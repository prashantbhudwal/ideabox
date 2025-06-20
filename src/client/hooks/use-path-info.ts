import { useLocation } from "@tanstack/react-router";
import { useMemo } from "react";
import { useSpaceInfo } from "~/client/components/spaces/use-space-info";

type TPathInfo = {
  segments: string[];
  segment: string | null;
  isRoot: boolean;
  isBlog: boolean;
  isSpace: boolean;
  backLink: string;
  showSiteName: boolean;
  spaceInfo: ReturnType<typeof useSpaceInfo> | null;
};

const getBackLink = (pathname: string, isSpace: boolean): string => {
  if (isSpace) return "/spaces";

  const backLinkMap: Record<string, string> = {
    "/": "/",
    "/blog": "/",
    "/spaces": "/",
    "/spaces/$slug": "/spaces",
  };

  return backLinkMap[pathname] ?? "/";
};

export function usePathInfo(): TPathInfo {
  const pathname = useLocation({
    select: (loc) => loc.pathname,
    structuralSharing: true,
  });

  const spaceInfoData = useSpaceInfo();

  return useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] ?? null;
    const isRoot = lastSegment === null;
    const isBlog = segments.includes("blog");
    const isSpace = segments.includes("spaces") && segments.length > 1;
    const backLink = getBackLink(pathname, isSpace);
    const showSiteName = isRoot || isBlog;
    const spaceInfo = isSpace ? spaceInfoData : null;

    return {
      segments,
      segment: lastSegment,
      isRoot,
      isBlog,
      isSpace,
      backLink,
      showSiteName,
      spaceInfo,
    };
  }, [pathname, spaceInfoData]);
}
