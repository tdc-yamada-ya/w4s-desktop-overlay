import {deleteLayer} from "../../../../common/logic/deleteLayer";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useDeleteLayer = (id?: string) => () =>
  updateOverlay((o) => deleteLayer(o, id));
