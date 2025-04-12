import { SweetenerTable } from "./sweetener-table";
import { registerTool } from "..";

export function SweetenerTool() {
  return <SweetenerTable />;
}

registerTool({
  id: "sweetener-comparison",
  name: "Sweeteners",
  desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
  Component: SweetenerTool,
  heroImage: "sweeteners.png",
});
