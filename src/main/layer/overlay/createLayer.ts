import {clone, isEqual, omitBy} from "lodash";

import {Bounds} from "../../../common/replicant/Bounds";
import {LayerProperties} from "../../../common/replicant/LayerProperties";
import {Layer} from "./Layer";
import {LayerWindow} from "./LayerWindow";
import {createLayerWindow} from "./createLayerWindow";

export const createLayer = ({
  id,
  properties,
  onBoundsChange: onBounds,
  onBoundsChangeCommited: onCommitBounds,
}: {
  id: string;
  properties: LayerProperties;
  onBoundsChange?: (bounds: Bounds) => void;
  onBoundsChangeCommited?: () => void;
}): Layer => {
  let currentProperties: LayerProperties = clone(properties);

  const createWindow = (newProperties: LayerProperties) => {
    const win: LayerWindow = createLayerWindow({
      movable: newProperties.layoutingMode,
      onBounds(bounds) {
        onBounds?.(bounds);
        currentProperties.bounds = bounds;
      },
      onCommitBounds() {
        onCommitBounds?.();
      },
      sessionName: id,
    });

    win.setAudioMuted(newProperties.audioMuted ?? false);
    win.setBounds(newProperties.bounds ?? {x: 0, y: 0, width: 0, height: 0});
    win.setOpacity(newProperties.opacity ?? 0);
    win.setURL(newProperties.url ?? "");
    win.setVisible(newProperties.visible ?? false);
    win.setCSS(newProperties.css ?? "");

    win.setAllowUserMedia(newProperties.allowUserMedia ?? false);
    return win;
  };
  let win: LayerWindow = createWindow(properties);

  return {
    apply(properties) {
      const diff = omitBy(properties, (v, k) =>
        isEqual(currentProperties[k as keyof LayerProperties], v),
      ) as Partial<LayerProperties>;

      if (diff.layoutingMode != null) {
        win.destroy();
        win = createWindow({
          ...currentProperties,
          layoutingMode: properties.layoutingMode,
        });
      }

      if (diff.audioMuted != null) {
        win.setAudioMuted(diff.audioMuted);
      }

      if (diff.bounds != null) {
        win.setBounds(diff.bounds);
      }

      if (diff.opacity != null) {
        win.setOpacity(diff.opacity);
      }

      if (diff.url != null) {
        win.setURL(diff.url);
      }

      if (diff.visible != null) {
        win.setVisible(diff.visible);
      }

      if (diff.css != null) {
        win.setCSS(diff.css);
      }

      if (diff.allowUserMedia != null) {
        win.setAllowUserMedia(diff.allowUserMedia);
      }
      currentProperties = clone(properties);
    },
    dispose() {
      win.destroy();
    },
    reload() {
      win.reload();
    },
  };
};
