import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";

export const updateLayerOpacity = (
  o: OverlayConfig | undefined,
  id: string,
  opacity: number,
): OverlayConfig => {
  return merge(o, {
    layers: {
      [id]: {
        opacity,
      },
    },
  });
};
