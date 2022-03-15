import {useEffect, useState} from "react";

export const useStateWithIsEqual = <T>(
  initialState: T | (() => T),
  isEqual: (value: T | undefined, other: T | undefined) => boolean = (
    value,
    other,
  ) => value === other,
): [T, (state: T | ((state: T) => T)) => void] => {
  const [a, setA] = useState<T>(initialState);
  const [b, setB] = useState<T>(initialState);

  useEffect(() => {
    if (isEqual(a, b)) return;
    setB(a);
  }, [a, b, isEqual]);

  return [b, setA];
};
