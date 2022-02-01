import {updateLayerVisible} from "../../logic/updateLayerVisible";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerVisible = (id?: string) => (value?: boolean) =>
  updateOverlay((o) => updateLayerVisible(o, id, value));
