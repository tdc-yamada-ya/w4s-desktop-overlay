import {updateLayerLayoutingMode} from "../../../../common/logic/updateLayerLayoutingMode";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerLayoutingMode = (id?: string) => (value?: boolean) =>
  updateOverlay((o) => updateLayerLayoutingMode(o, id, value));
