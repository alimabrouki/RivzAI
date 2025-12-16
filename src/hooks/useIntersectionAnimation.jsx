import { useRef, useEffect } from "react";

export const useIntersectionAnimation = (options = { threshold: 0.1}) => {
  const observerRef = useRef(null);

  const observe = (element) => {
    if (!element || !observerRef.current) return;
    observerRef.current.observe(element)
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observerRef.current.unobserve(entry.target);
        }
      });
    },options);
    return () => observerRef.current.disconnect();
  },[options])

  return observe
}