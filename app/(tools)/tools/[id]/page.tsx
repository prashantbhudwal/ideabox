import { notFound } from "next/navigation";
import { getToolByToolId } from "../registry";

export default async function ToolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const toolId = (await params).id;
  const tool = getToolByToolId({ toolId });
  if (!tool) return notFound();
  const ToolComponent = tool.Component;
  return (
    <div>
      <ToolComponent />
    </div>
  );
}
