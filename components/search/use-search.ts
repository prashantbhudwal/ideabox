import { useCallback, useMemo } from "react";
import MiniSearch from "minisearch";
import type { TPost } from "@/lib/types/content.types";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { searchConfigOptions } from "@/server/modules/search/config";

const MIN_QUERY_LENGTH = 2;
const MIN_SCORE = 0.2;
const MAX_RESULTS = 10;

export function useSearch() {
  const trpc = useTRPC();

  const {
    data: indexData,
    isLoading,
    error,
    isFetched,
  } = useQuery(trpc.search.getMiniSearchIndex.queryOptions());

  const miniSearch = useMemo(() => {
    if (!indexData) return null;
    return MiniSearch.loadJS<TPost>(indexData, searchConfigOptions);
  }, [indexData]);

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
    isLoading,
    error,
    isReady: isFetched,
  };
}
