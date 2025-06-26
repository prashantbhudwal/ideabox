import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useHotkeys } from "react-hotkeys-hook";
import { link } from "~/client/lib/link";
import { useSearch } from "~/client/components/search/use-search";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/client/components/ui/command";
import { type SearchResult } from "~/server/modules/search/config";
import { SearchModalAtom } from "./search-modal-atom";
import { useAtom } from "jotai";
import { useDeferredValue } from "react";

export function BlogSearch(): React.ReactElement {
  const [query, setQuery] = React.useState("");
  const [searchModalOpen, setSearchModalOpen] = useAtom(SearchModalAtom);
  const navigate = useNavigate();
  const { search, isLoading, isReady } = useSearch();
  const [results, setResults] = React.useState<SearchResult[]>([]);

  const deferredQuery = useDeferredValue(query);

  // Update results when query changes
  React.useEffect(() => {
    const results = search(deferredQuery);
    setResults(results);
  }, [search, deferredQuery]);

  // Toggle search dialog with Cmd+K
  useHotkeys(
    "meta+k, ctrl+k",
    (event) => {
      event.preventDefault();
      setSearchModalOpen((prev) => !prev);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
      scopes: ["search"],
    },
  );

  // Handle selection of search result
  const handleSelect = React.useCallback(
    (slug: string) => {
      setSearchModalOpen(false);
      navigate({
        to: link.path.post({ slug }),
      });
    },
    [navigate],
  );

  return (
    <CommandDialog open={searchModalOpen} onOpenChange={setSearchModalOpen}>
      <Command shouldFilter={false} className="min-h-[350px]">
        <CommandInput
          placeholder="Search posts..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList className="scrollbar-hide">
          {!isReady ? (
            <CommandEmpty>Loading search index...</CommandEmpty>
          ) : isLoading ? (
            <CommandEmpty>Searching...</CommandEmpty>
          ) : null}

          {results.map((result) => (
            <CommandItem
              key={result.slug}
              value={result.slug}
              onSelect={handleSelect}
            >
              {result.title}
            </CommandItem>
          ))}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
