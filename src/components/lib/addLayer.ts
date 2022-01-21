import {OverlayConfig, ScreenConfig} from "../../replicant/replicants";
import {v4 as uuid} from "uuid";
import {merge} from "lodash";

export const addLayer = (
  o: OverlayConfig | undefined,
  s: ScreenConfig | undefined,
): OverlayConfig => {
  const id = uuid();
  const display = 0;
  const bounds = s?.displays?.[display]?.bounds;

  const diff: OverlayConfig = {
    layers: {
      [id]: {
        audioMuted: true,
        bounds,
        display,
        index: Object.keys(o?.layers || {}).length,
        opacity: 0.3,
        url: "",
        visible: true,
      },
    },
  };

  return merge(o, diff);
};
