import {updateLayerBounds} from "../../../../common/logic/updateLayerBounds";
import {Bounds} from "../../../../common/replicant/Bounds";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerBoundsWithID = () => {
  return (id?: string, bounds?: Bounds) =>
    updateOverlay((o) => updateLayerBounds(o, id, bounds));
};

export const useUpdateLayerBounds = (id?: string) => {
  const update = useUpdateLayerBoundsWithID();
  return (bounds?: Bounds) => update(id, bounds);
};
