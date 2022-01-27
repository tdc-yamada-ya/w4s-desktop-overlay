import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";

export const toggleLayerAudioMuted = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => {
  const diff: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: !o?.layers?.[id]?.audioMuted,
      },
    },
  };

  return merge(o, diff);
};
