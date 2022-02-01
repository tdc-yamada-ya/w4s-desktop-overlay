import {merge} from "lodash";

import {Bounds} from "../replicant/Bounds";
import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerBounds = (
  o?: OverlayConfig,
  id?: string,
  bounds?: Bounds,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        bounds,
      },
    },
  };

  return merge(o, d);
};
