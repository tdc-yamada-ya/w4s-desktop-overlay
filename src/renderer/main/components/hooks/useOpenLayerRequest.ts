import {useEffect, useState} from "react";

import {LayerConfig} from "../../../../common/replicant/LayerConfig";

export const useOpenLayerRequest = () => {
  const [query, setQuery] = useState<LayerConfig | null>(null);

  useEffect(() => {
    const u = window.api.subscribeOpenLayer((v) => setQuery(v));
    return () => u();
  }, []);

  const resolve = () => setQuery(null);

  return [query, resolve] as const;
};
