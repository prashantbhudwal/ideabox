import { useState, useEffect } from "react";

export function useScrollDirection() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      setIsScrollingUp(scrollY < lastScrollY);
      setLastScrollY(scrollY);
      setHasScrolled(true);
      setIsIdle(false);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsIdle(true);
      }, 1000);
    };

    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  return { isScrollingUp, hasScrolled, isIdle };
}
