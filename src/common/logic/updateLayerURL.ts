import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerURL = (
  o?: OverlayConfig,
  id?: string,
  url?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        url,
      },
    },
  };

  return merge(o, d);
};
