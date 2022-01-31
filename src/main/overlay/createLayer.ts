import {clone, isEqual, omitBy} from "lodash";

import {Bounds} from "../../replicant/Bounds";
import {LayerConfig} from "../../replicant/LayerConfig";
import {Layer} from "./Layer";
import {LayerWindow} from "./LayerWindow";
import {createLayerWindow} from "./createLayerWindow";

export const createLayer = ({
  layer,
  onBounds,
}: {
  layer: LayerConfig;
  onBounds?: (bounds: Bounds) => void;
}): Layer => {
  const create = (l: LayerConfig) => {
    const w: LayerWindow = createLayerWindow({
      movable: l.layoutingMode,
      onBounds(bounds) {
        onBounds?.(bounds);
        cl.bounds = bounds;
      },
    });

    w.setAudioMuted(l.audioMuted ?? false);
    w.setBounds(l.bounds ?? {x: 0, y: 0, width: 0, height: 0});
    w.setOpacity(l.opacity ?? 0);
    w.setURL(l.url ?? "about:blank");
    w.setVisible(l.visible ?? false);

    return w;
  };

  let w: LayerWindow = create(layer);
  let cl: LayerConfig = layer;

  return {
    apply(l) {
      const d = omitBy(l, (v, k) =>
        isEqual(cl[k as keyof LayerConfig], v),
      ) as Partial<LayerConfig>;

      if (d.layoutingMode != null) {
        w.destroy();
        w = create({
          ...cl,
          layoutingMode: l.layoutingMode,
        });
      }

      if (d.audioMuted != null) {
        w.setAudioMuted(d.audioMuted);
      }

      if (d.bounds != null) {
        w.setBounds(d.bounds);
      }

      if (d.opacity != null) {
        w.setOpacity(d.opacity);
      }

      if (d.url != null) {
        w.setURL(d.url);
      }

      if (d.visible != null) {
        w.setVisible(d.visible);
      }

      cl = clone(l);
    },
    dispose() {
      w.destroy();
    },
    reload() {
      w.reload();
    },
  };
};
