import {omit} from "lodash";

import {OverlaySettings} from "../replicant/OverlaySettings";

export const deleteLayer = (
  o?: OverlaySettings,
  id?: string,
): OverlaySettings | undefined => {
  if (id == null) return o;

  return {
    ...o,
    layers: {
      ...Object.fromEntries(
        Object.entries(omit(o?.layers, id))
          .sort(([, {index: a}], [, {index: b}]) => (a ?? 0) - (b ?? 0))
          .map(([k, v], i) => [k, {...v, index: i}]),
      ),
    },
    selectedLayerID: o?.selectedLayerID === id ? "" : o?.selectedLayerID,
  };
};
