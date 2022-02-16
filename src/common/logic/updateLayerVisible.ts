import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerVisible = (
  o?: OverlayConfig,
  id?: string,
  visible?: boolean,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        visible,
      },
    },
  };

  return merge(o, d);
};
