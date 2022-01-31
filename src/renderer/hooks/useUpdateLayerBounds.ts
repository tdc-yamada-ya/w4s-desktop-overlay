import {updateLayerBounds} from "../../logic/updateLayerBounds";
import {Bounds} from "../../replicant/Bounds";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerBounds = (id?: string) => (bounds?: Bounds) =>
  updateOverlay((o) => updateLayerBounds(o, id, bounds));
