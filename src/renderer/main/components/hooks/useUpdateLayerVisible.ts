import {updateLayerVisible} from "../../../../common/logic/updateLayerVisible";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerVisible = (id?: string) => (value?: boolean) =>
  updateOverlay((o) => updateLayerVisible(o, id, value));
