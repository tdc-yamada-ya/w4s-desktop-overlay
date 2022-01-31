import {updateLayerSettingsURL} from "../../logic/updateLayerSettingsURL";
import {updateOverlay} from "../replicant/updateOverlay";

export const useUpdateLayerSettingsURL = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerSettingsURL(o, id, value));
