import { registerTool } from ".";
import { ScientificMethodTool } from "./scientific-method";
import { SweetenerTool } from "./sweetener";

registerTool({
  id: "scientific-method",
  name: "Scientific Method",
  desc: "Learn to apply the scientific method in your life. How to form a hypothesis or a theory?",
  heroImage: "scientific-method.png",
  Component: ScientificMethodTool,
});
registerTool({
  id: "sweetener-comparison",
  name: "Sweeteners",
  desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
  Component: SweetenerTool,
  heroImage: "sweeteners.png",
});
