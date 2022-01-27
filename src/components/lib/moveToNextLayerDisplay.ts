import {merge} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";
import {Screen} from "../../replicant/ScreenConfig";

export const moveToNextLayerDisplay = (
  o: OverlayConfig | undefined,
  id: string,
  screen: Screen | undefined,
): OverlayConfig => {
  const oldDisplay = o?.layers?.[id]?.display ?? 0;
  const displayCount = screen?.displays?.length ?? 0;

  const display = (oldDisplay + 1) % displayCount;
  const bounds = screen?.displays?.[display]?.bounds;

  const diff: OverlayConfig = {
    layers: {
      [id]: {
        bounds: bounds,
        display: display,
      },
    },
  };

  return merge(o, diff);
};
