import {deleteLayer} from "../../logic/deleteLayer";
import {updateOverlay} from "../replicant/updateOverlay";

export const useDeleteLayer = (id?: string) => () =>
  updateOverlay((o) => deleteLayer(o, id));
