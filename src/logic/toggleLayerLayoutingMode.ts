import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const toggleLayerLayoutingMode = (
  o?: OverlayConfig,
  id?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        layoutingMode: !o?.layers?.[id]?.layoutingMode,
      },
    },
  };

  return merge(o, d);
};
