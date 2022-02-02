import {useSelectedLayer} from "./useSelectedLayer";

export const useIsLayerSelected = () => {
  const layer = useSelectedLayer();
  return !!layer;
};
