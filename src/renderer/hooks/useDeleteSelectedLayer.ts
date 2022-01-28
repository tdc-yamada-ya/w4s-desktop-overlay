import {deleteLayer} from "../../logic/deleteLayer";
import {updateOverlay} from "../replicant/updateOverlay";
import {useSelectedLayerID} from "./useSelectedLayerID";

export const useDeleteSelectedLayer = () => {
  const id = useSelectedLayerID();
  return () => updateOverlay((o) => deleteLayer(o, id));
};
