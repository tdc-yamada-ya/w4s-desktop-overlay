import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerURL = (
  o?: OverlaySettings,
  id?: string,
  url?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        url,
      },
    },
  };

  return merge(o, d);
};
