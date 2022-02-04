import {merge} from "lodash";
import {v4 as uuid} from "uuid";

import {LayerConfig} from "../replicant/LayerConfig";
import {OverlayConfig} from "../replicant/OverlayConfig";
import {Screen} from "../replicant/ScreenConfig";

const width = 480;
const height = 360;

export const addLayer = (
  o?: OverlayConfig,
  s?: Screen,
  l?: LayerConfig,
): OverlayConfig => {
  const id = uuid();
  const display = 0;

  const b = s?.displays?.[display]?.bounds;
  const bx = b?.x ?? 0;
  const by = b?.y ?? 0;
  const bw = b?.width ?? width;
  const bh = b?.height ?? height;

  const bounds = {
    x: bx + (bw - width) / 2,
    y: by + (bh - height) / 2,
    width,
    height,
  };
  const index = Object.keys(o?.layers || {}).length;

  const diff: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: true,
        bounds,
        display,
        index,
        layoutingMode: true,
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
