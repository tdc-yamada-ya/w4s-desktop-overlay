import {merge} from "lodash";

import {Bounds} from "../replicant/Bounds";
import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerBounds = (
  o?: OverlaySettings,
  id?: string,
  bounds?: Bounds,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        bounds,
      },
    },
  };

  return merge(o, d);
};
