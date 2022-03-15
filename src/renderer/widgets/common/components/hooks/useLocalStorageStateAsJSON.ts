import {useCallback, useMemo} from "react";

import {useLocalStorageState} from "./useLocalStorageState";

const decode = <T>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch (e) {
    return null;
  }
};

const encode = <T>(value: T): string | "" => {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return "";
  }
};

export const useLocalStorageStateAsJSON = <T>(
  key: string,
): [T | null, (state: T) => void] => {
  const [encodedState, setEncodedState] = useLocalStorageState(key);

  const state = useMemo(
    () => (encodedState ? decode<T>(encodedState) : null),
    [encodedState],
  );

  const setState = useCallback(
    (state: T) => setEncodedState(encode<T>(state)),
    [setEncodedState],
  );

  return [state, setState];
};
