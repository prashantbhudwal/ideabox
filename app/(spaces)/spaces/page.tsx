import { SpacesGrid } from "./spaces-grid";

export default function SpacesPage() {
  return (
    <div className="flex flex-col gap-4 p-4 pt-10">
      <h1 className="text-3xl font-bold text-center mb-4 font-mono">Spaces</h1>
      <SpacesGrid />
    </div>
  );
}
