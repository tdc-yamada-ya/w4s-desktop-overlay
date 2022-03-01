import {OverlaySettings} from "../replicant/OverlaySettings";
import {updateLayerLayoutingMode} from "./updateLayerLayoutingMode";

export const toggleLayerLayoutingMode = (
  o?: OverlaySettings,
  id?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  return updateLayerLayoutingMode(o, id, !o?.layers?.[id]?.layoutingMode);
};
