import {useLayer} from "./useLayer";
import {useSelectedLayerID} from "./useSelectedLayerID";

export const useSelectedLayer = () => {
  const id = useSelectedLayerID();
  const layer = useLayer(id);
  return layer;
};
