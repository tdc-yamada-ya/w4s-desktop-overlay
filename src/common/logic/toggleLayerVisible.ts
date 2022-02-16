import {OverlayConfig} from "../replicant/OverlayConfig";
import {updateLayerVisible} from "./updateLayerVisible";

export const toggleLayerVisible = (
  o?: OverlayConfig,
  id?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;
  return updateLayerVisible(o, id, !o?.layers?.[id]?.visible);
};
