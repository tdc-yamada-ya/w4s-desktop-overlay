import {OverlayConfig, ScreenConfig} from "../../replicant/replicants";
import {merge} from "lodash";

export const moveToNextLayerDisplay = (
  o: OverlayConfig | undefined,
  id: string,
  screen: ScreenConfig | undefined,
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
