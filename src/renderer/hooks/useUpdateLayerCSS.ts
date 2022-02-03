import { updateLayerCSS } from "../../logic/updateLayerCSS";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerCSS = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerCSS(o, id, value));
