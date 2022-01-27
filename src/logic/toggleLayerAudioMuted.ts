import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const toggleLayerAudioMuted = (
  o?: OverlayConfig,
  id?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  const d: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: !o?.layers?.[id]?.audioMuted,
      },
    },
  };

  return merge(o, d);
};
