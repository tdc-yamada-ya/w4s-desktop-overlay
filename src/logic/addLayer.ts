import {merge} from "lodash";
import {v4 as uuid} from "uuid";

import {LayerConfig} from "../replicant/LayerConfig";
import {OverlayConfig} from "../replicant/OverlayConfig";
import {Screen} from "../replicant/ScreenConfig";

export const addLayer = (
  o?: OverlayConfig,
  s?: Screen,
  l?: LayerConfig,
): OverlayConfig => {
  const id = uuid();
  const display = 0;
  const bounds = s?.displays?.[display]?.bounds;
  const index = Object.keys(o?.layers || {}).length;

  const diff: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: l?.audioMuted ?? true,
        bounds: l?.bounds ?? bounds,
        display: l?.display ?? display,
        index,
        opacity: 0.3,
        settingsURL: l?.settingsURL ?? "",
        title: l?.title ?? "",
        url: l?.url ?? "",
        visible: true,
      },
    },
    selectedLayerID: id,
  };

  return merge(o, diff);
};
