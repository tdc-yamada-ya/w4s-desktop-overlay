import {merge} from "lodash";

import {OverlayConfig} from "../replicant/OverlayConfig";

export const setSelectedLayerID = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => {
  const diff: OverlayConfig = {
    selectedLayerID: id,
  };

  return merge(o, diff);
};
