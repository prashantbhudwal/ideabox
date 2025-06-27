import { use, useCallback, useMemo } from "react";
import type { TPost } from "~/common/types/content.types";
import { useQuery } from "@tanstack/react-query";
import { searchConfigOptions } from "~/server/modules/search/config";
import { useTRPC } from "~/client/trpc/react";
import { SearchModalAtom } from "./search-modal-atom";
import { useAtom } from "jotai";

const MIN_QUERY_LENGTH = 2;
const MIN_SCORE = 0.2;
const MAX_RESULTS = 10;

export function useSearch() {
  const [searchModalOpen, setSearchModalOpen] = useAtom(SearchModalAtom);

  const trpc = useTRPC();

  const {
    data: MiniSearch,
    isLoading: isMiniSearchLoading,
    isFetched: isMiniSearchFetched,
    isError: isMiniSearchError,
  } = useQuery({
    queryKey: ["minisearch-lib"],
    queryFn: () => import("minisearch").then((m) => m.default),
    staleTime: Infinity,
  });

  const {
    data: indexData,
    isLoading,
    error,
    isFetched,
  } = useQuery({
    ...trpc.search.getMiniSearchIndex.queryOptions(),
    // enabled: searchModalOpen,
    // staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });

  const miniSearch = useMemo(() => {
    if (!indexData || !MiniSearch) return null;
    return MiniSearch.loadJS<TPost>(indexData, searchConfigOptions);
  }, [indexData, MiniSearch]);

  const search = useCallback(
    (query: string) => {
      if (!miniSearch || !query || query.length < MIN_QUERY_LENGTH) {
        return [];
      }

      const results = miniSearch.search(query);

      return results
        .filter((result) => result.score >= MIN_SCORE)
        .slice(0, MAX_RESULTS)
        .map((result) => {
          return {
            id: result.id,
            title: result.title ?? "",
            score: result.score,
            slug: result.slug,
            shortTitle: result.shortTitle ?? "",
            description: result.description ?? "",
            tags: result.tags,
            heroImage: result.heroImage ?? "",
            createdAt: result.createdAt,
            content: result.content,
          };
        });
    },
    [miniSearch],
  );

  return {
    search,
    isLoading: isLoading || isMiniSearchLoading,
    error: error || isMiniSearchError,
    isReady: isFetched && isMiniSearchFetched,
  };
}
