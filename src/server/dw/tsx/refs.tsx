import { useEffect, useLayoutEffect, useRef } from "react";

export function RefsEffect() {
  const ref = useRef(null);
  console.log("beforeEffect", ref);

  useLayoutEffect(() => {
    console.log("layoutEffectRef", ref);
  }, []);

  useEffect(() => {
    console.log("refEffect", ref);
  }, []);
  console.log("afterEffect", ref);
  return <div ref={ref}>Test</div>;
}
