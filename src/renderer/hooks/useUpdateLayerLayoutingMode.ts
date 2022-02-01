import {updateLayerLayoutingMode} from "../../logic/updateLayerLayoutingMode";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerLayoutingMode = (id?: string) => (value?: boolean) =>
  updateOverlay((o) => updateLayerLayoutingMode(o, id, value));
