import {updateLayerTitle} from "../../../../common/logic/updateLayerTitle";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerTitle = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerTitle(o, id, value));
