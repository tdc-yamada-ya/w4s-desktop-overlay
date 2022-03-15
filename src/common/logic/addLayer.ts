import {merge} from "lodash";
import {v4 as uuid} from "uuid";

import {LayerProperties} from "../replicant/LayerProperties";
import {OverlaySettings} from "../replicant/OverlaySettings";
import {Screen} from "../replicant/Screen";

const defaultWidth = 480;
const defaultHeight = 360;
const defaultURL = "builtin://default/view";

const defaultProperties: LayerProperties = {
  audioMuted: true,
  bounds: {
    x: 0,
    y: 0,
    width: defaultWidth,
    height: defaultHeight,
  },
  display: 0,
  index: 0,
  layoutingMode: false,
  opacity: 0.8,
  settingsURL: "builtin://default/settings",
  title: "My Layer",
  url: "builtin://default/view",
  visible: true,
};

export const addLayer = (
  o?: OverlaySettings,
  s?: Screen,
  l?: LayerProperties,
): OverlaySettings => {
  const id = uuid();
  const display = 0;

  const b = s?.displays?.[display]?.bounds;
  const bx = b?.x ?? 0;
  const by = b?.y ?? 0;
  const bw = b?.width ?? defaultWidth;
  const bh = b?.height ?? defaultHeight;
  const bounds = {
    x: bx + (bw - defaultWidth) / 2,
    y: by + (bh - defaultHeight) / 2,
    width: defaultWidth,
    height: defaultHeight,
  };

  const index = Object.keys(o?.layers || {}).length;

  const diff: OverlaySettings = {
    layers: {
      [id]: {
        ...defaultProperties,
        ...l,
        url: l?.url || defaultURL,
        bounds,
        display,
        index,
      },
    },
    selectedLayerID: id,
  };

  return merge(o, diff);
};
