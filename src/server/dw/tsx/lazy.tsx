import { lazy, useState, Suspense } from "react";
import { Button } from "~/client/components/ui/button";

const LazyGiant = lazy(() => import("./giant"));

const AnotherGiant = lazy(() =>
  import("./giant").then((module) => ({ default: module.AnotherLazyGiant })),
);

export const Lazy = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      Main Component
      <br />
      <Button onClick={() => setShow((s) => !s)}>Toggle Giant Component</Button>
      <br />
      {show && (
        <>
          <Suspense fallback={<div>Loading Giant…</div>}>
            <LazyGiant />
          </Suspense>
          <Suspense fallback={<div>Loading Another Giant…</div>}>
            <AnotherGiant delayMs={3000} />
          </Suspense>
        </>
      )}
    </div>
  );
};
