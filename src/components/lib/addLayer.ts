import {v4 as uuid} from "uuid";
import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";
import {Screen} from "../../replicant/ScreenConfig";

export const addLayer = (
  o: OverlayConfig | undefined,
  s: Screen | undefined,
): OverlayConfig => {
  const id = uuid();
  const display = 0;
  const bounds = s?.displays?.[display]?.bounds;
  const index = Object.keys(o?.layers || {}).length;

  const diff: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: true,
        bounds,
        display,
        index,
        opacity: 0.3,
        url: "",
        visible: true,
      },
    },
  };

  return merge(o, diff);
};
