import {useCallback, useEffect, useState} from "react";

export const useLocalStorageState = (
  key: string,
): [string | null, (value: string) => void] => {
  const [state, setState] = useState<string | null>(
    window.localStorage.getItem(key),
  );

  const refresh = useCallback(
    () => setState(window.localStorage.getItem(key)),
    [key],
  );

  useEffect(() => {
    const listener = (e: StorageEvent): void => {
      if (e.key !== key) return;
      refresh();
    };

    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  }, [key, refresh]);

  const set = (value: string): void => {
    setState(value);
    window.localStorage.setItem(key, value);
  };

  return [state, set];
};

export const useLocalStorageStateAsJSON = <T>(
  key: string,
): [T | null, (value: T) => void] => {
  const [current, setCurrent] = useLocalStorageState(key);
  const value = current ? (JSON.parse(current) as T) : null;
  const set = (value: T) => setCurrent(JSON.stringify(value));
  return [value, set];
};
