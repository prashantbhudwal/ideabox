type ToolDefinition = {
  id: string;
  name: string;
  heroImage: string;
  Component: React.ComponentType;
};

const registry = new Map<string, ToolDefinition>();

export function registerTool(tool: ToolDefinition) {
  if (registry.has(tool.id)) {
    throw new Error(`${tool.name} - tool already exists.`);
  }
  registry.set(tool.id, tool);
}

export function getToolByToolId({ toolId }: { toolId: string }) {
  return registry.get(toolId);
}

export function getAllTools(): ToolDefinition[] {
  return Array.from(registry.values());
}
