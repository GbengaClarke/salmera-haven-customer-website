import { useEffect, RefObject } from "react";

export function useOutsideInteraction(
  ref: RefObject<HTMLElement | null>,
  onInteraction: () => void,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;

    const handleInteraction = (event: MouseEvent | TouchEvent | Event) => {
      // Check if the click was outside the element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onInteraction();
      }
    };

    const handleScroll = () => {
      if (active) onInteraction();
    };

    // Add listeners
    // document.addEventListener("mousedown", handleInteraction);
    // document.addEventListener("touchstart", handleInteraction);
    document.addEventListener("pointerdown", handleInteraction);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      // Clean up listeners
      document.removeEventListener("mousedown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref, onInteraction, active]);
}
