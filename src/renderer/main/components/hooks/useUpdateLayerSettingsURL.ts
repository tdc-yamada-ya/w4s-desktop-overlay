import {updateLayerSettingsURL} from "../../../../common/logic/updateLayerSettingsURL";
import {updateOverlay} from "../../../common/replicant/updateOverlay";

export const useUpdateLayerSettingsURL = (id?: string) => (value?: string) =>
  updateOverlay((o) => updateLayerSettingsURL(o, id, value));
