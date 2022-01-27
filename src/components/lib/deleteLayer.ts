import {omit} from "lodash";
import {OverlayConfig} from "../../replicant/OverlayConfig";

export const deleteLayer = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => ({
  ...o,
  layers: {
    ...Object.fromEntries(
      Object.entries(omit(o?.layers, id))
        .sort(([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0))
        .map(([k, v], i) => [k, {...v, index: i}]),
    ),
  },
});
