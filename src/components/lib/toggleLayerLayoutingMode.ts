import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";

export const toggleLayerLayoutingMode = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => {
  return merge(o, {
    layers: {
      [id]: {
        layoutingMode: !o?.layers?.[id]?.layoutingMode,
      },
    },
  });
};
