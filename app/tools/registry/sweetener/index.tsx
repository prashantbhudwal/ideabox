import { SweetenerTable } from "./sweetener-table";
import { registerTool } from "..";

export function SweetenerTool() {
  return <SweetenerTable />;
}

registerTool({
  id: "sweetener-comparison",
  name: "Sweeteners",
  Component: SweetenerTool,
  heroImage: "sweeteners.png",
});
