import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerCSS = (
  o?: OverlaySettings,
  id?: string,
  css?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        css,
      },
    },
  };

  return merge(o, d);
};
