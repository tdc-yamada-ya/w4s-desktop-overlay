import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerOpacity = (
  o?: OverlayConfig,
  id?: string,
  opacity?: number,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        opacity,
      },
    },
  };

  return merge(o, d);
};
