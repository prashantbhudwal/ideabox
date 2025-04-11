import { registerTool } from "..";
registerTool({
  id: "scientific-method",
  name: "Scientific Method",
  heroImage: "scientific-method.png",
  Component: Tool,
});

function Tool() {
  return <div>Scientific Method Tool</div>;
}
