import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const updateLayerSettingsURL = (
  o?: OverlayConfig,
  id?: string,
  settingsURL?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        settingsURL,
      },
    },
  };

  return merge(o, d);
};
