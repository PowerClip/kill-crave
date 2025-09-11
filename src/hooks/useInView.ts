import { useEffect, useRef, useState } from "react";

/**
 * Lightweight intersection observer hook.
 * Returns a ref to place on the element and a boolean that becomes true once it has entered the viewport.
 */
export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) return; // don't re-observe once visible
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px", ...options }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, [options, inView]);

  return { ref, inView } as const;
}
