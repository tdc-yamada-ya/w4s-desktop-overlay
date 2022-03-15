import {omit} from "lodash";

import {Bounds} from "../../../common/replicant/Bounds";
import {LayerProperties} from "../../../common/replicant/LayerProperties";
import {Layer} from "./Layer";
import {Overlay} from "./Overlay";
import {createLayer} from "./createLayer";

export const createOverlay = ({
  onBounds,
  onBoundsChangeCommitted,
}: {
  onBounds?: (id: string, bounds: Bounds) => void;
  onBoundsChangeCommitted?: (id: string) => void;
}): Overlay => {
  let layers: {[id: string]: Layer} = {};

  const addLayer = (id: string, properties: LayerProperties): void => {
    const n = createLayer({
      id,
      properties,
      onBoundsChange(b) {
        onBounds?.(id, b);
      },
      onBoundsChangeCommited() {
        onBoundsChangeCommitted?.(id);
      },
    });
    layers = {...layers, [id]: n};
  };

  const updateLayer = (id: string, c: LayerProperties): void => {
    const l = layers[id];
    if (!l) {
      return;
    }
    l.apply(c);
  };

  const deleteLayer = (id: string): void => {
    const l = layers[id];
    if (!l) {
      return;
    }
    l.dispose();
    layers = omit(layers, id);
  };

  return {
    apply(settings) {
      const ids = new Set([
        ...Object.keys(layers),
        ...Object.keys(settings?.layers ?? {}),
      ]);

      for (const id of ids.values()) {
        const o = layers[id];
        const n = settings?.layers?.[id];
        if (!o && n) {
          addLayer(id, n);
        } else if (o && n) {
          updateLayer(id, n);
        } else if (o && !n) {
          deleteLayer(id);
        }
      }
    },
    reload(id) {
      layers[id]?.reload();
    },
  };
};
