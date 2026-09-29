import { useCallback, useEffect, useRef, useState } from "react";

export const useAuthError = () => {
  const [error, setError] = useState("");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearError = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setError("");
  }, []);

  const showError = useCallback((message: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setError(message);
    timeoutRef.current = setTimeout(() => {
      setError("");
      timeoutRef.current = null;
    }, 3000);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return { error, showError, clearError };
};
