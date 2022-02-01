import {updateLayerTitle} from "../../logic/updateLayerTitle";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerTitle = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerTitle(o, id, value));
