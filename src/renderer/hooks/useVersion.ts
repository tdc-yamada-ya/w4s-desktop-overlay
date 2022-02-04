import {useEffect, useState} from "react";

export const useVersion = () => {
  const [version, setVersion] = useState("");
  useEffect(() => window.api.subscribeVersion((v) => setVersion(v)), []);
  return version;
};
