import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const toggleLayerVisible = (
  o?: OverlayConfig,
  id?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        visible: !o?.layers?.[id]?.visible,
      },
    },
  };

  return merge(o, d);
};
