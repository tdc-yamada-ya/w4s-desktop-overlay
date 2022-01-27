import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";

export const toggleLayerVisible = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => {
  return merge(o, {
    layers: {
      [id]: {
        visible: !o?.layers?.[id]?.visible,
      },
    },
  });
};
