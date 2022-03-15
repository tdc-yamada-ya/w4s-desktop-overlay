import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerOpacity = (
  o?: OverlaySettings,
  id?: string,
  opacity?: number,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        opacity,
      },
    },
  };

  return merge(o, d);
};
