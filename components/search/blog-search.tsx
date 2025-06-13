"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useHotkeys } from "react-hotkeys-hook";
import { link } from "@/lib/link";
import { useSearch } from "@/components/search/use-search";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { SearchResult } from "@/server/routers/search.router";

export function BlogSearch(): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const router = useRouter();
  const { search, isLoading, isReady } = useSearch();
  const [results, setResults] = React.useState<SearchResult[]>([]);

  // Update results when query changes
  React.useEffect(() => {
    setResults(search(query));
  }, [search, query]);

  // Toggle search dialog with Cmd+K
  useHotkeys(
    "meta+k, ctrl+k",
    (event) => {
      event.preventDefault();
      setOpen((prev) => !prev);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    },
  );

  // Handle selection of search result
  const handleSelect = React.useCallback(
    (slug: string) => {
      setOpen(false);
      router.push(link.path.post({ slug }));
    },
    [router],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Search posts..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {!isReady ? (
            <CommandEmpty>Loading search index...</CommandEmpty>
          ) : isLoading ? (
            <CommandEmpty>Searching...</CommandEmpty>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          <CommandGroup>
            {results.map((result) => (
              <CommandItem
                key={result.slug}
                value={result.slug}
                onSelect={handleSelect}
              >
                {result.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
