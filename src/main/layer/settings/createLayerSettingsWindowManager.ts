import {BrowserWindow} from "electron";
import {omitBy} from "lodash";

import {LayerProperties} from "../../../common/replicant/LayerProperties";
import {LayerSettingsWindow} from "./LayerSettingsWindow";
import {LayerSettingsWindowManager} from "./LayoutSettingsWindowManager";
import {createLayerSettingsWindow} from "./createLayerSettingsWindow";

export const createLayerSettingsWindowManager = ({
  layers,
  parentWindow,
}: {
  layers: (id: string) => LayerProperties | undefined;
  parentWindow: () => BrowserWindow;
}): LayerSettingsWindowManager => {
  let windowCache: {[id: string]: LayerSettingsWindow} = {};

  const removeWindowCache = (id: string) =>
    (windowCache = omitBy(windowCache, id));

  return {
    show(id) {
      const cachedWindow = windowCache[id];
      if (cachedWindow && !cachedWindow.isDestroyed()) {
        cachedWindow.show();
        return;
      }

      const layer = layers(id);
      if (!layer) {
        return;
      }

      const parent = parentWindow();
      const window = createLayerSettingsWindow({
        onClose: () => removeWindowCache(id),
        parent: parent,
        sessionName: id,
        url: layer.settingsURL,
      });
      window.show();

      windowCache[id] = window;
    },
  };
};
