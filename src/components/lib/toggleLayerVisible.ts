import {OverlayConfig} from "../../replicant/replicants";
import {merge} from "lodash";

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
