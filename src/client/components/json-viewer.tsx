import type { ThemeKeys } from "@microlink/react-json-view";
import { dynamic } from "~/client/lib/dynamic";

const DynamicReactJsonView = dynamic(
  () => import("@microlink/react-json-view"),
  {
    ssr: false,
  },
);

interface JsonViewerProps {
  src: unknown;
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
