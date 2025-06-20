// src/utils/dynamic.tsx
import * as React from "react";
import { ClientOnly } from "@tanstack/react-router";

type Loader<T extends React.ComponentType<any>> = () =>
  | Promise<{ default: T }>
  | Promise<T>;

interface Options {
  /** Provide a fallback element until the module resolves */
  fallback?: React.ReactNode;
  /** Skip SSR completely (equivalent to `ssr:false` in next/dynamic) */
  ssr?: boolean;
  /** You plan to wrap the result in your own <Suspense>. */
  suspense?: boolean;
}

/**
 * Usage: const Widget = dynamic(() => import('./Widget'), { ssr:false })
 */
export function dynamic<T extends React.ComponentType<any>>(
  loader: Loader<T>,
  { fallback = null, ssr = true, suspense = false }: Options = {},
) {
  // React.lazy always returns the component’s default export
  const Lazy = React.lazy(loader as any);

  // If the caller will wrap in Suspense themselves, expose the lazy component
  if (suspense) return Lazy;

  // Otherwise wrap for them (and optionally hide from the server)
  const Wrapped = (props: React.ComponentProps<T>) => {
    const node = (
      <React.Suspense fallback={fallback}>
        <Lazy {...props} />
      </React.Suspense>
    );

    return ssr ? node : <ClientOnly fallback={fallback}>{node}</ClientOnly>;
  };

  // Give it a nice display name for React DevTools
  Wrapped.displayName = `Dynamic(${(Lazy as any).displayName ?? (Lazy as any).name ?? "Lazy"})`;
  return Wrapped;
}
