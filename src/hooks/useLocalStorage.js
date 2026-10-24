import { useState, useEffect } from "react";

/**
 * Works like useState, but keeps the value in localStorage
 * so it survives page refreshes.
 */
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable – ignore */
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
