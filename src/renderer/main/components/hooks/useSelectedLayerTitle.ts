import {useSelectedLayer} from "./useSelectedLayer";

export const useSelectedLayerTitle = () => {
  const l = useSelectedLayer();
  return l?.title;
};
