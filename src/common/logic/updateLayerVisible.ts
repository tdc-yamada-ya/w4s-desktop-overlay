import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerVisible = (
  o?: OverlaySettings,
  id?: string,
  visible?: boolean,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        visible,
      },
    },
  };

  return merge(o, d);
};
