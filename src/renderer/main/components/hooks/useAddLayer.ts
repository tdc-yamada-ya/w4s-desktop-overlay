import {addLayer} from "../../../../common/logic/addLayer";
import {LayerConfig} from "../../../../common/replicant/LayerConfig";
import {updateOverlay} from "../../../common/replicant/updateOverlay";
import {useScreen} from "./useScreen";

export const useAddLayer = (): ((l?: LayerConfig) => void) => {
  const s = useScreen();
  return (l) => updateOverlay((o) => addLayer(o, s, l));
};
