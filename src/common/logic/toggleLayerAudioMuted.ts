import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const toggleLayerAudioMuted = (
  o?: OverlaySettings,
  id?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  const d: OverlaySettings = {
    layers: {
      [id]: {
        audioMuted: !o?.layers?.[id]?.audioMuted,
      },
    },
  };

  return merge(o, d);
};
