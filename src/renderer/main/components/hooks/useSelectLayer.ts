import {setSelectedLayerID} from "../../../../common/logic/setSelectedLayerID";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useSelectLayer = () => (id?: string) =>
  updateOverlay((o) => setSelectedLayerID(o, id));
