import { registerSpace } from ".";
import { ScientificMethodSpace } from "./scientific-method";
import { SweetenerSpace } from "./sweetener";

registerSpace({
  id: "scientific-method",
  name: "Scientific Method",
  desc: "Learn to apply the scientific method in your life. How to form a hypothesis or a theory?",
  heroImage: "scientific-method.png",
  Component: ScientificMethodSpace,
});
registerSpace({
  id: "sweetener-comparison",
  name: "Sweeteners",
  desc: "Which sweeteners raise GI? What sweeteners are trojan horses? Which ones are actually good?",
  Component: SweetenerSpace,
  heroImage: "sweeteners.png",
});
