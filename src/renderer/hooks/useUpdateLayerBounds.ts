import {updateLayerBounds} from "../../logic/updateLayerBounds";
import {Bounds} from "../../replicant/Bounds";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerBoundsWithID = () => {
  return (id?: string, bounds?: Bounds) =>
    updateOverlay((o) => updateLayerBounds(o, id, bounds));
};

export const useUpdateLayerBounds = (id?: string) => {
  const update = useUpdateLayerBoundsWithID();
  return (bounds?: Bounds) => update(id, bounds);
};
