import {updateLayerCSS} from "../../../../common/logic/updateLayerCSS";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerCSS = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerCSS(o, id, value));
