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
  onBounds: (bounds: Bounds) => void;
}): Layer => {
  const create = (l: LayerConfig) => {
    const w: LayerWindow = createLayerWindow({
      movable: l.layoutingMode,
      onBounds(bounds) {
        onBounds(bounds);
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
  const cl: LayerConfig = layer;

  return {
    apply(l) {
      if (l.layoutingMode != null) {
        w.destroy();
        w = create({
          ...cl,
          layoutingMode: l.layoutingMode,
        });
        cl.layoutingMode = l.layoutingMode;
      }

      if (l.audioMuted != null) {
        w.setAudioMuted(l.audioMuted);
        cl.audioMuted = l.audioMuted;
      }

      if (l.bounds != null) {
        w.setBounds(l.bounds);
        cl.bounds = l.bounds;
      }

      if (l.opacity != null) {
        w.setOpacity(l.opacity);
        cl.opacity = l.opacity;
      }

      if (l.url != null) {
        w.setURL(l.url);
        cl.url = l.url;
      }

      if (l.visible != null) {
        w.setVisible(l.visible);
        cl.visible = l.visible;
      }
    },
    dispose() {
      w.destroy();
    },
    reload() {
      w.reload();
    },
  };
};
