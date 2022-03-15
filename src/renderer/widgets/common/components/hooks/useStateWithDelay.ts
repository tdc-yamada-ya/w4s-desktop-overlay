import {useEffect, useState} from "react";

export const useStateWithDelay = <T>(
  initialState: T | (() => T),
  delay: number,
): [T, (state: T | ((state: T) => T)) => void] => {
  const [a, setA] = useState<T>(initialState);
  const [b, setB] = useState<T>(initialState);

  useEffect(() => {
    const id = window.setTimeout(() => setB(a), delay);
    return () => window.clearTimeout(id);
  }, [a, delay]);

  return [b, setA];
};
