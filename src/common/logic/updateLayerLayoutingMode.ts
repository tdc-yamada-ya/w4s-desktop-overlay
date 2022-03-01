import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerLayoutingMode = (
  o?: OverlaySettings,
  id?: string,
  layoutingMode?: boolean,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        layoutingMode,
      },
    },
  };

  return merge(o, d);
};
