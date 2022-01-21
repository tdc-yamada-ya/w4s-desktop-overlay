import {OverlayConfig} from "../../replicant/replicants";
import {merge} from "lodash";

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
