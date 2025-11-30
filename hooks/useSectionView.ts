import { useEffect, useRef, useState } from "react";
import { trackSectionView } from "../utils/analytics";

interface UseSectionViewOptions {
  sectionName: "hero" | "skills" | "experience" | "projects" | "contact";
  threshold?: number; // 0.0 to 1.0
  minDuration?: number; // Minimum time in ms to count as a view
}

export const useSectionView = ({
  sectionName,
  threshold = 0.5,
  minDuration = 1000,
}: UseSectionViewOptions) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasViewed, setHasViewed] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Don't track if already viewed in this session (optional choice,
    // but usually we want to track unique views per session or just once per page load)
    // For a single-page portfolio, tracking every time they scroll back might be noisy,
    // but useful for "engagement". Let's track every significant view but debounce it with minDuration.

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Started viewing
            startTimeRef.current = Date.now();
          } else {
            // Stopped viewing
            if (startTimeRef.current) {
              const duration = Date.now() - startTimeRef.current;
              if (duration >= minDuration) {
                // It was a valid view
                trackSectionView(sectionName, {
                  duration_ms: duration,
                  viewport_height: window.innerHeight,
                  viewport_width: window.innerWidth,
                });
                setHasViewed(true);
              }
              startTimeRef.current = null;
            }
          }
        });
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [sectionName, threshold, minDuration]);

  return { ref };
};
