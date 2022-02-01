import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerLayoutingMode = (
  o?: OverlayConfig,
  id?: string,
  layoutingMode?: boolean,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        layoutingMode,
      },
    },
  };

  return merge(o, d);
};
