import {OverlayConfig} from "../replicant/OverlayConfig";
import {updateLayerLayoutingMode} from "./updateLayerLayoutingMode";

export const toggleLayerLayoutingMode = (
  o?: OverlayConfig,
  id?: string,
): OverlayConfig | undefined => {
  if (id == null) return o;

  return updateLayerLayoutingMode(o, id, !o?.layers?.[id]?.layoutingMode);
};
