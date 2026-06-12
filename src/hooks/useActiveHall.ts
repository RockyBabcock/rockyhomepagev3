import { useState, useEffect } from "react";

export function useActiveHall(
  sectionIds: string[],
  rootMargin = "-50% 0px -50% 0px",
) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0]);

  useEffect(() => {
    const observers = new Map<string, IntersectionObserverEntry>();

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        observers.set(entry.target.id, entry);
      });

      // Find the currently intersecting element that is closest to center
      let closest: string | null = null;
      let maxRatio = 0;

      for (const [id, entry] of observers.entries()) {
        if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          closest = id;
        }
      }

      if (closest && closest !== activeId) {
        setActiveId(closest);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin,
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    });

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    elements.forEach((el) => el && observer.observe(el));

    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, [sectionIds, rootMargin, activeId]);

  return activeId;
}
