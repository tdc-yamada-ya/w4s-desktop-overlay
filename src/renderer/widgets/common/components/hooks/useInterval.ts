import {useEffect} from "react";

export const useInterval = (callback: () => void, interval?: number) => {
  useEffect(() => {
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval]);
};
