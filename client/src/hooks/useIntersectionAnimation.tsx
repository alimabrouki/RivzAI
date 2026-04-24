import { useEffect } from "react";

export const useIntersectionAnimation = (
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll(".slide-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [options]);
};
