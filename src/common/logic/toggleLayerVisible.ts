import {OverlaySettings} from "../replicant/OverlaySettings";
import {updateLayerVisible} from "./updateLayerVisible";

export const toggleLayerVisible = (
  o?: OverlaySettings,
  id?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;
  return updateLayerVisible(o, id, !o?.layers?.[id]?.visible);
};
