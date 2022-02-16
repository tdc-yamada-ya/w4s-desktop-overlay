import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerTitle = (
  o?: OverlayConfig,
  id?: string,
  title?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        title,
      },
    },
  };

  return merge(o, d);
};
