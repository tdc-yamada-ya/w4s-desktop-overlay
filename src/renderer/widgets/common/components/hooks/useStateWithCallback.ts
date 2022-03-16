import {useEffect, useState} from "react";

export const useStateWithCallback = <T>(
  initialState: T | (() => T),
  callback: (state: T) => void,
): [T, (state: T | ((state: T) => T)) => void] => {
  const [state, setState] = useState(initialState);

  useEffect(() => callback(state), [state, callback]);

  return [state, setState];
};
