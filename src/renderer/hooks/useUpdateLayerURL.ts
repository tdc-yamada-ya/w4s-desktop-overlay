import {updateLayerURL} from "../../logic/updateLayerURL";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerURL = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerURL(o, id, value));
