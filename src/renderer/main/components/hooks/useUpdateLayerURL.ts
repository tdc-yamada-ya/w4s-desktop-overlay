import {updateLayerURL} from "../../../../common/logic/updateLayerURL";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerURL = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerURL(o, id, value));
