import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const updateLayerSettingsURL = (
  o?: OverlaySettings,
  id?: string,
  settingsURL?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        settingsURL,
      },
    },
  };

  return merge(o, d);
};
