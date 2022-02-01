import {updateLayerOpacity} from "../../logic/updateLayerOpacity";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerOpacity = (id?: string) => (value?: number) =>
  updateOverlay((o) => updateLayerOpacity(o, id, value));
