import {addLayer} from "../../logic/addLayer";
import {LayerConfig} from "../../replicant/LayerConfig";
import {updateOverlay} from "../replicant/updateOverlay";
import {useScreen} from "./useScreen";

export const useAddLayer = (): ((l?: LayerConfig) => void) => {
  const s = useScreen();
  return (l) => updateOverlay((o) => addLayer(o, s, l));
};
