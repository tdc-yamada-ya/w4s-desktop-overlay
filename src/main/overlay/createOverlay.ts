import {Bounds} from "../../replicant/Bounds";
import {LayerConfig} from "../../replicant/LayerConfig";
import {Layer} from "./Layer";
import {Overlay} from "./Overlay";
import {createLayer} from "./createLayer";

export const createOverlay = ({
  onBounds,
  onCommitBounds,
}: {
  onBounds?: (id: string, bounds: Bounds) => void;
  onCommitBounds?: (id: string) => void;
}): Overlay => {
  const layers: {[id: string]: Layer} = {};

  const addLayer = (id: string, c: LayerConfig): void => {
    const l = createLayer({
      layer: c,
      onBounds(b) {
        onBounds?.(id, b);
      },
      onCommitBounds() {
        onCommitBounds?.(id);
      },
    });
    layers[id] = l;
  };

  const updateLayer = (id: string, c: LayerConfig): void => {
    const l = layers[id];
    if (l) {
      l.apply(c);
    }
  };

  const deleteLayer = (id: string): void => {
    const l = layers[id];
    if (l) l.dispose();
    delete layers[id];
  };

  return {
    apply(oc) {
      const ids = new Set([
        ...Object.keys(layers),
        ...Object.keys(oc?.layers ?? {}),
      ]);

      for (const id of ids.values()) {
        const l = layers[id];
        const c = oc?.layers?.[id];
        if (!l && c) {
          addLayer(id, c);
        } else if (l && c) {
          updateLayer(id, c);
        } else if (l && !c) {
          deleteLayer(id);
        }
      }
    },
    reload(id) {
      layers[id]?.reload();
    },
  };
};
