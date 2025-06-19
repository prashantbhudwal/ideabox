import { createFileRoute } from "@tanstack/react-router";
import { Story } from "~/components/story/story";

export const Route = createFileRoute("/story")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="max-w-2xl mx-auto">
      <Story />
    </div>
  );
}
