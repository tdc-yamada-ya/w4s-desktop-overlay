import {useEffect, useState} from "react";

export const useVersion = () => {
  const [version, setVersion] = useState("");

  useEffect(() => {
    const u = window.api.subscribeVersion((v) => setVersion(v));
    return () => u();
  }, []);

  return version;
};
