import {useOverlay} from "./useOverlay";

export const useSelectedLayerID = () => {
  const o = useOverlay();
  return o?.selectedLayerID;
};
