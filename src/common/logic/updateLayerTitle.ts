import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerTitle = (
  o?: OverlaySettings,
  id?: string,
  title?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        title,
      },
    },
  };

  return merge(o, d);
};
