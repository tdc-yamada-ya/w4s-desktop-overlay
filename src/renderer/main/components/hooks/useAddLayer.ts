import {addLayer} from "../../../../common/logic/addLayer";
import {LayerProperties} from "../../../../common/replicant/LayerProperties";
import {updateOverlay} from "../../../common/replicant/updateOverlay";
import {useScreen} from "./useScreen";

export const useAddLayer = (): ((l?: LayerProperties) => void) => {
  const s = useScreen();
  return (l) => updateOverlay((o) => addLayer(o, s, l));
};
