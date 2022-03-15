import {BrowserWindow} from "electron";

import {LayerProperties} from "../../../common/replicant/LayerProperties";
import {LayerSettingsWindow} from "./LayerSettingsWindow";
import {LayerSettingsWindowManager} from "./LayoutSettingsWindowManager";
import {createLayerSettingsWindow} from "./createLayerSettingsWindow";

type LayerSettingsWindowMap = {[id: string]: LayerSettingsWindow};

export const createLayerSettingsWindowManager = ({
  layers,
  parentWindow,
}: {
  layers: (id: string) => LayerProperties | undefined;
  parentWindow: () => BrowserWindow;
}): LayerSettingsWindowManager => {
  const windowMap: LayerSettingsWindowMap = {};

  return {
    show(id) {
      const existingWindow = windowMap[id];
      if (existingWindow) {
        existingWindow.show();
        return;
      }

      const layer = layers(id);
      if (!layer) {
        return;
      }

      const pw = parentWindow();

      const win = createLayerSettingsWindow({
        onClose() {
          delete windowMap[id];
        },
        parent: pw,
        sessionName: id,
        url: layer.settingsURL,
      });

      windowMap[id] = win;

      win.show();
    },
  };
};
