import { useEffect, useState } from "react";
export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export default function GiantComponent({
  delayMs = 2000,
}: {
  delayMs?: number;
}) {
  useEffect(() => {
    sleep(delayMs).then(() => console.log("Done"));
  }, []);

  return <>Giant-ass Component Has Loaded</>;
}

export const AnotherLazyGiant = GiantComponent;
