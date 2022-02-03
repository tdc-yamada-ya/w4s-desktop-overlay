import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerCSS = (
  o?: OverlayConfig,
  id?: string,
  css?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        css,
      },
    },
  };

  return merge(o, d);
};
