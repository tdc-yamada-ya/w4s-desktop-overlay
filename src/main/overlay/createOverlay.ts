import {isEqual, omitBy} from "lodash";
import {Bounds} from "../../replicant/Bounds";
import {LayerConfig} from "../../replicant/LayerConfig";
import {OverlayConfig} from "../../replicant/OverlayConfig";
import {createLayer} from "./createLayer";
import {Layer} from "./Layer";
import {Overlay} from "./Overlay";

export const createOverlay = ({
  onBounds,
}: {
  onBounds: (id: string, bounds: Bounds) => void;
}): Overlay => {
  let config: OverlayConfig | undefined;
  const layers: {[id: string]: Layer} = {};

  const addLayer = (id: string, c: LayerConfig): void => {
    const l = createLayer({
      layer: c,
      onBounds(bounds) {
        onBounds(id, bounds);
      },
    });
    layers[id] = l;
  };

  const updateLayer = (id: string, nc: LayerConfig, oc: LayerConfig): void => {
    const l = layers[id];
    if (l) {
      l.apply(omitBy(nc, (v, k) => isEqual(oc[k as keyof LayerConfig], v)));
    }
  };

  const deleteLayer = (id: string): void => {
    const l = layers[id];
    if (l) l.dispose();
    delete layers[id];
  };

  const applyLayer = (id: string, nc?: LayerConfig, oc?: LayerConfig): void => {
    if (!oc && nc) addLayer(id, nc);
    else if (oc && nc) updateLayer(id, nc, oc);
    else if (oc && !nc) deleteLayer(id);
  };

  return {
    apply(n) {
      const oll = config?.layers ?? {};
      const nll = n?.layers ?? {};
      const oIds = Object.keys(oll) ?? [];
      const nIds = Object.keys(nll) ?? [];
      const ids = [...new Set([...oIds, ...nIds])];

      for (const id of ids) {
        applyLayer(id, nll[id], oll[id]);
      }

      config = n;
    },
    reload(id) {
      layers[id]?.reload();
    },
  };
};
