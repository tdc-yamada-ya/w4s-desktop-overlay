import {merge} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";
import {Screen} from "../replicant/Screen";

export const moveToNextLayerDisplay = (
  o: OverlaySettings | undefined,
  id: string,
  screen: Screen | undefined,
): OverlaySettings => {
  const oldDisplay = o?.layers?.[id]?.display ?? 0;
  const displayCount = screen?.displays?.length ?? 0;

  const display = (oldDisplay + 1) % displayCount;
  const bounds = screen?.displays?.[display]?.bounds;

  const diff: OverlaySettings = {
    layers: {
      [id]: {
        bounds: bounds,
        display: display,
      },
    },
  };

  return merge(o, diff);
};
