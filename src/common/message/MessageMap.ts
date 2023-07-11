import {LayerProperties} from "../replicant/LayerProperties";

export type MessageMap = {
  openLayer: {data: LayerProperties};
  showLayerSettingsWindow: {data: string};
  reload: {data: string};
  version: {data: string};

  "titlebar:minimize": {data: unknown};
  "titlebar:maximize": {data: unknown};
  "titlebar:close": {data: unknown};
  "titlebar:isMaximized": {data: boolean};
  fetchWindowIds: {data: boolean};
  getCurrentLayerId: {data: unknown};
};
