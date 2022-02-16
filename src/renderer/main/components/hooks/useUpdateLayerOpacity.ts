import {updateLayerOpacity} from "../../../../common/logic/updateLayerOpacity";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerOpacity = (id?: string) => (value?: number) =>
  updateOverlay((o) => updateLayerOpacity(o, id, value));
