import {useCallback, useEffect, useState} from "react";

export const useLocalStorageState = (
  key: string,
): [string | null, (value: string) => void] => {
  const [state, setState] = useState<string | null>(
    window.localStorage.getItem(key),
  );

  useEffect(() => {
    const listener = (e: StorageEvent): void => {
      if (e.key !== key) return;
      setState(window.localStorage.getItem(key));
    };

    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  }, [key]);

  const set = useCallback(
    (value: string): void => {
      setState(value);
      window.localStorage.setItem(key, value);
    },
    [key],
  );

  return [state, set];
};
