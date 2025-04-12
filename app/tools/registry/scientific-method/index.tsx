import { registerTool } from "..";
registerTool({
  id: "scientific-method",
  name: "Scientific Method",
  desc: "Learn to apply the scientific method in your life. How to form a hypothesis or a theory?",
  heroImage: "scientific-method.png",
  Component: Tool,
});

function Tool() {
  return <div>Scientific Method Tool</div>;
}
