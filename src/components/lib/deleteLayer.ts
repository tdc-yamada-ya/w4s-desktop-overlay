import {OverlayConfig} from "../../replicant/replicants";
import {omit} from "lodash";

export const deleteLayer = (
  o: OverlayConfig | undefined,
  id: string,
): OverlayConfig => {
  return {
    ...o,
    layers: {
      ...Object.fromEntries(
        Object.entries(omit(o?.layers, id))
          .sort(([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0))
          .map(([k, v], i) => [k, {...v, index: i}]),
      ),
    },
  };
};
