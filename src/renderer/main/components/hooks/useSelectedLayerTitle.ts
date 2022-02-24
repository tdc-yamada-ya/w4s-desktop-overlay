import {useLayerTitle} from "./useLayerTitle";
import {useSelectedLayerID} from "./useSelectedLayerID";

export const useSelectedLayerTitle = () => {
  const id = useSelectedLayerID();
  const title = useLayerTitle(id);
  return title;
};
