type SpaceDefinition = {
  id: string;
  name: string;
  desc: string;
  heroImage: string;
  Component: React.ComponentType;
};

const registry = new Map<string, SpaceDefinition>();

export function registerSpace(space: SpaceDefinition) {
  if (registry.has(space.id)) {
    throw new Error(`${space.name} - space already exists.`);
  }
  registry.set(space.id, space);
}

export function getSpaceById({ spaceId }: { spaceId: string }) {
  return registry.get(spaceId);
}

export function getAllSpaces(): SpaceDefinition[] {
  return Array.from(registry.values());
}
