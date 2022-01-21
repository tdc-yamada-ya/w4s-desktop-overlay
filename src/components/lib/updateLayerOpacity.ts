import {OverlayConfig} from "../../replicant/replicants";
import {merge} from "lodash";

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
