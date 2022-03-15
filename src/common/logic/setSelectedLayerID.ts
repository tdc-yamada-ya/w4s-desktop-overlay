import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const setSelectedLayerID = (
  o?: OverlaySettings,
  id?: string,
): OverlaySettings => {
  const diff: OverlaySettings = {
    selectedLayerID: id,
  };

  return merge(o, diff);
};
