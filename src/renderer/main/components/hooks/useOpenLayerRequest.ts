import {useEffect, useState} from "react";

import {LayerProperties} from "../../../../common/replicant/LayerProperties";

export const useOpenLayerRequest = () => {
  const [query, setQuery] = useState<LayerProperties | null>(null);

  useEffect(() => {
    const u = window.api.subscribeOpenLayer((v) => setQuery(v));
    return () => u();
  }, []);

  const resolve = () => setQuery(null);

  return [query, resolve] as const;
};
