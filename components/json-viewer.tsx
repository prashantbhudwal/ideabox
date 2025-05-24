"use client";

import dynamic from "next/dynamic";
import type { ThemeKeys } from "@microlink/react-json-view"; // Keep type import if needed

// Dynamically import ReactJsonView with SSR turned off
const DynamicReactJsonView = dynamic(
  () => import("@microlink/react-json-view"),
  {
    ssr: false,
    loading: () => <p>Loading JSON viewer...</p>, // Optional loading state
  },
);

interface JsonViewerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src: any;
  theme?: ThemeKeys;
}

export function JsonViewer({ src, theme = "google" }: JsonViewerProps) {
  if (typeof src === "undefined" || src === null) {
    return <p>No data to display.</p>;
  }
  return (
    <DynamicReactJsonView
      src={src}
      theme={theme}
      style={{ padding: "1rem", borderRadius: "0.5rem" }}
    />
  );
}
