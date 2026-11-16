import { useState, useEffect, useRef } from 'react';

/**
 * useScrollReveal
 * Reactive Intersection Observer hook that triggers on each scroll in/out of the viewport.
 * Uses threshold: 0 and rootMargin: '120px 0px 120px 0px' so that tall sections NEVER
 * get stuck at opacity-0 or create empty black voids when entering/exiting the viewport.
 */
export function useScrollReveal(threshold = 0, rootMargin = '150px 0px 150px 0px') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Immediately check if element is already in/near viewport on mount
    if (typeof window !== 'undefined') {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight + 150 && rect.bottom >= -150) {
        setIsVisible(true);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export default useScrollReveal;
