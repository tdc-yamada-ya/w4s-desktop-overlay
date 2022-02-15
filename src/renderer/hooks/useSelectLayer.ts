import {setSelectedLayerID} from "../../logic/setSelectedLayerID";
import {updateOverlay} from "../replicant/updateOverlay";

export const useSelectLayer = () => (id?: string) =>
  updateOverlay((o) => setSelectedLayerID(o, id));
