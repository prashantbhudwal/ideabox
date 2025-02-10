import { useEffect, useState } from "react";

export function useElementPosition() {
  const [position, setPosition] = useState({ top: 0 });
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (ref) {
      const rect = ref.getBoundingClientRect();
      setPosition({ top: rect.top });
    }
  }, [ref]);

  return [setRef, position] as const;
}
